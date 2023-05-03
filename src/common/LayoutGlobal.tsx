import React, { useRef, useState, ReactElement } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "antd/dist/antd.css";

export default function LayoutGlobal(props: any): ReactElement {
  // const FooterHome = dynamic(() => import("./FooterHome"));
  const Navbar = dynamic(() => import("@components").then((mod: any) => mod.Navbar)) as any;
  const router = useRouter();

  // This ref is used so that any component from any page can do anything to the insert-outlet div
  const outletRef = useRef<null | HTMLDivElement>();
  const [insert, setInsert] = useState<JSXElement>();

  return (
    <div>
      <div className="insert-outlet">{insert}</div>
      <Navbar
        searchBarHidden={router.pathname === "/student/jobs" || router.pathname === "/student/events"}
      />
      <div>
        {React.Children.map(props.children, (child) => (
          React.cloneElement(child, { insertSet: setInsert })
        ))}
      </div>
    </div>
  );
}
