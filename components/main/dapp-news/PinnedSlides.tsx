import React, { FC, useEffect, useState } from "react";
import { BoxALignCenter_Justify_ItemsCenter } from "@styles/styled-components/styledBox";
import { Navigation, Pagination, A11y } from "swiper";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@styles/styled-components/styledButton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { URL_API_IMG } from "@config/index";
import request from "@services/apiService";
import qs from "qs";
import moment from "moment";

export default function PinnedSlides({}) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [pinnedPosts, setPinned] = useState([]);
  useEffect(() => {
    (async () => {
      const pinQuery = qs.stringify(
        {
          populate: "*",
          filters: {
            isPinned: {
              $eq: true,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/posts?${pinQuery}`).then((res) => {
        setPinned(res.data.data);
      });
    })();
  }, []);
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
        }}
      >
        {pinnedPosts.map((pinnedPost: any, i: number) => {
          return (
            <SwiperSlide key={i}>
              <img
                className="main-homepage-dappnews-pinnedSlides-img"
                src={`${URL_API_IMG}${pinnedPost.attributes.thumbnail.data.attributes.url}`}
                alt=""
              />
              <p className="main-homepage-dappnews-pinnedSlides-title mt-4">
                {pinnedPost.attributes.title}
              </p>
              <div>
                <span className="main-homepage-dappnews-pinnedSlides-author">
                  By {pinnedPost.attributes.Author} |{" "}
                  {moment(pinnedPost.attributes.createdAt).format("LL")}
                </span>
                &nbsp;
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
