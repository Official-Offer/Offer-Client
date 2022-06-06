import { UserOutlined } from "@ant-design/icons";
import { BoxALignCenter_Justify_ItemsBetween, BoxALignItemsCenter, BoxWhiteShadow } from "@styles/styled-components/styledBox";
import { ButtonBlue, ButtonBorderBlueTransparent } from "@styles/styled-components/styledButton";
import { Avatar, Button } from "antd";
import moment from "moment";
import { MessageSquare } from "react-feather";
import CommentBox from "./CommentBox";

const CommentSection = ({ news }) => (
  <div>
    <BoxALignCenter_Justify_ItemsBetween className="mb-4">
      <h3>COMMENTS</h3>
      <ButtonBlue>
        <CommentBox text="Write Comment" />
      </ButtonBlue>
    </BoxALignCenter_Justify_ItemsBetween>
    <BoxWhiteShadow className="p-4 news-details-comment">
      {news[0]?.attributes.reviews.data.map((cmt: any, i: number) => {
        console.log(cmt);
        return (
          <div className="news-details-comment-box" key={i}>
            <BoxALignCenter_Justify_ItemsBetween className="mb-4">
              <BoxALignItemsCenter>
                <Avatar
                  style={{ backgroundColor: "#1DBBBD" }}
                  icon={<UserOutlined />}
                />
                <span className="news-details-comment-box-name">
                  {cmt.attributes.comment}
                </span>
              </BoxALignItemsCenter>
              <span className="news-details-comment-box-time">
                {moment(cmt.attributes.createdAt).format("LL")}
              </span>
            </BoxALignCenter_Justify_ItemsBetween>
            <p className="news-details-comment-box-description">
              {cmt.attributes.comment}
            </p>
            <div>
              <Button>
                <BoxALignItemsCenter>
                  <MessageSquare color="#1DBBBD" />
                  <CommentBox
                    text="Reply"
                    name={cmt.attributes.comment}
                    className="ms-2 text-green"
                  >
                    Reply
                  </CommentBox>
                </BoxALignItemsCenter>
              </Button>
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
    </BoxWhiteShadow>
  </div>
);
export default CommentSection;
