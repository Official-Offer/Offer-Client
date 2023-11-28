import React, { useRef, useState, ReactElement } from "react";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "antd/dist/antd.css";

export default function LayoutGlobal(props: any): ReactElement {
  const Nav = dynamic(() =>
    import("@components").then((mod: any) => mod.Nav)
  ) as any;

  const router = useRouter();

  return (
    <Nav>
      <Head>
        <title>Offer</title>
        <link rel="icon" href="/icons/offer-logo.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Analytics />
      <div>{props.children}</div>
    </Nav>
  );
}
