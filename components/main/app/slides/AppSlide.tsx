import React, { FC } from "react";
import { BoxALignCenter_Justify_ItemsCenter } from "@styles/styled-components/styledBox";
import { Navigation, Pagination, A11y } from "swiper";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@styles/styled-components/styledButton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { URL_API_IMG } from "@config/dev.config";

export const AppSlide: FC = ({ imgArr }: any) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  console.log(imgArr);
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
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        {imgArr?.map((img: any, i: number) => (
          <SwiperSlide key={i}>
            <img
              className="w-100"
              src={`${URL_API_IMG}${img?.attributes?.url}`}
              alt=""
            />
          </SwiperSlide>
        ))}
        {imgArr?.map((img: any, i: number) => (
          <SwiperSlide key={i}>
            <img
              className="w-100"
              src={`${URL_API_IMG}${img?.attributes?.url}`}
              alt=""
            />
          </SwiperSlide>
        ))}
        <BoxALignCenter_Justify_ItemsCenter>
          <Button className="p-0" ref={navigationPrevRef}>
            <ChevronLeft color="#1DBBBD" />
          </Button>
          <Button className="p-0" ref={navigationNextRef}>
            <ChevronRight color="#1DBBBD" />
          </Button>
        </BoxALignCenter_Justify_ItemsCenter>
      </Swiper>
    </>
  );
};
