import React, { FC, useEffect, useState } from "react";
import { Empty, Tabs } from "antd";
import request from "@services/apiService";
import * as qs from "qs";
import NewsLists from "@components/main/dapp-news/NewsList";
import { Button, LoadMore } from "@styles/styled-components/styledButton";
import { useRouter } from "next/router";
import { BoxALignItemsCenter } from "@styles/styled-components/styledBox";
import { NavMain, Nav_Sub, ToggleMain, ToggleMain_Sub } from "@styles/styled-components/styledTabs";
import { Select } from "antd";

const DappNews: FC = () => {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  const [crit, setCrit] = useState("viewer");
  const [categories, setCategories] = useState([]);
  const [categoryKey, setCategoryKey] = useState("All");
  const [viewMore, setNumberViewMore] = useState(20);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/post-categories?${query}`).then((res) => {
        setCategories(res.data.data);
      });
    })();
  }, [categories]);

  if (!categories?.find((cat) => cat.attributes.name === "All")) {
    categories?.unshift({ attributes: { name: "All" } });
  }

  useEffect(() => {
    (async () => {
      let query = "";
      if (categoryKey === "All") {
        query = qs.stringify(
          {
            populate: "*",
            pagination: {
              page: 1,
              pageSize: viewMore,
            },
            sort: [`${crit}:desc`],
          },
          {
            encodeValuesOnly: true,
          }
        );
      } else {
        query = qs.stringify(
          {
            populate: "*",
            pagination: {
              page: 1,
              pageSize: viewMore,
            },
            filters: {
              category: {
                name: categoryKey,
              },
            },
            sort: [`${crit}:desc`],
          },
          {
            encodeValuesOnly: true,
          }
        );
      }
      await request.get(`/posts?${query}`).then((res) => {
        setNewsList(res.data.data);
      });
    })();
  }, [categoryKey, viewMore, crit]);

  const onChangeTab = (key: any) => {
    if (viewMore > 20) {
      setNumberViewMore(20);
    }
    let index = categories.findIndex(
      (cat) => cat.attributes.name === key.target.attributes.value.value
    );
    setActiveIndex(index);
    setCategoryKey(key.target.attributes.value.value);
  };

  const onSelect = (key: any) => {
    if (viewMore > 20) {
      setNumberViewMore(20);
    }
    let index = categories.findIndex((cat) => cat.attributes.name === key);
    setActiveIndex(index);
    setCategoryKey(key);
  };

  return (
    <section className="main-homepage-news px-lg-3 px-0">
      <h2 className="text-center">Dapp News</h2>
      <div className="block-for-mobile">
        <div className="bar-category">
          <Select
            defaultValue={`All`}
            style={{ width: "100%" }}
            onSelect={onSelect}
          >
            {categories.map((cat, i) => {
              return (
                <Option value={cat.attributes.name} key={i}>
                  {cat.attributes.name}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
      <div className="bar-category">
        <div className="block-for-pc">
          <NavMain className="bar-category-left">
            {categories?.map((cat, i) => {
              return (
                <span className="d-inline-flex position-relative">
                  <Nav_Sub
                    onClick={onChangeTab}
                    value={cat.attributes.name}
                    className={`fontSize_08 ${
                      activeIndex === i ? "active" : ""
                    }`}
                  >
                    {cat.attributes.name}
                  </Nav_Sub>
                </span>
              );
            })}
          </NavMain>
        </div>
        <BoxALignItemsCenter className="bar-category-right">
            <ToggleMain>
              <span className="d-inline-flex position-relative bar-category-right-toggle">
                <ToggleMain_Sub
                  onClick={() => setCrit("viewer")}
                  className={`fontSize_08 ${crit === "viewer" ? "active" : ""}`}
                >
                  Popular
                </ToggleMain_Sub>
              </span>
              <span className="d-inline-flex position-relative bar-category-right-toggle">
                <ToggleMain_Sub
                  onClick={() => setCrit("createdAt")}
                  className={`fontSize_08 ${
                    crit === "createdAt" ? "active" : ""
                  }`}
                >
                  Newest
                </ToggleMain_Sub>
              </span>
            </ToggleMain>
        </BoxALignItemsCenter>
      </div>
      <div>
        <div className="row m-0">
          <NewsLists data={newsList} />
        </div>
        <br />
        <div className="text-center">
          {<LoadMore
            className="text-green fw-bold fontSize_1-1"
            onClick={() => {
              setNumberViewMore(viewMore + 20);
            }}
          >
            Load more
          </LoadMore>}
        </div>
      </div>
    </section>
  );
};

export default DappNews;