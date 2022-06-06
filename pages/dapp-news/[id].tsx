
import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import { useRouter } from "next/router";
import { Avatar, Rate } from "antd";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import * as qs from "qs";
import request from "@services/apiService";
import { URL_API_ADMIN, URL_API_IMG, URL_SITE } from "@config/index";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import BannerSlides from "@components/main/home/slides/BannerSlides";
import Head from "next/head";
import CommentSection from "@components/main/dapp-news/CommentSection";
import SharingSection from "@components/main/dapp-news/SharingSection";

const NewsDetails: NextPage = ({ newsData }) => {
  console.log(newsData);
  const [news, setNews] = useState<any>([]);
  const [comments, setComments] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [content, setContent] = useState("");
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

  const keyWord = "(/uploads/";

  const modifiedContent = news[0]?.attributes.content
    .split("(/uploads/")
    .splice(0, keyWord.length)
    .join(`(${URL_API_IMG}/uploads/`);

  return (
    <div>
      <Head>
        <meta property="og:title" content={newsData[0]?.attributes.title} />
        <meta
          property="og:image"
          content={`${URL_API_IMG}${newsData[0]?.attributes.thumbnail.data.attributes.url}`}
        />
        <meta
          property="og:url"
          content={`${URL_SITE}/dapp-news/${newsData[0]?.attributes.slug}`}
        />
        <meta
          property="og:description"
          content={newsData[0]?.attributes.description}
        />
      </Head>
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
                    className="bi bi-calendar"
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
                    className="bi bi-eye"
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
              {news[0]?.attributes.tags.data.map((tag: any, i: number) => {
                return (
                  <BoxWhiteShadow className="news-details-right-tag" key={i}>
                    {tag.attributes.name}
                  </BoxWhiteShadow>
                );
              })}
            </div>
            <div className="news-details-right-banner">
              <BannerSlides />
            </div>
            <br />
            <div className="news-details-right-topic">
              <h3 className="mb-3">Related News</h3>
              <div className="row">
                {relatedNews.map((news: any, i: number) => {
                  return (
                    <div className="col-lg-12 col-12 px-3" key={i}>
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
            <SharingSection news={news} category={router.query.category} />
            <hr className="mt-4" style={{ color: "#1DBBBD" }} />
            <CommentSection news={news} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetails;

export const getServerSideProps = async () => {
  let newsData = null;
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        id: {
          $eq: 2,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  await request.get(`/posts?${query}`).then((res) => {
    newsData = res.data.data;
  });

  return {
    props: {
      newsData,
    },
  };
};
