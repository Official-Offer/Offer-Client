import { Menu, Input, Button } from "antd";
import { SearchOutlined, SmileFilled, MessageOutlined, BellOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Navbar: React.FC = () => {
  const router  = useRouter();
  const { Search } = Input;

  const onSearch = () => null;

  const listMenu = [
    {
      name: "Công việc",
      link: "/student/jobs",
      newTab: false,
      routeSelected: "/student/jobs",
    },
    {
      name: "Sự kiện",
      link: "/student/events",
      newTab: false,
      routeSelected: "/student/events",
    },
    {
      name: "CLB",
      link: "/student/clubs",
      newTab: false,
      routeSelected: "/student/clubs",
    },
    {
      name: "Advisors",
      link: "/student/advisors",
      newTab: false,
      routeSelected: "/student/advisors",
    },
  ];

  return (
    router.pathname.includes("/student/registration") ||  router.pathname.includes("/student/email") ? <></>:
      <div className="navbar-splitter">
        <Menu
          defaultSelectedKeys={[`${router.route}`]}
          mode="horizontal"
          className="navbar left-menu"
        >
          <Menu.Item key={"/student/"} className="m-0">
            {false ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="m-0"
                href={"/student/"}
              >
                {"Home"}
              </a>
            ) : (
              <Link href={"/student/"}>
                <a className="m-0">{"Home"}</a>
              </Link>
            )}
          </Menu.Item>
          <Input
            className="search-bar"
            placeholder="Tìm Kiếm"
            prefix={<SearchOutlined />}
            onSearch={onSearch}
          />
          </Menu>
          <Menu
            defaultSelectedKeys={[`${router.route}`]}
            mode="horizontal"
            className="navbar center-menu"
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
          <Menu
            defaultSelectedKeys={[`${router.route}`]}
            mode="horizontal"
            className="navbar right-menu"
          >    
            <Menu.Item>
              <Button
                type="text"
                icon={<MessageOutlined />}
              />
            </Menu.Item>
            <Menu.Item>
              <Button
                type="text"
                icon={<BellOutlined />}
              />
            </Menu.Item>
            <Menu.Item>
              <Button
                className="avatar-btn"
                type="primary"
                icon={<SmileFilled />}
              />
            </Menu.Item>
        </Menu>
    </div>
  );
};

