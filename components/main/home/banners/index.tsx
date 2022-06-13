import React, { FC, useEffect, useState } from "react";
import request from "@services/apiService";
import * as qs from "qs";
import { URL_API_IMG } from "@config/index";

export const Banners: FC = () => {
  const [banners, setBanners] = useState<any>([
    // { url: "https://heroarena.app/", src: "/img/banner/hero_arena.png" },
    // { url: "https://horizonland.app/", src: "/img/banner/horizon.png" },
  ]);
  useEffect(() => {
    (async () => {
      const bannerQuery = qs.stringify(
        {
          populate: "*",
        },
        {
          encodeValuesOnly: true,
          // encode: false,
        }
      );
      await request.get(`/ads-banners?${bannerQuery}`).then((res) => {
        setBanners(
          res.data.data
            .map((img: any) => img.attributes)
            .filter((img: any) => img.Position === "Section2")
        );
      });
    })();
  }, []);
  return (
    <section className="main-homepage-banners">
      <div className="row">
        <div className="col-lg-6 col-12 main-homepage-banners-space-under">
          <div onClick={() => window.open(banners[0].URL)}>
            <img
              className="mw-100"
              src={`${URL_API_IMG}${banners[0]?.adsbanner?.data.attributes.url}`}
              alt=""
            />
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div onClick={() => window.open(banners[1].URL)}>
            <img
              className="mw-100"
              src={`${URL_API_IMG}${banners[1]?.adsbanner?.data.attributes.url}`}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};
