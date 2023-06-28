import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { useQuery } from "react-query"
import { getSearch } from "services/apiSearch";
import { Input, Dropdown, Card } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { SearchDropdown } from "@styles/styled-components/styledBox";
type GeneralSearchProps = {
  hidden: boolean,
}

export const GeneralSearch: React.FC<GeneralSearchProps> = ({ hidden }) => {
  // States
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Record<string, object[]>>({});
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [hideBar, setHideBar] = useState<boolean>(true);

  // Hooks
  const searchQuery = useQuery({
    queryKey: "search",
    queryFn: () => searchInput !== "" && getSearch(searchInput),
    onSuccess: (res) => {
      setOpenDropdown(Object.keys(res).length > 0);
      setSearchResult(res);
    },
    onError: (err) => console.log("Search Error: ", err),
    enabled: false,
  });

  useEffect(() => {
    // Prevent calling API for every change
    let resetTimer;
    resetTimer = setTimeout(() => {
      searchQuery.refetch();
    }, 500);
    return () => clearTimeout(resetTimer);
  }, [searchInput]);

  // Functions
  const handleSearchChange = (event) => {
    setSearchInput(event.target?.value ?? "");
    setOpenDropdown(event.target?.value !== "");
  };
  
  const handleFocus = () => {
    setOpenDropdown(searchInput !== "" && Object.keys(searchResult).length > 0);
    setHideBar(false);
  }

  const handleBlur = () => {
    setOpenDropdown(false);
    setHideBar(searchInput === "");
  }

  return (
    <div>
      <Input
        className={
          "search-bar" + (hidden && hideBar ? " hide-bar" : "")
        }
        placeholder="Tìm Kiếm"
        prefix={<SearchOutlined />}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        />
      <Dropdown
        open={openDropdown}
        overlay={
          <SearchDropdown
            background="white"
            children={
              searchQuery.isFetching ? <LoadingOutlined /> : (
                <ul className="list-menu">
                  {
                    Object.keys(searchResult).map((key) => 
                      searchResult[key].map((item) => (
                        <li>{parse(item._highlightResult?.name?.value ?? (item._highlightResult?.title?.value ?? ""))} - {key}</li>
                      )
                    )).flat()
                  }
                </ul>
              )
            }
          />
        }
      >
        <div></div>
      </Dropdown>
    </div>
  );
};