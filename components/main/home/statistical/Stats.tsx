import React from 'react';
import { BoxALignCenter_Justify_ItemsBetween, BoxALignItemsCenter, BoxWhiteShadow } from '@styles/styled-components/styledBox';

export default function Stats({ data }: any) {
  //console.log(data);
  return (
    <BoxWhiteShadow className="p-3">
      <BoxALignItemsCenter>
        <img src={data.img} alt="" />
        <h6 className="mb-0 ms-2">
          {data.title}
        </h6>
      </BoxALignItemsCenter>
      {data.dapp.map((app: any, i: number) => {
        let dailyUserDiff: string;
        if (app.attributes.dailyUserDiff < 0) {
          dailyUserDiff = 'decrease';
        } else {
          dailyUserDiff = 'increase';
        }
        return (
          <BoxALignCenter_Justify_ItemsBetween className="my-3" key={i}>
            <BoxALignItemsCenter>
              <span>{i + 1}</span>
              <span className="ms-3">
                <img src={app.attributes.crawl.icon} alt="" style={{ width: '30px', height: '30px' }} />
              </span>
              <span className="ms-2 fw-bold">{app.attributes.crawl.name}</span>
              {/* <span className="text_description ms-2">{app.attributes.tag}</span> */}
            </BoxALignItemsCenter>
            <span className={`main-homepage-statistical-${dailyUserDiff}`}>
              {((app.attributes.dailyUserDiff) * 100).toFixed(2)}% {dailyUserDiff === 'increase' ? "↑" : "↓"}
            </span>
          </BoxALignCenter_Justify_ItemsBetween>
        );
      })}
    </BoxWhiteShadow>
  );
};
