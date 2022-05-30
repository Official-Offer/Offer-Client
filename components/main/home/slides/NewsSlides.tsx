import React, { ReactElement } from "react";
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { Swiper, SwiperSlide } from 'swiper/react';
import { BoxALignCenter_Justify_ItemsCenter } from "@styles/styled-components/styledBox";
import { URL_API_ADMIN } from "@config/index";
import { Button } from '@styles/styled-components/styledButton';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import moment from "moment";
import { Empty } from "antd";

export default function NewsSlides({ data, tag }: any): ReactElement {
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    SwiperCore.use([Autoplay]);

    return (
        <BoxALignCenter_Justify_ItemsCenter>
            <Button className="p-0 me-2" ref={navigationPrevRef}>
                <ArrowLeftCircle color="#058499" width={'40'} height={'40'} />
            </Button>
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                observeParents={true}
                observer={true}
                spaceBetween={10}
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
                        slidesPerView: 3,
                    },
                    1920: {
                        slidesPerView: 3,
                    },
                }}
                pagination={false}
                loop={true}
                autoplay={{ delay: 2000 }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,

                }}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
            >
                {data.map((blog: any, i: number) => {
                    return (
                        <SwiperSlide key={i}>
                            <div className="main-homepage-news-card">
                                <div className="main-homepage-news-card-header">
                                    <img
                                        className="main-homepage-blog-card-header-img"
                                        src={`${URL_API_ADMIN}${blog.attributes.thumbnail.data.attributes.url}`}
                                        alt=""
                                    />
                                    {/* <span className="logo">
                                        <img src="/img/logo.png" alt="" />
                                    </span> */}
                                </div>
                                <div className="main-homepage-news-card-body">
                                    <p className="main-homepage-news-card-body-title">
                                        {blog.attributes.title}
                                    </p>
                                    <p className="main-homepage-news-card-body-tag">
                                        {tag}
                                    </p>
                                    <p className="main-homepage-news-card-body-description">
                                        {blog.attributes.content}
                                    </p>
                                    <p className="main-homepage-news-card-body-createdAt">
                                        {moment(blog.attributes.createdAt).format("LL")}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <Button className="p-0 ms-2" ref={navigationNextRef}>
                <ArrowRightCircle color="#058499" width={'40'} height={'40'} />
            </Button>
        </BoxALignCenter_Justify_ItemsCenter>
    )
}
