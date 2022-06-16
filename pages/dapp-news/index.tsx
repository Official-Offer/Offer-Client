import React, { FC, useEffect, useState } from "react";
import { Empty, Tabs } from "antd";
import request from "@services/apiService";
import * as qs from "qs";
import { Button, LoadMore } from "@styles/styled-components/styledButton";
import { useRouter } from "next/router";
import {
  BoxALignItemsCenter,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import {
  NavMain,
  Nav_Sub,
  ToggleMain,
  ToggleMain_Sub,
} from "@styles/styled-components/styledTabs";
import { Select } from "antd";
import dynamic from "next/dynamic";
import NewsList from "@components/main/dapp-news/NewsList";
import PinnedSlides from "@components/main/dapp-news/PinnedSlides";
import LatestNews from "@components/main/dapp-news/LatestNews";

const DappNews: FC = () => {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  const [crit, setCrit] = useState("viewer");
  const [categories, setCategories] = useState<any>([]);
  const [categoryKey, setCategoryKey] = useState("All");
  const [viewMore, setNumberViewMore] = useState(18);
  const [activeIndex, setActiveIndex] = useState(0);

  // const NewsList = dynamic(
  //   () => import("@components/main/dapp-news/NewsList")
  // );
  // const PinnedSlides = dynamic(
  //   () => import("@components/main/dapp-news/PinnedSlides")
  // );
  // const LatestNews = dynamic(
  //   () => import("@components/main/dapp-news/LatestNews")
  // );

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
  }, []);

  if (!categories?.find((cat: any) => cat.attributes.name === "All")) {
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
    let index = categories.findIndex((cat: any) => cat.attributes.name === key);
    setActiveIndex(index);
    setCategoryKey(key);
  };

  const onSelect = (key: any) => {
    if (viewMore > 20) {
      setNumberViewMore(20);
    }
    let index = categories.findIndex((cat: any) => cat.attributes.name === key);
    setActiveIndex(index);
    setCategoryKey(key);
  };

  return (
    <section className="main-homepage-dappnews px-lg-3">
      <h2 className="text-center mb-5">Dapp News</h2>
      <BoxWhiteShadow className="row">
        <div className="fontSize_08 main-homepage-dappnews-pinnedSection-left">
          <PinnedSlides crit={'createdAt'}/>
        </div>
        <div className="main-homepage-dappnews-pinnedSection-right">
          <LatestNews/>
        </div>
      </BoxWhiteShadow>
      <div className="block-for-mobile">
        <div className="bar-category">
          <Select
            defaultValue={`All`}
            style={{ width: "100%" }}
            onSelect={onSelect}
          >
            {categories.map((cat: any, i: number) => {
              return (
                <Select.Option value={cat.attributes.name} key={i}>
                  {cat.attributes.name}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      </div>
      <div className="bar-category">
        <div className="block-for-pc">
          <NavMain className="bar-category-left">
            {categories?.map((cat: any, i: number) => {
              return (
                <span className="d-inline-flex position-relative" key={i}>
                  <Nav_Sub
                    onClick={() => onChangeTab(cat.attributes.name)}
                    className={`${
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
        <BoxALignItemsCenter >
          <ToggleMain className="bar-category-right">
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
        <div className="mt-5 row">
          <NewsList data={newsList} />
        </div>
        <br />
        <div className="text-center mb-5">
          {newsList.length !== 0 && (
            <LoadMore
              className="text-green fw-bold fontSize_1-1"
              onClick={() => {
                setNumberViewMore(viewMore + 18);
              }}
            >
              Load more
            </LoadMore>
          )}
        </div>
      </div>
    </section>
  );
};

export default DappNews;
