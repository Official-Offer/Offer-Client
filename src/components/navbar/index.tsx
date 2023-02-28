import { Menu, Input, Button } from "antd";
import { SearchOutlined, SmileFilled, MessageOutlined, BellOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Nav } from "../../styles/styled-components/styledNav";

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
    router.pathname.includes("/student/registration") ||  router.pathname.includes("/student/email") ||  router.pathname.includes("/student/login")? <></>: <Nav>
      <Menu
        defaultSelectedKeys={[`${router.route}`]}
        mode="horizontal"
        className="w-100"
        style={{ justifyContent: "flex-start" }}
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
          style={{
            
          }}
          onSearch={onSearch}
        />
        </Menu>
        <Menu
          defaultSelectedKeys={[`${router.route}`]}
          mode="horizontal"
          className="w-100"
          style={{ justifyContent: "center", flexGrow: 2 }}
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
          className="w-100"
          style={{ justifyContent: "flex-end" }}
        >    
          <Menu.Item disabled>
            <Button
              type="text"
              icon={<MessageOutlined />}
              style={{ borderRadius: '40px', width: '20px', height: '20px' }}
            />
          </Menu.Item>
          <Menu.Item disabled>
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ borderRadius: '40px', width: '20px', height: '20px' }}
            />
          </Menu.Item>
          <Menu.Item disabled>
            <Button
              type="primary"
              icon={<SmileFilled />}
              style={{ borderRadius: '40px', width: '40px', height: '40px' }}
            />
          </Menu.Item>
      </Menu>
    </Nav>
  );
};
