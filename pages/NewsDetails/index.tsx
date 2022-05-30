import {
  FacebookFilled,
  TwitterOutlined,
  UserOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
// import { MarkDown } from "@styles/styled-components/markDown";
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
import { URL_API_ADMIN } from "@config/dev.config";
import moment from "moment";
import PopUp from "@components/popup";
import markdownToHtml from "@utils/markDownToHtml";
import ReactMarkdown from "react-markdown";
// import MarkdownIt from "markdown-it";
import styled from "styled-components";

const NewsDetails: NextPage = () => {
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [content, setContent] = useState("");
  const router = useRouter();
  console.log(router.query.id);
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

  // useEffect(() => {
  //   markdownToHtml(news[0]?.attributes.content || "").then((res) => {
  //     setContent(res);
  //   });
  // }, [news]);

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
      await request.get(`/reviews?${query}`).then((res) => {
        setComments(res);
      });
    })();
  }, [news]);

  console.log(comments);

  const MarkDown = styled<any>(ReactMarkdown)`
    img {
      width: 100%;
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

  const keyWord = "(/uploads/";

  const modifiedContent = news[0]?.attributes.content
    .split("(/uploads/")
    .splice(0, keyWord.length)
    .join(`(${URL_API_ADMIN}/uploads/`);
  console.log(modifiedContent);

  return (
    <div>
      <section className="news-details">
        <div className="empty_space_height50" />
        <div className="row m-0 p-0">
          {/* <div className="empty_space_height50" /> */}
          <div className="news-details-left col-lg-9 col-12 mt-lg-5 mt-2">
            <div className="news-details-dashboard">
              <BoxALignItemsCenter>
                <h2>{`${news[0]?.attributes.title}`}</h2>
              </BoxALignItemsCenter>
              <br />
              {/* <section dangerouslySetInnerHTML={{ __html: content }}></section> */}
              {/* <section dangerouslySetInnerHTML={{ __html: modifiedContent }}></section> */}
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
              <img
                className="mw-100"
                src="/img/banner/banner_main.png"
                alt=""
              />
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
                          router.push(
                            {
                              pathname: `/NewsDetails`,
                              query: {
                                id: news.id,
                                category:
                                  news.attributes.category.data.attributes.name,
                              },
                            },
                            `/`
                          );
                        }}
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          <img
                            className="mw-100 news-details-right-topic-img"
                            src={`${URL_API_ADMIN}${news.attributes.thumbnail.data.attributes.url}`}
                          />
                          <p className="name">{news.attributes.title}</p>
                          <p className="main-homepage-dappnews-card-body-createdAt">{`${moment(
                            news.attributes.createdAt
                          ).format("LL")} . ${
                            news.attributes.viewer
                          } view(s)`}</p>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="empty_space_height50" />
          <hr className="w-75 m-3" />
          <div className="news-details-social">
            <br />
            <h4>Share this article</h4>
            <div className="news-details-social-icons">
              <img
                src="/img/icons/social-discord.png"
                className="news-details-social-icon"
              />
            </div>
            <div className="news-details-social-icons">
              <img
                src="/img/icons/social-twitter.png"
                className="news-details-social-icon"
              />
            </div>
            <div className="news-details-social-icons">
              <img
                src="/img/icons/social-telegram.png"
                className="news-details-social-icon"
              />
            </div>
            <br />
          </div>
          <hr className="w-75 m-3" />
          <div className="news-details-left col-lg-9 col-12">
            <BoxALignCenter_Justify_ItemsBetween className="mb-4">
              <h3>Comments</h3>
              <ButtonBlue>
                <PopUp text="Write Comment" />
              </ButtonBlue>
            </BoxALignCenter_Justify_ItemsBetween>
            <BoxWhiteShadow className="p-4 news-details-comment">
              {[0, 1, 2, 3].map((comment, i) => {
                return (
                  <div className="news-details-comment-box" key={i}>
                    <BoxALignCenter_Justify_ItemsBetween className="mb-4">
                      <BoxALignItemsCenter>
                        <Avatar
                          style={{ backgroundColor: "#1DBBBD" }}
                          icon={<UserOutlined />}
                        />
                        <span className="news-details-comment-box-name">
                          Joseph Reyes
                        </span>
                      </BoxALignItemsCenter>
                      <span className="news-details-comment-box-time">
                        Mar 17 , 2021
                      </span>
                    </BoxALignCenter_Justify_ItemsBetween>
                    <p className="news-details-comment-box-description">
                      {`Don't buy into this scam, I've only lost $100 thankfully. Withdraw button doesn't work. Consider yourself warned.`}
                    </p>
                    <div>
                      <Button>
                        <BoxALignItemsCenter>
                          <MessageSquare color="#1DBBBD" />
                          <PopUp text="Reply" className="ms-2 text-green">
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
              <div>
                <Button className="text-green">Rating and Reviews</Button>
              </div>
            </BoxWhiteShadow>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetails;
