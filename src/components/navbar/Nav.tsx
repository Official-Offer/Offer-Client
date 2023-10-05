import React, { ReactElement, useRef, useState } from "react";
import {
  BarChartOutlined,
  // ScheduleOutlined,
  // TeamOutlined,
  UploadOutlined,
  UserOutlined,
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
    // "Trang chủ",
    "Công việc",
    isRecruiter ? "Ứng Viên" : "Học sinh",
    isRecruiter ? "Trường" : "Công ty",
    // "Sự kiện",
  ];
  const path = [
    // "",
    "/jobs",
    isRecruiter ? "/applicants" : "/students",
    isRecruiter ? "/schools" : "/companies",
    // "/events",
  ];
  const items: MenuProps["items"] = [
    BarChartOutlined,
    UserOutlined,
    UploadOutlined,
    // ScheduleOutlined,
    // TeamOutlined,
  ].map((icon, index) => ({
    key: `/${role}${path[index]}`,
    icon: React.createElement(icon),
    label: titles[index],
    onClick: (e) => {
      if (!(index == 1 && role =='advisor') && index != 2) router.push(`/${role}${path[index]}`);
    }
  }));

  console.log(router.pathname);

  // if (isRecruiter || isAdvisor) {
    return (
      <Layout>
        <Navbar
          searchBarHidden={
            router.pathname.includes("/student/jobs/[id]") ||
            router.pathname.includes("/student/events/[id]")
          }
        />
        <Layout>
          <Sider className="navbar-sider">
            <Menu
              defaultSelectedKeys={[`/${role}`]}
              selectedKeys={[router.pathname]}
              mode="inline"
              inlineCollapsed={collapsed}
              items={items}
            />
            <div className="navbar-sider-logo">Logo</div>
          </Sider>
          <Layout className="navbar-with-sider">
            <div>{props.children}</div>
          </Layout>
        </Layout>
      </Layout>
    );
  // }
  // return (
  //   <>
  //     <Navbar
  //       searchBarHidden={
  //         router.pathname.includes("/student/jobs/[id]") ||
  //         router.pathname.includes("/student/events/[id]")
  //       }
  //     />
  //     <div>{props.children}</div>
  //   </>
  // );
};
