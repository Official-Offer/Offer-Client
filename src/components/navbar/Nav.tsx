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
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";

const { Sider } = Layout;

export const Nav: React.FC = (props: any): ReactElement => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  const isRecruiter = state.role.isRecruiter || router.pathname.includes("recruiter");
  const isAdvisor = state.role.isRecruiter || router.pathname.includes("advisor");
  const role = isRecruiter ? "recruiter" : "advisor";
  // const selectedRef = useRef("1");
  const Navbar = dynamic(() =>
    import("@components").then((mod: any) => mod.Navbar)
  ) as any;
  const [collapsed, setCollapsed] = useState(false);
  const titles = isRecruiter ? ["Trang chủ", "Công việc", "Ứng viên", "Trường", "Sự kiện"] : ["Trang chủ", "Công việc", "Học sinh", "Công ty", "Sự kiện"];
  const path = isRecruiter ? ["", "/jobs", "/applicants", "/schools", "/events"] :  ["", "/jobs", "/students", "/companies", "/events"];
  // console.log(router.pathname);
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
      if (index != 1) router.push(`/${role}${path[index]}`);
    },
    children:
      index == 1
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
        : undefined,
  }));


  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  if (
    isRecruiter|| 
    isAdvisor
  ) {
    return (
      <Layout>
        <Navbar
          searchBarHidden={
            router.pathname.includes("/student/jobs/[id]") ||
            router.pathname.ncludes("/student/events/[id")
          }
        />
        <Layout>
          <Sider className="navbar-sider">
            <div className="navbar-sider-logo">Logo</div>
            <Menu
              defaultSelectedKeys={[`/${role}`]}
              defaultOpenKeys={[
                router.pathname.includes("jobs")
                  ? `/${role}/jobs`
                  : `/${role}/applicants`
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
          router.pathname.includes("/student/jobs/[id]") ||
          router.pathname.includes("/student/events/[id]")
        }
      />
      <div>{props.children}</div>
    </>
  );
};
