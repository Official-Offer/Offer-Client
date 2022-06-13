import React, { FC, useEffect, useState } from "react";
import { Empty, Tabs } from "antd";
import NewsSlides from "../slides/NewsSlides";
import request from "@services/apiService";
import * as qs from "qs";
import axios from "axios";

const { TabPane } = Tabs;

export const News: FC = () => {
  const [newsList, setNewsList] = useState<any>([]);
  const [category, setCategory] = useState({
    data: [{ name: "Campaign" }, { name: "Airdrops" }, { name: "Scholarship" }],
    key: "Campaign",
  });

  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
          filters: {
            isPinned: {
              $eq: true,
            },
            category: {
              name: category.key,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/posts?${query}`).then((res: any) => {
        setNewsList([...res.data.data, ...res.data.data, ...res.data.data]);
      });
    })();
  }, [category]);
  const onChangeTab = (key: any) => {
    setCategory({
      ...category,
      key,
    });
  };

  return (
    <section className="main-homepage-news px-lg-3 px-0">
      <Tabs
        defaultActiveKey={category.key}
        onChange={onChangeTab}
        animated={false}
        tabBarGutter={1}
        centered
      >
        {category.data &&
          [...category.data].map((cate: any) => {
            return (
              <TabPane
                tab={cate.name === "Campaign" ? "Campaigns" : cate.name}
                key={cate.name}
              >
                <NewsSlides data={newsList} tag={category.key} />
              </TabPane>
            );
          })}
      </Tabs>
    </section>
  );
};
