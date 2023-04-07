import React, { useMemo, useState } from "react";
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
import AppContext from "@components/AppContext";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const AntdTheme = {
    token: {
      colorPrimary: "#D30B81",
    },
  };

  const queryClient = new QueryClient();
  const [registerEmail, setRegisterEmail] = useState("");
  const [school, setSchool] = useState("");
  const [token, setToken] = useState("");
  // const value = useMemo(
  //   () => ({ session, setSession }), 
  //   [session]
  // );
  
  return (
    <ConfigProvider theme={AntdTheme}>
      <AppContext.Provider value={{ registerEmail, setRegisterEmail, school, setSchool, token, setToken }}>
        <QueryClientProvider client={queryClient}>
          <StyledThemeProvider>
            <Provider store={store}>
              <LayoutGlobal>
                <Component {...pageProps} />
              </LayoutGlobal>
            </Provider>
          </StyledThemeProvider>
        </QueryClientProvider>
      </AppContext.Provider>
    </ConfigProvider>
  );
}

export default MyApp;
