import React, { ReactElement } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import router, { useRouter } from "next/router";
// import VerticalNav from '@components/navbar/VerticalNav';

const { Header, Content, Footer, Sider } = Layout;

const titles = ["Dữ liệu", "Công việc", "Ứng viên", "Sự kiện"];
const path = ["/recruiter", "/jobs", "/applicants", "/events"];
const items: MenuProps["items"] = [
  BarChartOutlined,
  UserOutlined,
  UploadOutlined,
  TeamOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: titles[index],
  onClick: () => {
    router.push(`/recruiter/${path[index]}`);
  }
}));

export const VerticalNav: React.FC = (props: any): ReactElement => {
  const router = useRouter();

  if (
    router.pathname.includes("recruiter") ||
    router.pathname.includes("advisor")
  ) {
    return (
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              height: 32,
              margin: 25,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <div>{props.children}</div>
        </Layout>
      </Layout>
    );
  }
  return <div>{props.children}</div>;
};

// export default VerticalNav;
