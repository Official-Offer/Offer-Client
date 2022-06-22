import { BoxALignItemsCenter } from "@styles/styled-components/styledBox";
import axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { numberSeperator } from "@utils/formatCurrency";

const RunningPrice = ({ direction }: any) => {
  const [tokenList, setTokenList] = useState([]);
  const [viewMore, setNumberViewMore] = useState(10);
  const [sort, setSort] = useState(["market_cap", "desc"]);

  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          // sort: [`${sort[0]}:${sort[1]}`],
          vs_currency: "usd",
          price_change_percentage: "1h,24h,7d",
          per_page: viewMore,
          page: 1,
          order: `${sort[0]}_${sort[1]}`,
        },
        {
          encodeValuesOnly: true,
        }
      );
      await axios
        .get(`https://dev-api-dappverse.tokenplay.app/coins/markets?${query}`)
        .then((res) => {
          // console.log(res.data);
          setTokenList(res.data);
        });
    })();
  }, [viewMore, sort]);

  return (
    <Marquee direction={direction} speed={40}>
      {tokenList.map((token: any, i: number) => {
        let oneHourDiff =
          token.price_change_percentage_1h_in_currency > 0
            ? "increase"
            : "decrease";
        return (
          <BoxALignItemsCenter key={i}>
            <span className="main-homepage-tokenranking-table-logo">
              <img src={token.image} alt="" />
            </span>
            <span className="main-homepage-tokenranking-table-name ms-2">
              {`${token.name} (${token.symbol.toUpperCase()})`}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              className={`main-homepage-tokenranking-table-${oneHourDiff} text-end`}
            >
              <span
                className={`main-homepage-tokenranking-table-${oneHourDiff} text-end`}
              >
                $
                {!token.current_price
                  ? 0
                  : numberSeperator.format(token.current_price)}
                &nbsp;&nbsp;
                {token.price_change_percentage_1h_in_currency
                  ? token.price_change_percentage_1h_in_currency.toFixed(2)
                  : "0"}
                {/* &nbsp;&nbsp; */}
                %{oneHourDiff === "increase" ? "↑" : "↓"}
              </span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </BoxALignItemsCenter>
        );
      })}
    </Marquee>
  );
};

export default RunningPrice;
