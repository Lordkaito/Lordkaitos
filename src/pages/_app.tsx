import "@/styles/global.scss";
import React from "react";
import type { AppProps /*, AppContext */ } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return <Component {...pageProps} />;
}
