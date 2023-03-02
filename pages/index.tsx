import React from "react";
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Header, Main, CardsGrid, Footer } from "@components";
import Counter from "@components/examples/counter";
import { StyledSystemExample } from "@components/examples/styled-system";
import { TestingLibraryExample } from "@components/examples/testing-library";
import { I18NExample } from "@components/examples/translate";
const Home: NextPage = () => {
  // const Navbar = dynamic(() => import("@components").then((mod: any) => mod.Navbar)) as any;
  // const Header = dynamic(() => import("@components").then((mod: any) => mod.Header)) as any;
  const Main = dynamic(() => import("@components").then((mod: any) => mod.Main)) as any;
  // const CardsGrid = dynamic(() => import("@components").then((mod: any) => mod.CardsGrid)) as any;
  // const Footer = dynamic(() => import("@components").then((mod: any) => mod.Footer)) as any;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* <Header /> */}
      {/* <Navbar /> */}
      <Main /> 
      {/* <CardsGrid /> */}
      {/* <Footer /> */}
      {/* <Counter /> */}
    </div>
    // <Counter />
    // <StyledSystemExample />
    // <TestingLibraryExample
    //   onClick={() => {
    //     alert("sonabitch");
    //   }}
    // />
    // <I18NExample />
  );
};

export default Home;
