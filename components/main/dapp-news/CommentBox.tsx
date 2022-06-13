import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import request from "@services/apiDapp";
import { useState } from "react";
import { ButtonBlue } from "@styles/styled-components/styledButton";
import { URL_API_ADMIN } from "@config/index";
import message from "antd/lib/message";
import router from "next/router";
import LoginPopup from "@components/navbar/LoginPopup";

const CommentBox = ({ text, name, commentId, postId }: any) => {
  // console.log(commentId);
  const [replyTo, setReplyTo] = useState(name ? name : "");
  const [user, setUser] = useState<any>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const className =
    text === "Write Comment"
      ? "news-details-comment-popup-popup-1"
      : "news-details-comment-popup-popup-2";
  const onSubmitMessage = async (e: any) => {
    //console.log(e);
    e.preventDefault();
    const data = commentId ? 
    {
      data: {
        comment: e.target[0].value,
        parent: commentId,
        post: postId,
      },
    }
    : {
      data: {
        comment: e.target[0].value,
        post: postId,
      },
    };
    
    try {
      await request
        .post(`/dapp/comments`, data)
        .then((res) => {
          // console.log(res.status)
            message.success("Comment created");
            e.target.reset();
            handleClose();
          // }
        })
      } catch (err) {
            console.log("wrong");
            // <LoginPopup
            //   setUser={setUser}
            //   isVisible={isPopupVisible}
            //   setVisible={setPopupVisible}
            // />;
            message.error("Please Log In");
            e.target.reset();
            handleClose();
      }
  };

  return (
    <>
      <span onClick={handleShow} className={className}>
        {text}
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="mb-3" onSubmit={onSubmitMessage}>
            <p>
              {replyTo
                ? `Reply to ${replyTo}`
                : `What would you like to share with us?`}
            </p>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Message"
              name="message"
            />
            <Modal.Footer>
              <ButtonBlue type="submit">Send Comment</ButtonBlue>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommentBox;
