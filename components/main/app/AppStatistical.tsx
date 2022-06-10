import React, { FC } from "react";
import {
  BoxALignItemsCenter,
  BoxBlueBorderRounded,
} from "@styles/styled-components/styledBox";
import { formatter } from "@utils/formatCurrency";

export const AppStatistical: FC = ({ data, day }: any) => {
  const userDiff = data?.crawl[`user_${day}d_gr`];
  const volDiff = data?.crawl[`volume_${day}d_gr`];
  const transDiff = data?.crawl[`amount_${day}d_gr`];
  const user = data?.crawl[`user_${day}d`];
  const volume = formatter.format(data?.crawl[`volume_${day}d`]);
  const trans = formatter.format(data?.crawl[`amount_${day}d`]);
  const updown = (i: number) => (i > 0 ? "↑" : "↓");
  const incdec = (i: number) => (i > 0 ? "increase" : "decrease");
  return (
    <div className="row app-statistical">
      <div className="col-lg-4 col-12 my-lg-0 my-2">
        <BoxBlueBorderRounded className="p-3">
          <p>{day}d Users</p>
          <p className="app-statistical-users">
            {user}
            <span className={`ms-3 ${incdec(userDiff)}`}>
              {userDiff}% {updown(userDiff)}
            </span>
          </p>
        </BoxBlueBorderRounded>
      </div>
      <div className="col-lg-4 col-12 my-lg-0 my-2">
        <BoxBlueBorderRounded className="p-3">
          <p>{day}d Volume</p>
          <p className="app-statistical-volume">
            $ {volume}
            <span className={`ms-3 ${incdec(volDiff)}`}>
              {volDiff}% {updown(volDiff)}
            </span>
          </p>
        </BoxBlueBorderRounded>
      </div>
      <div className="col-lg-4 col-12 my-lg-0 my-2">
        <BoxBlueBorderRounded className="p-3">
          <p>{day}d Transactions</p>
          <p className="app-statistical-transactions">
            $ {trans}
            <span className={`ms-3 ${incdec(transDiff)}`}>
              {transDiff}% {updown(transDiff)}
            </span>
          </p>
        </BoxBlueBorderRounded>
      </div>
    </div>
  );
};
