import React, { FC } from 'react';

export const Banners: FC = () => {

    return (
        <section className="main-homepage-banners">
            <div className="row">
                <div className="col-lg-6 col-12">
                    <img className="mw-100" src="/img/banner/banner-superslither.png" alt="" />
                </div>
                <div className="col-lg-6 col-12">
                    <img className="mw-100" src="/img/banner/banner-nft.png" alt="" />
                </div>
            </div>
        </section>
    );
};
