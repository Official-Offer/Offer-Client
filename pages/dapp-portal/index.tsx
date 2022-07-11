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
import { useRouter } from "next/router";

const DappPortal: NextPage = () => {
  const TabsChain = dynamic(
    () => import("@components/main/dapp-portal/TabsChain")
  ) as any;
  const TabsCategory = dynamic(
    () => import("@components/main/dapp-portal/TabsCategory")
  ) as any;
  const TableDapp = dynamic(
    () => import("@components/main/dapp-portal/TableDapp")
  ) as any;
  const router = useRouter();
  const [tokenList, setTokenList] = useState([]);
  const [chain, setChain] = useState("All");
  const [cate, setCate] = useState("All");
  const [viewMore, setNumberViewMore] = useState(18);
  const [sort, setSort] = useState(["Volume", "desc"]);
  const loadMore = () => setNumberViewMore(viewMore + 10);
  const [changedTimeQuery, setChangedTimeQuery] = useState(false);

  const activeQuery = () => {
    if (sort[0].includes("User")) return "User";
    if (sort[0].includes("Transaction")) return "Transaction";
    if (sort[0].includes("Volume")) return "Volume";
    return "socialSignal";
  };
  const activeTimeQuery = (timeKey: any) => {
    if (timeKey === "24h") return "daily";
    if (timeKey === "7d") return "weekly";
    return "monthly";
  };
  useEffect(() => {
    (async () => {
      let sort0;
      if (activeQuery() === "socialSignal") sort0 = "socialSignal";
      else sort0 = `${activeTimeQuery(router.query.timeKey)}${activeQuery()}`;

      
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
          sort: [`${sort0}:${sort[1]}`],
          // sort: [`category:asc`],
        },
        {
          encodeValuesOnly: true,
        }
      );
      let display: any;

      await request.get(`/dapp-ads?populate=*`).then((res) => {
        // console.log(query);
        display = [...res.data.data.map((e: any) => e.attributes.dapp.data)];
      });
      await request.get(`/dapps?${query}`).then((res) => {
        console.log(query);
        // console.log(res.data.data);
        display = [...display, ...res.data.data];
      });
      setTokenList(display);
    })();
  }, [chain, viewMore, sort, cate, router, changedTimeQuery]);

  const [chainIcon, setChainIcon] = useState({ img: null, name: null });
  return (
    <>
      <section id="main-portal">
        <div className="empty_space_height100" />
        <h1 className="mb-0 super-title">Dapp Portal</h1>
        <div className="empty_space_height100" />
        <TabsChain
          setChain={setChain}
          chain={chain}
          setCate={setCate}
          cate={cate}
          setChainIcon={setChainIcon}
        />
        <br />
        <TabsCategory
          setCate={setCate}
          cate={cate}
          setChanged={setChangedTimeQuery}
          changed={changedTimeQuery}
        />
        <br />
        <TableDapp
          tokenList={tokenList}
          sort={sort}
          setSort={setSort}
          chainIcon={chainIcon}
        />
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
