import "@/styles/global.scss";
import React from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { Provider } from "mobx-react";
import appStore from "../../stores/appStore";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={appStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
