import React, { useState } from "react";
import {
  BoxALignCenter_Justify_ItemsCenter,
  BoxALignCenter_Justify_ItemsEnd,
  BoxALignItemsCenter,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { formatter, numberSeperator } from "@utils/formatCurrency";
import { useRouter } from "next/router";
import { Select } from "antd";

const { Option } = Select;

export default function TokenList({ data, setSort, sort }: any) {
  const router = useRouter();
  const [valueSelected, setValueSelected] = useState(sort[0]);
  // console.log(data);
  const theadList = [
    { tag: "number", name: "#", sort: false, query: "" },
    { tag: "token", name: "Token Name", sort: false, query: "" },
    { tag: "price", name: "Price", sort: true, query: "current_price" },
    {
      tag: "1h",
      name: "1h",
      sort: true,
      query: "price_change_percentage_1h_in_currency",
    },
    {
      tag: "24h",
      name: "24h",
      sort: true,
      query: "price_change_percentage_24h_in_currency",
    },
    {
      tag: "7d",
      name: "7d",
      sort: true,
      query: "price_change_percentage_7d_in_currency",
    },
    { tag: "24hVol", name: "24h Volume", sort: true, query: "total_volume" },
    { tag: "mktCap", name: "Mkt Cap", sort: true, query: "market_cap" },
  ];

  const listTitleHeaderMobile = [
    { title: "Price", sort: true, query: "current_price" },
  ];

  const activeItem = (sort: string, query: string) => {
    setSort([query, sort]);
  };
  const handleChangeSelectThead = (value: string) => {
    setValueSelected(value);
    setSort([value, "desc"]);
  };

  return (
    <div className="py-lg-4 px-lg-2 p-1">
      <BoxWhiteShadow className="p-lg-4 p-2">
        <table className="main-homepage-tokenranking-table pc">
          <thead>
            <tr>
              {theadList.map((thead, i) => {
                return (
                  <th
                    className={`main-homepage-tokenranking-table-${thead.tag}`}
                    key={i}
                  >
                    <BoxALignCenter_Justify_ItemsCenter
                      className={`${thead.sort && "justify-content-end"} ${
                        thead.tag
                      }`}
                    >
                      <span>{thead.name}</span>
                    </BoxALignCenter_Justify_ItemsCenter>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((token: any, i: number) => {
              console.log(token);
              let oneHourDiff =
                token.price_change_percentage_1h_in_currency > 0
                  ? "increase"
                  : "decrease";
              let tw4HourDiff =
                token.price_change_percentage_24h_in_currency > 0
                  ? "increase"
                  : "decrease";
              let sevenDayDiff =
                token.price_change_percentage_7d_in_currency > 0 ? "increase" : "decrease";

              return (
                <tr
                  key={i}
                  // onClick={() => router.push(`/coins/${token.attributes.slug}`)}
                >
                  <td className="main-homepage-tokenranking-table-number">
                    {i + 1}
                  </td>
                  <td className="main-homepage-tokenranking-table-token">
                    <BoxALignItemsCenter>
                      <span className="main-homepage-tokenranking-table-logo">
                        <img src={token.image} alt="" />
                      </span>
                      <span className="main-homepage-tokenranking-table-name ms-2">
                        {`${token.name} (${token.symbol.toUpperCase()})`}
                      </span>
                      {/* {token.status !== '' && (
                                                <span className="main-homepage-tokenranking-table-status ms-2">
                                                    {token.status}
                                                </span>
                                            )} */}
                    </BoxALignItemsCenter>
                  </td>
                  <td className="main-homepage-tokenranking-table-holder">
                    <div className="main-homepage-tokenranking-table text-end">
                      <p>
                        $
                        {!token.current_price
                          ? 0
                          : numberSeperator(token.current_price)}
                      </p>
                    </div>
                  </td>
                  <td className="main-homepage-tokenranking-table-active-address">
                    <p
                      className={`main-homepage-tokenranking-table-${oneHourDiff} text-end`}
                    >
                      {token.price_change_percentage_1h_in_currency
                        ? token.price_change_percentage_1h_in_currency.toFixed(
                            2
                          )
                        : "0"}% 
                      {oneHourDiff === "increase" ? "↑" : "↓"}
                    </p>
                  </td>
                  <td className="main-homepage-tokenranking-table-transfer-volume">
                    <p
                      className={`main-homepage-tokenranking-table-${tw4HourDiff} text-end`}
                    >
                      {token.price_change_percentage_24h_in_currency
                        ? token.price_change_percentage_24h_in_currency.toFixed(
                            2
                          )
                        : "0"}%
                      {tw4HourDiff === "increase" ? "↑" : "↓"}
                    </p>
                  </td>
                  <td className="main-homepage-tokenranking-table-transfer-volume">
                    <p
                      className={`main-homepage-tokenranking-table-${sevenDayDiff} text-end`}
                    >
                      {token.price_change_percentage_7d_in_currency
                        ? token.price_change_percentage_7d_in_currency.toFixed(
                            2
                          )
                        : "0"}%
                      {sevenDayDiff === "increase" ? "↑" : "↓"}
                    </p>
                  </td>
                  <td className="main-homepage-tokenranking-table-marketcaps">
                    <div className="main-homepage-tokenranking-table text-end">
                      <p>
                        $
                        {!token.total_volume
                          ? 0
                          : numberSeperator(token.total_volume)}
                      </p>
                    </div>
                  </td>
                  <td className="main-homepage-tokenranking-table-marketcaps">
                    <div className="main-homepage-tokenranking-table text-end">
                      <p>
                        $
                        {!token.market_cap
                          ? 0
                          : numberSeperator(token.market_cap)}
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="main-homepage-tokenranking-table mobile">
          <div className="main-homepage-tokenranking-table-header">
            <div className="main-homepage-tokenranking-table-header-item">
              <span className="main-homepage-tokenranking-table-header-item-title">
                #
              </span>
            </div>
            <div className="main-homepage-tokenranking-table-header-item">
              <span className="main-homepage-tokenranking-table-header-item-title">
                Dapp
              </span>
            </div>
            <div className="main-homepage-tokenranking-table-header-item justify-content-start">
              <Select
                defaultValue={`${listTitleHeaderMobile[0].title}`}
                onChange={handleChangeSelectThead}
                style={{ width: "90%" }}
              >
                {listTitleHeaderMobile.map((header, i) => {
                  return (
                    <Option value={header.query} key={i}>
                      {header.title}
                    </Option>
                  );
                })}
              </Select>
              <div className="main-homepage-tokenranking-table-sorter">
                <div className="main-homepage-tokenranking-table-sorter-inner">
                  <CaretUpOutlined
                    className={`up ${sort[1] === "asc" ? "active" : ""}`}
                    onClick={() => activeItem("asc", valueSelected)}
                  />
                  <CaretDownOutlined
                    className={`down ${sort[1] === "desc" ? "active" : ""}`}
                    onClick={() => activeItem("desc", valueSelected)}
                  />
                </div>
              </div>
            </div>
          </div>
          {data.map((token: any, i: number) => {
            let oneHourDiff =
              token.price_change_percentage_1h_in_currency > 0
                ? "increase"
                : "decrease";
            let tw4HourDiff =
              token.price_change_percentage_24h_in_currency > 0 ? "increase" : "decrease";
            let sevenDayDiff =
              token.price_change_percentage_7d_in_currency > 0 ? "increase" : "decrease";
            return (
              <div className="main-homepage-tokenranking-table-body" key={i}>
                <div className="main-homepage-tokenranking-table-body-item table-body-item-number">
                  {/* <img src="/img/icons/tag-ad.png" alt="" /> */}
                  <span>{i + 1}</span>
                </div>
                <div className="main-homepage-tokenranking-table-body-item main-homepage-tokenranking-table-body-item-name">
                  <div className="row m-0 p-0 justify-content-between w-100">
                    <div className="col-6">
                      <BoxALignItemsCenter className="h-100">
                        <span className="main-homepage-tokenranking-table-logo">
                          <img src={token.image} alt="" />
                        </span>
                        <span className="main-homepage-tokenranking-table-name ms-2">
                          {`${token.name} (${token.symbol})`}
                        </span>
                      </BoxALignItemsCenter>
                    </div>
                    <div className="col-6">
                      <div className="w-100">
                        <div className="main-homepage-tokenranking-table-body-item-user-number text-end">
                          <p>
                            $
                            {!token.current_price
                              ? 0
                              : numberSeperator(token.current_price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </BoxWhiteShadow>
    </div>
  );
}
