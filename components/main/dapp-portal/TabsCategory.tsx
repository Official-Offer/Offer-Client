import React, { ReactElement, useState, useEffect } from "react";
import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
} from "@styles/styled-components/styledBox";
import { TabMain, TabMain_Sub } from "@styles/styled-components/styledTabs";
import { useRouter } from "next/router";
import { Select } from "antd";
import Link from "next/link";
import request from "@services/apiService";
const { Option } = Select;

export const listCategory = [
  { name: "All", tag: "all", icon: "", icon_white: "" },
  { name: "Gambling", tag: "gambling", icon: "/img/icons/icn-gambling.png" },
  { name: "Game", tag: "game", icon: "/img/icons/icn-game.png" },
  { name: "Exchange", tag: "exchange", icon: "/img/icons/icn-exchange.png" },
  { name: "Finance", tag: "finance", icon: "/img/icons/icn-finance.png" },
  { name: "Social", tag: "social", icon: "/img/icons/icn-social.png" },
  {
    name: "Marketplace",
    tag: "marketplace",
    icon: "/img/icons/icn-marketplace.png",
  },
  { name: "Utilities", tag: "utils", icon: "/img/icons/icn-utils.png" },
  { name: "Others", tag: "others", icon: "/img/icons/icn-others.png" },
  { name: "High-risk", tag: "high-risk", icon: "/img/icons/icn-high-risk.png" },
];

export default function TabsCategory({ setCate, cate }: any): ReactElement {
  const router = useRouter();
  const [cateIdArray, setCateIdArray] = useState([{ name: "All", id: "All" }]);
  useEffect(() => {
    (async () => {
      await request.get("/app-categories").then((res) => {
        setCateIdArray([
          ...cateIdArray,
          ...res.data.data.map((e: any) => {
            return {
              name: e.attributes.name,
              id: e.id,
            };
          }),
        ]);
      });
    })();
  }, []);

  const listCate = listCategory.map((cate) => {
    return {
      ...cate,
      id: cateIdArray.filter((e) => e.name === cate.name)[0]?.id,
    };
  });
  console.log(listCate);
  return (
    <>
      <div className="tab-bar-category flex-for-pc">
        <div className="tab-bar-category-left">
          {listCate.map((category, i) => {
            return (
              <button
                className="tab-bar-category-left-item"
                key={i}
                onClick={() => {
                  setCate(category.id);
                }}
              >
                {i != 0 && <div className="divider" />}
                <div
                  className={`tab-bar-category-left-item-sub ${category.tag} ${
                    category.id === cate && "active"
                  }`}
                >
                  {category.icon !== "" && category.icon_white !== "" && (
                    <>
                      <img className="me-2" src={category.icon} alt="" />
                    </>
                  )}
                  <span>{category.name}</span>
                </div>
              </button>
            );
          })}
        </div>
        <BoxALignItemsCenter className="tab-bar-category-right">
          <Select defaultValue="all" style={{ width: 90 }}>
            <Option value="all">All</Option>
          </Select>
          <Select
            className="ms-2"
            defaultValue="24hours"
            style={{ width: 100 }}
          >
            <Option value="24hours">24 hours</Option>
          </Select>
        </BoxALignItemsCenter>
      </div>
      <div className="tab-bar-category flex-for-mobile">
        <BoxALignCenter_Justify_ItemsBetween className="w-100">
          <TabMain>
            <span className="d-inline-flex position-relative">
              <Link
                href={`/?time=${
                  !router.query.time ? "0" : router.query.time
                }&type=0`}
              >
                <TabMain_Sub
                  className={
                    !router.query.type || router.query.type === "0"
                      ? "active"
                      : ""
                  }
                >
                  All
                </TabMain_Sub>
              </Link>
            </span>
            <span className="d-inline-flex position-relative">
              <Link
                href={`/?time=${
                  !router.query.time ? "0" : router.query.time
                }&type=1`}
              >
                <TabMain_Sub
                  className={router.query.type === "1" ? "active" : ""}
                >
                  New
                </TabMain_Sub>
              </Link>
            </span>
            <span className="d-inline-flex position-relative">
              <Link
                href={`/?time=${
                  !router.query.time ? "0" : router.query.time
                }&type=2`}
              >
                <TabMain_Sub
                  className={router.query.type === "2" ? "active" : ""}
                >
                  Token
                </TabMain_Sub>
              </Link>
            </span>
          </TabMain>
          <TabMain>
            <span className="d-inline-flex position-relative">
              <Link
                href={`/?time=0&type=${
                  !router.query.type ? "0" : router.query.type
                }`}
              >
                <TabMain_Sub
                  className={
                    !router.query.time || router.query.time === "0"
                      ? "active"
                      : ""
                  }
                >
                  24 Hours
                </TabMain_Sub>
              </Link>
            </span>
            <span className="d-inline-flex position-relative">
              <Link
                href={`/?time=1&type=${
                  !router.query.type ? "0" : router.query.type
                }`}
              >
                <TabMain_Sub
                  className={router.query.time === "1" ? "active" : ""}
                >
                  7 Days
                </TabMain_Sub>
              </Link>
            </span>
            <span className="d-inline-flex position-relative">
              <Link
                href={`/?time=2&type=${
                  !router.query.type ? "0" : router.query.type
                }`}
              >
                <TabMain_Sub
                  className={router.query.time === "2" ? "active" : ""}
                >
                  30 Days
                </TabMain_Sub>
              </Link>
            </span>
          </TabMain>
        </BoxALignCenter_Justify_ItemsBetween>
      </div>
    </>
  );
}
