import React, { FC, useEffect, useState } from "react";
import { BoxALignCenter_Justify_ItemsCenter } from "@styles/styled-components/styledBox";
import { Navigation, Pagination, A11y } from 'swiper';
import { ChevronLeft, ChevronRight } from "react-feather";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from "@styles/styled-components/styledButton";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { URL_API_IMG } from "@config/dev.config";
import request from "@services/apiService";
import qs from "qs";


export default function BannerSlides ({}) {
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const [banners, setBanners] = useState([]);
    useEffect(() => {
      (async () => {
        const bannerQuery = qs.stringify(
          {
            populate: "*",
          },
          {
            encodeValuesOnly: true,
          }
        );
        await request.get(`/post-banners?${bannerQuery}`).then((res) => {
          setBanners(res.data.data);
        });
      })();
    }, []);
    console.log(banners)
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                pagination={false}
                onInit={(swiper: any) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}>
                {banners.map((banner: any, i: number) => {
                  // console.log(blog)
                  return (
                      <SwiperSlide key={i}>
                          {/* <div className="main-homepage-blog-card"> */}
                              {/* <div className="main-homepage-blog-card-header"> */}
                                  <img
                                      className="main-homepage-dappnews-card-header-img mb-10"
                                      src={`${URL_API_IMG}${banner.attributes.Image?.data.attributes.url}`}
                                      alt=""
                                  />
                              {/* </div> */}
                          {/* </div> */}
                      </SwiperSlide>
                  )
              })}
            </Swiper>
        </>
    );
}