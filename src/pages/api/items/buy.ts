import { NextApiRequest, NextApiResponse } from "next";
// const base = "https://api-m.sandbox.paypal.com"

// const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_TOKEN } = process.env

// const baseURL = {
//   sandbox: "https://api-m.sandbox.paypal.com",
//   production: "https://api-m.paypal.com"
// }

// const generateClientToken = async () => {
//   const accessToke = await generateAccessToken()
//   const response = await fetch(`${baseURL.sandbox}/v1/identity/generate-token`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${accessToke}`,
//       "Content-Type": "application/json"
//     }
//   })
//   const data = await response.json()
//   return data.client_token
// }

// const generateAccessToken = async () => {
//   const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_TOKEN}`).toString("base64")
//   const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
//     method: "POST",
//     body: "grant_type=client_credentials",
//     headers: {
//       Authorization: `Basic ${auth}`,
//     },
//   })
//   const data = await response.json()
//   return data.access_token
// }

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.body;
    try {
      // this is how we create products, so this would be in the item creation
      const item = await stripe.products.create({
        name: 'prueba de creacion con api2',
        description: 'prueba de creacion con api2',
        images: ['https://i.imgur.com/EHyR2nP.png'],
      });
      // then we need to create a price for the product, so this would be in the item creation
      const price = await stripe.prices.create({
        product: item.id,
        unit_amount: 2000,
        currency: 'usd',
      });
      // then this is to actually make the payment, so this would be in the payment page
      const payment = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1NGtKFIVk8RfOzXrIde2dDIj",
            quantity: 1,
          },
          {
            price: "price_1NGtR6IVk8RfOzXrxU0gdmDA",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
      res.redirect(303, payment.url);
      return res.status(200).json({ message: "Payment successful" });
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: "Invalid request" });
  }
}
