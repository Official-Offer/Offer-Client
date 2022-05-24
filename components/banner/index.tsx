import React, { ReactElement } from 'react'
import { BoxALignCenter_Justify_ItemsCenter } from '@styles/styled-components/styledBox';

export function BannerLeft(): ReactElement {
    return (
        <img style={{ maxWidth: '70%' }} src="/img/banner/banner_left_right.png" alt="" />
    );
};

export function BannerRight(): ReactElement {
    return (
        <img style={{ maxWidth: '70%' }} src="/img/banner/banner_left_right.png" alt="" />
    );
};

export function BannerMain(): ReactElement {
    return (
        <section id="banner-main">
            <BoxALignCenter_Justify_ItemsCenter style={{ borderRadius: '15px' }}>
                <img className="mw-100" src="/img/banner/banner_main.png" alt="" />
            </BoxALignCenter_Justify_ItemsCenter>
        </section>
    );
};