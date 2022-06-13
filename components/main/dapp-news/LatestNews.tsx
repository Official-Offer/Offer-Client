import React, { useEffect, useState } from "react";
import request from "@services/apiService";
import qs from "qs";
import { URL_API_IMG } from "@config/index";
import { useRouter } from "next/router";

function LatestNews() {
  const [latestNews, setLatest] = useState([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
          pagination: {
            page: 1,
            pageSize: 5,
          },
          sort: [`createdAt:desc`],
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/posts?${query}`).then((res) => {
        setLatest(res.data.data);
      });
    })();
  }, []);
  console.log(latestNews);
  return (
    <div>
      {latestNews.map((news: any, i: number) => (
        <div
          className="fontSize_08 main-homepage-dappnews-pinnedCard"
          onClick={() => {
            router.push(
              {
                pathname: `/dapp-news/${news.attributes.slug}`,
              }
            );
          }}
          key={i}
        >
          <img
            className="main-homepage-dappnews-pinnedCard-img"
            src={`${URL_API_IMG}${news?.attributes.thumbnail.data.attributes.url}`}
          />
          <div className="main-homepage-dappnews-pinnedCard-desc">
            <span className="main-homepage-dappnews-pinnedCard-author">
              By {news?.attributes.Author}
            </span>
            &nbsp;
            <p className="main-homepage-dappnews-pinnedCard-title">
              {news?.attributes.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LatestNews;
