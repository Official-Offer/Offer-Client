import React from "react";
import { AppProps } from "next/app";
import Link from "next/link";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import { StyledThemeProvider } from "@definitions/styled-components";
import { Provider } from "react-redux";
import store from "@redux/store";
// import { appWithTranslation } from "@i18n";
import LayoutGlobal from "src/common/LayoutGlobal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

function ErrorPage() {
  const AntdTheme = {
    token: {
      colorPrimary: "#D30B81",
    },
  };
  const queryClient = new QueryClient();

  return (
    <ConfigProvider>
      {/* <Script
        strategy="afterInteractive"
        src="https://accounts.google.com/gsi/client"
      > */}
      <QueryClientProvider client={queryClient}>
        <StyledThemeProvider>
          <div className="layout-fullscreen center">
            <h1>Trang này không tồn tại</h1>
            <div className="link-arrow">
              <h2>
                <Link href="./">
                    Quay lại trang chủ
                </Link>
              </h2>
            </div>
          </div>
        </StyledThemeProvider>
      </QueryClientProvider>
      {/* </Script> */}
    </ConfigProvider>
  );
}

export default ErrorPage;
