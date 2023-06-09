import { observer } from "mobx-react";
import React from "react";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

interface CheckoutProps {
  id: string;
}

const stripePromise = loadStripe("pk_test_51NGSM8IVk8RfOzXrPBAr8XI8saJat6UnUz65Py3alSaOQafwCdyWCxDR4dXO5JDeK3KI2i9mvND54jZBWePtO2KG00qn1WC7M1");

const Checkout = observer((props: CheckoutProps) => {
  return <div>Checkout</div>;
});

export default Checkout;