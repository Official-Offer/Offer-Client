import React, { CSSProperties } from "react";
import Image from "next/image";
import { Space } from "antd";
import { OfferLogo } from "@components/icons";
import { FacebookFilled, InstagramOutlined, LinkedinFilled } from "@ant-design/icons";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div>
        <OfferLogo className="footer-logo" />
        <h2>Offer</h2>
        <p>Công cụ hỗ trợ hướng nghiệp cho học sinh</p>
        <div className="footer-social">
          <a href="https://www.facebook.com/offer.vn" target="_blank">
            <FacebookFilled />
          </a>
          <a href="https://www.instagram.com/offer.vn" target="_blank">
            <InstagramOutlined />
          </a>
          <a href="https://www.linkedin.com/company/offer-vn" target="_blank">
            <LinkedinFilled />
          </a>
        </div>
      </div>
      <nav className="footer-nav">
        <div className="footer-link">
          <div className="footer-link-title">
            <h4>Công việc</h4>
            <hr />
          </div>
          <ul>
            <li>
              <a href="/">Thực tập</a>
            </li>
            <li>
              <a href="/">Fresher</a>
            </li>
            <li>
              <a href="/">Tình nguyện</a>
            </li>
            <li>
              <a href="/">Part-time</a>
            </li>
            <li>
              <a href="/">Full-time</a>
            </li>
            <li>
              <a href="/">Làm từ xa</a>
            </li>
          </ul>
        </div>
        <div className="footer-link">
          <div className="footer-link-title">
            <h4>Trung tâm hướng nghiệp</h4>
            <hr />
          </div>
          <ul>
            <li>
              <a href="/">Tạo CV</a>
            </li>
            <li>
              <a href="/">Kết nối advisor</a>
            </li>
            <li>
              <a href="/">Luyện phỏng vấn</a>
            </li>
            <li>
              <a href="/">Mentor</a>
            </li>
            <li>
              <a href="/">Phát triển bản thân</a>
            </li>
            <li>
              <a href="/">Phát triển nghề nghiệp</a>
            </li>
            <li>
              <a href="/">Trắc nghiệm tính cách</a>
            </li>
          </ul>
        </div>
        <div className="footer-link">
          <div className="footer-link-title">
            <h4>Truy cập nhanh</h4>
            <hr />
          </div>
          <ul>
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/">Liên hệ</a>
            </li>
            <li>
              <a href="/">Giới thiệu</a>
            </li>
            <li>
              <a href="/">Công việc</a>
            </li>
            <li>
              <a href="/">Sự kiện</a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};