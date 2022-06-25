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
import { useRouter } from "next/router";
// import { Carousel } from "antd";
import { Carousel } from "react-responsive-carousel";
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
  // const contentStyle = {
  //   height: "160px",
  //   color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  //   background: "#364d79",
  // };
  return (
    <div
      id="carouselExampleDark"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 5"
        ></button>
      </div>
      <div className="carousel-inner">
        {pinnedPosts.map((pinnedPost: any, i: number) => {
          return (
            <div
              key={i}
              className="carousel-item main-homepage-dappnews-pinnedSlides"
              onClick={() => {
                router.push({
                  pathname: `/dapp-news/${pinnedPost.attributes.slug}`,
                });
              }}
            >
              <h3>4</h3>
              {/* <img
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
              * &nbsp; */}
            </div>
          );
        })}
      </div>
      {/* <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img src="..." className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="..." className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      {/* </div> */}
      {/* <Carousel autoPlay>
      </Carousel> */}
      {/* <Swiper
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
        pagination={true}
        // pagination={{
        //   clickable: true,
        //   renderBullet: function (index, className) {
        //     return '<span className="my-custom-pagination-div">'  + (index + 1) + "</span>";
        //   },
        // }}
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
      </Swiper> */}
    </div>
  );
}
