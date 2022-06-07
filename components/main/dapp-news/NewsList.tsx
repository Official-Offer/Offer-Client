import React, { ReactElement, useState } from "react";
import { URL_API_ADMIN, URL_API_IMG } from "@config/index";
import moment from "moment";
import router from "next/router";
import { Calendar, Eye } from "react-feather";

export default function NewsLists({ data }: any, { tag }: any): ReactElement {
  return (
    <>
      {data &&
        data.map((blog: any, i: number) => {
          console.log(blog);
          return (
            <div
              key={i}
              className="mt-5 main-homepage-dappnews-layout"
              onClick={() => {
                router.push(
                  {
                    pathname: `/dapp-news/${blog.id}`,
                    query: {
                      id: blog.id,
                      category: blog.attributes.category.data.attributes.name,
                    },
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
                    {/* <p className="main-homepage-dappnews-card-body-description">
                      {blog.attributes.description}
                    </p> */}
                    <div>
                      <span className="main-homepage-dappnews-card-body-createdAt">
                      By {blog.attributes.Author} | {moment(blog.attributes.createdAt).format("LL")}
                      </span>
                      &nbsp;
                      {/* <span className="main-homepage-dappnews-card-body-createdAt">
                        <Eye size={15}/>
                        &nbsp;
                        {blog.attributes.viewer} 
                      </span> */}
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
