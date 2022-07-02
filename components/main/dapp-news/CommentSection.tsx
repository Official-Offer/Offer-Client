import { UserOutlined } from "@ant-design/icons";
import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignItemsCenter,
  BoxWhiteShadow,
  BoxWhiteShadowItem,
} from "@styles/styled-components/styledBox";
import {
  ButtonBlue,
  ButtonBorderBlueTransparent,
} from "@styles/styled-components/styledButton";
import { Avatar } from "antd";
import moment from "moment";
import qs from "qs";
import { useEffect, useState } from "react";
import { MessageSquare } from "react-feather";
import CommentBox from "./CommentBox";
import request from "@services/apiService";

const CommentSection = ({ news }: any) => {
  const [comments, setComments] = useState([""]);
  const [replies, setReplies] = useState([""]);
  const [viewMore, setNumberViewMore] = useState(5);
  useEffect(() => {
    (async () => {
      const commentQuery = qs.stringify(
        {
          populate: ["user", "replies", "replies.user"],
          pagination: {
            page: 1,
            pageSize: viewMore,
          },
          filters: {
            post: {
              slug: news[0]?.attributes.slug,
            },
            parent: {
              id: {
                $null: true,
              },
            },
          },
          sort: [`createdAt:desc`],
        },
        {
          encodeValuesOnly: true,
        }
      );
      await request.get(`/reviews?${commentQuery}`).then((res) => {
        setComments(res.data.data);
      });
    })();
  }, [news, viewMore]);

  return (
    <div>
      <BoxALignCenter_Justify_ItemsBetween className="p-4">
        <h3>COMMENTS</h3>
        <ButtonBlue>
          <CommentBox text="Write Comment" postId={news[0]?.id} />
        </ButtonBlue>
      </BoxALignCenter_Justify_ItemsBetween>
      <div className="p-4 news-details-comment">
        {comments.map((cmt: any, i: number) => {
          let displayName = cmt.attributes?.user.data?.attributes.displayName;
          let userName = cmt.attributes?.user.data?.attributes.username;
          return (
            <>
              <div className="news-details-comment-box" key={i}>
                <BoxALignCenter_Justify_ItemsBetween className="mb-4">
                  <BoxALignItemsCenter>
                    <Avatar
                      style={{ backgroundColor: "#1DBBBD" }}
                      icon={<UserOutlined />}
                    />
                    <span className="news-details-comment-box-name">
                      {displayName? displayName : userName}
                    </span>
                  </BoxALignItemsCenter>
                  <span className="news-details-comment-box-time">
                    {moment(cmt.attributes?.createdAt).format("LL")}
                  </span>
                </BoxALignCenter_Justify_ItemsBetween>
                <p className="news-details-comment-box-description">
                  {cmt.attributes?.comment}
                </p>
                {/* <p className="">
                  {cmt.attributes?.replies.data.map((reply: any, i: number) => (
                    <span key={i}>
                      <div className="news-details-comment-box-reply">
                        <BoxALignCenter_Justify_ItemsBetween>
                          <div className="news-details-comment-box-name">
                            <Avatar
                              className="news-details-comment-box-reply-title"
                              size={25}
                              style={{ backgroundColor: "#1DBBBD" }}
                              icon={<UserOutlined />}
                            />
                            {reply.attributes?.user.data?.attributes.username}
                          </div>
                          <div className="news-details-comment-box-time">
                            {moment(reply.attributes?.createdAt).format("LL")}
                          </div>
                        </BoxALignCenter_Justify_ItemsBetween>
                        <div className="news-details-comment-box-reply-description">
                          {reply.attributes.comment}
                        </div>
                      </div>
                    </span>
                  ))}
                </p> */}
                <div>
                  <a target="_blank" rel="noopener noreferrer">
                    <BoxALignItemsCenter>
                      {/* <MessageSquare color="#1DBBBD" /> */}
                      {/* <CommentBox
                        text="Reply"
                        name={cmt.attributes?.user.data?.attributes.username}
                        commentId={cmt.id}
                        postId={news[0]?.id}
                        className="ms-2 text-green"
                      >
                        Reply
                      </CommentBox> */}
                    </BoxALignItemsCenter>
                  </a>
                </div>
                <hr />
              </div>
            </>
          );
        })}
        <ButtonBorderBlueTransparent
          style={{ cursor: "pointer" }}
          className="w-100 rounded-pill py-2"
          onClick={() => setNumberViewMore(viewMore + 5)}
        >
          View more
        </ButtonBorderBlueTransparent>
        <br />
        <br />
      </div>
    </div>
  );
};
export default CommentSection;
