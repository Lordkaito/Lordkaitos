import "@/styles/global.scss";
import React from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { Provider } from "mobx-react";
import appStore from "../../stores/appStore";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  // console.log(PAYPAL_CLIENT_ID);
  return (
    <Provider store={appStore}>
      {/* <PayPalScriptProvider
        options={{
          "client-id": PAYPAL_CLIENT_ID as string,
        }}
      > */}
        <Component {...pageProps} />
      {/* </PayPalScriptProvider> */}
    </Provider>
  );
}
