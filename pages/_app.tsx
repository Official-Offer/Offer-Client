import React from "react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import { ConfigProvider } from 'antd';
import { StyledThemeProvider } from "@definitions/styled-components";
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "@redux/store";
import { appWithTranslation } from "@i18n";
import LayoutGlobal from "src/common/LayoutGlobal";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const AntdTheme = {
    token: {
      colorPrimary: "#D30B81",
    },
  };

  return (
    <ConfigProvider theme={AntdTheme}>
      <StyledThemeProvider>
        <Provider store={store}>
          <LayoutGlobal>
            <Component {...pageProps} />
          </LayoutGlobal>
        </Provider>
      </StyledThemeProvider>
    </ConfigProvider>
  );
}

export default MyApp;
