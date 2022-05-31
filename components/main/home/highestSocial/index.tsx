import React, { FC, useEffect, useState } from "react";
import { Empty, Tabs } from "antd";
import { Button } from "@styles/styled-components/styledButton";
import TokenHighestSocialList from "./TokenHighestSocialList";
import request from "@services/apiService";
import * as qs from "qs";
import { SectionHeader } from "@styles/styled-components/styledTabs";

const { TabPane } = Tabs;

export const HighestSocial: FC = () => {
  const [tokenList, setTokenList] = useState([]);
  const [chain, setChain] = useState("All");
  const [viewMore, setNumberViewMore] = useState(8);
  const [sort, setSort] = useState(["socialSignal", "desc"]);

  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
          pagination: {
            page: 1,
            pageSize: viewMore,
          },
          filters: {
            chain: {
              id: {
                $eq: chain === "All" ? undefined : chain,
              },
            },
          },
          sort: [`${sort[0]}:${sort[1]}`],
        },
        {
          encodeValuesOnly: true,
        }
      );
      let display: any;
      await request.get(`/dapp-ads?populate=*`).then((res) => {
        // console.log(res.data.data.map(e => e.attributes.dapp.data));
        // setTokenList(res.data.data.map(e => e.attributes.dapp.data));
        display = [...res.data.data.map((e: any) => e.attributes.dapp.data)];
      });
      await request.get(`/dapps?${query}`).then((res) => {
        // console.log(query);
        display = [...display, ...res.data.data];
      });
      setTokenList(display);
    })();
  }, [chain, viewMore, sort]);

  const onChangeTab = (key: any) => {
    setChain(key);
  };

  const category = [
    { tab: "All", key: "All" },
    { tab: "BSC", key: "2" },
    { tab: "Polygon", key: "5" },
    { tab: "Solana", key: "0" },
  ];

  return (
    <section className="main-homepage-highestsocial px-lg-3 px-0">
      <SectionHeader>Projects With The Highest Social Signal</SectionHeader>
      <Tabs
        defaultActiveKey={"crypto"}
        onChange={onChangeTab}
        animated={false}
        tabBarGutter={1}
      >
        {category.map((e) => {
          return (
            <TabPane tab={e.tab} key={e.key}>
              <TokenHighestSocialList
                data={tokenList}
                setSort={setSort}
                sort={sort}
              />
              <br />
              <div className="text-center">
                <Button
                  className="text-green fw-bold fontSize_1-1"
                  onClick={() => {
                    if (viewMore < 18) setNumberViewMore(viewMore + 10);
                  }}
                >
                  View more
                </Button>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </section>
  );
};
