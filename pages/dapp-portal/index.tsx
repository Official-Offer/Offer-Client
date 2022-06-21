import { TitleGlobal } from "@components/common/Title";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import qs from "qs";
import { useEffect, useState } from "react";
import request from "@services/apiService";
import {
  BorderedButtonTransparent,
  ButtonBlue,
  ButtonBorderBlueTransparent,
} from "@styles/styled-components/styledButton";

const DappPortal: NextPage = () => {
  const TabsChain = dynamic(
    () => import("@components/main/dapp-portal/TabsChain")
  );
  const TabsCategory = dynamic(
    () => import("@components/main/dapp-portal/TabsCategory")
  );
  const TableDapp = dynamic(
    () => import("@components/main/dapp-portal/TableDapp")
  );

  const [tokenList, setTokenList] = useState([]);
  const [chain, setChain] = useState("All");
  const [cate, setCate] = useState("All");
  const [viewMore, setNumberViewMore] = useState(8);
  const [sort, setSort] = useState(["socialSignal", "desc"]);
  const loadMore = () => setNumberViewMore(viewMore + 10);
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
            category: {
              id: {
                $eq: cate === "All" ? undefined : cate,
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
        // console.log(query)
        display = [...res.data.data.map((e: any) => e.attributes.dapp.data)];
      });
      await request.get(`/dapps?${query}`).then((res) => {
        // console.log(query);
        display = [...display, ...res.data.data];
      });
      setTokenList(display);
    })();
  }, [chain, viewMore, sort, cate]);

  // useEffect(()=>console.log(chain, cate), [chain, cate]);
  return (
    <>
      <section id="main-portal">
        <div className="empty_space_height50" />
        <TitleGlobal>
          <h1 className="mb-0">Dapp Portal</h1>
        </TitleGlobal>
        <br />
        <TabsChain
          setChain={setChain}
          chain={chain}
          setCate={setCate}
          cate={cate}
        />
        <br />
        <TabsCategory setCate={setCate} cate={cate} />
        <br />
        <TableDapp tokenList={tokenList} sort={sort} setSort={setSort} />
        <div className="loadmore">
          <BorderedButtonTransparent onClick={loadMore}>
            Load more
          </BorderedButtonTransparent>
        </div>
      </section>
    </>
  );
};

export default DappPortal;
