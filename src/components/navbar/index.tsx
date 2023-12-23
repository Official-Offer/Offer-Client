import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import { deleteCookie, getCookie, removeCookies } from "cookies-next";
import { Menu, Input, Button, Dropdown } from "antd";
import {
  // SearchOutlined,
  SmileFilled,
  // MessageOutlined,
  // BellOutlined,
  // CloseOutlined,
} from "@ant-design/icons";
import { GeneralSearch } from "@components/search/GeneralSearch";
import { OfferLogo } from "@components/icons/OfferLogo";
import { useMutation } from "@tanstack/react-query";
import { userLogOut } from "@services/apiUser";
// import { NotiBox } from "@components/box";
// import { Card, MessagePanel, MessageBox } from "@styles/styled-components/styledBox";

type NavbarProps = {
  searchBarHidden: boolean;
};

// const notiList = [{ read: true }, { read: false }, { read: true }];
// const mesList = [{ seen: true }, { seen: false }, { seen: true }];

export const Navbar: React.FC<NavbarProps> = ({ searchBarHidden }) => {
  const router = useRouter();
  const path = router.pathname.includes("student")
    ? "student"
    : router.pathname.includes("recruiter")
      ? "recruiter"
      : "advisor";

  const { data: session, status } = useSession();
  const role = getCookie("role");
  const conflict = role !== "student";
  console.log("social login", session);
  const loggedIn =
    (!!getCookie("cookieToken") || status == "authenticated") && !conflict;

  console.log("loggedIn?");
  console.log(getCookie("cookieToken"));

  // const [hideMesPanel, setHideMesPanel] = useState(true);

  // const handleMesSearchChange = (event) => {
  //   setSearchInput(event.target?.value ?? "");
  // };

  // const openMesPanel = () => {
  //   setHideMesPanel(!hideMesPanel);
  // };
  // const closeMesPanel = () => {
  //   setHideMesPanel(true);
  // };

  const listMenu: Record<string, any>[] =
    router.pathname.includes("recruiter") || router.pathname.includes("advisor")
      ? []
      : [
          {
            name: "Công việc",
            link: "/student/jobs",
            newTab: false,
            routeSelected: "/student/jobs",
          },
          // {
          //   name: "Sự kiện",
          //   link: "/student/events",
          //   newTab: false,
          //   routeSelected: "/student/events",
          // },
          // {
          //   name: "Công ty",
          //   link: "/student/companies",
          //   newTab: false,
          //   routeSelected: "/student/companies",
          // },
          {
            name: "Liên hệ",
            link: "/student/contact",
            newTab: false,
            routeSelected: "/student/contact",
          },
        ];
  const avatar = loggedIn ? getCookie("avatar") : null;
  console.log("avatar", avatar);
  return router.pathname.includes("registration") ||
    router.pathname.includes("login") ||
    router.pathname == "/" ? (
    <></>
  ) : (
    <div className={"navbar-wrapper" + (searchBarHidden ? " no-shadow" : "")}>
      <div className="navbar-splitter">
        <Menu
          defaultSelectedKeys={[`${router.route}`]}
          mode="horizontal"
          className="navbar left-menu"
        >
          {router.pathname.includes("recruiter") ||
          router.pathname.includes("advisor") ? null : (
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
                  <span>
                    <OfferLogo width={36} height={36} />
                  </span>
                  {/* <span>Offer</span> */}
                </Link>
              )}
            </Menu.Item>
          )}
          <GeneralSearch hidden={searchBarHidden} />
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
                    <Link href={menu.link}>{menu.name}</Link>
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
          {/* <Menu.Item>
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
                  {notiList.map((noti) => (
                    <NotiBox
                      hasDot
                      read={noti.read}
                      content={
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
                      }
                    />
                  ))}
                </div>
              </Card>
            }
          >
            <Menu.Item>
              <Button type="text" className="icon-btn" icon={<BellOutlined />} />
            </Menu.Item>
          </Dropdown> */}
          {loggedIn ? (
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              overlayClassName="avatar-dropdown"
              overlay={
                <Menu>
                  <Menu.Item>
                    <Link href={`/${path}/profile`}>Hồ Sơ</Link>
                  </Menu.Item>
                  {/* <Menu.Item>
                  <Link href="/student/jobs/bookmarked">Đã Lưu</Link>
                </Menu.Item> */}
                  <Menu.Item>
                    <Link href={`/${path}/jobs/applied`}>
                      Công Việc Đã Ứng Tuyển
                    </Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item>
                    <Link href={`/settings`}>Cài Đặt</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/${path}/profile`}>Điều Khoản Sử Dụng</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/${path}/profile`}>Hỗ Trợ</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      onClick={() => {
                        if (status == "authenticated") {
                          deleteCookie("cookieToken");
                          deleteCookie("role");
                          deleteCookie("id");
                          router.push("/login").then(() => signOut());
                        } else {
                          //sign out traditional way
                          // mutation.mutate();
                          deleteCookie("cookieToken");
                          deleteCookie("role");
                          deleteCookie("id");
                          router.push("/login").then(() => {
                            router.reload();
                          });
                        }
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
          ) : (
            <div>
              <Button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  router.push("/registration");
                }}
              >
                Đăng ký
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Đăng nhập
              </Button>
            </div>
          )}
        </Menu>
      </div>
    </div>
  );
};
