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
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { URL_API_ADMIN, URL_API_IMG, URL_SITE } from "@config/index";
import moment from "moment";
import BannerSlides from "@components/main/home/slides/BannerSlides";
import Head from "next/head";
import CommentSection from "@components/main/dapp-news/CommentSection";
import SharingSection from "@components/main/dapp-news/SharingSection";
import { Calendar, Eye } from "react-feather";
import NewsList from "@components/main/dapp-news/NewsList";
import PinnedSlides from "@components/main/dapp-news/PinnedSlides";

const NewsDetails: NextPage = ({ newsData }: any) => {
  const [news, setNews] = useState<any>([]);
  const [popularNews, setPopularNews] = useState<any>([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
          filters: {
            slug: {
              $eq: router.query.slug,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      const popularQuery = qs.stringify(
        {
          populate: "*",
          pagination: {
            page: 1,
            pageSize: 6,
          },
          sort: [`viewer:desc`],
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/posts?${query}`).then((res) => {
        setNews(res.data.data);
      });
      await request.get(`/posts?${popularQuery}`).then((res) => {
        setPopularNews(res.data.data);
      });
    })();
  }, [router.query.slug]);

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
              name: news[0]?.attributes.category.data.attributes.name,
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
        <meta property="title" content={newsData[0]?.attributes.title} />
        <meta property="og:title" content={newsData[0]?.attributes.title} />
        <meta
          property="og:image"
          content={`${URL_API_IMG}${newsData[0]?.attributes.thumbnail.data.attributes.url}`}
        />
        <meta
          property="og:description"
          content={newsData[0]?.attributes.description}
        />
      </Head>
      <section className="news-details">
        <div className="empty_space_height50" />
        <div className="news-details-row p-5">
          <div className="news-details-sharing news-details-row-side">
            <SharingSection news={news} category={router.query.category} />
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
          </div>
          <div className="news-details-row-center">
            <BoxWhiteShadow>
              <div className="col-12 mt-2 p-3">
                <div className="news-details-dashboard">
                  <BoxALignItemsCenter>
                    <h2>{`${news[0]?.attributes.title}`}</h2>
                  </BoxALignItemsCenter>
                  <div className="">
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
                  <MarkDown>{modifiedContent}</MarkDown>
                </div>
              </div>
            </BoxWhiteShadow>
            <CommentSection news={news} />
            <div className="news-details-posts-desk row">
              <h2>Popular</h2>
              <NewsList data={popularNews} />
            </div>
            <div className="news-details-posts-mobile">
              <PinnedSlides crit={"viewer"} />
            </div>
          </div>
          {/* <div className="news-details-right col-md-4 col-12 mt-lg-5"> */}
          <br />
          <div className="news-details-row-side">
            <BoxWhiteShadow className="p-3">
              <h3 className="mb-3">Related News</h3>
              <div className="row">
                {relatedNews.map((news: any, i: number) => {
                  return (
                    <div className="col-lg-12 col-12 px-3" key={i}>
                      <div
                        onClick={() => {
                          router.push({
                            pathname: `/dapp-news/${news.attributes.slug}`,
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
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </BoxWhiteShadow>
          </div>
        </div>
        {/* </div> */}
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
