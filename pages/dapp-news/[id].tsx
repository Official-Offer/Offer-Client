import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
  BoxWhiteShadow,
} from "@styles/styled-components/styledBox";
import { MarkDown } from "@styles/styled-components/markDown";
import { Router, useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import * as qs from "qs";
import request from "@services/apiService";
import { URL_API_ADMIN, URL_API_IMG, URL_SITE } from "@config/index";
import moment from "moment";
import BannerSlides from "@components/main/home/slides/BannerSlides";
import Head from "next/head";
import CommentSection from "@components/main/dapp-news/CommentSection";
import SharingSection from "@components/main/dapp-news/SharingSection";
import { Calendar, Eye } from "react-feather";
import { getRouteRegex } from "next/dist/shared/lib/router/utils";

const NewsDetails: NextPage = ({ newsData }: any) => {
  console.log(newsData);
  const [news, setNews] = useState<any>([]);
  const [relatedNews, setRelatedNews] = useState([]);
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

  console.log(news);
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
          <BoxWhiteShadow className="p-lg-4 p-2">
            <div className="news-details-left col-lg-9 col-12 mt-lg-5 mt-2">
              <div className="news-details-dashboard">
                <div className="mb-5">
                  <span className="news-details-createdAt">
                    <Calendar size={15} />
                    &nbsp;
                    {moment(news[0]?.attributes.createdAt).format("LL")}
                  </span>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <span className="news-details-createdAt">
                    <Eye size={15} />
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
          </BoxWhiteShadow>
          <div className="news-details-right col-lg-3 col-12 mt-lg-5">
            <BoxWhiteShadow className="p-2">
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
            </BoxWhiteShadow>
            <br />
            <BoxWhiteShadow className="news-details-right-topic p-2">
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
                          {/* <p className="main-homepage-dappnews-card-body-createdAt">{`${moment(
                            news.attributes.createdAt
                          ).format("LL")} . ${
                            news.attributes.viewer
                          } views`}</p> */}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </BoxWhiteShadow>
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

export const getServerSideProps = async (ctx: any) => {
  let newsData = null;
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        id: {
          $eq: ctx.query.id,
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
