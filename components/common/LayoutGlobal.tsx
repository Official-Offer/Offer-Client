import React, { ReactElement } from 'react'
import { BoxALignCenter_Justify_ItemsCenter, BoxALignCenter_Justify_ItemsEnd, BoxALignCenter_Justify_ItemsStart, BoxALignItemsCenter } from '@styles/styled-components/styledBox'
import { BannerLeft, BannerRight } from '@components/banner'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import 'antd/dist/antd.css'

export default function LayoutGlobal(props: any): ReactElement {
    // const FooterHome = dynamic(() => import("./FooterHome"));
    const BannerMain = dynamic(() => import("@components/banner").then((mod: any) => mod.BannerMain));
    const NavbarHome = dynamic(() => import('../navbar').then((mod: any) => mod.NavbarHome));
    const FooterHome = dynamic(() => import('../footer').then((mod: any) => mod.FooterHome));

    return (
        <>
            <Head>
                <title>Dappverse Tokenplay</title>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />
            </Head>
            <NavbarHome />
            <div className="row-global pb-5 m-0 h-100">
                <div className="row-global-banner banner-left">
                    <BoxALignCenter_Justify_ItemsStart className="banner-left-sticky">
                        <BannerLeft />
                    </BoxALignCenter_Justify_ItemsStart>
                </div>
                <div className="row-global-center px-lg-0 px-3">
                    <div className="empty_space_height79"></div>
                    <BannerMain />
                    {props.children}
                </div>
                <div className="row-global-banner banner-right">
                    <BoxALignCenter_Justify_ItemsEnd className="banner-right-sticky">
                        <BannerRight />
                    </BoxALignCenter_Justify_ItemsEnd>
                </div>
                <div className="main-background main-background-position-banner" />
            </div>
            <FooterHome />
        </>
    )
}
