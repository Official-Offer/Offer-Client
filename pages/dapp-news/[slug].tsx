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
import { HeartFilled, HeartOutlined, UserOutlined } from "@ant-design/icons";
import { URL_API_ADMIN, URL_API_IMG, URL_SITE } from "@config/index";
import moment from "moment";
import Head from "next/head";
import { Calendar, Eye } from "react-feather";
import dynamic from "next/dynamic";
import { Avatar } from "antd";
import { ButtonBackgroundBlueBold } from "@styles/styled-components/styledButton";
import ReactMarkdown from "react-markdown";

const NewsDetails: NextPage = ({ newsData }: any) => {
  const CommentSection = dynamic(
    () => import("@components/main/dapp-news/CommentSection")
  ) as any;
  const SharingSection = dynamic(
    () => import("@components/main/dapp-news/SharingSection")
  ) as any;
  const NewsList = dynamic(
    () => import("@components/main/dapp-news/NewsList")
  ) as any;
  const PinnedSlides = dynamic(
    () => import("@components/main/dapp-news/PinnedSlides")
  ) as any;
  const BannerSlides = dynamic(
    () => import("@components/main/dapp-news/BannerSlides")
  ) as any;

  const [news, setNews] = useState<any>([]);
  const [styledContent, setStyledContent] = useState("");
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
            pageSize: 9,
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
  }, [router.query]);

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

  useEffect(() => {
    const keyWord = "(/uploads/";
    const modifiedContent = news[0]?.attributes.content
      .split("(/uploads/")
      .splice(0, keyWord.length)
      .join(`(${URL_API_IMG}/uploads/`);

    setStyledContent(modifiedContent);
  }, [news]);

  // const markdown = marked(modifiedContent);

  return (
    <div>
      <Head>
        <meta property="title" content={newsData[0]?.attributes.title} />
        <meta property="og:title" content={newsData[0]?.attributes.title} />
        {/* <meta property="og:url" content={newsData[0]?.attributes.slug} /> */}
        <meta
          property="og:image"
          content={`${URL_API_IMG}${newsData[0]?.attributes.thumbnail.data.attributes.url}`}
        />
        <meta
          property="og:description"
          content={newsData[0]?.attributes.description}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${URL_API_IMG}${newsData[0]?.attributes.thumbnail.data.attributes.url}`}
        />
        <meta name="twitter:title" content={newsData[0]?.attributes.title} />
        <meta
          name="twitter:description"
          content={newsData[0]?.attributes.description}
        />
      </Head>
      <section className="news-details">
        <div className="empty_space_height50" />
        <div className="news-details-row">
          <div className="news-details-sharing news-details-row-side-desktop-left">
            <div className="news-details-sharing-top">
              <SharingSection newsUpdate={news} />
            </div>
            <div className="news-details-sharing-bottom">
              <div className="p-2">
                <h3 className="mb-3">Tags</h3>
                <div className="row">
                  {news[0]?.attributes.tags.data.map((tag: any, i: number) => {
                    return (
                      <ButtonBackgroundBlueBold
                        className="news-details-right-tag"
                        key={i}
                        onClick={() =>
                          router.push(
                            `/dapp-news/search/${tag.attributes.name}`
                          )
                        }
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          {tag.attributes.name}
                        </a>
                      </ButtonBackgroundBlueBold>
                    );
                  })}
                </div>
                <div className="news-details-right-banner">
                  <BannerSlides />
                </div>
              </div>
            </div>
          </div>
          <div className="news-details-row-center">
            <div className="news-details-row-center-paragraph mt-2 p-3">
              <h2>{`${news[0]?.attributes.title}`}</h2>
              <BoxALignCenter_Justify_ItemsBetween className="news-details-createdAt">
                <div className="news-details-createdAt-left">
                  <Avatar
                    style={{ backgroundColor: "#1DBBBD" }}
                    icon={<UserOutlined />}
                  />
                  &nbsp;&nbsp;
                  {news[0]?.attributes.Author}
                  &nbsp; | &nbsp;
                  {moment(news[0]?.attributes.createdAt).format("LL")}
                </div>
                <div className="news-details-createdAt-right">
                  {/* <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setLiked(!liked);
                    }}
                  >
                    {liked ? (
                      <HeartFilled style={{ color: "#1DBBBD" }} />
                    ) : (
                      <HeartOutlined />
                    )}
                  </a> */}
                  {/* &nbsp;
                  {liked ? 2 : 1} */}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Eye size={15} />
                  &nbsp;
                  {news[0]?.attributes.viewer}
                </div>
              </BoxALignCenter_Justify_ItemsBetween>
              <MarkDown>{styledContent}</MarkDown>
              {/* <ReactMarkdown>{styledContent}</ReactMarkdown> */}
            </div>
            <div className="news-details-low-section">
              <div className="news-details-commentsection">
                <CommentSection news={news} />
              </div>
              <div className="news-details-row-side-mobile">
                <div className="news-details-sharing-top-mobile">
                  <SharingSection newsUpdate={news} />
                </div>
                <div className="news-details-sharing-bottom-mobile">
                  <div className="p-2">
                    <h3 className="mb-3">Tags</h3>
                    <div className="row">
                      {news[0]?.attributes.tags.data.map(
                        (tag: any, i: number) => {
                          return (
                            <BoxWhiteShadow
                              className="news-details-right-tag"
                              key={i}
                            >
                              {tag.attributes.name}
                            </BoxWhiteShadow>
                          );
                        }
                      )}
                    </div>
                    <div className="news-details-right-banner">
                      <BannerSlides />
                    </div>
                  </div>
                </div>
              </div>
              <div className="news-details-posts-desk row">
                <h2
                  style={{
                    fontSize: "26px",
                    textAlign: "center",
                    color: "#223052",
                    fontWeight: "bold",
                  }}
                >
                  Popular
                </h2>
                <NewsList data={popularNews} />
              </div>
            </div>
            <div className="news-details-posts-mobile">
              <h2
                style={{
                  fontSize: "26px",
                  color: "#223052",
                  fontWeight: "bold",
                }}
              >
                Popular
              </h2>
              <PinnedSlides crit={"viewer"} />
            </div>
          </div>
          <div className="news-details-row-side-desktop">
            <div className="news-details-relatedNews p-2">
              <h3 className="news-details-relatedNews-title">Related News</h3>
              <div className="row">
                {relatedNews.map((news: any, i: number) => {
                  return (
                    <div className="col-lg-12 col-12 px-3" key={i}>
                      <div
                        onClick={() => {
                          router.push({
                            pathname: `/dapp-news/${news.attributes.slug}`,
                          });
                        }}
                      >
                        <div className="row">
                          <a target="_blank" rel="noopener noreferrer">
                            <div className="news-details-relatedNews-content">
                              <p className="news-details-relatedNews-number">
                                {i + 1}
                              </p>
                              &nbsp;&nbsp;
                              <p className="news-details-relatedNews-text">
                                {news.attributes.title}
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
        slug: {
          $eq: ctx.query.slug,
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
