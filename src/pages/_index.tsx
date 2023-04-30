import Head from 'next/head'
import Navbar from '@/components/Navbar'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'
import jwt, { Secret } from "jsonwebtoken";

export default function Home() {
    return (
    <>
      <Head>
        <title>Lordkaito&apos;s</title>
        <meta name="description" content="Lordkaito's" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div id="splash-screen">
        here we will have a background
      </div>
      <div>
        Quick registration input
      </div>
      <div>
        Prices with no taxes
        {/* the idea here is to allow users to pay either a suscription or either a one time payment to use the platform and allow them to sell in here.
        You will also be able to buy stuff from anyone in the platform with no need to pay taxes or suscriptions // you fool
        */}
      </div>
    </>
  )
}
