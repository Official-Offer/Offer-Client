import React, { ReactElement, useState } from "react";
import { URL_API_ADMIN, URL_API_IMG } from "@config/index";
import moment from "moment";
import router from "next/router";

export default function NewsLists({ data }: any): ReactElement {
  return (
    <>
      {data &&
        data.map((blog: any, i: number) => {
          return (
            <div
              key={i}
              className="main-homepage-dappnews-layout p-4"
              onClick={() => {
                router.push(
                  {
                    pathname: `/dapp-news/${blog.attributes.slug}`,
                  }
                );
              }}
            >
              <a target="_blank" rel="noopener noreferrer">
                <div className="main-homepage-dappnews-card">
                  <div className="main-homepage-dappnews-card-header">
                    <img
                      className="main-homepage-blog-card-header-img"
                      src={`${URL_API_IMG}${blog.attributes.thumbnail.data.attributes.url}`}
                    />
                  </div>
                  <div className="main-homepage-dappnews-card-body">
                    <p className="main-homepage-dappnews-card-body-title">
                      {blog.attributes.title}
                    </p>
                    <div>
                      <span className="main-homepage-dappnews-card-body-createdAt">
                      By {blog.attributes.Author} | {moment(blog.attributes.createdAt).format("LL")}
                      </span>
                      &nbsp;
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
    </>
  );
}
