import { SubmitButton } from "@components/button/SubmitButton";
import { LeftPanel } from "@styles/styled-components/styledDiv";
import { Button, Form, Input } from "antd";
import { NextPage } from "next";
import router from 'next/router';

const Contact: NextPage = () => {
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
          <div className="contact-button">
            <Button size="large" color="pink" onClick={()=>{
                router.push('/registration')
            }}>
              Đăng kí để đăng tin tuyển dụng
            </Button>
          </div>
          {/* <h1>Liên hệ</h1> */}
          <h3>Liên hệ</h3>
          <p>Email: kiento0905.hec@gmail.com</p>
          <p>SĐT: 0987654321</p>
          <h3>Hoặc để lại lời nhắn của bạn tại đây:</h3>
          <Form className="form" onFinish={() => {}} layout="vertical">
            <div className="form-flex">
              <div className="form-input">
                <Form.Item label="Nhập email hoặc số điện thoại">
                  <Input required className="form-item" onChange={() => {}} />
                </Form.Item>
                <Form.Item label="Lời nhắn">
                  <Input.TextArea
                    rows={4}
                    required
                    className="form-item"
                    onChange={() => {}}
                  />
                </Form.Item>
              </div>
              <SubmitButton text="Gửi" />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
