import { Carousel, Switch } from "antd";
import React, { useEffect, useState, useRef } from "react";
import {
  OrangeJuice,
  BoxALignCenter_Justify_ItemsCenter,
  BoxALignCenter_Justify_ItemsBetween,
} from "@styles/styled-components/styledBox";
import { SplineChart } from "../charts/SplineChart";
import {
  BoxALignItemsStart,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import { ButtonBlue } from "@styles/styled-components/styledButton";
import { updown, incdec } from "@utils/numberDecorator";
import { useRouter } from "next/router";
import moment from "moment";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { ChevronLeft, ChevronRight } from "react-feather";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@styles/styled-components/styledButton";
import { TabMain, TabMain_Sub } from "@styles/styled-components/styledTabs";
import Link from "next/link";
import {
  UnorderedListOutlined,
  AppstoreOutlined,
  AppstoreFilled,
} from "@ant-design/icons";
import { Divider } from "antd";
const ChartSlider = ({ stat, setShowPrice, showPrice }) => {
  //same ref for both slider
  const chartSlider = useRef();
  const [chart, setChart] = useState(0);
  const renderDollar = (name) => {
    return ["Volume", "Transactions"].includes(name) ? "$" : "";
  };
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const chartCount = stat?.stats.components.length;
  useEffect(() => console.log(chart), [chart]);
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const chartTitle = stat?.stats.components
    .filter(
      (comp) =>
        comp?.data?.charts.datasets[Object.keys(comp?.data.charts.datasets)[0]].length     
    )
    
    return(
      <div className="row">
        <div className="chart-slider">
          <div className="row">
            <div className="col-10" style={{ paddingRight: 0 }}>
              <BoxALignCenter_Justify_ItemsBetween>
                <Button className="p-0" ref={navigationPrevRef}>
                  <ChevronLeft
                    color="#058499"
                    size={15}
                    style={{ marginBottom: 3 }}
                  />
                </Button>{" "}
                {[...chartTitle, {name: "More to come!"}]?.map((comp, i) => (
                  <div
                    key={i}
                    className={i !== chart ? "dont-display" : ""}
                    style={{ color: "#223052" }}
                  >
                    {comp.name}
                  </div>
                ))}
                <div className={chartCount !== chart ? "dont-display" : ""}>
                  More to come!
                </div>
                <Button className="p-0" ref={navigationNextRef}>
                  <ChevronRight
                    color="#058499"
                    size={15}
                    style={{ marginBottom: 3 }}
                  />
                </Button>
              </BoxALignCenter_Justify_ItemsBetween>
            </div>
            <div
              className="col-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
              }}
            >
              <Divider type="vertical" />
              {!showAll ? (
                <AppstoreFilled
                  onClick={() => setShowAll(!showAll)}
                  style={{
                    color: "#058499",
                  }}
                />
              ) : (
                <UnorderedListOutlined
                  onClick={() => setShowAll(!showAll)}
                  style={{
                    color: "#058499",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div style={{ paddingLeft: 0, marginBottom: 10 }}>
          <TabMain>
            <span className="d-inline-flex position-relative">
              <Link href={`/app/${router.query.blockchain}?days=7`}>
                <TabMain_Sub
                  className={` ${
                    !router.query.days || router.query.days === "7"
                      ? "active"
                      : ""
                  } filter`}
                >
                  7D
                </TabMain_Sub>
              </Link>
            </span>
            <span className="d-inline-flex position-relative">
              <Link href={`/app/${router.query.blockchain}?days=30`}>
                <TabMain_Sub
                  className={` ${
                    router.query.days === "30" ? "active" : ""
                  } filter`}
                >
                  30D
                </TabMain_Sub>
              </Link>
            </span>
            <span className="d-inline-flex position-relative">
              <Link href={`/app/${router.query.blockchain}?days=90`}>
                <TabMain_Sub
                  className={` ${
                    router.query.days === "90" ? "active" : ""
                  } filter`}
                >
                  90D
                </TabMain_Sub>
              </Link>
            </span>
          </TabMain>
        </div>
        <div
          className="blockchain-details-price "
          style={{ fontSize: 12, paddingLeft: 0 }}
        >
          <Switch
            checked={showPrice}
            defaultChecked
            className="blockchain-details-price-switch"
            onChange={() => setShowPrice(!showPrice)}
          ></Switch>
          Show Price Comparison On Chart
        </div>
        {!showAll ? (
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            pagination={false}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            onSlideChange={(e) => {
              if (e.activeIndex == 0) setChart(chartCount - 1);
              else setChart((e.activeIndex - 1) % chartCount);
            }}
          >
            {stat?.stats.components.map((comp, i) => {
              const isAdvanced = ![
                "Social Signal",
                "Volume",
                "Transactions",
                "Users",
              ].includes(comp.name);
              if (comp.data.charts.labels.length === 0) return null;
              return (
                <SwiperSlide key={i}>
                  <div className="col-lg-6 col-12 blockchain-details-dashboard-users">
                    <div className="blockchain-details-chart-wrapper">
                      <div className="blockchain-details-flex">
                        <h5 className="mb-0 blockchain-details-chart-name">
                          {comp.name}
                        </h5>
                        {isAdvanced && <OrangeJuice>Advanced</OrangeJuice>}
                      </div>
                      <SplineChart
                        data={comp}
                        price={stat?.stats.token.chart}
                        showPrice={showPrice}
                      />
                      <BoxALignItemsStart>
                        <div className="ms-2">
                          <div className="exp-item">
                            <span className="time">24h: </span>
                            <span className="value">
                              {renderDollar(comp.name)}
                              {comp.data["24h"]}
                            </span>
                            <span className={incdec(comp.data["24h_gr"])}>
                              {comp.data["24h_gr"].toFixed(2)}%
                              {updown(comp.data["24h_gr"])}
                            </span>
                          </div>
                          {comp.data.total && (
                            <div className="exp-item">
                              <span className="time">Total: </span>
                              <span className="value">
                                {renderDollar(comp.name)}
                                {comp.data.total.toFixed(3)}
                              </span>
                              <span className="time">
                                ({comp.data.total_days} days)
                              </span>
                            </div>
                          )}
                          <div className="exp-item ath">
                            <span className="time">ATH: </span>
                            <span className="value">
                              {renderDollar(comp.name)}
                              {comp.data.all_time_high?.toFixed(2)}
                            </span>
                            <span className="time">
                              (
                              {moment(comp.data.all_time_high_date).format(
                                "LL"
                              )}
                              )
                            </span>
                          </div>
                          {!comp.data.total && <div className="br" />}
                        </div>
                      </BoxALignItemsStart>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            <SwiperSlide key={chartCount}>
              <div className="col-lg-6 col-12 blockchain-details-dashboard-submit">
                <div className="blockchain-details-dashboard-submit-img">
                  <p className="fw-bold mb-1 fontSize_1-1">
                    Want More Dashboards
                  </p>
                  <p className="mb-0 fontSize_09">Submit Your Request To Us</p>
                  <div className="mt-auto">
                    <ButtonBlue
                      className="fw-bold"
                      onClick={() => {
                        router.push("/submit");
                      }}
                    >
                      Submit
                    </ButtonBlue>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        ) : (
          <>
            {stat?.stats.components.map((comp, i) => {
              const isAdvanced = ![
                "Social Signal",
                "Volume",
                "Transactions",
                "Users",
              ].includes(comp.name);
              if (comp.data.charts.labels.length === 0) return null;
              return (
                <div
                  className="col-lg-6 col-12 blockchain-details-dashboard-users"
                  key={i}
                >
                  <div className="blockchain-details-chart-wrapper">
                    <div className="blockchain-details-flex">
                      <h5 className="mb-0 blockchain-details-chart-name">
                        {comp.name}
                      </h5>
                      {isAdvanced && <OrangeJuice>Advanced</OrangeJuice>}
                    </div>
                    <SplineChart
                      data={comp}
                      price={stat?.stats.token.chart}
                      showPrice={showPrice}
                    />
                    <BoxALignItemsStart>
                      <div className="ms-2">
                        <div className="exp-item">
                          <span className="time">24h: </span>
                          <span className="value">
                            {renderDollar(comp.name)}
                            {comp.data["24h"]}
                          </span>
                          <span className={incdec(comp.data["24h_gr"])}>
                            {comp.data["24h_gr"].toFixed(2)}%
                            {updown(comp.data["24h_gr"])}
                          </span>
                        </div>
                        {comp.data.total && (
                          <div className="exp-item">
                            <span className="time">Total: </span>
                            <span className="value">
                              {renderDollar(comp.name)}
                              {comp.data.total.toFixed(3)}
                            </span>
                            <span className="time">
                              ({comp.data.total_days} days)
                            </span>
                          </div>
                        )}
                        <div className="exp-item ath">
                          <span className="time">ATH: </span>
                          <span className="value">
                            {renderDollar(comp.name)}
                            {comp.data.all_time_high?.toFixed(2)}
                          </span>
                          <span className="time">
                            ({moment(comp.data.all_time_high_date).format("LL")}
                            )
                          </span>
                        </div>
                        {!comp.data.total && <div className="br" />}
                      </div>
                    </BoxALignItemsStart>
                  </div>
                </div>
              );
            })}
            <div className="col-lg-6 col-12 blockchain-details-dashboard-submit">
              <div className="blockchain-details-dashboard-submit-img">
                <p className="fw-bold mb-1 fontSize_1-1">
                  Want More Dashboards
                </p>
                <p className="mb-0 fontSize_09">Submit Your Request To Us</p>
                <div className="mt-auto">
                  <ButtonBlue
                    className="fw-bold"
                    onClick={() => {
                      router.push("/submit");
                    }}
                  >
                    Submit
                  </ButtonBlue>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
};

export { ChartSlider };
