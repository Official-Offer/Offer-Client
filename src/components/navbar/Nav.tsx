import React, { ReactElement, useRef, useState } from "react";
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
import { Header } from "antd/lib/layout/layout";
import dynamic from "next/dynamic";

const { Sider } = Layout;

export const Nav: React.FC = (props: any): ReactElement => {
  const router = useRouter();
  // const [selectedKey, setSelectedKey] = useState("/recruiter");
  // const selectedRef = useRef("1");
  const Navbar = dynamic(() =>
    import("@components").then((mod: any) => mod.Navbar)
  ) as any;
  const [collapsed, setCollapsed] = useState(false);
  const titles = ["Dữ liệu", "Công việc", "Ứng viên", "Trường", "Sự kiện"];
  const path = ["", "/jobs", "/applicants", "/schools", "/events"];
  // console.log(router.pathname);
  const items: MenuProps["items"] = [
    BarChartOutlined,
    UserOutlined,
    UploadOutlined,
    ScheduleOutlined,
    TeamOutlined,
  ].map((icon, index) => ({
    key: `/recruiter${path[index]}`,
    icon: React.createElement(icon),
    label: titles[index],
    onClick: (e) => {
      if (index != 1) router.push(`/recruiter${path[index]}`);
    },
    children:
      index == 1
        ? [
            {
              label: "Đã duyệt",
              icon: React.createElement(icon),
              onClick: (e) => {
                router.push(`/recruiter${path[index]}/verified`);
              },
              key: `/recruiter${path[index]}/verified`,
            },
            {
              label: "Chưa duyệt",
              icon: React.createElement(icon),
              onClick: (e) => {
                router.push(`/recruiter${path[index]}/unverified`);
              },
              key: `/recruiter${path[index]}/unverified`,
            },
          ]
        : undefined,
    // index == 2
    // ? [
    //     {
    //       label: "Vòng đơn",
    //       icon: React.createElement(icon),
    //       onClick: (e) => {
    //         router.push(`/recruiter${path[index]}/resume`);
    //       },
    //       key: `/recruiter${path[index]}/resume`,
    //     },
    //     {
    //       label: "Vòng phỏng vấn",
    //       icon: React.createElement(icon),
    //       onClick: (e) => {
    //         router.push(`/recruiter${path[index]}/interview`);
    //       },
    //       key: `/recruiter${path[index]}/interview`,
    //     },
    //   ]
    // :
  }));

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  if (
    router.pathname.includes("recruiter") ||
    router.pathname.includes("advisor")
  ) {
    return (
      <Layout>
        <Navbar
          searchBarHidden={
            router.pathname.includes("/student/jobs") ||
            router.pathname.ncludes("/student/events")
          }
        />
        <Layout>
          <Sider className="recruiter-sider">
            <div className="recruiter-sider-logo">Home</div>
            <Menu
              defaultSelectedKeys={["/recruiter"]}
              defaultOpenKeys={[
                router.pathname.includes("jobs")
                  ? "/recruiter/jobs"
                  : "/recruiter/applicants",
              ]}
              selectedKeys={[router.pathname]}
              mode="inline"
              // theme="dark"
              inlineCollapsed={collapsed}
              items={items}
            />
          </Sider>
          <Layout className="layout-with-sider">
            <div>{props.children}</div>
          </Layout>
        </Layout>
      </Layout>
    );
  }
  return (
    <>
      <Navbar
        searchBarHidden={
          router.pathname.includes("/student/jobs") ||
          router.pathname.includes("/student/events")
        }
      />
      <div>{props.children}</div>
    </>
  );
};
