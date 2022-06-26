import React, { ReactElement, useEffect, useState } from "react";
import { BoxALignCenter_Justify_ItemsBetween } from "@styles/styled-components/styledBox";
import { Select } from "antd";
import { listCategory } from "./TabsCategory";
import request from "@services/apiService";
const { Option } = Select;

export default function TabsChain({
  setChain,
  chain,
  setCate,
  cate,
}: any): ReactElement {
  const [chainIdArray, setChainIdArray] = useState([
    { id: "All", name: "All", tag: "all", icon: "", icon_white: "" },
  ]);
  useEffect(() => {
    (async () => {
      await request.get("/chains").then((res) => {
        setChainIdArray([...chainIdArray, ...res.data.data]);
      });
    })();
  }, []);
  const listBlockchain = chainIdArray
    .map((chain: any) => {
      if (chain.name === "All") return chain;
      return {
        id: chain.id,
        name: chain.attributes.name,
        tag: chain.attributes.name.substring(0, 4).toLowerCase(), //css background
        icon: chain.attributes.crawl.color_icon,
        icon_white: chain.attributes.crawl.color_icon,
      };
    });

  const [chainName, setChainName] = useState("all");
  const [cateName, setCateName] = useState("all");
  const onChangeChainMobile = (value: any, option: any) => {
    setChain(value);
    setChainName(option.children.props.children);
  };
  const onChangeCateMobile = (value: any, option: any) => {
    setCate(value);
    setCateName(option.children.props.children);
  };
  return (
    <>
      <div className="tab-bar-combination flex-for-pc">
        {listBlockchain.map((blockchain, i) => {
          return (
            <button
              className="tab-bar-combination-item"
              key={i}
              onClick={() => {
                setChain(blockchain.id);
              }}
            >
              <div
                className={`tab-bar-combination-item-blockchain ${
                  blockchain.tag
                } ${blockchain.id == chain && "active"}`}
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
                <span className="main-portal hover-underline">
                  {blockchain.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="tab-bar-combination flex-for-mobile">
        <BoxALignCenter_Justify_ItemsBetween className="w-100">
          <Select
            defaultValue={chain}
            style={{ width: "45%" }}
            onChange={onChangeChainMobile}
          >
            {listBlockchain.map((blockchain, i) => {
              return (
                <Option value={blockchain.id} key={i}>
                  {i == 0 ? (
                    <>{`${blockchain.name} Blockchains`}</>
                  ) : (
                    <>{blockchain.name}</>
                  )}
                </Option>
              );
            })}
          </Select>
          <Select
            className="ms-2"
            defaultValue={cate}
            style={{ width: "45%" }}
            onChange={onChangeCateMobile}
          >
            {listCategory.map((category, i) => {
              return (
                <Option value={category.id} key={i}>
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
