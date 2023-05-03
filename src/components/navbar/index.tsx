import { Menu, Input, Button, Dropdown } from "antd";
import {
  Card,
  NotiBox,
  MessagePanel,
  MessageBox,
} from "@styles/styled-components/styledBox";
import {
  SearchOutlined,
  SmileFilled,
  MessageOutlined,
  BellOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { removeCookies } from "cookies-next";
import { useSession, signOut } from "next-auth/react";

type Navbar = {
  searchBarHidden: boolean;
};

const notiList = [{ seen: true }, { seen: false }, { seen: true }];

const mesList = [{ seen: true }, { seen: false }, { seen: true }];

export const Navbar: React.FC<NavbarProps> = ({ searchBarHidden }) => {
  const router = useRouter();
  const searchBar = useRef();
  const [hideBar, setHideBar] = useState(true);
  const [hideMesPanel, setHideMesPanel] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const { status } = useSession();
  const handleSearch = () => null;
  const handleSearchChange = (event) => {
    setSearchInput(event.target?.value ?? "");
  };
  const handleMessageSearch = () => null;
  const handleMesSearchChange = (event) => {
    setSearchInput(event.target?.value ?? "");
  };

  const openMesPanel = () => {
    setHideMesPanel(!hideMesPanel);
  };
  const closeMesPanel = () => {
    setHideMesPanel(true);
  };

  const listMenu: MenuMiddleNav["items"] = [
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
      name: "Dịch Vụ",
      link: "/student/service",
      newTab: false,
      routeSelected: "/student/service",
    },
  ];

  return router.pathname.includes("registration") ||
    router.pathname.includes("email") ||
    router.pathname.includes("login") ||
    router.pathname.includes("auth") ||
    router.pathname == "/" ? (
    <></>
  ) : (
    <div className={"navbar-splitter" + (searchBarHidden ? " no-shadow" : "")}>
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
          ref={searchBar}
          className={
            "search-bar" + (searchBarHidden && hideBar ? " hide-bar" : "")
          }
          placeholder="Tìm Kiếm"
          prefix={<SearchOutlined />}
          onSearch={handleSearch}
          onChange={handleSearchChange}
          onFocus={() => setHideBar(false)}
          onBlur={() => setHideBar(searchInput === "")}
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
            className="icon-btn"
            icon={<MessageOutlined />}
            onClick={openMesPanel}
          />
          <MessagePanel
            className={hideMesPanel ? "mes-panel-hidden" : "mes-panel-open"}
          >
            <div className="panel-header">
              <h2>Tin Nhắn</h2>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={closeMesPanel}
              />
            </div>
            <div className="mes-search-bar">
              <Input
                className="search-bar"
                placeholder="Tìm tên người dùng, nội dung..."
                onSearch={handleMessageSearch}
                onChange={handleMesSearchChange}
              />
            </div>
            <div>
              {mesList.map((mes) => (
                <MessageBox seen={mes.seen}>
                  <img className="avatar" src="/images/avatar.png" />
                  <div className="mes-preview">
                    <div className="mes-preview-sender">Nguyễn Văn A</div>
                    <span className="mes-preview-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </span>
                  </div>
                  <div className="dot" />
                </MessageBox>
              ))}
            </div>
          </MessagePanel>
        </Menu.Item>
        <Dropdown
          trigger="click"
          overlayClassName="noti-dropdown"
          overlay={
            <Card bg="white" py="20px" border="0px" color="black">
              <div className="panel-header">
                <h2>Thông Báo</h2>
                <a className="noti-header-link" href="/student/notifications">
                  Xem tất cả
                </a>
              </div>
              <div>
                {mesList.map((noti) => (
                  <NotiBox seen={noti.seen}>
                    <img className="avatar" src="/images/avatar.png" />
                    <div className="preview">
                      <a className="preview-link" href="/student/notifications">
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </span>
                      </a>
                    </div>
                    <div className="dot" />
                  </NotiBox>
                ))}
              </div>
            </Card>
          }
        >
          <Menu.Item>
            <Button type="text" className="icon-btn" icon={<BellOutlined />} />
          </Menu.Item>
        </Dropdown>
        <Dropdown
          trigger="click"
          overlayClassName="avatar-dropdown"
          overlay={
            <Menu>
              <Menu.Item>
                <Link href="/student/profile">Hồ Sơ Người Dùng</Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/student/profile">Đã Lưu</Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/student/profile">Công Việc Đã Ứng Tuyển</Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <Link href="/student/profile">Cài Đặt</Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/student/profile">Điều Khoản Sử Dụng</Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/student/profile">Hỗ Trợ</Link>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() => {
                    removeCookies("access_token");
                    if (status === "authenticated") {
                      signOut();
                      router.push("/login");
                    }
                    router.push("/login");
                  }}
                >
                  Đăng Xuất
                </div>
              </Menu.Item>
            </Menu>
          }
        >
          <Menu.Item>
            <Button type="primary" icon={<SmileFilled />} />
          </Menu.Item>
        </Dropdown>
      </Menu>
    </div>
  );
};
