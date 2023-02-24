import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Navbar: React.FC = () => {
  const router: any = useRouter();
  // console.log(router.pathname);
  const listMenu = [
    {
        name: "Home",
        link: "/student",
        newTab: false,
        routeSelected: "/student",
      },
    {
      name: "Thông báo",
      link: "/student/notifications",
      newTab: false,
      routeSelected: "/student/notifications",
    },
    {
      name: "Sự kiện",
      link: "/student/events",
      newTab: false,
      routeSelected: "/student/events",
    },
    {
      name: "Tin nhắn",
      link: "/student/messages",
      newTab: false,
      routeSelected: "/student/messages",
    },
    {
      name: "Công việc",
      link: "/student/jobs",
      newTab: false,
      routeSelected: "/student/jobs",
    },
    {
      name: "Đăng kí",
      link: "/student/registration",
      newTab: false,
      routeSelected: "/student/registration",
    },
  ];

  return (
    router.pathname.includes("/student/registration") ||  router.pathname == "/student/email" ? <></>: <div>
      <Menu
        defaultSelectedKeys={[`${router.route}`]}
        mode="horizontal"
        className="w-100"
      >
        {listMenu.map((menu, i) => {
          return (
            menu.name !== "Login" && (
              <Menu.Item key={menu.routeSelected} className="m-0">
                {menu.newTab ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="m-0"
                    href={menu.link}
                  >
                    {menu.name}
                  </a>
                ) : (
                  <Link href={menu.link}>
                    <a className="m-0">{menu.name}</a>
                  </Link>
                )}
              </Menu.Item>
            )
          );
        })}
      </Menu>
    </div>
  );
};
