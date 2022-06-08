import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { URL_SITE } from "@config/index";
import { useState } from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

const SharingSection = ({ news, category }: any) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="news-details-social">
      <br />
      <h4>Share this article</h4>
      <div className="news-details-social-icons">
        <FacebookShareButton
          url={`${URL_SITE}/dapp-news/${news[0]?.id}?id=${news[0]?.id}&category=${category}`}
          quote={`${news[0]?.attributes.title}
          
          ${news[0]?.attributes.description}`}
          hashtag={`${news[0]?.attributes.tags[0]}`}
        >
          <img
            src="/img/icons/social-facebook.png"
            className="news-details-social-icon"
          />
        </FacebookShareButton>
      </div>
      <div className="news-details-social-icons">
        <TwitterShareButton
          url={`${URL_SITE}/dapp-news/${news[0]?.id}?id=${news[0]?.id}&category=${category}`}
          title={`${news[0]?.attributes.title}
          
          ${news[0]?.attributes.description}`}
          // hashtags={news?.attributes.tags.map(tag => `#${tag}`)}
        >
          <img
            src="/img/icons/social-twitter.png"
            className="news-details-social-icon"
          />
        </TwitterShareButton>
      </div>
      <div className="news-details-social-icons">
        <TelegramShareButton
          url={`${URL_SITE}/dapp-news/${news[0]?.id}?id=${news[0]?.id}&category=${category}`}
          title={`${news[0]?.attributes.title}
          
          ${news[0]?.attributes.description}`}
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
            <HeartFilled style={{ color: "#1DBBBD", marginLeft: "30vw" }} />
          ) : (
            <HeartOutlined style={{ marginLeft: "30vw" }} />
          )}
        </a>
      </div>
      <br />
    </div>
  );
};

export default SharingSection;
