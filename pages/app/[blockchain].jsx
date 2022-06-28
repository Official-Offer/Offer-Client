import {
  FacebookFilled,
  HeartFilled,
  TwitterOutlined,
  UserOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
  BoxAlignItemsCenter_FlexColumn,
  BoxAlignItemsEnd_FlexColumn,
  BoxALignItemsStart,
  BoxBlueBold,
  BoxBlueBorderRounded,
  BoxWhiteShadow,
  DamnBorderedBlackBox,
  BoxJustifyContentSpaceBetween,
} from "@styles/styled-components/styledBox";
import {
  Button,
  ButtonBorderBlueTransparent,
  ButtonBlue,
  ButtonBlueButLessBorder,
} from "@styles/styled-components/styledButton";
import {
  Facebook,
  File,
  Heart,
  MessageSquare,
  Share2,
  User,
} from "react-feather";
import { TabMain, TabMain_Sub } from "@styles/styled-components/styledTabs";
import { useRouter } from "next/router";
import { Avatar, message, notification, Rate, Switch } from "antd";
// import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import * as qs from "qs";
import request from "@services/apiService";
import requestDapp from "@services/apiDapp";
import { useEffect, useState } from "react";
import { URL_API_DAPPVERSE, URL_API_IMG } from "@config/index";
import axios from "axios";
import { incdec, updown } from "@utils/numberDecorator";
import moment from "moment";
import { Modal } from "antd";
import useForm from "@utils/hook/useForm";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";
import { formatter } from "@utils/formatCurrency";
import LoginPopup from "@components/navbar/LoginPopup";
import requestSSO from "@services/apiSSO";
const BlockchainDetails = () => {
  const router = useRouter();
  const AppStatistical = dynamic(() =>
    import("@components/main/app").then((mod) => mod.AppStatistical)
  );
  const SplineChart = dynamic(() =>
    import("@components/main/app").then((mod) => mod.SplineChart)
  );
  const AppSlide = dynamic(() =>
    import("@components/main/app").then((mod) => mod.AppSlide)
  );
  const SmallSplineChart = dynamic(() =>
    import("@components/main/app").then((mod) => mod.SmallSplineChart)
  );
  const id = router.query.blockchain;
  const [dapp, setDapp] = useState();
  const [slug, setSlug] = useState("leonicorn-swap");
  const [stat, setStat] = useState(null);
  const [day, setDay] = useState(7);
  const [showPrice, setShowPrice] = useState(true);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [review, setReview] = useState({
    star: 0,
    comment: "",
  });
  const [reviews, setReviews] = useState([{ cur: {}, children: {} }]);
  const [reviewParent, setReviewParent] = useState(null);
  const [pagination, setPagination] = useState(3);
  const [justCommented, setJustCommented] = useState(true);
  const [showSubcomment, setShowSubcomment] = useState(new Set());
  const [tokenInfo, setTokenInfo] = useState();
  const viewSubcomment = (id) => {
    const newState = showSubcomment;
    if (newState.has(id)) newState.delete(id);
    else newState.add(id);
    setShowSubcomment(newState);
  };
  const viewMore = () => setPagination(pagination + 3);
  const openParentlessReview = () => {
    if (!login) {
      setShowLoginPopup(true);
      return;
    }
    setReviewParent(null);
    setShowReviewPopup(true);
  };
  const openChildReview = (id) => {
    if (!login) {
      setShowLoginPopup(true);
      return;
    }
    setReviewParent(id);
    setShowReviewPopup(true);
  };
  const onChangeStar = (num) => setReview({ ...review, star: num });
  const onChangeComment = (e) =>
    setReview({ ...review, comment: e.target.value });
  const onSubmitReview = async (e) => {
    e.preventDefault();
    if (review.comment.length === 0) {
      setReviewError(true);
      return;
    }
    setReviewError(false);
    const data = reviewParent
      ? {
          data: {
            comment: review.comment,
            rating: review.star,
            dapp: parseInt(id),
            parent: parseInt(reviewParent),
          },
        }
      : {
          data: {
            comment: review.comment,
            rating: review.star,
            dapp: parseInt(id),
          },
        };

    await requestDapp.post(`/dapp/comments`, data).then(() => {
      setShowReviewPopup(false);
      notification.open({
        message: "Success 🥳",
        description: "Your comment has been successfully submitted. ",
        duration: 3,
      });
    });
    setJustCommented(!justCommented);
  };
  const [login, setLogin] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => console.log(reviews), [reviews]);
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
      await axios
        .create({
          baseURL: URL_API_DAPPVERSE,
        })
        .get(`/chart/dapp/${slug}/`)
        .then((res) => {
          // console.log(res.data.stats.token);
          setTokenInfo(res.data.stats.token);
        });
    })();
  }, [slug]);
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
  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: ["user", "replies", "replies.user"],
          pagination: {
            page: 1,
            pageSize: pagination,
          },
          filters: {
            dapp: {
              id: {
                $eq: id, //id
              },
            },
            parent: {
              id: {
                $null: true,
              },
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/reviews?${query}`).then((res) => {
        setReviews(res.data.data);
        // console.log(res.data.data);
      });
    })();
  }, [pagination, justCommented]);
  useEffect(() => {
    (async () => {
      // uncomment when deployed on dev since localhost can't access cookie
      await requestSSO
        .get(`/users/me`)
        .then(() => {
          setLogin(true);
        })
        .catch(() => {
          setLogin(false);
        });
    })();
  }, []);
  const onShare = () => {
    if (!login) {
      setShowLoginPopup(true);
    } else {
      setShowSharePopup(true);
    }
  };
  const [reviewError, setReviewError] = useState(false);

  const weirdLookingArrow = (number) => {
    if (number > 0) return <img src="/img/icons/chevrons-up.png"></img>;
    return <img src="/img/icons/chevrons-down.png"></img>;
  };
  const renderDollar = (name) => {
    return ["Volume", "Transactions"].includes(name) ? "$" : "";
  };

  const [showSharePopup, setShowSharePopup] = useState(false);
  const SocialSharePopup = () => (
    <Modal
      title={`Share ${dapp?.name} on Social Media`}
      visible={showSharePopup}
      onCancel={() => setShowSharePopup(false)}
    >
      <BoxJustifyContentSpaceBetween>
        <FacebookShareButton url={dapp?.website} quote="Baby I'm real">
          <FacebookIcon round size={62}></FacebookIcon>
        </FacebookShareButton>
        <TwitterShareButton title="Checkout this Dapp" url={dapp?.website}>
          <TwitterIcon size={62} round />
        </TwitterShareButton>
        <TelegramShareButton title="Checkout this Dapp" url={dapp?.website}>
          <TelegramIcon size={62} round></TelegramIcon>
        </TelegramShareButton>
      </BoxJustifyContentSpaceBetween>
    </Modal>
  );

  const [like, setLike] = useState(false);
  const onLike = async () => {
    if (!login) {
      setShowLoginPopup(true);
    } else {
      //post and change button's
      await requestDapp
        .post("/dapp/favorites", { data: { dapp: id } })
        .then(() => setLike(!like))
        .catch(() => message.error("Something is wrong, damn it!"));
    }
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const query = qs.stringify(
        {
          populate: "*",
          filters: {
            dapp: {
              id: {
                $eq: id,
              },
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/posts?${query}`).then((res) => {
        setPosts(res.data.data.map((post) => post.attributes));
      });
    })();
  }, [dapp]);

  // console.log(dapp);
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
            <p className="blockchain-details-bc-description">{dapp?.description}</p>
          </div>
          <BoxALignItemsCenter className="blockchain-details-tags flex-wrap">
            {dapp?.tags.data.map((tag, i) => (
              <BoxBlueBorderRounded className="py-2 px-3 me-3" key={i}>
                <span>{tag.attributes.name}</span>
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
                <img
                  src="/img/icons/blockchain_facebook.png"
                  onClick={() =>
                    window.open(
                      dapp?.crawl.socials.filter(
                        (soc) => soc.name === "Facebook"
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
                        (soc) => soc.name === "Twitter"
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
                        (soc) => soc.name === "Youtube"
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
            <BoxALignItemsCenter className="mb-2 blockchain-details-follower">
              <User color="#1DBBBD" size={15} />
              <span className="ms-2">{dapp?.crawl.follows} Followers</span>
            </BoxALignItemsCenter>
            <ButtonBlueButLessBorder className="mb-3">
              Follow
            </ButtonBlueButLessBorder>
            <BoxALignItemsCenter className="mb-5">
              <Button className="blockchain-details-right-follow">
                <BoxALignItemsCenter>
                  <File color="black" />
                  <span className="ms-2">Collect</span>
                </BoxALignItemsCenter>
              </Button>
              <Button className="blockchain-details-right-follow">
                <BoxALignItemsCenter onClick={onLike}>
                  {!like ? (
                    <Heart color="black" />
                  ) : (
                    <img src="/img/icons/heart.png" />
                  )}
                  <span className="ms-2">Like</span>
                </BoxALignItemsCenter>
              </Button>
              <Button className="blockchain-details-right-follow">
                <BoxALignItemsCenter onClick={onShare}>
                  <Share2 color="black" />
                  <span className="ms-2">Share</span>
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
                <div className="blockchain-details-price">
                  <Switch
                    defaultChecked
                    className="blockchain-details-price-switch"
                    onChange={() => setShowPrice(!showPrice)}
                  ></Switch>
                  Show Price Comparison On Chart
                </div>
                {stat?.stats.components.map((comp, i) => {
                  return (
                    <div
                      className="col-lg-6 col-12 blockchain-details-dashboard-users"
                      key={i}
                    >
                      <h5 className="mb-0">{comp.name}</h5>
                      <SplineChart
                        data={comp}
                        price={stat?.stats.token.chart}
                        showPrice={showPrice}
                      />
                      <BoxALignItemsStart>
                        <div className="ms-2">
                          <div className="exp-item">
                            <span className="name">24h: </span>
                            <span className="value">
                              {renderDollar(comp.name)}
                              {formatter.format(comp.data["24h"])}
                            </span>
                            <span className="increase">
                              {comp.data["24h_gr"].toFixed(2)}%
                              {updown(comp.data["24h_gr"])}
                            </span>
                          </div>
                          {comp.data.total && (
                            <div className="exp-item">
                              <span className="name">Total: </span>
                              <span className="value">
                                {renderDollar(comp.name)}
                                {formatter.format(comp.data.total)}
                              </span>
                              <span className="time">
                                ({comp.data.total_days} days)
                              </span>
                            </div>
                          )}
                          <div className="exp-item">
                            <span className="name">ATH: </span>
                            <span className="value">
                              {renderDollar(comp.name)}
                              {formatter.format(comp.data.all_time_high)}
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
                      <ButtonBlue
                        className="fw-bold"
                        onClick={() => {
                          router.push("/submit");
                        }}
                      >
                        Submit
                      </ButtonBlue>
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
          {tokenInfo && ( //only shows when token has token info
            <div className="blockchain-details-right-topic">
              <h3 className="mb-3 blockchain-details-section-title">
                Token Profile
              </h3>
              <div className="row">
                <div className="blockchain-details-bordered-top">
                  <p className="blockchain-details-uni">UNI</p>
                  <div className="blockchain-details-uni-content">
                    <div className="row blockchain-details-uni-content-summary">
                      <div className="col-3 blockchain-details-uni-logo-div">
                        <img
                          className="blockchain-details-uni-logo"
                          src={`${URL_API_IMG}${dapp?.logo.data.attributes.url}`}
                        ></img>
                      </div>
                      <div className="col-8">
                        <div className="blockchain-details-flex">
                          Token Price:
                          <div>
                            <p className="blockchain-details-uni-number">
                              ${tokenInfo.price}
                            </p>
                            <p
                              className={` blockchain-details-uni-number blockchain-details-derivative-${incdec(
                                tokenInfo.price_gr
                              )}`}
                            >
                              {tokenInfo.price_gr.toFixed(2)}%
                              {updown(tokenInfo.price_gr)}
                            </p>
                          </div>
                        </div>

                        <div className="blockchain-details-flex">
                          Market Cap:
                          <BoxAlignItemsCenter_FlexColumn>
                            <p className="blockchain-details-uni-number">
                              ${tokenInfo.mkt_cap}
                            </p>
                            <p
                              className={`blockchain-details-uni-number blockchain-details-derivative-${incdec(
                                tokenInfo.mkt_cap_gr
                              )}`}
                            >
                              {formatter.format(tokenInfo.mkt_cap_gr)}%
                              {updown(tokenInfo.mkt_cap_gr)}
                            </p>
                          </BoxAlignItemsCenter_FlexColumn>
                        </div>
                      </div>
                    </div>
                    <div>
                      <SmallSplineChart
                        left={tokenInfo.chart.prices}
                        right={tokenInfo.chart.mkt_caps}
                        labels={tokenInfo.chart.labels}
                      />
                    </div>
                    <DamnBorderedBlackBox>
                      <p className="blockchain-details-metrics">Metrics</p>
                      <p className="blockchain-details-metrics">Value/Amount</p>
                    </DamnBorderedBlackBox>
                    <table className="blockchain-details-metrics-table">
                      <tbody>
                        <tr>
                          <td className="blockchain-details-metrics-row">
                            Token Holders
                          </td>
                          <td>
                            {formatter.format(
                              tokenInfo.other_five_data.holders
                            )}
                          </td>
                          <td>
                            {tokenInfo.other_five_data.holders_gr.toFixed(2)}
                            {weirdLookingArrow(
                              tokenInfo.other_five_data.holders_gr
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="blockchain-details-metrics-row">
                            Active Address
                          </td>
                          <td>
                            {formatter.format(
                              tokenInfo.other_five_data.address
                            )}
                          </td>
                          <td>
                            {tokenInfo.other_five_data.address_gr.toFixed(2)}
                            {weirdLookingArrow(
                              tokenInfo.other_five_data.address_gr
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="blockchain-details-metrics-row">
                            Token Txs
                          </td>
                          <td>
                            {formatter.format(tokenInfo.other_five_data.tx)}
                          </td>
                          <td>
                            {tokenInfo.other_five_data.tx_gr.toFixed(2)}
                            {weirdLookingArrow(tokenInfo.other_five_data.tx_gr)}
                          </td>
                        </tr>
                        <tr>
                          <td className="blockchain-details-metrics-row">
                            Token Tx Volume
                          </td>
                          <td>
                            {formatter.format(
                              tokenInfo.other_five_data.tx_volume
                            )}
                          </td>
                          <td>
                            {tokenInfo.other_five_data.tx_volume_gr.toFixed(2)}
                            {weirdLookingArrow(
                              tokenInfo.other_five_data.tx_volume_gr
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="blockchain-details-right-topic">
            <h3 className="mb-3 blockchain-details-section-title">
              Related Topic
            </h3>
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
          <div className="blockchain-details-right-topic">
            <h3 className="mb-3 blockchain-details-section-title">
              More About {dapp?.name}
            </h3>
            {posts.map((post, i) => {
              // console.log(post);
              return (
                <div className="row" key={i} onClick={()=>window.open(`${window.location.origin}/dapp-news/${post.slug}`)}>
                  <div className="blockchain-details-bordered-top">
                    <div>
                    <img
                      className="blockchain-details-media"
                      src={`${URL_API_IMG}${post?.thumbnail.data.attributes.url}`}
                    ></img>
                    </div>
                    <div className="blockchain-details-wrapper">
                      <p className="blockchain-details-title">{post?.title}</p>
                      <p className="blockchain-details-date">
                        {moment(post?.publishedAt).format("LL")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
            {reviews.map((comment, i) => {
              return (
                <div className="blockchain-details-comment-box" key={i}>
                  <BoxALignCenter_Justify_ItemsBetween className="mb-4">
                    <BoxALignItemsCenter>
                      <Avatar
                        style={{ backgroundColor: "#1DBBBD" }}
                        icon={<UserOutlined />}
                      />
                      <span className="blockchain-details-comment-box-name">
                        {comment.attributes?.user.data?.attributes.username}
                      </span>
                      <Rate
                        allowHalf
                        defaultValue={comment.attributes?.rating}
                      />
                    </BoxALignItemsCenter>
                    <span className="blockchain-details-comment-box-time">
                      {moment(comment.attributes?.createdAt).format("LL")}
                    </span>
                  </BoxALignCenter_Justify_ItemsBetween>
                  <p className="blockchain-details-comment-box-description">
                    {comment.attributes?.comment}
                  </p>
                  <div>
                    <Button>
                      <BoxALignItemsCenter>
                        <MessageSquare color="#1DBBBD" />
                        <span
                          className="ms-2 text-green"
                          onClick={() => openChildReview(comment.id)}
                        >
                          Comment
                        </span>
                      </BoxALignItemsCenter>
                    </Button>
                  </div>
                  {comment.attributes?.replies.data?.length > 0 && (
                    <div className="blockchain-details-viewmore">
                      {showSubcomment.has(i) ? (
                        <div className="blockchain-details-subcomment-section">
                          {comment.attributes?.replies.data.map((reply, ri) => (
                            <div
                              className="blockchain-details-subcomment-box"
                              key={ri}
                            >
                              <BoxALignCenter_Justify_ItemsBetween className="mb-4">
                                <BoxALignItemsCenter>
                                  <Avatar
                                    style={{ backgroundColor: "#1DBBBD" }}
                                    icon={<UserOutlined />}
                                  />
                                  <span className="blockchain-details-comment-box-name">
                                    {
                                      reply.attributes.user.data.attributes
                                        .username
                                    }
                                  </span>
                                </BoxALignItemsCenter>
                                <span className="blockchain-details-comment-box-time">
                                  {moment(reply.attributes.createdAt).format(
                                    "LL"
                                  )}
                                </span>
                              </BoxALignCenter_Justify_ItemsBetween>
                              <p className="blockchain-details-comment-box-description">
                                {reply.attributes.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Button>
                          <BoxALignItemsCenter>
                            <span
                              className="text-green"
                              onClick={() => {
                                viewSubcomment(i);
                                // console.log(showSubcomment);
                              }}
                            >
                              View {comment.attributes?.replies.data?.length}{" "}
                              Comments
                              <img
                                src="/img/icons/chevrons-up.png"
                                className="blockchain-details-chevron"
                              />
                            </span>
                          </BoxALignItemsCenter>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <ButtonBorderBlueTransparent
              className="w-100 rounded-pill py-2"
              onClick={viewMore}
              style={{ cursor: "pointer" }}
            >
              View more
            </ButtonBorderBlueTransparent>
            <br />
            <br />
            <div>
              <Button
                className="text-green blockchain-details-bolder"
                onClick={openParentlessReview}
              >
                Rating and Reviews
              </Button>
            </div>
          </BoxWhiteShadow>
        </div>
      </div>
      <Modal
        className="blockchain-details-reivew"
        title="Write a Reivew"
        visible={showReviewPopup}
        onCancel={(e) => {
          setShowReviewPopup(false);
        }}
      >
        <form onSubmit={onSubmitReview}>
          <p className="blockchain-details-review-star">
            How would you rate this dapp?
          </p>
          <Rate defaultValue={1} value={review.star} onChange={onChangeStar} />
          <p className="blockchain-details-review-star">
            What would you like to share with us?
          </p>
          <textarea
            className="blockchain-details-review-comment"
            placeholder="Write your comment..."
            value={review.comment}
            onChange={onChangeComment}
            name="comment"
          ></textarea>
          {reviewError && (
            <p className="blockchain-details-error">
              {"Your comment can't be empty."}
            </p>
          )}
          <ButtonBlue type="submit">Submit</ButtonBlue>
        </form>
      </Modal>
      <LoginPopup isVisible={showLoginPopup} setVisible={setShowLoginPopup} />
      <SocialSharePopup />
    </section>
  );
};

export default BlockchainDetails;
