import React from "react";

import { Header, Main, Cards, Footer } from "@components";
import Counter from "@components/examples/counter";
import { StyledSystemExample } from "@components/examples/styled-system";
import { TestingLibraryExample } from "@components/examples/testing-library";
import { I18NExample } from "@components/examples/translate";
const Home: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Main />
      <Cards />
      <Footer />
      <Counter />
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
