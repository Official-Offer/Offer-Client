import React, { useRef, useState, ReactElement } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "antd/dist/antd.css";

export default function LayoutGlobal(props: any): ReactElement {
  const Navbar = dynamic(() =>
    import("@components").then((mod: any) => mod.Navbar)
  ) as any;
  const Nav = dynamic(() =>
    import("@components").then((mod: any) => mod.Nav)
  ) as any;

  const router = useRouter();

  return (
    <Nav>
      <div>{props.children}</div>
    </Nav>
  );
}
