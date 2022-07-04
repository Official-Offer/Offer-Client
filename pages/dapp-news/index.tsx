import React, { FC, useEffect, useState } from "react";
import { Empty, Tabs } from "antd";
import request from "@services/apiService";
import * as qs from "qs";
import { Button, ButtonGradientBlue, LoadMore, LoadMoreBlue } from "@styles/styled-components/styledButton";
import { useRouter } from "next/router";
import {
  BoxALignItemsCenter,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import {
  NavMain,
  Nav_Sub,
  TabMain,
  ToggleMain,
  ToggleMain_Sub,
} from "@styles/styled-components/styledTabs";
import { Select } from "antd";
import NewsList from "@components/main/dapp-news/NewsList";
import PinnedSlides from "@components/main/dapp-news/PinnedSlides";
import LatestNews from "@components/main/dapp-news/LatestNews";
import RunningPrice from "@components/main/dapp-news/RunningPrice";
import dynamic from "next/dynamic";

const DappNews: FC = () => {
  //   const PinnedSlides = dynamic(
  //   () => import("@components/main/dapp-news/PinnedSlides")
  // ) as any;
  // const LatestNews = dynamic(
  //   () => import("@components/main/dapp-news/LatestNews")
  // ) as any;
  // const RunningPrice = dynamic(
  //   () => import("@components/main/dapp-news/RunningPrice")
  // ) as any;
  // const BannerSlides = dynamic(
  //   () => import("@components/main/dapp-news/BannerSlides")
  // ) as any;
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
    if (viewMore > 18) {
      setNumberViewMore(18);
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
    <section className="main-homepage-dappnews">
      <h2 className="text-center mb-5">Dapp News</h2>
      <div className="row">
        <div className="main-homepage-dappnews-pinnedSection-left">
          <PinnedSlides crit={"createdAt"} />
        </div>
        <div className="main-homepage-dappnews-pinnedSection-right ">
          <LatestNews />
        </div>
      </div>
      <div style = {{marginTop: '30px', border: 'solid', borderWidth: '0.2px', padding: '20px'}}>
        <RunningPrice direction={"right"} />
        <hr />
        <RunningPrice direction={"left"} />
      </div>
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
                    className={`${activeIndex === i ? "active" : ""} bar-category-left-text`}
                  >
                    {cat.attributes.name}
                  </Nav_Sub>
                </span>
              );
            })}
          </NavMain>
        </div>
        <BoxALignItemsCenter>
          <ToggleMain className="bar-category-right">
            <span className="d-inline-flex position-relative bar-category-right-toggle">
              <ToggleMain_Sub
                onClick={() => setCrit("viewer")}
                className={`${crit === "viewer" ? "active" : ""}`}
              >
                Popular
              </ToggleMain_Sub>
            </span>
            <span className="d-inline-flex position-relative bar-category-right-toggle">
              <ToggleMain_Sub
                onClick={() => setCrit("createdAt")}
                className={`${
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
            <LoadMoreBlue
              className="fw-bold"
              onClick={() => {
                setNumberViewMore(viewMore + 18);
              }}
            >
              Load more
            </LoadMoreBlue>
          )}
        </div>
      </div>
    </section>
  );
};

export default DappNews;
