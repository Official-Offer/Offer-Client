import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useState } from "react";
import { ButtonBlue } from "@styles/styled-components/styledButton";
import axios from "axios";
import { URL_API_ADMIN } from "@config/dev.config";
import message from "antd/lib/message";

const PopUp = ({ text }: any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const className =
    text === "Write Comment"
      ? "news-details-comment-popup-popup-1"
      : "news-details-comment-popup-popup-2";
  const onSubmitMessage = async (e: any) => {
    e.preventDefault();
    const data = {
      data: {
        username: e.target.value,
      },
    };
    await axios.post(`${URL_API_ADMIN}/api/reviews`, data).then((res) => {
      if (res.status == 200) {
        message.success("Comment created");
        e.target.reset();
      } else {
        message.success("Something was wrong! Please try again");
      }
    });
    handleClose();
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
          <form
            className="mb-3"
            //controlId="exampleForm.ControlTextarea1"
            onSubmit={onSubmitMessage}
          >
            <p>What would you like to share with us?</p>
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

export default PopUp;
