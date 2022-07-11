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
  { name: "All", tag: "all", icon: "", icon_white: "", id: "all" },
  {
    name: "Gambling",
    tag: "gambling",
    icon: "/img/icons/icn-gambling.png",
    id: 6,
  },
  { name: "Game", tag: "game", icon: "/img/icons/icn-game.png", id: 7 },
  {
    name: "Exchange",
    tag: "exchange",
    icon: "/img/icons/icn-exchange.png",
    id: 8,
  },
  {
    name: "Finance",
    tag: "finance",
    icon: "/img/icons/icn-finance.png",
    id: 9,
  },
  { name: "Social", tag: "social", icon: "/img/icons/icn-social.png", id: 10 },
  {
    name: "Marketplace",
    tag: "marketplace",
    icon: "/img/icons/icn-marketplace.png",
    id: 11,
  },
  { name: "Utilities", tag: "utils", icon: "/img/icons/icn-utils.png", id: 12 },
  { name: "Others", tag: "others", icon: "/img/icons/icn-others.png", id: 13 },
  {
    name: "High-risk",
    tag: "high-risk",
    icon: "/img/icons/icn-high-risk.png",
    id: 14,
  },
];

export default function TabsCategory({
  setCate,
  cate,
  setChanged,
  changed,
}: any): ReactElement {
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
  // console.log(listCate);
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
        <div className="tab-bar-category-right">
          <Select
            className="ms-2"
            defaultValue={router.query.timeKey || "24hours"}
            style={{ width: 100 }}
            onChange={() => setChanged(!changed)}
          >
            <Option value="24hours">
              <Link
                href={`dapp-portal/?timeKey=24h&type=${
                  !router.query.type ? "all" : router.query.type
                }`}
              >
                24 hours
              </Link>
            </Option>
            <Option value="7d">
              <Link
                href={`dapp-portal/?timeKey=7d&type=${
                  !router.query.type ? "all" : router.query.type
                }`}
              >
                7 days
              </Link>
            </Option>
            <Option value="30d">
              <Link
                href={`dapp-portal/?timeKey=30d&type=${
                  !router.query.type ? "all" : router.query.type
                }`}
              >
                30 days
              </Link>
            </Option>
          </Select>
        </div>
      </div>
      <div className="tab-bar-category flex-for-mobile">
        <BoxALignCenter_Justify_ItemsBetween className="w-100">
          <TabMain>
            <span className="d-inline-flex position-relative">
              <Link
                href={`dapp-portal/?timeKey=24h&type=${
                  !router.query.type ? "all" : router.query.type
                }`}
              >
                <TabMain_Sub
                  className={
                    !router.query.timeKey || router.query.timeKey === "24h"
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
                href={`dapp-portal/?timeKey=7d&type=${
                  !router.query.type ? "all" : router.query.type
                }`}
              >
                <TabMain_Sub
                  className={router.query.timeKey === "7d" ? "active" : ""}
                >
                  7 Days
                </TabMain_Sub>
              </Link>
            </span>
            <span className="d-inline-flex position-relative">
              <Link
                href={`dapp-portal/?timeKey=30d&type=${
                  !router.query.type ? "all" : router.query.type
                }`}
              >
                <TabMain_Sub
                  className={router.query.timeKey === "30d" ? "active" : ""}
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
