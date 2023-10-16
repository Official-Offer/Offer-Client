import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { useQuery } from "@tanstack/react-query"
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
    queryKey: ["search"],
    queryFn: () => searchInput !== "" && getSearch(searchInput),
    onSuccess: (res) => {
      setSearchResult(res);
    },
    onError: (err) => console.log("Search Error: ", err),
    enabled: false,
  });

  useEffect(() => {
    // Prevent calling API for every change
    let resetTimer = setTimeout(() => {
      searchQuery.refetch();
    }, 500);
    return () => clearTimeout(resetTimer);
  }, [searchInput]);

  // Functions
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target?.value ?? "");
    setOpenDropdown(event.target?.value !== "");
  };
  
  const handleFocus = () => {
    setOpenDropdown(searchInput !== "");
    setHideBar(false);
  }

  const handleBlur = () => {
    console.log("what")
    setOpenDropdown(false);
    setHideBar(searchInput === "");
  }

  return (
    <div
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Input
        className={
          "search-bar" + (hidden && hideBar ? " hide-bar" : "")
        }
        placeholder="Tìm Kiếm"
        prefix={<SearchOutlined />}
        onChange={handleSearchChange}
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
                    Object.keys(searchResult).length === 0 ? <span>Không có kết quả</span> :
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