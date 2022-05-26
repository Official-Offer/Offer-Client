import React, { FC } from "react";

export const Banners: FC = () => {
  return (
    <section className="main-homepage-banners">
      <div className="row">
        <div className="col-lg-6 col-12">
          <div onClick={() => window.open("https://heroarena.app/")}>
            <img className="mw-100" src="/img/banner/hero_arena.png" alt="" />
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div onClick={() => window.open("https://horizonland.app/")}>
            <img className="mw-100" src="/img/banner/horizon.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
