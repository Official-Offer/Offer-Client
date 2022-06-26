import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import React from "react";
import { Router, useRouter } from "next/router";

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
    console.log(this.props);

    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* {/* <meta name="description" content="https://nft.tokenplay.app/" /> */}
          {/* <meta property="og:image" content="https://data-nft.tokenplay.app/NFTmarket.jpg" /> 
          <meta property="og:title" content="Tokenplay" />
          <meta property="og:url" content="https://tokenplay.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Tokenplay Dappverse" />
          <meta property="og:image" content="img/thumbnail_1.png" />
          <meta property="og:URL" content="%PUBLIC_URL%/localImage.jpg" /> */}
          {/* <meta property="og:image" content="%PUBLIC_URL%/localImage.jpg" />  */}
          {/* <meta property='og:image:alt' content='Visit nft.Tokenplay.app' /> */}
          <link rel="icon" href="symbol.ico" type="image/x-icon" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous"
          />

          <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"
          ></script>

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
