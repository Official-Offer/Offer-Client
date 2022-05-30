import React, { ReactElement } from "react";
import { BoxALignCenter_Justify_ItemsCenter } from "@styles/styled-components/styledBox";
import { URL_API_IMG } from "@config/dev.config";

export function BannerLeft({ img }): ReactElement {
  console.log(img);
  return (
    <img
      style={{ maxWidth: "70%" }}
      src={`${URL_API_IMG}${img?.adsbanner?.data.attributes.url}`}
      alt=""
      onClick={() => window.open(img.URL)}
    />
  );
}

export function BannerRight({ img }): ReactElement {
  return (
    <img
      style={{ maxWidth: "70%" }}
      src={`${URL_API_IMG}${img?.adsbanner?.data.attributes.url}`}
      alt=""
      onClick={() => window.open(img.URL)}
    />
  );
}

export function BannerMain({ img }): ReactElement {
  return (
    <section id="banner-main">
      <BoxALignCenter_Justify_ItemsCenter style={{ borderRadius: "15px" }}>
        <img
          className="mw-100"
          src={`${URL_API_IMG}${img?.adsbanner?.data.attributes.url}`}
          alt=""
        //   onClick={() => window.open(img.URL)}
        />
      </BoxALignCenter_Justify_ItemsCenter>
    </section>
  );
}
