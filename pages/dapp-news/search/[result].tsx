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
import NewsList from "@components/main/dapp-news/NewsList";
import PinnedSlides from "@components/main/dapp-news/PinnedSlides";
import LatestNews from "@components/main/dapp-news/LatestNews";
import RunningPrice from "@components/main/dapp-news/RunningPrice";

const DappNews: FC = () => {
  const router = useRouter();
  console.log(router);
  const [newsList, setNewsList] = useState([]);
  const [crit, setCrit] = useState("viewer");
  const [categories, setCategories] = useState<any>([]);
  const [categoryKey, setCategoryKey] = useState("All");
  const [viewMore, setNumberViewMore] = useState(18);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
          filters: {
            $or: [
              {
                category: {
                  name: router.query.result,
                },
              },
              {
                title: {
                  $contains: router.query.result,
                },
              },
              {
                content: {
                  $contains: router.query.result,
                },
              }
            ],
          },
          sort: [`${crit}:desc`],
        },
        
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/posts?${query}`).then((res) => {
        setNewsList(res.data.data);
      });
    })();
  }, [router.query, viewMore]);

  const onChangeTab = (key: any) => {
    if (viewMore > 18) {
      setNumberViewMore(18);
    }
    let index = categories.findIndex((cat: any) => cat.attributes.name === key);
    setActiveIndex(index);
    setCategoryKey(key);
  };

  return (
    <section className="main-homepage-dappnews">
      <h1>{router.query.result}</h1>
      <div className="bar-category">
        <BoxALignItemsCenter>
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
              className="fontSize_1-1"
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
