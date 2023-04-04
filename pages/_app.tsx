import React from "react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import { StyledThemeProvider } from "@definitions/styled-components";
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "@redux/store";
import { appWithTranslation } from "@i18n";
import LayoutGlobal from "src/common/LayoutGlobal";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const AntdTheme = {
    token: {
      colorPrimary: "#D30B81",
    },
  };

  const queryClient = new QueryClient();

  return (
    <ConfigProvider theme={AntdTheme}>
      <QueryClientProvider client={queryClient}>
        <StyledThemeProvider>
          <Provider store={store}>
            <LayoutGlobal>
              <Component {...pageProps} />
            </LayoutGlobal>
          </Provider>
        </StyledThemeProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default MyApp;
