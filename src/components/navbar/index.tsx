import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Navbar: React.FC = () => {
  const router: any = useRouter();

  const listMenu = [
    {
      name: "Thông báo",
      link: "/student/notification",
      newTab: false,
      routeSelected: "/student/notification",
    },
    {
      name: "Sự kiện",
      link: "/student/event",
      newTab: false,
      routeSelected: "/student/event",
    },
    {
      name: "Tin nhắn",
      link: "/student/text",
      newTab: false,
      routeSelected: "/student/text",
    },
    {
      name: "Công việc",
      link: "/student/job",
      newTab: false,
      routeSelected: "/student/text",
    },
    {
      name: "Đăng kí",
      link: "/registration/student",
      newTab: false,
      routeSelected: "/registration/student",
    },
  ];

  return (
    <div>
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
