import React, { ReactElement, useEffect, useState } from "react";
import { BoxALignCenter_Justify_ItemsBetween } from "@styles/styled-components/styledBox";
import { Select } from "antd";
import { listCategory } from "./TabsCategory";
import request from "@services/apiService";
const { Option } = Select;

export default function TabsChain({ setChain, chain }: any): ReactElement {
  const [chainIdArray, setChainIdArray] = useState([
    { id: 'All', name: "All", tag: "all", icon: "", icon_white: "" },
  ]);
  useEffect(() => {
    (async () => {
      await request.get("/chains").then((res) => {
        setChainIdArray([...chainIdArray, ...res.data.data]);
        console.log(res.data.data);
      });
    })();
  }, []);
  const chainTagsToBeIncluded = [
    "Ethereum",
    "BNB Chain",
    "Polygon",
    "TRON",
    "Neo",
    "Steem",
    "TomoChain",
    "Vexanium",
    "ICON",
    "Chiliz",
    "Hive",
    "Near Protocol",
    "ThunderCore",
    "Ziliqa",
    "Fuse",
    "Kardiachain",
  ];
  const listBlockchain = chainIdArray
    .filter(
      (chain: any) =>
        chain.name === "All" ||
        chainTagsToBeIncluded.includes(chain.attributes?.name)
    )
    .map((chain: any) => {
      if (chain.name === "All") return chain;
      return {
        id: chain.id,
        name: chain.attributes.name,
        // tag: 'bnb', //chain.attributes.crawl.unit?.toLowerCase() 
        icon: chain.attributes.crawl.color_icon,
        icon_white: chain.attributes.crawl.color_icon,
      };
    });
  //   const listBlockchain = [
  //     { name: "All", tag: "all", icon: "", icon_white: "" },
  //     {
  //       name: "Ethereum",
  //       tag: "eth",
  //       icon: "/img/coin/eth.png",
  //       icon_white: "/img/coin/eth-white.png",
  //     },
  //     {
  //       name: "BNB Chain",
  //       tag: "bnb",
  //       icon: "/img/coin/bnb.png",
  //       icon_white: "/img/coin/bnb-white.png",
  //     },
  //     {
  //       name: "Polygon (Matic)",
  //       tag: "matic",
  //       icon: "/img/coin/matic.png",
  //       icon_white: "/img/coin/matic-white.png",
  //     },
  //     {
  //       name: "TRON",
  //       tag: "tron",
  //       icon: "/img/coin/tron.png",
  //       icon_white: "/img/coin/tron-white.png",
  //     },
  //   ];

  return (
    <>
      <div className="tab-bar-combination flex-for-pc">
        {listBlockchain.map((blockchain, i) => {
          return (
            <button className="tab-bar-combination-item" key={i} onClick={() => { setChain(blockchain.id) }}>
              <div
                className={`tab-bar-combination-item-blockchain ${blockchain.tag
                  } ${i == chain && "active"}`}
              >
                <div className={`fill-background ${blockchain.tag}`} />
                {blockchain.icon !== "" && blockchain.icon_white !== "" && (
                  <>
                    <img className="icon" src={blockchain.icon} alt="" />
                    <img
                      className="icon-white"
                      src={blockchain.icon_white}
                      alt=""
                    />
                  </>
                )}
                <span className='main-portal hover-underline'>{blockchain.name}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="tab-bar-combination flex-for-mobile">
        <BoxALignCenter_Justify_ItemsBetween className="w-100">
          <Select defaultValue="all" style={{ width: "45%" }}>
            {listBlockchain.map((blockchain, i) => {
              return (
                <Option value={blockchain.tag} key={i}>
                  {i == 0 ? (
                    <>{`${blockchain.name} Blockchains`}</>
                  ) : (
                    <>{blockchain.name}</>
                  )}
                </Option>
              );
            })}
          </Select>
          <Select className="ms-2" defaultValue="all" style={{ width: "45%" }}>
            {listCategory.map((category, i) => {
              return (
                <Option value={category.tag} key={i}>
                  {i == 0 ? (
                    <>{`${category.name} Categories`}</>
                  ) : (
                    <>{category.name}</>
                  )}
                </Option>
              );
            })}
          </Select>
        </BoxALignCenter_Justify_ItemsBetween>
      </div>
    </>
  );
}
