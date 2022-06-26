import React, { FC, useEffect, useState } from "react";
import { BoxALignCenter_Justify_ItemsCenter } from "@styles/styled-components/styledBox";
import { Navigation, Pagination, A11y } from "swiper";
import { ArrowLeftCircle, ArrowRightCircle, ChevronLeft, ChevronRight } from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@styles/styled-components/styledButton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { URL_API_IMG } from "@config/index";
import request from "@services/apiService";
import qs from "qs";
import moment from "moment";
import { useRouter } from "next/router";
// import { Pagination } from "swiper";

export default function PinnedSlides({ crit }: any) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const router = useRouter();
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
          sort: [`${crit}:desc`],
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
    <BoxALignCenter_Justify_ItemsCenter>
      <Button className="p-0 me-2" ref={navigationPrevRef}>
        <ArrowLeftCircle color="#058499" width={"40"} height={"40"} />
      </Button>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        observeParents={true}
        observer={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          1440: {
            slidesPerView: 1,
          },
          1920: {
            slidesPerView: 1,
          },
        }}
        // pagination={true}
        loop={true}
        autoplay={{ delay: 2000 }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
      >
        {pinnedPosts.map((pinnedPost: any, i: number) => {
          return (
            <SwiperSlide
              key={i}
              className="main-homepage-dappnews-pinnedSlides"
              onClick={() => {
                router.push({
                  pathname: `/dapp-news/${pinnedPost.attributes.slug}`,
                });
              }}
            >
              <img
                className="main-homepage-dappnews-pinnedSlides-img"
                src={`${URL_API_IMG}${pinnedPost.attributes.thumbnail.data.attributes.url}`}
                alt=""
              />
              <p className="main-homepage-dappnews-pinnedSlides-title mt-2">
                {pinnedPost.attributes.title}
              </p>
              <p className="main-homepage-dappnews-pinnedSlides-author">
                By {pinnedPost.attributes.Author} |{" "}
                {moment(pinnedPost.attributes.createdAt).format("LL")}
              </p>
              &nbsp;
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Button className="p-0 ms-2" ref={navigationNextRef}>
        <ArrowRightCircle color="#058499" width={"40"} height={"40"} />
      </Button>
    </BoxALignCenter_Justify_ItemsCenter>
  );
}