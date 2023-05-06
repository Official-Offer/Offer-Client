import React, { ReactElement, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ScheduleOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import router, { useRouter } from "next/router";
import Link from "next/link";

const { Sider } = Layout;

export const VerticalNav: React.FC = (props: any): ReactElement => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);
  const titles = ["Dữ liệu", "Công việc", "Ứng viên", "Trường", "Sự kiện"];
  const path = ["/", "/jobs", "/applicants", "schools", "/events"];

  const items: MenuProps["items"] = [
    BarChartOutlined,
    UserOutlined,
    UploadOutlined,
    ScheduleOutlined,
    TeamOutlined,
  ].map((icon, index) => ({
    key: path[index],
    icon: React.createElement(icon),
    label: titles[index],
    onClick: (e) => {
      setSelectedKey(path[index]);
      router.push(`/recruiter/${path[index]}`);
      //   setSelectedKey([String(index + 1)]);
    },
    children:
      index == 1
        ? [
            { label: "Đã duyệt", icon: React.createElement(icon), key: "" },
            { label: "Chưa duyệt", icon: React.createElement(icon), key: "" },
          ]
        : index == 2
        ? [
            { label: "CV", icon: React.createElement(icon), key: "" },
            { label: "Phỏng vấn", icon: React.createElement(icon), key: "" },
            { label: "Đã tuyển", icon: React.createElement(icon), key: "" },
          ]
        : undefined,
  }));

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
          >
            Home
          </div>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            // key={selectedKey}
            selectedKeys={[selectedKey]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
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
