import React, { FC } from 'react';

export const Banners: FC = () => {

    return (
        <section className="main-homepage-banners">
            <div className="row">
                <div className="col-lg-6 col-12">
                    <a href="https://heroarena.app/">
                    <img className="mw-100" src="/img/banner/hero_arena.png" alt="" />
                    </a>
                </div>
                <div className="col-lg-6 col-12">
                    <a href="https://horizonland.app/">
                    <img className="mw-100" src="/img/banner/horizon.png" alt="" />
                    </a>
                </div>
            </div>
        </section>
    );
};
