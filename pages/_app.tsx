import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Router,useRouter } from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";
import LayoutGlobal from "@components/common/LayoutGlobal";
import store from "@redux/store";
import "bootstrap/dist/css/bootstrap.css";
import "@styles/globals.scss";
import * as ga from '../utils/ga';
TopBarProgress.config({
  barColors: {
    "0": "#1DBBBD",
    "1.0": "#1DBBBD",
  },
  shadowBlur: 5,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(false);
  const router = useRouter();
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.js")
      : null;
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });
  return (
    <Provider store={store}>
      {progress && <TopBarProgress />}
      <LayoutGlobal>
        <Component {...pageProps} />
      </LayoutGlobal>
    </Provider>
  );
}

export default MyApp;
