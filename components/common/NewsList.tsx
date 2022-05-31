import React, { ReactElement, useState } from "react";
import { URL_API_ADMIN } from "@config/index";
import moment from "moment";
import router from "next/router";
import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";

export default function NewsLists({ data }: any, { tag }: any): ReactElement {
  return (
    <>
      {data &&
        data.map((blog: any, i: number) => {
          return (
            <div
              key={i}
              className="mt-5 main-homepage-dappnews-layout"
              onClick={() => {
                router.push(
                  {
                    pathname: `/NewsDetails`,
                    query: {
                      id: blog.id,
                      category: blog.attributes.category.data.attributes.name,
                    },
                  },
                  `/`
                );
              }}
            >
              <a target="_blank" rel="noopener noreferrer">
                <div className="main-homepage-dappnews-card">
                  <div className="main-homepage-dappnews-card-header">
                    <img
                      className="main-homepage-blog-card-header-img"
                      src={`${URL_API_ADMIN}${blog.attributes.thumbnail.data.attributes.url}`}
                    />
                  </div>
                  <div className="main-homepage-dappnews-card-body">
                    <p className="main-homepage-dappnews-card-body-title">
                      {blog.attributes.title}
                    </p>
                    <p className="main-homepage-dappnews-card-body-description">
                      {blog.attributes.description}
                    </p>
                    <div>
                      <span className="main-homepage-dappnews-card-body-createdAt p-1">
                        {/* <CalendarOutlined className="my-2"/> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          fill="currentColor"
                          class="bi bi-calendar"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                        <span> </span>
                        {moment(blog.attributes.createdAt).format("LL")}
                      </span>
                      <span> </span>
                      <span className="main-homepage-dappnews-card-body-createdAt">
                        {/* <EyeOutlined className="my-2"/> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                        <span>  </span>
                        {blog.attributes.viewer} 
                      </span>
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
