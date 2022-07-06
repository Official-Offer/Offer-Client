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
  BoxWhiteGreenShadow,
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
  chainIcon,
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

  // useEffect(() => console.log("sort[0]", sort[0]), [sort]);
  // useEffect(() => console.log("headermobile", headerMobile), []);

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
      query: "User",
    },
    {
      title: `${timeKey} Transactions`,
      icon: hoverableQuestionMark(
        "The amount of transaction represents the numbers of actions between users and dapps that involved smart contract interactions."
      ),
      sort: true,
      query: "Transaction",
    },
    {
      title: `${timeKey} Volume`,
      icon: hoverableQuestionMark(
        "Transaction volume of tokens to a dapp's smart contracts, which is the amount of tokens spent in the dapp."
      ),
      sort: true,
      query: "Volume",
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
      query: "User",
    },
    {
      title: "Transactions",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
      query: "Transaction",
    },
    {
      title: "Volume",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
      query: "Volume",
    },
    {
      title: "Social Signal",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
      query: "socialSignal",
    },
  ];
  const activeItem = (sort: string, query: string) => {
    //look at mobile header and sort accordingly
    let timeQuery;
    if (timeKey === "24h") timeQuery = `daily${query}`;
    else if (timeKey === "7d") timeQuery = `weekly${query}`;
    else timeQuery = `monthly${query}`;
    if (query === "socialSignal") setSort([query, sort]);
    else setSort([timeQuery, sort]);
    setHeaderMobile(activeHeader());
  };
  const [headerMobile, setHeaderMobile] = useState(
    listTitleHeaderMobile[0].title
  );
  useEffect(() => setHeaderMobile(activeHeader()), [sort]);
  const onMobileChangeHeader = (e: any) => {
    setHeaderMobile(e);
    // console.log(e);
  };

  const activeHeader = () => {
    if (sort[0].includes("User")) return "Users";
    if (sort[0].includes("Transaction")) return "Transactions";
    if (sort[0].includes("Volume")) return "Volume";
    return "Social Signal";
  };

  const activeSorter = () => {
    if (headerMobile === "Users" && sort[0].includes("User")) return true;
    if (headerMobile === "Social Signal" && sort[0] === "socialSignal")
      return true;
    if (headerMobile === "Transactions" && sort[0].includes("Transaction")) return true;
    if (headerMobile === "Volume" && sort[0].includes("Volume")) return true;
    return false;
  };
  return (
    <>
      <div className="block-for-pc">
        <BoxWhiteGreenShadow className="p-4">
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
                              sort[0].includes(header.query) &&
                              sort[1] === "asc"
                                ? "active"
                                : ""
                            }`}
                            onClick={() => activeItem("asc", header.query)}
                          />
                          <CaretDownOutlined
                            className={`down ${
                              sort[0].includes(header.query) &&
                              sort[1] === "desc"
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
            let timeQuery;
            if (timeKey === "24h") timeQuery = `daily`;
            else if (timeKey === "7d") timeQuery = `weekly`;
            else timeQuery = `monthly`;
            const user = formatter.format(
              token.attributes[`${timeQuery}User`] || 0
            );
            const transaction = formatter.format(
              token.attributes[`${timeQuery}Transaction`] || 0
            );
            const volume = token.attributes[`${timeQuery}Volume`] || 0;
            const userDiff = token.attributes[`${timeQuery}UserDiff`] || 0;
            const transactionDiff =
              token.attributes[`${timeQuery}TransactionDiff`] || 0;
            const volumeDiff = token.attributes[`${timeQuery}VolumeDiff`] || 0;
            const socialSignal = token.attributes.socialSignal || 0;
            const socialSignalDiff = token.attributes.socialSignalDiff || 0;
            const usds = token.attributes.crawl[`usds_${timeKey}`];
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
                        : chainIcon.img ||
                          token.attributes.chain.data?.attributes.crawl
                            .color_icon
                    }
                    alt={
                      i < 2
                        ? token.attributes.crawl.chains[0].slug
                        : chainIcon.name ||
                          token.attributes.chain.data?.attributes.crawl.slug
                    }
                  />
                  <p className="ms-2">
                    {" "}
                    {i < 2
                      ? token.attributes.crawl.chains[0].name
                      : chainIcon.name ||
                        token.attributes.chain.data?.attributes.crawl.name}
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
                    <p>${formatter.format(volume)}</p>
                    <p
                      className={`table-body-item-volume-bar-top-${incdec(
                        volumeDiff
                      )} ms-2`}
                    >
                      {(volumeDiff * 100).toFixed(2)}% {updown(volumeDiff)}
                    </p>
                  </div>
                  <div className="main-homepage-highestsocial-table-24volume-bar-bottom">
                    {usds.length == 2 ? (
                      <>
                        <div
                          className="volume-bar"
                          style={{
                            width: `${
                              usds[0].ratio == 0
                                ? "10%"
                                : `${(usds[0].ratio * 100).toFixed(1)}%`
                            }`,
                          }}
                        />
                        <div
                          className="volume-bar"
                          style={{
                            width: `${`${(usds[1].ratio * 100).toFixed(1)}%`}`,
                          }}
                        />
                      </>
                    ) : usds.length == 3 ? (
                      <>
                        <div
                          className="volume-bar"
                          style={{
                            width: `${
                              usds[0].ratio == 0
                                ? "10%"
                                : `${(usds[0].ratio * 100).toFixed(1)}%`
                            }`,
                          }}
                        />
                        <div
                          className="volume-bar"
                          style={{
                            width: `${`${(usds[1].ratio * 100).toFixed(1)}%`}`,
                          }}
                        />
                        <div
                          className="volume-bar"
                          style={{
                            width: `${`${(usds[2].ratio * 100).toFixed(1)}%`}`,
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
                      <span>{formatter.format(socialSignal)}</span>
                    </div>
                    <div
                      className={`table-body-item-ranking-${incdec(
                        socialSignalDiff
                      )} text-end`}
                    >
                      <p>
                        {(socialSignalDiff * 100).toFixed(2)}%{" "}
                        {updown(socialSignalDiff)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </BoxWhiteGreenShadow>
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
                defaultValue={`${activeHeader()}`}
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
                    className={`up ${
                      sort[1] === "asc" && activeSorter() && "active"
                    }`}
                    onClick={() =>
                      activeItem(
                        "asc",
                        listTitleHeaderMobile.filter((someshit) =>
                          someshit.title.includes(headerMobile)
                        )[0].query
                      )
                    }
                  />
                  <CaretDownOutlined
                    className={`down ${
                      sort[1] === "desc" && activeSorter() && "active"
                    }`}
                    onClick={() =>
                      activeItem(
                        "desc",
                        listTitleHeaderMobile.filter((someshit) =>
                          someshit.title.includes(headerMobile)
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
          let timeQuery;
          if (timeKey === "24h") timeQuery = `daily`;
          else if (timeKey === "7d") timeQuery = `weekly`;
          else timeQuery = `monthly`;
          let selectedKey = listTitleHeaderMobile.filter(
            (someshit) => someshit.title === headerMobile
          )[0].query;

          const số_trên: string =
            selectedKey === "socialSignal"
              ? formatter.format(e.attributes.socialSignal || 0)
              : formatter.format(
                  e.attributes[`${timeQuery}${selectedKey}`] || 0
                );
          const số_dưới: number =
            selectedKey === "socialSignal"
              ? e.attributes.socialSignalDiff || 0
              : e.attributes[`${timeQuery}${selectedKey}Diff`] || 0;
          const tăng_giảm: string = incdec(số_dưới);

          return (
            <div className="table-body" key={i} onClick={() => {
              router.push(`/app/${e.id}`);
            }}>
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
                        <p>
                          {["amount", "volume"].includes(selectedKey) && "$"}
                          {số_trên}
                        </p>
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
