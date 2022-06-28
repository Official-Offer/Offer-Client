import React, { ReactElement, useState, useEffect } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignCenter_Justify_ItemsEnd,
  BoxALignItemsCenter,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import { useRouter } from "next/router";
import { Select, Tooltip } from "antd";
import request from "@services/apiService";
import * as qs from "qs";
import { formatter, isExistAndFormatCurrency } from "@utils/formatCurrency";
import { incdec, updown } from "@utils/numberDecorator";

const { Option } = Select;

export default function TableDapp({
  tokenList,
  setSort,
  sort,
}: any): ReactElement {
  const router = useRouter();
  const [isSorter, setSorter] = useState(true);
  const timeKey = router.query.timeKey || "24h";

  const hoverableQuestionMark = (message: string) => {
    return (
      <Tooltip placement="top" title={message} color="#fff">
        <QuestionCircleOutlined style={{ color: "#000" }} />
      </Tooltip>
    );
  };

  const listTitleHeader = [
    { title: "#", icon: "", sort: false },
    { title: "Dapp", icon: "", sort: false },
    { title: "Category", icon: "", sort: false },
    { title: "Blockchain", icon: "", sort: false },
    {
      title: `${timeKey} Users`,
      icon: hoverableQuestionMark(
        "The number of wallets that had interacted (transactions) with a dapp's smart contracts."
      ),
      sort: true,
      query: "dailyUser",
    },
    {
      title: `${timeKey} Transactions`,
      icon: hoverableQuestionMark(
        "The amount of transaction represents the numbers of actions between users and dapps that involved smart contract interactions."
      ),
      sort: true,
      query: "dailyTransaction",
    },
    {
      title: `${timeKey} Volume`,
      icon: hoverableQuestionMark(
        "Transaction volume of tokens to a dapp's smart contracts, which is the amount of tokens spent in the dapp."
      ),
      sort: true,
      query: "dailyVolume",
    },
    {
      title: "Social Signal",
      icon: hoverableQuestionMark(
        "Social Signal is a new metric that reflects the general popularity of the crypto community in a certain project. A project with a higher Social Singal has captured more interest in the social network. The Social Signal updates once every 3 days."
      ),
      sort: true,
      query: "socialSignal",
    },
  ];

  const listTitleHeaderMobile = [
    {
      title: "Users",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
      query: "dailyUser",
    },
    {
      title: "Transactions",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
      query: "dailyTransaction",
    },
    {
      title: "Volume",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
      query: "dailyVolume",
    },
    {
      title: "Social Signal",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
      query: "socialSignal",
    },
  ];
  const activeItem = (sort: string, query: string) => {
    setSort([query, sort]);
  };
  const [headerMobile, setHeaderMobile] = useState(
    listTitleHeaderMobile[0].title
  );
  const onMobileChangeHeader = (e: any) => {
    setHeaderMobile(e);
    // console.log(e);
  };
  return (
    <>
      <div className="block-for-pc">
        <BoxWhiteShadow className="p-4">
          <div className="table-header-outer">
            <div className="table-header">
              {listTitleHeader.map((header: any, i: number) => {
                return (
                  <div className="table-header-item" key={i}>
                    {header.icon !== "" && header.icon}
                    <span className="table-header-item-title">
                      {header.title}
                    </span>
                    {header.sort && (
                      <div className="table-header-item-sorter">
                        <div className="table-header-item-sorter-inner">
                          <CaretUpOutlined
                            className={`up ${
                              sort[0] === header.query && sort[1] === "asc"
                                ? "active"
                                : ""
                            }`}
                            onClick={() => activeItem("asc", header.query)}
                          />
                          <CaretDownOutlined
                            className={`down ${
                              sort[0] === header.query && sort[1] === "desc"
                                ? "active"
                                : ""
                            }`}
                            onClick={() => activeItem("desc", header.query)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {tokenList.map((token: any, i: number) => {
            const user = formatter.format(
              token.attributes.crawl[`user_${timeKey}`]
            );
            const transaction = formatter.format(
              token.attributes.crawl[`amount_${timeKey}`]
            );
            const volume = (
              token.attributes.crawl[`usds_${timeKey}`]
            );
            const userDiff = token.attributes.crawl[`user_${timeKey}_gr`];
            const transactionDiff =
              token.attributes.crawl[`amount_${timeKey}_gr`];
            const volumeDiff = token.attributes.crawl[`volume_${timeKey}_gr`];
            return (
              <div
                className="table-body"
                key={token.id}
                onClick={() => {
                  router.push(`/app/${token.id}`);
                }}
              >
                <div className="table-body-item table-body-item-number">
                  <img src={`img/icons/${i < 2 ? "ad" : "token"}.png`} alt="" />
                  <span>{i + 1}</span>
                </div>
                <div className="table-body-item table-body-item-name">
                  <img
                    className="dapp-logo"
                    src={token.attributes.crawl.icon}
                    alt={""}
                  />
                  <p>{token.attributes.crawl.name}</p>
                </div>
                <div className="table-body-item table-body-item-category">
                  <p>
                    {i < 2
                      ? token.attributes.crawl.category.name
                      : token.attributes.category.data.attributes.name}
                  </p>
                </div>
                <div className="table-body-item table-body-item-blockchain">
                  <img
                    src={
                      i < 2
                        ? token.attributes.crawl.chains[0].color_icon
                        : token.attributes.chain.data?.attributes.crawl
                            .color_icon
                    }
                    alt={
                      i < 2
                        ? token.attributes.crawl.chains[0].slug
                        : token.attributes.chain.data?.attributes.crawl.slug
                    }
                  />
                  <p className="ms-2">
                    {" "}
                    {i < 2
                      ? token.attributes.crawl.chains[0].name
                      : token.attributes.chain.data?.attributes.crawl.name}
                  </p>
                </div>
                <div className="table-body-item table-body-item-user">
                  <div>
                    <div className="table-body-item-user-number text-end">
                      <p>{user}</p>
                    </div>
                    <div
                      className={`table-body-item-user-${incdec(
                        userDiff
                      )} text-end`}
                    >
                      <p>
                        {(userDiff * 100).toFixed(2)}% {updown(userDiff)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="table-body-item table-body-item-transaction">
                  <div>
                    <div className="table-body-item-transaction-number text-end">
                      <p>{transaction}</p>
                    </div>
                    <div
                      className={`table-body-item-transaction-${incdec(
                        transactionDiff
                      )} text-end`}
                    >
                      <p>
                        {" "}
                        {(transactionDiff * 100).toFixed(2)}%{" "}
                        {updown(transactionDiff)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="table-body-item table-body-item-volume">
                  <div className="table-body-item-volume-bar-top">
                    <p>{formatter.format(token.attributes.dailyVolume)}</p>
                    <p
                      className={`table-body-item-volume-bar-top-${incdec(volumeDiff)} ms-2`}
                    >
                      {(token.attributes.dailyVolumeDiff * 100).toFixed(2)}%{" "}
                      {updown(volumeDiff)}
                    </p>
                  </div>
                  <div className="main-homepage-highestsocial-table-24volume-bar-bottom">
                    {volume.length == 2 ? (
                      <>
                        <div
                          className="volume-bar"
                          style={{
                            width: `${
                              volume[0].ratio == 0
                                ? "10%"
                                : `${(volume[0].ratio * 100).toFixed(1)}%`
                            }`,
                          }}
                        />
                        <div
                          className="volume-bar"
                          style={{
                            width: `${`${(volume[1].ratio * 100).toFixed(
                              1
                            )}%`}`,
                          }}
                        />
                      </>
                    ) : volume.length == 3 ? (
                      <>
                        <div
                          className="volume-bar"
                          style={{
                            width: `${
                              volume[0].ratio == 0
                                ? "10%"
                                : `${(volume[0].ratio * 100).toFixed(1)}%`
                            }`,
                          }}
                        />
                        <div
                          className="volume-bar"
                          style={{
                            width: `${`${(volume[1].ratio * 100).toFixed(
                              1
                            )}%`}`,
                          }}
                        />
                        <div
                          className="volume-bar"
                          style={{
                            width: `${`${(volume[2].ratio * 100).toFixed(
                              1
                            )}%`}`,
                          }}
                        />
                      </>
                    ) : (
                      <div className="volume-bar" style={{ width: `100%` }} />
                    )}
                  </div>
                </div>
                <div className="table-body-item table-body-item-ranking">
                  <div>
                    <div className="table-body-item-ranking-social">
                      {token.attributes.crawl.social_top100 && (
                        <img src="/img/icons/fire.png" alt="" />
                      )}
                      <span>
                        {formatter.format(token.attributes.crawl.social_signal)}
                      </span>
                    </div>
                    <div
                      className={`table-body-item-ranking-${incdec(
                        token.attributes.crawl.social_signal_gr
                      )} text-end`}
                    >
                      <p>
                        {(
                          token.attributes.crawl.social_signal_gr * 100
                        ).toFixed(2)}
                        % {updown(token.attributes.crawl.social_signal_gr)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </BoxWhiteShadow>
      </div>
      <div className="block-for-mobile">
        <div className="table-header-outer">
          <div className="table-header">
            <div className="table-header-item">
              <span className="table-header-item-title">#</span>
            </div>
            <div className="table-header-item">
              <span className="table-header-item-title">Dapp</span>
            </div>
            <div className="table-header-item justify-content-start">
              <Select
                defaultValue={`${listTitleHeaderMobile[0].title}`}
                style={{ width: "70%" }}
                onChange={onMobileChangeHeader}
              >
                {listTitleHeaderMobile.map((header, i) => {
                  return (
                    <Option value={header.title} key={i}>
                      {header.title}
                    </Option>
                  );
                })}
              </Select>
              <div className="table-header-item-sorter">
                <div className="table-header-item-sorter-inner">
                  <CaretUpOutlined
                    className={`up ${sort[1] === "asc" && "active"}`}
                    onClick={() =>
                      activeItem(
                        "asc",
                        listTitleHeaderMobile.filter(
                          (someshit) => someshit.title === headerMobile
                        )[0].query
                      )
                    }
                  />
                  <CaretDownOutlined
                    className={`down ${sort[1] === "desc" && "active"}`}
                    onClick={() =>
                      activeItem(
                        "desc",
                        listTitleHeaderMobile.filter(
                          (someshit) => someshit.title === headerMobile
                        )[0].query
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {tokenList.map((e: any, i: number) => {
          let selectedKey = listTitleHeaderMobile.filter(
            (someshit) => someshit.title === headerMobile
          )[0].query;
          if (selectedKey === "dailyUser") selectedKey = "user";
          else if (selectedKey === "dailyTransaction") selectedKey = "amount";
          else selectedKey = "usds";
          // console.log(selectedKey);
          const số_trên: string = formatter.format(
            e.attributes.crawl[`${selectedKey}_${timeKey}`]
          );
          const số_dưới: number =
            e.attributes.crawl[`${selectedKey}_${timeKey}_gr`];
          const tăng_giảm: string = incdec(số_dưới);
          return (
            <div className="table-body" key={i}>
              <div className="table-body-item table-body-item-number">
                <img src={`img/icons/${i < 2 ? "ad" : "token"}.png`} alt="" />
                <span>{i + 1}</span>
              </div>
              <div className="table-body-item table-body-item-name">
                <div className="row m-0 p-0">
                  <div className="col-5">
                    <BoxALignCenter_Justify_ItemsBetween className="h-100 w-100">
                      <img
                        className="dapp-logo"
                        src={e.attributes.crawl.icon}
                        alt={""}
                      />
                      <p className="dapp-name">{e.attributes.crawl.name}</p>
                    </BoxALignCenter_Justify_ItemsBetween>
                  </div>
                  <div className="col-5">
                    <div className="w-100">
                      <div className="table-body-item-user-number text-end">
                        <p>{số_trên}</p>
                      </div>
                      <div
                        className={`table-body-item-user-${tăng_giảm} text-end`}
                      >
                        <p>
                          {(số_dưới * 100).toFixed(2)}%{" "}
                          {tăng_giảm === "increase" ? "↑" : "↓"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 ">
                    <div className="w-100">
                      <BoxALignCenter_Justify_ItemsEnd>
                        <img
                          className="blockchain-logo"
                          src={
                            i < 2
                              ? e.attributes.crawl.chains[0].color_icon
                              : e.attributes.chain.data?.attributes.crawl
                                  .color_icon
                          }
                          alt={
                            i < 2
                              ? e.attributes.crawl.chains[0].slug
                              : e.attributes.chain.data?.attributes.crawl.slug
                          }
                        />
                      </BoxALignCenter_Justify_ItemsEnd>
                      <BoxALignCenter_Justify_ItemsEnd>
                        <img
                          className="blockchain-logo-two"
                          src={
                            i < 2
                              ? e.attributes.crawl.category.icon
                              : e.attributes.category.data.attributes.crawl.icon
                          }
                          alt=""
                        />
                      </BoxALignCenter_Justify_ItemsEnd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
