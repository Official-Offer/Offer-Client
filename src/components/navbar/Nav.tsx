import React, { ReactElement, useRef, useState } from "react";
import {
  BarChartOutlined,
  LockOutlined,
  PlusOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UnlockOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import router, { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers";
import Image from "next/image";
import { deleteCookie, removeCookies } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { userLogOut } from "@services/apiUser";
import { IconButton } from "@styles/styled-components/styledButton";

const { Sider } = Layout;

export const Nav: React.FC = (props: any): ReactElement => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.account);
  const isRecruiter =
    state.role.isRecruiter || router.pathname.includes("recruiter");
  const isAdvisor = state.role.isAdvisor || router.pathname.includes("advisor");
  const role = isRecruiter ? "recruiter" : "advisor";
  const { data: session, status } = useSession();
  const Navbar = dynamic(() =>
    import("@components").then((mod: any) => mod.Navbar)
  ) as any;
  const mutation = useMutation({
    // queryKey: ["login"],
    mutationFn: userLogOut,
    onSuccess: async (data) => {
      // Invalidate and refetch
      deleteCookie("cookieToken");
      deleteCookie("role");
      deleteCookie("id");

      // localStorage.removeItem("cookieToken");
      // localStorage.removeItem("id");
      // localStorage.removeItem("role");

      router.push("/login").then(() => {
        router.reload();
      });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      // queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
  const [collapsed, setCollapsed] = useState(false);
  const titles = [
    // "Đăng tuyển",
    "Công việc",
    // isRecruiter ? "Ứng Viên" : "Học sinh",
    isRecruiter ? "Trường" : "Công ty",
    "Tài khoản",
    "Đăng xuất",
  ];
  const path = [
    // "/postJobs",
    "/jobs",
    // isRecruiter ? "/applicants" : "/students",
    isRecruiter ? "/schools" : "/companies",
    "/profile",
    "/logout",
  ];
  const items: MenuProps["items"] = [
    // BarChartOutlined,
    SnippetsOutlined,
    TeamOutlined,
    // UploadOutlined,
    UserOutlined,
    UnlockOutlined,
  ].map((icon, index) => ({
    key: `/${role}${path[index]}`,
    icon: React.createElement(icon),
    label: titles[index],
    onClick: (e) => {
      if (index == 3) {
        if (status == "authenticated") {
          signOut().then(() => {
            router.push("/login");
          });
        } else {
          //sign out traditional way
          mutation.mutate();
        }
      } else {
        router.push(`/${role}${path[index]}`);
      }

      // else if (!(index == 0 && role == "advisor")) {
      //   router.push(`/${role}${path[index]}`);
      // }
    },
    // children:
    //   index == 0 && role == "advisor"
    //     ? [
    //         {
    //           label: "Chưa duyệt",
    //           icon: React.createElement(icon),
    //           onClick: (e) => {
    //             router.push(`/${role}${path[index]}/unapproved`);
    //           },
    //           key: `/${role}${path[index]}/unapproved`,
    //         },
    //         {
    //           label: "Đã duyệt",
    //           icon: React.createElement(icon),
    //           onClick: (e) => {
    //             router.push(`/${role}${path[index]}/approved`);
    //           },
    //           key: `/${role}${path[index]}/approved`,
    //         },
    //       ]
    //     : undefined,
  }));

  console.log(router.pathname);

  if (
    router.pathname.includes("recruiter") ||
    router.pathname.includes("advisor")
  ) {
    return (
      <div>
        {/* <Navbar
        searchBarHidden={
          router.pathname.includes("/student/jobs/[id]") ||
          router.pathname.includes("/student/events/[id]")
        }
      /> */}
        <Layout style={{ minHeight: "100vh" }}>
          <Sider className="navbar-sider">
            <div className="navbar-sider-logo">
              <Image src="/images/logo.png" width={40} height={40} alt="logo"/>
            </div>
            <IconButton
              round
              className="table-add-btn"
              backgroundColor={"#D30B81"}
              style={{ margin: "auto", width: "150px", marginBottom: "10px" }}
              onClick={() => {
                router.push(`/${role}/postJobs/jobForm`);
              }}
            >
              <div className="table-add-btn-body">
                <span>Tạo công việc</span>
                <span>
                  <PlusOutlined />
                </span>
              </div>
            </IconButton>
            <Menu
              defaultSelectedKeys={[`/${role}`]}
              // defaultOpenKeys={[isAdvisor ? `/${role}/jobs` : ``]}
              selectedKeys={[router.pathname]}
              mode="inline"
              inlineCollapsed={collapsed}
              items={items}
            />
          </Sider>
          <Layout className="navbar-with-sider">
            <div>{props.children}</div>
          </Layout>
        </Layout>
      </div>
    );
  }
  return (
    <>
      <Navbar
        searchBarHidden={
          router.pathname.includes("/student/jobs") ||
          router.pathname.includes("/student/events/[id]")
        }
      />
      <div>{props.children}</div>
    </>
  );
};
