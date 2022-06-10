import React, { FC, useEffect, useState } from "react";
import {
  BoxALignCenter_Justify_ItemsBetween,
  BoxALignCenter_Justify_ItemsCenter,
  BoxALignCenter_Justify_ItemsEnd,
  BoxALignItemsCenter,
} from "@styledComponents/styledBox";
import {
  Button,
  ButtonBackgroundBlueBold,
  ButtonBlue,
} from "@styledComponents/styledButton";
import {
  MenuOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Drawer, Menu, Popover } from "antd";
import { Router, useRouter } from "next/router";
import { Search } from "react-feather";
import Link from "next/link";
import LoginPopup from "./LoginPopup";
import getUserInfo from "@utils/getUserInfo";
import request from "@services/apiSSO";
import Cookies from "js-cookie";
import axios from "axios";
import { removeVietnameseTones } from "@utils/processTextInput";
export const NavbarHome: FC = () => {
  const router: any = useRouter();
  const [keyword, setKeyword] = useState("");
  const [visible, setVisible] = useState<any>(false);
  const [boxSearch, setBoxSearch] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    (async () => {
      //uncomment when deployed on dev since localhost can't access cookie
      await request
        .get(`/users/me`)
        .then((res: any) => {
          // console.log(res.data);
          setUser(res.data);
        })
        .catch(() => null);
    })();
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onSearch = (e: any) => {
    e.preventDefault();
    // router.push(`/search/${keyword}`, `/search/${keyword}`, { shallow: true });
  };
  const handleChangeSearch = (e: any) => {
    setKeyword(e.target.value);
  };
  const onShowBoxSearch = () => {
    setBoxSearch(true);
  };
  const listMenu = [
    {
      name: "NFT Marketplace",
      link: "#",
      newTab: false,
      routeSelected: "/nft",
    },
    { name: "Farm", link: "#", newTab: false, routeSelected: "/farm" },
    {
      name: "Dapp News",
      link: "/dapp-news",
      newTab: false,
      routeSelected: "/dapp-news",
    },
    {
      name: "Dapp Portal",
      link: "/dapp-portal",
      newTab: false,
      routeSelected: "/dapp-portal",
    },
    {
      name: "PriceBoard",
      link: "#",
      newTab: false,
      routeSelected: "/price-board",
    },
    { name: "INO", link: "#", newTab: false, routeSelected: "/ino" },
    {
      name: "Login",
      link: "#",
      newTab: false,
      routeSelected: "/",
      action: () => {setPopupVisible(true); onClose()},
    },
  ];

  const [isPopupVisible, setPopupVisible] = useState(false);
  const openLoginPopup = () => setPopupVisible(true);
  const onLogout = async () => {
    Cookies.remove("accessToken");
    await request
      .get("/logout", { withCredentials: true })
      .then(async (res) => {
        // window.history.replaceState(null, '','/');
        window.location.href = window.location.origin;
        await request
          .get(`/users/me`)
          .then((res: any) => {
            setUser(res.data);
            setPopupVisible(false);
          })
          .catch(() => {});
      });
  };

  useEffect(() => {
    setTimeout(() => setPopupVisible(!Cookies.get("accessToken")), 1500);
    // setTimeout(() => setPopupVisible(router.query.login && !user), 1500); //wait for 0.5s for fetching api.
  }, [user]); //if login query still here yet user not logged in, the browser was backed.

  const popoverContent = (
    <div className="navbar_popover">
      <p className="navbar_popover_content" onClick={onLogout}>
        Log out
      </p>
      <Link href="/user-profile">
        <p className="navbar_popover_content">User Profile</p>
      </Link>
    </div>
  );

  return (
    <>
      <section id="navbar_home">
        <BoxALignCenter_Justify_ItemsBetween className="px-md-4 px-2 py-2">
          {!boxSearch ? (
            <>
              <BoxALignItemsCenter className="col-md-6">
                <div className="img-logo">
                  <Link href="/">
                    <a>
                      <img
                        alt=""
                        src="/img/logo.png"
                        style={{ width: "86px", height: "63px" }}
                      />
                    </a>
                  </Link>
                </div>
                <Menu
                  defaultSelectedKeys={[`${router.route}`]}
                  mode="horizontal"
                  className="w-100"
                >
                  {listMenu.map((menu, i) => {
                    return (
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
                    );
                  })}
                </Menu>
              </BoxALignItemsCenter>
              <div className="col-md-3 navbar_home_pc">
                <BoxALignCenter_Justify_ItemsEnd className="w-100">
                  <form onSubmit={onSearch} className="navbar_home-form">
                    <BoxALignItemsCenter>
                      <input
                        type="text"
                        className="searchTerm"
                        placeholder="Searching..."
                        onChange={handleChangeSearch}
                      />
                      <button type="button" className="searchButton">
                        <span>
                          <Search width={18} height={18} />
                        </span>
                      </button>
                    </BoxALignItemsCenter>
                  </form>
                </BoxALignCenter_Justify_ItemsEnd>
              </div>
              <BoxALignCenter_Justify_ItemsEnd className="col-md-3 navbar_home_pc">
                <div className="d-flex align-items-center display_none_res">
                  <ButtonBackgroundBlueBold
                    className="d-flex align-items-center me-3"
                    // onClick={() => {
                    //   router.push("/submit");
                    // }}
                  >
                    <UploadOutlined className="me-2 fontSize_1-2" />
                    Submit Dapp
                  </ButtonBackgroundBlueBold>
                  {user ? (
                    <>
                      <Popover
                        placement="bottom"
                        content={popoverContent}
                        trigger="focus"
                      >
                        <button
                          className="navbar_userinfo_wrapper"
                          type="button"
                        >
                          <img
                            className="navbar_avatar"
                            src={user?.avatar || "/img/default.png"}
                          ></img>
                          <div>{removeVietnameseTones(user?.displayName)}</div>
                        </button>
                      </Popover>
                    </>
                  ) : (
                    <ButtonBlue
                      className="px-4"
                      // onClick={() => {
                      //     dispatch(nameModalConnect('connectWallet'));
                      //     dispatch(modalConnect(true));
                      // }}
                      onClick={openLoginPopup}
                    >
                      Login
                    </ButtonBlue>
                  )}
                  {/* <WalletModal /> */}
                </div>
              </BoxALignCenter_Justify_ItemsEnd>
              <BoxALignItemsCenter className="navbar_home_mobile">
                <Button
                  className="d-flex align-items-center p-2 rounded-circle"
                  style={{ border: "1px solid #000", fontSize: "1rem" }}
                  onClick={onShowBoxSearch}
                >
                  <SearchOutlined style={{ color: "#000" }} />
                </Button>
                {user && (
                  <Popover
                    placement="bottom"
                    content={popoverContent}
                    // trigger="focus"
                  >
                    <button className="navbar_userinfo_wrapper" type="button">
                      <img
                        className="navbar_avatar_mobile"
                        src={user?.avatar || "/img/default.png"}
                      ></img>
                    </button>
                  </Popover>
                )}
                <Button
                  type="button"
                  onClick={showDrawer}
                  className="d-flex align-items-center border-0 ms-3 drawer-button"
                >
                  <MenuOutlined style={{ color: "#000" }} />
                </Button>
                <Drawer
                  placement="right"
                  closable={false}
                  onClose={onClose}
                  visible={visible}
                  className="navbar_drawer"
                >
                  <div className="text-end">
                    <Button onClick={onClose} className="border-0">
                      X
                    </Button>
                  </div>
                  <br />
                  <Menu defaultSelectedKeys={[`${router.route}`]}>
                    {listMenu.map((menu, i) => {
                      return (
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
                          ) : menu.action ? (
                            <a className="m-0" onClick={menu.action}>{menu.name}</a>
                          ) : (
                            <Link href={menu.link}>
                              <a className="m-0">{menu.name}</a>
                            </Link>
                          )}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Drawer>
              </BoxALignItemsCenter>
            </>
          ) : (
            <BoxALignCenter_Justify_ItemsCenter
              className="w-100"
              style={{ height: "63px" }}
            >
              <form onSubmit={onSearch}>
                <BoxALignItemsCenter>
                  <input
                    type="text"
                    className="searchTerm"
                    placeholder="Searching..."
                    onChange={handleChangeSearch}
                  />
                  <button type="button" className="searchButton">
                    <span>
                      <Search width={18} height={18} />
                    </span>
                  </button>
                </BoxALignItemsCenter>
              </form>
              <Button
                className="ms-2"
                type="button"
                onClick={() => setBoxSearch(false)}
              >
                Cancel
              </Button>
            </BoxALignCenter_Justify_ItemsCenter>
          )}
        </BoxALignCenter_Justify_ItemsBetween>
      </section>
      <LoginPopup
        setUser={setUser}
        isVisible={isPopupVisible}
        setVisible={setPopupVisible}
      />
    </>
  );
};
