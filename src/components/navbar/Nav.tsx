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
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

const { Sider } = Layout;

export const Nav: React.FC = (props: any): ReactElement => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  const isRecruiter =
    state.role.isRecruiter || router.pathname.includes("recruiter");
  const isAdvisor =
    state.role.isRecruiter || router.pathname.includes("advisor");
  const role = isRecruiter ? "recruiter" : "advisor";
  const Navbar = dynamic(() =>
    import("@components").then((mod: any) => mod.Navbar)
  ) as any;
  const [collapsed, setCollapsed] = useState(false);
  const titles = [
    "Trang chủ",
    "Công việc",
    "Người dùng",
    isRecruiter ? "Trường" : "Công ty",
    "Sự kiện",
  ];
  const path = [
    "",
    "/jobs",
    "/users",
    isRecruiter ? "/schools" : "/companies",
    "/events",
  ];
  const items: MenuProps["items"] = [
    BarChartOutlined,
    UserOutlined,
    UploadOutlined,
    ScheduleOutlined,
    TeamOutlined,
  ].map((icon, index) => ({
    key: `/${role}${path[index]}`,
    icon: React.createElement(icon),
    label: titles[index],
    onClick: (e) => {
      if (!(index == 1 && role =='advisor') && index != 2) router.push(`/${role}${path[index]}`);
    },
    children:
      index == 1 && role == "advisor"
        ? [
            {
              label: "Đã duyệt",
              icon: React.createElement(icon),
              onClick: (e) => {
                router.push(`/${role}${path[index]}/approved`);
              },
              key: `/${role}${path[index]}/approved`,
            },
            {
              label: "Chưa duyệt",
              icon: React.createElement(icon),
              onClick: (e) => {
                router.push(`/${role}${path[index]}/unapproved`);
              },
              key: `/${role}${path[index]}/unapproved`,
            },
          ]
        : index == 2
        ? [
            {
              label: isRecruiter ? "Ứng viên" : "Học sinh",
              icon: React.createElement(icon),
              onClick: (e) => {
                console.log(path[index])
                router.push(
                  `/${role}${path[index]}/students`
                );
              },
              key: `/${role}${path[index]}/students`,
            },
            {
              label: "Cố vấn",
              icon: React.createElement(icon),
              onClick: (e) => {
                router.push(`/${role}${path[index]}/advisors`);
              },
              key: `/${role}${path[index]}/advisors`,
            },
            {
              label: "Nhà tuyển dụng",
              icon: React.createElement(icon),
              onClick: (e) => {
                router.push(`/${role}${path[index]}/recruiters`);
              },
              key: `/${role}${path[index]}/recruiters`,
            },
          ]
        : undefined,
  }));

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  //   key,
  //   label: `nav ${key}`,
  // }));

  console.log(router.pathname);

  if (isRecruiter || isAdvisor) {
    return (
      <Layout>
        <Navbar
          searchBarHidden={
            router.pathname === "/student/jobs" ||
            router.pathname === "/student/events"
          }
        />
        <Layout>
          <Sider className="navbar-sider">
            <div className="navbar-sider-logo">Logo</div>
            <Menu
              defaultSelectedKeys={[`/${role}`]}
              defaultOpenKeys={[
                router.pathname.includes("jobs") && role === 'advisor'
                  ? `/${role}/jobs`
                  : `/${role}/users`,
              ]}
              selectedKeys={[router.pathname]}
              mode="inline"
              // theme="dark"
              inlineCollapsed={collapsed}
              items={items}
            />
          </Sider>
          <Layout className="navbar-with-sider">
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
          router.pathname === "/student/jobs" ||
          router.pathname === "/student/events"
        }
      />
      <div>{props.children}</div>
    </>
  );
};
