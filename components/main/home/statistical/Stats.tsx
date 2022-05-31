import React from 'react';
import { BoxALignCenter_Justify_ItemsBetween, BoxALignItemsCenter, BoxRelativeImage, BoxWhiteShadow } from '@styles/styled-components/styledBox';

export default function Stats({ data }: any) {
  let key: any;
  switch(data.title) {
    case 'User(24h)':
      key = 'dailyUserDiff';
      break;
    case 'Volume':
      key = 'dailyVolumeDiff';
      break;
    default:
      key = 'socialSignalDiff';
  }
  return (
    <BoxWhiteShadow className="p-3">
      <BoxALignItemsCenter>
        <img src={data.img} alt="" />
        <h6 className="mb-0 ms-2">
          {data.title}
        </h6>
      </BoxALignItemsCenter>
      {data.dapp.map((app: any, i: number) => {
        let diff: string;
        if (app.attributes[key] < 0) {
          diff = 'decrease';
        } else {
          diff = 'increase';
        }
        return (
          <BoxALignCenter_Justify_ItemsBetween className="my-3" key={i}>
            <BoxALignItemsCenter>
              <span>{i + 1}</span>
              <span className="ms-3">
                <img src={app.attributes.crawl.icon} alt="" style={{ width: '30px', height: '30px' }} />
              </span>
              <p className="main-homepage-statistical-title ms-2 fw-bold">{app.attributes.crawl.name}</p>
              {/* <span className="text_description ms-2">{app.attributes.tag}</span> */}
            </BoxALignItemsCenter>
            <span className={`main-homepage-statistical-${diff}`}>
              {((app.attributes[key]) * 100).toFixed(2)}% {diff === 'increase' ? "↑" : "↓"}
            </span>
          </BoxALignCenter_Justify_ItemsBetween>
        );
      })}
    </BoxWhiteShadow>
  );
};
