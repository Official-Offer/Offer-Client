import React, { FC, useState } from 'react';
import { BoxALignCenter_Justify_ItemsBetween, BoxALignCenter_Justify_ItemsCenter, BoxALignCenter_Justify_ItemsEnd, BoxALignItemsCenter } from '@styledComponents/styledBox';
import { Button, ButtonBackgroundBlueBold, ButtonBlue } from '@styledComponents/styledButton';
import { MenuOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import { useRouter } from 'next/router';
import { Search } from 'react-feather';
import Link from 'next/link';

export const NavbarHome: FC = () => {
    const router = useRouter();
    const [keyword, setKeyword] = useState('');
    const [visible, setVisible] = useState(false);
    const [boxSearch, setBoxSearch] = useState(false);

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
        { name: 'NFT Marketplace', link: '#', newTab: false },
        { name: 'Farm', link: '#', newTab: false },
        { name: 'Dapp News', link: '#', newTab: false },
        { name: 'Dapp Portal', link: '/dapp-portal', newTab: false },
        { name: 'PriceBoard', link: '#', newTab: false },
        { name: 'INO', link: '#', newTab: false },
    ];

    return (
        <section id="navbar_home">
            <BoxALignCenter_Justify_ItemsBetween className="px-md-4 px-2 py-2">
                {!boxSearch ? (
                    <>
                        <BoxALignItemsCenter className="col-md-6">
                            <div className="img-logo">
                                <Link href="/">
                                    <a>
                                        <img alt="" src="/img/logo.png" style={{ width: '86px', height: '63px' }} />
                                    </a>
                                </Link>
                            </div>
                            <Menu
                                defaultSelectedKeys={router.route === "/nft-marketplace" ? ["1"] :
                                    router.route === "/dapp-portal" ? ["4"] : [""]
                                }
                                mode="horizontal"
                                className="w-100"
                            >
                                {listMenu.map((menu, i) => {
                                    return (
                                        <Menu.Item key={i + 1} className="m-0">
                                            {menu.newTab ? (
                                                <a target="_blank" rel="noopener noreferrer" className="m-0" href={menu.link}>
                                                    {menu.name}
                                                </a>
                                            ) : (
                                                <Link href={menu.link}>
                                                    <a className="m-0">
                                                        {menu.name}
                                                    </a>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    )
                                })}
                            </Menu>
                        </BoxALignItemsCenter>
                        <div className="col-md-3 navbar_home_pc">
                            <BoxALignCenter_Justify_ItemsEnd className="w-100">
                                <form
                                    onSubmit={onSearch}
                                    className="navbar_home-form"
                                >
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
                                    className="rounded-pill d-flex align-items-center me-3"
                                    onClick={() => {
                                        router.push("/submit");
                                    }}
                                >
                                    <UploadOutlined className="me-2 fontSize_1-2" />
                                    Submit Dapp
                                </ButtonBackgroundBlueBold>
                                <ButtonBlue
                                    className="px-4"
                                // onClick={() => {
                                //     dispatch(nameModalConnect('connectWallet'));
                                //     dispatch(modalConnect(true));
                                // }}
                                >
                                    Login
                                </ButtonBlue>
                                {/* <WalletModal /> */}
                            </div>
                        </BoxALignCenter_Justify_ItemsEnd>
                        <BoxALignItemsCenter className="navbar_home_mobile">
                            <Button
                                className="d-flex align-items-center p-2 rounded-circle"
                                style={{ border: '1px solid #000', fontSize: '1rem' }}
                                onClick={onShowBoxSearch}
                            >
                                <SearchOutlined style={{ color: '#000' }} />
                            </Button>
                            <Button type="button" onClick={showDrawer} className="d-flex align-items-center border-0 ms-3">
                                <MenuOutlined style={{ color: '#000' }} />
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
                                <Menu
                                    defaultSelectedKeys={router.route === "/nft-marketplace" ? ["1"] :
                                        router.route === "/dapp-portal" ? ["4"] : ["0"]
                                    }
                                >
                                    {listMenu.map((menu, i) => {
                                        return (
                                            <Menu.Item key={i + 1} className="m-0">
                                                {menu.newTab ? (
                                                    <a target="_blank" rel="noopener noreferrer" className="m-0" href={menu.link}>
                                                        {menu.name}
                                                    </a>
                                                ) : (
                                                    <Link href={menu.link}>
                                                        <a className="m-0">
                                                            {menu.name}
                                                        </a>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu>
                            </Drawer>
                        </BoxALignItemsCenter>
                    </>
                ) : (
                    <BoxALignCenter_Justify_ItemsCenter className="w-100" style={{ height: '63px' }}>
                        <form
                            onSubmit={onSearch}
                        >
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
                            Cancle
                        </Button>
                    </BoxALignCenter_Justify_ItemsCenter>
                )}
            </BoxALignCenter_Justify_ItemsBetween>
        </section>
    )
}