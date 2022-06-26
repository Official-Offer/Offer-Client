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
import { Carousel } from "react-responsive-carousel";
// import { Pagination } from "swiper";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const defStyle = {
            // marginLeft: 20,
            lineHeight: 28,
            padding: 2,
            color: "white",
            cursor: "pointer",
          };
          const style = isSelected
            ? { ...defStyle, color: "red" }
            : { ...defStyle };
          return (
            <span
              style={style}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              // value={index}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
            >
              {"cust " + index}
            </span>
          );
        }}
      >
        {pinnedPosts.map((pinnedPost: any, i: number) => {
          return (
            <div
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
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
