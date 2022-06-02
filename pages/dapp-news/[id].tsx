import {
  FacebookFilled,
  HeartOutlined,
  HeartFilled,
  TwitterOutlined,
  UserOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import {
  Button,
  ButtonBorderBlueTransparent,
  ButtonBlue,
} from "@styles/styled-components/styledButton";
import { File, Heart, MessageSquare, Share2, User } from "react-feather";
import { useRouter } from "next/router";
import { Avatar, Rate } from "antd";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import * as qs from "qs";
import request from "@services/apiService";
import { URL_API_ADMIN, URL_API_IMG } from "@config/dev.config";
import { URL_SITE } from "@config/dev.config";
import moment from "moment";
import PopUp from "@components/popup";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TelegramShareButton,
} from "react-share";
import BannerSlides  from "@components/main/home/slides/BannerSlides";

const NewsDetails: NextPage = () => {
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [content, setContent] = useState("");
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
          filters: {
            id: {
              $eq: router.query.id,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/posts?${query}`).then((res) => {
        setNews(res.data.data);
      });
    })();
  }, [router.query.id]);

  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
          pagination: {
            page: 1,
            pageSize: 5,
          },
          filters: {
            category: {
              name: router.query.category,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/posts?${query}`).then((res) => {
        setRelatedNews(res.data.data);
      });
    })();
  }, [news]);

  const MarkDown = styled<any>(ReactMarkdown)`
    img {
      width: 90%;
      padding: 20px;
      margin: auto;
      display: block;
    }
    pre {
      color: #ccc;
      background: #2d2d2d;
      font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
      font-size: 1em;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
      padding: 1em;
      margin: 35px 0;
      overflow: auto;
    }
    code {
      color: #ccc;
      background: none;
      font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
      font-size: 1em;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }
  `;

  // console.log(banner);

  const keyWord = "(/uploads/";

  const modifiedContent = news[0]?.attributes.content
    .split("(/uploads/")
    .splice(0, keyWord.length)
    .join(`(${URL_API_IMG}/uploads/`);

  return (
    <div>
      <section className="news-details">
        <div className="empty_space_height50" />
        <div className="row m-0 p-0">
          <div className="news-details-left col-lg-9 col-12 mt-lg-5 mt-2">
            <div className="news-details-dashboard">
              <div className="mb-5">
                <span className="news-details-createdAt">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="currentColor"
                    class="bi bi-calendar"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                  </svg>
                  &nbsp;
                  {moment(news[0]?.attributes.createdAt).format("LL")}
                </span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <span className="news-details-createdAt">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                  &nbsp;
                  {news[0]?.attributes.viewer}
                </span>
              </div>
              <BoxALignItemsCenter>
                <h2>{`${news[0]?.attributes.title}`}</h2>
              </BoxALignItemsCenter>
              <br />
              <MarkDown>{modifiedContent}</MarkDown>
            </div>
          </div>
          <div className="news-details-right col-lg-3 col-12 mt-lg-5">
            <h3 className="mb-3">Tags</h3>
            <div className="row">
              {news[0]?.attributes.tags.data.map((tag: any, i: any) => {
                return (
                  <BoxWhiteShadow className="news-details-right-tag">
                    {tag.attributes.name}
                  </BoxWhiteShadow>
                );
              })}
            </div>
            <div className="news-details-right-banner">
              <BannerSlides />
              {/* <img
                style={{ maxWidth: "100%" }}
                src={`${URL_API_IMG}${banner?.Image?.data.attributes.url}`}
                alt=""
                onClick={() => window.open(banner.URL)}
              /> */}
            </div>
            <br />
            <div className="news-details-right-topic">
              <h3 className="mb-3">Related News</h3>
              <div className="row">
                {relatedNews.map((news, i) => {
                  return (
                    <div className="col-lg-12 col-12 px-3">
                      <div
                        onClick={() => {
                          router.push({
                            pathname: `/dapp-news/${news.id}`,
                            query: {
                              id: news.id,
                              category:
                                news.attributes.category.data.attributes.name,
                            },
                          });
                        }}
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          <img
                            className="mw-100 news-details-right-topic-img"
                            src={`${URL_API_IMG}${news.attributes.thumbnail.data.attributes.url}`}
                          />
                          <p className="name">{news.attributes.title}</p>
                          <p className="main-homepage-dappnews-card-body-createdAt">{`${moment(
                            news.attributes.createdAt
                          ).format("LL")} . ${
                            news.attributes.viewer
                          } views`}</p>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="news-details-left col-lg-9 col-12">
            <hr className="mb-4" style={{ color: "#1DBBBD" }} />
            <div className="news-details-social">
              <br />
              <h4>Share this article</h4>
              <div className="news-details-social-icons">
                <FacebookShareButton
                  url={`${URL_SITE}/dapp-news/${news[0]?.id}?id=${news[0]?.id}&category=${router.query.category}`}
                  quote={`${news[0]?.attributes.title} 

                  ${news[0]?.attributes.description} 
                  `}
                  //${URL_API_IMG}${news[0]?.attributes.thumbnail.data.attributes.url}
                  hashtag={`${news[0]?.attributes.tags[0]}`}
                  // className={classes.socialMediaButton}
                >
                  <img
                    src="/img/icons/social-facebook.png"
                    className="news-details-social-icon"
                  />
                </FacebookShareButton>
              </div>
              <div className="news-details-social-icons">
                <TwitterShareButton
                  url={`${URL_SITE}/dapp-news/${news[0]?.id}?id=${news[0]?.id}&category=${router.query.category}`}
                  quote={`${news[0]?.attributes.title} 

                  ${news[0]?.attributes.description} 
                  `}
                  // hashtags={news?.attributes.tags.map(tag => `#${tag}`)}
                  // className={classes.socialMediaButton}
                >
                  <img
                    src="/img/icons/social-twitter.png"
                    className="news-details-social-icon"
                  />
                </TwitterShareButton>
              </div>
              <div className="news-details-social-icons">
                <TelegramShareButton
                  url={`${URL_SITE}/dapp-news/${news[0]?.id}?id=${news[0]?.id}&category=${router.query.category}`}
                  quote={`${news[0]?.attributes.title} 

                  ${news[0]?.attributes.description} 
                  `}
                  // className={classes.socialMediaButton}
                >
                  <img
                    src="/img/icons/social-telegram.png"
                    className="news-details-social-icon"
                  />
                </TelegramShareButton>
              </div>
              <div
                className="news-details-social-heart"
                onClick={() => {
                  setLiked(!liked);
                }}
              >
                <a target="_blank" rel="noopener noreferrer">
                  {liked ? (
                    <HeartFilled
                      style={{ color: "#1DBBBD", marginLeft: "30vw" }}
                    />
                  ) : (
                    <HeartOutlined style={{ marginLeft: "30vw" }} />
                  )}
                </a>
              </div>
              <br />
            </div>
            <hr className="mt-4" style={{ color: "#1DBBBD" }} />
            <BoxALignCenter_Justify_ItemsBetween className="mb-4">
              <h3>COMMENTS</h3>
              <ButtonBlue>
                <PopUp text="Write Comment" />
              </ButtonBlue>
            </BoxALignCenter_Justify_ItemsBetween>
            <BoxWhiteShadow className="p-4 news-details-comment">
              {news[0]?.attributes.reviews.data.map((cmt, i) => {
                return (
                  <div className="news-details-comment-box" key={i}>
                    <BoxALignCenter_Justify_ItemsBetween className="mb-4">
                      <BoxALignItemsCenter>
                        <Avatar
                          style={{ backgroundColor: "#1DBBBD" }}
                          icon={<UserOutlined />}
                        />
                        <span className="news-details-comment-box-name">
                          {cmt.attributes.comment}
                        </span>
                      </BoxALignItemsCenter>
                      <span className="news-details-comment-box-time">
                        {moment(cmt.attributes.createdAt).format("LL")}
                      </span>
                    </BoxALignCenter_Justify_ItemsBetween>
                    <p className="news-details-comment-box-description">
                      {cmt.attributes.comment}
                    </p>
                    <div>
                      <Button>
                        <BoxALignItemsCenter>
                          <MessageSquare color="#1DBBBD" />
                          <PopUp
                            text="Reply"
                            name={cmt.attributes.comment}
                            className="ms-2 text-green"
                          >
                            Reply
                          </PopUp>
                        </BoxALignItemsCenter>
                      </Button>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <ButtonBorderBlueTransparent className="w-100 rounded-pill py-2">
                View more
              </ButtonBorderBlueTransparent>
              <br />
              <br />
            </BoxWhiteShadow>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetails;
