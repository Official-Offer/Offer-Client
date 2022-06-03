import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import React from "react";
import HelmetMetaData from "@components/main/dapp-news/HelmetData";
import { Helmet } from "react-helmet";
class MyDocument extends Document {
  static getInitialProps({ renderPage }: any) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(
      (App: any) => (props: any) => sheet.collectStyles(<App {...props} />)
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }
  render() {
    const { styleTags }: any = this.props;
    return (
      <Html>
        {/* <HelmetMetaData props='main'/> */}
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* {/* <meta name="description" content="https://nft.tokenplay.app/" /> */}
          <meta property="og:image" content="https://data-nft.tokenplay.app/NFTmarket.jpg" /> 
          <meta property="og:title" content="Tokenplay" />
          <meta property="og:url" content="https://tokenplay.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Tokenplay Dappverse" />
          <meta property="og:image" content="img/thumbnail_1.png" />
          <meta property="og:URL" content="%PUBLIC_URL%/localImage.jpg" />
          {/* <meta property="og:image" content="%PUBLIC_URL%/localImage.jpg" />  */}
          {/* <meta property='og:image:alt' content='Visit nft.Tokenplay.app' /> */}
          <link rel="icon" href="symbol.ico" type="image/x-icon" />
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
