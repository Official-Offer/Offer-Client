import React, { ReactElement, useState, useEffect } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  BoxALignCenter_Justify_ItemsEnd,
  BoxALignItemsCenter,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import { useRouter } from "next/router";
import { Select } from "antd";
import request from "@services/apiService";
import * as qs from "qs";
import { formatter, isExistAndFormatCurrency } from "@utils/formatCurrency";

const { Option } = Select;

export default function TableDapp(): ReactElement {
  const router = useRouter();
  const [isSorter, setSorter] = useState(true);

  const listTitleHeader = [
    { title: "#", icon: "", sort: false },
    { title: "Dapp", icon: "", sort: false },
    { title: "Category", icon: "", sort: false },
    { title: "Blockchain", icon: "", sort: false },
    {
      title: "24hr Users",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
    },
    {
      title: "24hr Transactions",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
    },
    {
      title: "24hr Volume",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
    },
    {
      title: "Social Signal",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
    },
  ];

  const listTitleHeaderMobile = [
    {
      title: "Users",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
    },
    {
      title: "Transactions",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
    },
    {
      title: "Volume",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
    },
    {
      title: "Social Signal",
      icon: <QuestionCircleOutlined style={{ color: "#000" }} />,
      sort: true,
    },
  ];

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

  return (
    <>
      <div className="block-for-pc">
        <BoxWhiteShadow className="p-4">
          <div className="table-header-outer">
            <div className="table-header">
              {listTitleHeader.map((header, i) => {
                return (
                  <div className="table-header-item" key={i}>
                    {header.icon !== "" && header.icon}
                    <span className="table-header-item-title">
                      {header.title}
                    </span>
                    {header.sort && (
                      <div className="table-header-item-sorter">
                        <div className="table-header-item-sorter-inner">
                          <CaretUpOutlined className="up" />
                          <CaretDownOutlined className="down" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {tokenList.map((token, i) => {
            let usds_24hr = token.attributes.crawl.usds_24h;
            let userDiff: string;
            let transactionsDiff: string;
            let volumeDiff: string;
            let socialSignalDiff: string;
            if (token.attributes.dailyUserDiff < 0) {
              userDiff = "decrease";
            } else {
              userDiff = "increase";
            }
            if (token.attributes.dailyTransactionDiff < 0) {
              transactionsDiff = "decrease";
            } else {
              transactionsDiff = "increase";
            }
            if (token.attributes.dailyVolumeDiff < 0) {
              volumeDiff = "decrease";
            } else {
              volumeDiff = "increase";
            }
            if (token.attributes.crawl.social_signal_gr < 0) {
              socialSignalDiff = "decrease";
            } else {
              socialSignalDiff = "increase";
            }
            return (
              <div
                className="table-body"
                key={i}
                onClick={() => {
                  router.push(`/app/${i}`);
                }}
              >
                <div className="table-body-item table-body-item-number">
                  <img src="img/icons/ad.png" alt="" />
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
                      <p>{token.attributes.dailyUser}</p>
                    </div>
                    <div
                      className={`table-body-item-user-${userDiff} text-end`}
                    >
                      <p>
                        {(token.attributes.dailyUserDiff * 100).toFixed(2)}%{" "}
                        {userDiff === "increase" ? "↑" : "↓"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="table-body-item table-body-item-transaction">
                  <div>
                    <div className="table-body-item-transaction-number text-end">
                      <p>{token.attributes.dailyTransaction}</p>
                    </div>
                    <div
                      className={`table-body-item-transaction-${transactionsDiff} text-end`}
                    >
                      <p>
                        {" "}
                        {(token.attributes.dailyTransactionDiff * 100).toFixed(
                          2
                        )}
                        % {transactionsDiff === "increase" ? "↑" : "↓"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="table-body-item table-body-item-volume">
                  <div className="table-body-item-volume-bar-top">
                    <p>{formatter.format(token.attributes.dailyVolume)}</p>
                    <p
                      className={`table-body-item-volume-bar-top-${volumeDiff} ms-2`}
                    >
                      {(token.attributes.dailyVolumeDiff * 100).toFixed(2)}%{" "}
                      {volumeDiff === "increase" ? "↑" : "↓"}
                    </p>
                  </div>
                  <div className="main-homepage-highestsocial-table-24volume-bar-bottom">
                  {usds_24hr.length == 2 ? (
                    <>
                      <div
                        className="volume-bar"
                        style={{
                          width: `${
                            usds_24hr[0].ratio == 0
                              ? "10%"
                              : `${(usds_24hr[0].ratio * 100).toFixed(1)}%`
                          }`,
                        }}
                      />
                      <div
                        className="volume-bar"
                        style={{
                          width: `${`${(usds_24hr[1].ratio * 100).toFixed(
                            1
                          )}%`}`,
                        }}
                      />
                    </>
                  ) : usds_24hr.length == 3 ? (
                    <>
                      <div
                        className="volume-bar"
                        style={{
                          width: `${
                            usds_24hr[0].ratio == 0
                              ? "10%"
                              : `${(usds_24hr[0].ratio * 100).toFixed(1)}%`
                          }`,
                        }}
                      />
                      <div
                        className="volume-bar"
                        style={{
                          width: `${`${(usds_24hr[1].ratio * 100).toFixed(
                            1
                          )}%`}`,
                        }}
                      />
                      <div
                        className="volume-bar"
                        style={{
                          width: `${`${(usds_24hr[2].ratio * 100).toFixed(
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
                        {isExistAndFormatCurrency(
                          token.attributes.crawl.social_signal,
                          0
                        )}
                      </span>
                    </div>
                    <div className="table-body-item-ranking-increase text-end">
                      <p>
                        {(
                          token.attributes.crawl.social_signal_gr * 100
                        ).toFixed(2)}
                        % {socialSignalDiff === "increase" ? "↑" : "↓"}
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
              >
                {listTitleHeaderMobile.map((header, i) => {
                  return (
                    <Option value={header.title} key={i}>
                      {header.title}
                    </Option>
                  );
                })}
              </Select>
              {isSorter && (
                <div className="table-header-item-sorter">
                  <div className="table-header-item-sorter-inner">
                    <CaretUpOutlined className="up" />
                    <CaretDownOutlined className="down" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => {
          return (
            <div className="table-body" key={i}>
              <div className="table-body-item table-body-item-number">
                <img src="/img/icons/tag-ad.png" alt="" />
                <span>2</span>
              </div>
              <div className="table-body-item table-body-item-name">
                <div className="row m-0 p-0">
                  <div className="col-5">
                    <BoxALignItemsCenter className="h-100">
                      <img className="dapp-logo" src="/img/logo.png" alt="" />
                      <p>TOKENPLAY</p>
                    </BoxALignItemsCenter>
                  </div>
                  <div className="col-5">
                    <div className="w-100">
                      <div className="table-body-item-user-number text-end">
                        <p>0</p>
                      </div>
                      <div className="table-body-item-user-decrease text-end">
                        <p>-100.00% ↓</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="w-100">
                      <BoxALignCenter_Justify_ItemsEnd>
                        <img
                          className="blockchain-logo"
                          src="/img/coin/bnb-white.png"
                          alt=""
                        />
                      </BoxALignCenter_Justify_ItemsEnd>
                      <BoxALignCenter_Justify_ItemsEnd>
                        <img
                          className="blockchain-logo"
                          src="/img/icons/icn-gambling.png"
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
