<<<<<<< HEAD
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'next/router'
import TopBarProgress from "react-topbar-progress-indicator"
import LayoutGlobal from '@components/common/LayoutGlobal'
import store from '@redux/store'
import 'bootstrap/dist/css/bootstrap.css'
import '@styles/globals.scss'

TopBarProgress.config({
  barColors: {
    "0": "#1DBBBD",
    "1.0": "#1DBBBD"
  },
  shadowBlur: 5
=======
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
>>>>>>> origin/dev
});

function MyApp({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(false);
<<<<<<< HEAD

  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.js') : null
  }, []);

  Router.events.on("routeChangeStart", () => {
    setProgress(true)
  });
  Router.events.on("routeChangeComplete", () => {
    setProgress(false)
=======
  const router = useRouter();
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.js")
      : null;
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: any) => {
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
>>>>>>> origin/dev
  });
  return (
    <Provider store={store}>
      {progress && <TopBarProgress />}
      <LayoutGlobal>
        <Component {...pageProps} />
      </LayoutGlobal>
    </Provider>
<<<<<<< HEAD
  )
}

export default MyApp
=======
  );
}

export default MyApp;
>>>>>>> origin/dev
