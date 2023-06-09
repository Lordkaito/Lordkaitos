import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Lordkaito's" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* <script
            src="https://www.paypal.com/sdk/js?components=buttons,hosted-fields&client-id=ASOfxFalXKYh0OK_M2oCA6X_sJ_VEEZrZSBrXMw_iwLJkKCTQ5pIbghmd93zEtourTslmZWc9BMn6aqd"
            data-client-token="EKTgBtktyYUvNLu1trNAvWnLZge7VlNImJAL84MfRornfixJYewaymuQBOQa7Eu7Azv8itFvM6I2CIt4"
          ></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
