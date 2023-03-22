import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "antd/dist/antd.css";

export default function LayoutGlobal(props: any): ReactElement {
  // const FooterHome = dynamic(() => import("./FooterHome"));
  const Navbar = dynamic(() => import("@components").then((mod: any) => mod.Navbar)) as any;

  const router = useRouter();

  return (
    <>
      <Navbar searchBarHidden={router.pathname === "/student/jobs" || router.pathname === "/student/events"}/>
      <div>{props.children}</div>
    </>
  );
}
