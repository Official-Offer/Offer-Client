import React, { ReactElement, useEffect, useState } from "react";
import {
  BoxALignCenter_Justify_ItemsEnd,
  BoxALignCenter_Justify_ItemsStart,
} from "@styles/styled-components/styledBox";
import { BannerLeft, BannerRight, BannerMain } from "@components/banner";
import { NEXT_PUBLIC_GOOGLE_ANALYTICS } from "@config/index";
import dynamic from "next/dynamic";
import request from "@services/apiService";
import Head from "next/head";
import * as qs from "qs";
import "antd/dist/antd.css";
import { useRouter } from "next/router";

export default function LayoutGlobal(props: any): ReactElement {
  // const FooterHome = dynamic(() => import("./FooterHome"));
  const NavbarHome = dynamic(() =>
    import("../navbar").then((mod: any) => mod.NavbarHome)
  );
  const FooterHome = dynamic(() =>
    import("../footer").then((mod: any) => mod.FooterHome)
  );
  const router = useRouter();
  const route = router.asPath.split("/");
  const isDappNews = route[1].slice(0,9) == "dapp-news";
  const isDappNewsDetails = route[1].slice(0,9) == "dapp-news" && route[1].slice(9,10) == "/";
  const [banners, setBanners] = useState<any>([]);
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
        setBanners(res.data.data.map((img: any) => img.attributes));
      });
    })();
  }, []);

  return (
    <>
      <Head>
        
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
        />
        {!isDappNews && (
          <>
            <title>Tokenplay</title>
            <meta
              property="og:image"
              content="https://data-nft.tokenplay.app/NFTmarket.jpg"
            />
            <meta property="og:title" content="Tokenplay" />
            <meta property="og:url" content="https://tokenplay.app/" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Tokenplay Dappverse" />
            <meta property="og:image" content="img/thumbnail_1.png" />
            <meta property="og:URL" content="%PUBLIC_URL%/localImage.jpg" />
          </>
        )}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                        });
                    `,
          }}
        />
      </Head>
      <NavbarHome />
      {isDappNews ? (
        <div>{props.children}</div>
      ) : (
        <div className="row-global pb-5 m-0 h-100">
          <div className="row-global-banner banner-left">
            <BoxALignCenter_Justify_ItemsStart className="banner-left-sticky">
              <BannerLeft
                img={
                  banners.filter((img: any) => img.Position == "BannerAds")[0]
                }
              />
            </BoxALignCenter_Justify_ItemsStart>
          </div>
          <div className="row-global-center px-lg-0 px-3">
            <div className="empty_space_height79"></div>
            <BannerMain
              img={banners.filter((img: any) => img.Position == "Section1")[0]}
            />
            {props.children}
          </div>

          <div className="row-global-banner banner-right">
            <BoxALignCenter_Justify_ItemsEnd className="banner-right-sticky">
              <BannerRight
                img={
                  banners.filter((img: any) => img.Position == "BannerAds")[1]
                }
              />
            </BoxALignCenter_Justify_ItemsEnd>
          </div>
          <div className="main-background main-background-position-banner" />
          <div className="main-background main-background-position-priceboard" />
          <div className="main-background main-background-position-highestsocial" />
          <div className="main-background main-background-position-blog" />
        </div>
      )}
      <FooterHome />
    </>
  );
}
