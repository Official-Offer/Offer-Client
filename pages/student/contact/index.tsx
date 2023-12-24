import { ArrowRightOutlined } from "@ant-design/icons";
import { SubmitButton } from "@components/button/SubmitButton";
import { contact } from "@services/apiUser";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { NextPage } from "next";
import router from "next/router";
import { useState } from "react";

const Contact: NextPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const contactMutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: contact,
    onSuccess: async (data: any) => {
      // Invalidate and refetch
      // router.reload();
      setSubmitted(true);
    },
    onError: (error: any) => {
      // console.log(error.response.data.message);
      setErrorMessage("Gửi thất bại");
    },
  });

  return (
    <div className="contact">
      <div className="contact-content">
        <div className="contact-content-form">
          <h1>
            Trang tuyển dụng dành cho học sinh, sinh viên
            <br />
            tại các trường đại học trên cả nước
          </h1>
          <br />
          {/* <div className="contact-button">
            <Button
              className="contact-button-btn"
              size="large"
              onClick={() => {
                router.push("/registration");
              }}
            >
              Đăng kí/đăng nhập để đăng tin tuyển dụng <ArrowRightOutlined />
            </Button>
          </div> */}
          {/* <h1>Liên hệ</h1> */}
          <h2>Liên hệ</h2>
          <p>Email: kiento0905.hec@gmail.com</p>
          <p>SĐT: 0987654321</p>
          <h3>Hoặc để lại lời nhắn của bạn tại đây:</h3>
          {submitted ? (
            <>
              {contactMutation.isSuccess && (
                <p style={{ color: "green" }}>
                  Gửi thành công, chúng tôi sẽ liên hệ với bạn sớm nhất có thể
                </p>
              )}
            </>
          ) : (
            <Form className="form" onFinish={() => {}} layout="vertical">
              <div className="form-flex">
                <div className="form-input">
                  <div className="form-grid">
                    <Form.Item label="Email">
                      <Input
                        // required
                        className="form-item"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                      <Input
                        // required
                        className="form-item"
                        onChange={(event) => {
                          setPhone(event.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  {/* Title */}
                  <Form.Item required label="Tiêu đề">
                    <Input
                      required
                      className="form-item"
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item label="Lời nhắn">
                    <Input.TextArea
                      rows={4}
                      className="form-item"
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
                {errorMessage && (
                  <p className="register-content-error">{errorMessage}</p>
                )}
                <SubmitButton
                  isLoading={contactMutation.isLoading}
                  text="Gửi"
                  onClick={() => {
                    // console.log(phone, email);
                    if (!phone && !email) {
                      setErrorMessage("Vui lòng nhập email hoặc số điện thoại");
                      return;
                    }
                    if (!title) {
                      setErrorMessage("Vui lòng nhập tiêu đề");
                      return;
                    }
                    contactMutation.mutate({
                      title,
                      message,
                      sender_email: email,
                      sender_phone: phone,
                    });
                  }}
                />
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
