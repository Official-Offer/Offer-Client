import { FacebookFilled, TwitterSquareFilled } from "@ant-design/icons";
import { URL_SITE } from "@config/index";
import { BoxWhiteShadow } from "@styles/styled-components/styledBox";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

const SharingSection = ({ newsUpdate }: any) => {
  const [news, setNews] = useState<any>([]);
  useEffect(() => {
    setNews(newsUpdate)
  }, [newsUpdate])
  // console.log(news);
  return (
    <div className="news-details-social">
      <p className="news-details-social-title">Share This Article</p>
      <div className="news-details-social">
        <div className="news-details-social-icons">
          <FacebookShareButton
            url={`${URL_SITE}/dapp-news/${news[0]?.attributes.slug}`}
            quote={`${news[0]?.attributes.title}
          
            ${news[0]?.attributes.description}`}
            hashtag={`${news[0]?.attributes.tags[0]}`}
          >
            <img
              src="/img/facebook.png"
              className="news-details-social-icon"
            />
            {/* <FacebookFilled style = {{fontSize: '32px', color: '#4267B2'}}/> */}
          </FacebookShareButton>
        </div>
        <div className="news-details-social-icons">
          <TwitterShareButton
            url={`${URL_SITE}/dapp-news/${news[0]?.attributes.slug}`}
          >
            <img
              src="/img/twitter.png"
              className="news-details-social-icon"
            />
          </TwitterShareButton>
        </div>
        <div className="news-details-social-icons">
          <TelegramShareButton
            //url={`${URL_SITE}/dapp-news/${news[0]?.id}?id=${news[0]?.id}&category=${category}`}
            url={`${URL_SITE}/dapp-news/${news[0]?.attributes.slug}`}
            title={`${news[0]?.attributes.title}
          
          ${news[0]?.attributes.description}`}
          >
            <img
              src="/img/telegram.png"
              className="news-details-social-icon"
            />
          </TelegramShareButton>
        </div>
        <br />
      </div>
    </div>
  );
};

export default SharingSection;
