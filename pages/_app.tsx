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
});

function MyApp({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.js') : null
  }, []);

  Router.events.on("routeChangeStart", () => {
    setProgress(true)
  });
  Router.events.on("routeChangeComplete", () => {
    setProgress(false)
  });
  return (
    <Provider store={store}>
      {progress && <TopBarProgress />}
      <LayoutGlobal>
        <Component {...pageProps} />
      </LayoutGlobal>
    </Provider>
  )
}

export default MyApp
