import { URL_API_IMG, URL_SITE } from "@config/dev.config";
import React from "react";
import { Helmet } from "react-helmet";
export default function HelmetMetaData({props}) {
   console.log(props);
  let currentUrl = `${URL_SITE}/dapp-news/${props[0]?.attributes.slug}`;
  let title = props[0]?.attributes.title;
  let image = `${URL_API_IMG}${props[0]?.attributes.thumbnail.data.attributes.url}`;
  let description = props[0]?.attributes.title;
  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta property="title" content={title} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:description" content={description} />{" "}
    </Helmet>
  );
}
