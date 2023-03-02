import React, { ReactElement } from "react";
import dynamic from "next/dynamic";
import "antd/dist/antd.css";

export default function LayoutGlobal(props: any): ReactElement {
  // const FooterHome = dynamic(() => import("./FooterHome"));
  const Navbar = dynamic(() => import("@components").then((mod: any) => mod.Navbar)) as any;

  return (
    <>
      <Navbar />
      <div>{props.children}</div>
    </>
  );
}
