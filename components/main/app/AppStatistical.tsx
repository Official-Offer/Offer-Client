import React, { FC } from "react";
import {
  BoxALignItemsCenter,
  BoxBlueBorderRounded,
} from "@styles/styled-components/styledBox";
import { formatter } from "@utils/formatCurrency";
import { updown, incdec } from "@utils/numberDecorator";
export const AppStatistical: FC = ({ data, day }: any) => {
  const userDiff = data?.crawl[`user_${day}d_gr`];
  const volDiff = data?.crawl[`volume_${day}d_gr`];
  const transDiff = data?.crawl[`amount_${day}d_gr`];
  const user = data?.crawl[`user_${day}d`];
  const volume = formatter.format(data?.crawl[`volume_${day}d`]);
  const trans = formatter.format(data?.crawl[`amount_${day}d`]);
  console.log(data);
  return (
    <div className="row app-statistical">
      <div className="col-lg-4 col-12 my-lg-0 my-2">
        <BoxBlueBorderRounded className="p-3">
          <p className="app-statistical-title">{day}d Users</p>
          <p className="app-statistical-users">
            {user}
            <span className={`ms-3 ${incdec(userDiff)}`}>
              {userDiff?.toFixed(2)}% {updown(userDiff)}
            </span>
          </p>
        </BoxBlueBorderRounded>
      </div>
      <div className="col-lg-4 col-12 my-lg-0 my-2">
        <BoxBlueBorderRounded className="p-3">
          <p className="app-statistical-title">{day}d Volume</p>
          <p className="app-statistical-volume">
            $ {volume}
            <span className={`ms-3 ${incdec(volDiff)}`}>
              {volDiff?.toFixed(2)}% {updown(volDiff)}
            </span>
          </p>
        </BoxBlueBorderRounded>
      </div>
      <div className="col-lg-4 col-12 my-lg-0 my-2">
        <BoxBlueBorderRounded className="p-3">
          <p className="app-statistical-title">{day}d Transactions</p>
          <p className="app-statistical-transactions">
            $ {trans}
            <span className={`ms-3 ${incdec(transDiff)}`}>
              {transDiff?.toFixed(2)}% {updown(transDiff)}
            </span>
          </p>
        </BoxBlueBorderRounded>
      </div>
    </div>
  );
};
