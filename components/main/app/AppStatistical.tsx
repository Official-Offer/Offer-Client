import React, { FC } from "react";
import {
  BoxALignItemsCenter,
  BoxBlueBorderRounded,
} from "@styles/styled-components/styledBox";
import { formatter } from "@utils/formatCurrency";
import { updown, incdec } from "@utils/numberDecorator";
export const AppStatistical: FC = ({ data, day, appStat }: any) => {
  console.log(appStat);

  return (
    <div className="row app-statistical">
      {appStat?.map((app: any, i: number) => {
        const title = `${day}d ${app.name}`;
        const số_trái = app.data[`${day}d`];
        const số_phải = app.data[`${day}d_gr`];
        return (
          <div className="col-lg-4 col-12 my-lg-0 my-2" key={i}>
            <BoxBlueBorderRounded className="p-3">
              <p className="app-statistical-title">{title}</p>
              <p className="app-statistical-users">
                {formatter.format(số_trái)}
                <span className={`ms-3 ${incdec(số_phải)}`}>
                  {số_phải?.toFixed(2)}% {updown(số_phải)}
                </span>
              </p>
            </BoxBlueBorderRounded>
          </div>
        );
      })}
    </div>
  );
};
