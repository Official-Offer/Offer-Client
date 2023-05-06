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
      setSelectedKey(e.key);
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

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      //   onClick,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items2: MenuItem[] = [
    getItem("Option 1", "1", <CloudOutlined />),
    getItem("Option 2", "2", <ShopOutlined />),
    getItem("Option 3", "3", <VideoCameraOutlined />),

    getItem("Navigation One", "sub1", <CloudOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),

    getItem("Navigation Two", "sub2", <CloudOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),

      getItem("Submenu", "sub3", null, [
        getItem("Option 11", "11"),
        getItem("Option 12", "12"),
      ]),
    ]),
  ];

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
