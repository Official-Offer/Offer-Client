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
    const [comments, setComments] = useState([""])
    useEffect(() => {
        (async () => {
          const commentQuery = qs.stringify(
            {
              populate: "*",
              filters: {
                post: {
                  title: news[0]?.attributes.title,
                },
              },
            },
            {
              encodeValuesOnly: true,
            }
          );
          await request.get(`/reviews?${commentQuery}`).then((res) => {
            // console.log(res);
            setComments(res.data.data);
          });
        })();
      }, [news]);
    
console.log(comments);
    

  return (
    <BoxWhiteShadow>
      <BoxALignCenter_Justify_ItemsBetween className="p-4">
        <h3>COMMENTS</h3>
        <ButtonBlue>
          <CommentBox text="Write Comment"  title={news[0]?.attributes.title}/>
        </ButtonBlue>
      </BoxALignCenter_Justify_ItemsBetween>
      <div className="p-4 news-details-comment">
        {comments.map((cmt: any, i: number) => {
          return (
            <div className="news-details-comment-box" key={i}>
              <BoxALignCenter_Justify_ItemsBetween className="mb-4">
                <BoxALignItemsCenter>
                  <Avatar
                    style={{ backgroundColor: "#1DBBBD" }}
                    icon={<UserOutlined />}
                  />
                  <span className="news-details-comment-box-name">
                    {cmt.attributes?.user.data?.attributes.username}
                  </span>
                </BoxALignItemsCenter>
                <span className="news-details-comment-box-time">
                  {moment(cmt.attributes?.createdAt).format("LL")}
                </span>
              </BoxALignCenter_Justify_ItemsBetween>
              <p className="news-details-comment-box-description">
                {cmt.attributes?.comment}
              </p>
              <div>
                {/* <Button> */}
                <a target="_blank" rel="noopener noreferrer">
                  <BoxALignItemsCenter>
                    <MessageSquare color="#1DBBBD" />
                    <CommentBox
                      text="Reply"
                      name={cmt.attributes?.comment}
                      title={news[0]?.attributes.title}
                      className="ms-2 text-green"
                    >
                      Reply
                    </CommentBox>
                  </BoxALignItemsCenter>
                </a>
                {/* </Button> */}
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
      </div>
    </BoxWhiteShadow>
  );
};
export default CommentSection;
