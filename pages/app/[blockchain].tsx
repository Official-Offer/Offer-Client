import {
  FacebookFilled,
  TwitterOutlined,
  UserOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
  BoxAlignItemsEnd_FlexColumn,
  BoxALignItemsStart,
  BoxBlueBold,
  BoxBlueBorderRounded,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import {
  Button,
  ButtonBorderBlueTransparent,
  ButtonBlue,
} from "@styles/styled-components/styledButton";
import { File, Heart, MessageSquare, Share2, User } from "react-feather";
import { TabMain, TabMain_Sub } from "@styles/styled-components/styledTabs";
import { useRouter } from "next/router";
import { Avatar, Rate } from "antd";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import * as qs from "qs";
import request from "@services/apiService";
import requestDapp from "@services/apiDapp";
import { useEffect, useState } from "react";
import { URL_API_DAPPVERSE, URL_API_IMG } from "@config/index";
import axios from "axios";
import { updown } from "@utils/numberDecorator";
import { dateFormatter, formatter } from "@utils/formatCurrency";
import moment from "moment";

const BlockchainDetails: NextPage = () => {
  const router = useRouter();
  const AppStatistical = dynamic(() =>
    import("@components/main/app").then((mod: any) => mod.AppStatistical)
  );
  const SplineChart = dynamic(() =>
    import("@components/main/app").then((mod: any) => mod.SplineChart)
  );
  const AppSlide = dynamic(() =>
    import("@components/main/app").then((mod: any) => mod.AppSlide)
  );
  const id = router.query.blockchain;
  const [dapp, setDapp] = useState<any>();
  const [slug, setSlug] = useState<any>("leonicorn-swap");
  const [stat, setStat] = useState<any>();
  const [day, setDay] = useState<any>(7);
  useEffect(() => setDay(router.query.days || 7), [router]);
  useEffect(() => {
    (async () => {
      await axios
        .create({
          baseURL: URL_API_DAPPVERSE,
        })
        .get(`/chart/dapp/${slug}/${day}`)
        .then((res) => {
          setStat(res.data);
        });
    })();
  }, [day, slug]); 
  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
          filters: {
            id: {
              $eq: id,
            },
          },
        },
        { encodeValuesOnly: true }
      );
      await request.get(`/dapps?${query}`).then((res) => {
        // console.log(res.data.data[0].attributes);
        setDapp(res.data.data[0].attributes);
        setSlug(res.data.data[0].attributes.slug);
      });
    })();
  }, []);

  return (
    <section className="blockchain-details">
      <div className="empty_space_height50" />
      <div className="row m-0 p-0">
        <div className="blockchain-details-left col-lg-9 col-12">
          <BoxALignItemsCenter className="blockchain-details-combine">
            <div className="blockchain-details-combine-left">
              <img
                className="app-logo"
                src={`${URL_API_IMG}${dapp?.logo.data.attributes.url}`}
                alt=""
              />
            </div>
            <div className="blockchain-details-combine-right">
              <BoxALignItemsCenter className="blockchain-details-combine-right-name">
                <h3 className="mb-0">{dapp?.name}</h3>
                <BoxALignItemsCenter className="status-label main">
                  <div className="dot" />
                  <span className="ms-2">Main network</span>
                </BoxALignItemsCenter>
              </BoxALignItemsCenter>
              <BoxALignItemsCenter className="blockchain-details-combine-right-rating">
                <Rate allowHalf defaultValue={2.5} />
                <p className="ms-3 mb-0">
                  2.5
                  <span className="ms-2">5 Ratings</span>
                </p>
              </BoxALignItemsCenter>
              <div>
                <Link href={"#"}>
                  <a>Edit This App</a>
                </Link>
              </div>
            </div>
          </BoxALignItemsCenter>
          <BoxALignItemsCenter className="blockchain-details-category flex-wrap">
            <BoxALignItemsCenter className="me-3">
              <img
                className="icon"
                src={dapp?.chain.data.attributes.crawl.color_icon}
                alt=""
              />
              <strong>{dapp?.chain.data.attributes.name}</strong>
            </BoxALignItemsCenter>
            <BoxALignItemsCenter className="me-3">
              <img
                className="icon"
                src={dapp?.category.data.attributes.crawl.icon}
                alt=""
              />
              <strong>{dapp?.category.data.attributes.name}</strong>
            </BoxALignItemsCenter>
          </BoxALignItemsCenter>
          <div className="blockchain-details-description">
            <p>{dapp?.description}</p>
          </div>
          <BoxALignItemsCenter className="blockchain-details-tags flex-wrap">
            {dapp?.tags.data.map((tag: any, i: number) => (
              <BoxBlueBorderRounded className="py-2 px-3 me-3" key={i}>
                <span>{tag.name}</span>
              </BoxBlueBorderRounded>
            ))}
          </BoxALignItemsCenter>
          <BoxALignItemsCenter className="blockchain-details-social">
            <ButtonBlue
              type="button"
              onClick={() => window.open(dapp?.website)}
            >
              View Website
            </ButtonBlue>
            <BoxALignItemsCenter className="ms-5">
              <span className="me-3">Social: </span>
              <a href="#" className="blockchain-details-social-facebook">
                <FacebookFilled
                  style={{ fontSize: "2rem" }}
                  onClick={() =>
                    window.open(
                      dapp?.crawl.socials.filter(
                        (soc: any) => soc.name === "Facebook"
                      )[0].url || "https://facebook.com"
                    )
                  }
                />
              </a>
              <a href="#" className="blockchain-details-social-twitter">
                <TwitterOutlined
                  style={{ fontSize: "2rem" }}
                  onClick={() =>
                    window.open(
                      dapp?.crawl.socials.filter(
                        (soc: any) => soc.name === "Twitter"
                      )[0].url || "https://twitter.com"
                    )
                  }
                />
              </a>
              <a href="#" className="blockchain-details-social-youtube">
                <YoutubeFilled
                  style={{ fontSize: "1.5rem" }}
                  onClick={() =>
                    window.open(
                      dapp?.crawl.socials.filter(
                        (soc: any) => soc.name === "Youtube"
                      )[0]?.url || "https://youtube.com"
                    )
                  }
                />
              </a>
            </BoxALignItemsCenter>
          </BoxALignItemsCenter>
        </div>
        <div className="blockchain-details-right col-lg-3 col-12 p-0">
          <BoxAlignItemsEnd_FlexColumn>
            <BoxALignItemsCenter className="mb-2">
              <User color="#1DBBBD" />
              <span className="ms-2">{dapp?.crawl.follows} Follower(s)</span>
            </BoxALignItemsCenter>
            <ButtonBlue className="rounded-pill mb-3">Follow</ButtonBlue>
            <BoxALignItemsCenter className="mb-5">
              <Button className="blockchain-details-right-follow">
                <BoxALignItemsCenter>
                  <File color="#1DBBBD" />
                  <span className="ms-2">Collect</span>
                </BoxALignItemsCenter>
              </Button>
              <Button className="blockchain-details-right-follow">
                <BoxALignItemsCenter>
                  <Heart color="#1DBBBD" />
                  <span className="ms-2">Collect</span>
                </BoxALignItemsCenter>
              </Button>
              <Button className="blockchain-details-right-follow">
                <BoxALignItemsCenter>
                  <Share2 color="#1DBBBD" />
                  <span className="ms-2">Collect</span>
                </BoxALignItemsCenter>
              </Button>
            </BoxALignItemsCenter>
            <div className="w-100">
              <AppSlide />
            </div>
          </BoxAlignItemsEnd_FlexColumn>
        </div>
        {/* <div className="empty_space_height50" /> */}
        <div className="blockchain-details-left col-lg-9 col-12 mt-lg-5 mt-2">
          <div className="blockchain-details-dashboard">
            <BoxALignItemsCenter>
              <h3>{`${dapp?.name}'s`} Dashboards</h3>
              <BoxALignItemsCenter className="status-label main ms-4">
                <span>On-Chain</span>
              </BoxALignItemsCenter>
              <a
                href="#"
                className="blockchain-details-dashboard-viewContract ms-4"
              >
                View {dapp?.crawl.contract_count} Smart contracts
              </a>
            </BoxALignItemsCenter>
            <br />
            <BoxWhiteShadow className="p-4">
              <div>
                <TabMain>
                  <span className="d-inline-flex position-relative">
                    <Link href={`/app/${router.query.blockchain}?days=7`}>
                      <TabMain_Sub
                        className={`fontSize_08 ${
                          !router.query.days || router.query.days === "7"
                            ? "active"
                            : ""
                        }`}
                      >
                        7D
                      </TabMain_Sub>
                    </Link>
                  </span>
                  <span className="d-inline-flex position-relative">
                    <Link href={`/app/${router.query.blockchain}?days=30`}>
                      <TabMain_Sub
                        className={`fontSize_08 ${
                          router.query.days === "30" ? "active" : ""
                        }`}
                      >
                        30D
                      </TabMain_Sub>
                    </Link>
                  </span>
                  <span className="d-inline-flex position-relative">
                    <Link href={`/app/${router.query.blockchain}?days=90`}>
                      <TabMain_Sub
                        className={`fontSize_08 ${
                          router.query.days === "90" ? "active" : ""
                        }`}
                      >
                        90D
                      </TabMain_Sub>
                    </Link>
                  </span>
                </TabMain>
              </div>
              <br />
              <AppStatistical day={stat?.days} data={dapp} />
              <br />
              <div className="row mt-5">
                {stat?.stats.components.map((comp, i) => {
                  return (
                    <div
                      className="col-lg-6 col-12 blockchain-details-dashboard-users"
                      key={i}
                    >
                      <h5 className="mb-0">{comp.name}</h5>
                      <SplineChart data={comp} price={stat?.stats.token.chart}/>
                      <BoxALignItemsStart>
                        <div
                          className={
                            comp.name == "Social Signal" ? "dot" : "dot-yellow"
                          }
                        />
                        <div className="ms-2">
                          <p className="title">{comp.name}</p>
                          <div className="exp-item">
                            <span className="name">24h: </span>
                            <span className="value">{comp.data["24h"]}</span>
                            <span className="increase">
                              {comp.data["24h_gr"]}%
                              {updown(comp.data["24h_gr"])}
                            </span>
                          </div>
                          {comp.data.total && (
                            <div className="exp-item">
                              <span className="name">Total: </span>
                              <span className="value">{comp.data.total}</span>
                              <span className="time">
                                {comp.data.total_days} (days)
                              </span>
                            </div>
                          )}
                          <div className="exp-item">
                            <span className="name">ATH: </span>
                            <span className="value">
                              {comp.data.all_time_high}
                            </span>
                            <span className="time">
                              (
                              {moment(comp.data.all_time_high_date).format(
                                "LL"
                              )}
                              )
                            </span>
                          </div>
                        </div>
                      </BoxALignItemsStart>
                    </div>
                  );
                })}
                <div className="col-lg-6 col-12 blockchain-details-dashboard-submit">
                  <div className="blockchain-details-dashboard-submit-img">
                    <p className="fw-bold mb-1 fontSize_1-1">
                      Want More Dashboards
                    </p>
                    <p className="mb-0 fontSize_09">
                      Submit Your Request To Us
                    </p>
                    <div className="mt-auto">
                      <ButtonBlue className="fw-bold">Submit</ButtonBlue>
                    </div>
                  </div>
                </div>
              </div>
            </BoxWhiteShadow>
          </div>
        </div>
        <div className="blockchain-details-right col-lg-3 col-12 p-0 mt-lg-5 mt-2">
          <div className="blockchain-details-right-banner">
            <img className="mw-100" src="/img/banner/banner_main.png" alt="" />
          </div>
          <br />
          <div className="blockchain-details-right-topic">
            <h3 className="mb-3">Related Topic</h3>
            <div className="row">
              <div className="col-lg-6 col-12 blockchain-details-right-topic-item">
                <a href="#" className="">
                  <p className="name">High-risk</p>
                  <p className="count">{`536 Apps >`}</p>
                </a>
              </div>
              <div className="col-lg-6 col-12 blockchain-details-right-topic-item">
                <a href="#" className="">
                  <p className="name">BNB Chain</p>
                  <p className="count">{`536 Apps >`}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="empty_space_height50" />
        <div className="blockchain-details-left col-lg-9 col-12">
          <BoxALignItemsCenter>
            <h3>Reviews</h3>
            <span className="ms-4">4.2/5.0</span>
            <span className="ms-4">5 Ratings</span>
          </BoxALignItemsCenter>
          <BoxWhiteShadow className="p-4 blockchain-details-comment">
            {[0, 1, 2, 3].map((comment, i) => {
              return (
                <div className="blockchain-details-comment-box" key={i}>
                  <BoxALignCenter_Justify_ItemsBetween className="mb-4">
                    <BoxALignItemsCenter>
                      <Avatar
                        style={{ backgroundColor: "#1DBBBD" }}
                        icon={<UserOutlined />}
                      />
                      <span className="blockchain-details-comment-box-name">
                        Joseph Reyes
                      </span>
                      <Rate allowHalf defaultValue={2.5} />
                    </BoxALignItemsCenter>
                    <span className="blockchain-details-comment-box-time">
                      Mar 17 , 2021
                    </span>
                  </BoxALignCenter_Justify_ItemsBetween>
                  <p className="blockchain-details-comment-box-description">
                    {`Don't buy into this scam, I've only lost $100 thankfully. Withdraw button doesn't work. Consider yourself warned.`}
                  </p>
                  <div>
                    <Button>
                      <BoxALignItemsCenter>
                        <MessageSquare color="#1DBBBD" />
                        <span className="ms-2 text-green">Comment</span>
                      </BoxALignItemsCenter>
                    </Button>
                  </div>
                </div>
              );
            })}
            <ButtonBorderBlueTransparent className="w-100 rounded-pill py-2">
              View more
            </ButtonBorderBlueTransparent>
            <br />
            <br />
            <div>
              <Button className="text-green">Rating and Reviews</Button>
            </div>
          </BoxWhiteShadow>
        </div>
      </div>
    </section>
  );
};

export default BlockchainDetails;
