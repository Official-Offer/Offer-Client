import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import request from "@services/apiDapp";
import { useState } from "react";
import { ButtonBlue } from "@styles/styled-components/styledButton";
import { URL_API_ADMIN } from "@config/index";
import message from "antd/lib/message";
import router from "next/router";

const CommentBox = ({ text, name, postId }: any) => {
  console.log(postId)
  const [replyTo, setReplyTo] = useState(name ? name : "");
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
    const data = {
      data: {
        "comment": e.target[0].value,
        // "rating": 5,
        "post": postId,
        // "user": 1
      }
    };
    await request.post(`/dapp/comments`, data).then((res) => {
      if (res.status == 200) {
        message.success("Comment created");
        e.target.reset();
      } else {
        message.success("Something was wrong! Please try again");
      }
    })
    .then(() => router.reload()); //force api refetch;
  }

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
