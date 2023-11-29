import React from "react";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import { StyledThemeProvider } from "@definitions/styled-components";
import "@styles/global.scss";
import { Provider } from "react-redux";
import store from "@redux/store";
// import { appWithTranslation } from "@i18n";
import LayoutGlobal from "src/common/LayoutGlobal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ session: Session }>): JSX.Element {
  const AntdTheme = {
    token: {
      colorPrimary: "#D30B81",
    },
  };
  console.log(pageProps);
  const { session } = pageProps;
  const queryClient = new QueryClient();

  return (
    <ConfigProvider>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      {/* </Script> */}
    </ConfigProvider>
  );
}

export default MyApp;
