import React from "react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import { StyledThemeProvider } from "@definitions/styled-components";
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "@redux/store";
// import { appWithTranslation } from "@i18n";
import LayoutGlobal from "src/common/LayoutGlobal";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const AntdTheme = {
    token: {
      colorPrimary: "#D30B81",
    },
  };
  const { session } = pageProps;
  const queryClient = new QueryClient();

  return (
    <ConfigProvider theme={AntdTheme}>
      {/* <Script
        strategy="afterInteractive"
        src="https://accounts.google.com/gsi/client"
      > */}
      <QueryClientProvider client={queryClient}>
        <StyledThemeProvider>
          <Provider store={store}>
            <SessionProvider session={session}>
              <LayoutGlobal>
                <Component {...pageProps} />
              </LayoutGlobal>
            </SessionProvider>
          </Provider>
        </StyledThemeProvider>
      </QueryClientProvider>
      {/* </Script> */}
    </ConfigProvider>
  );
}

export default MyApp;
