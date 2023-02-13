import React from "react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import { StyledThemeProvider } from "@definitions/styled-components";
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "@redux/store";
import { appWithTranslation } from "@i18n";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StyledThemeProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </StyledThemeProvider>
  );
}

export default MyApp;
