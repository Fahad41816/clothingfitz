/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import VisaCardIcon from "@/assets/Icon/visa.png";
import MasterCardIcon from "@/assets/Icon/master.png";
import CardIcon from "@/assets/Icon/atm-card.png";
import Image from "next/image";

const StripeGetway = () => {
  const stripe: any = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError }: any = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch("/create-intent", {
      method: "POST",
    });

    const { client_secret: clientSecret } = await res.json();

    const { error }: any = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <Card className="p-6 border-border bg-card w-[700px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Image src={CardIcon} alt="Card Image" width={40}></Image>
          <p className="text-2xl "> Card Payment</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Image alt="Visa Card Image" src={VisaCardIcon} width={40}></Image>
          <Image
            alt="Master Provider Image"
            src={MasterCardIcon}
            width={40}
          ></Image>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label htmlFor="CardHolderNameElement" className="mt-2">
            <p className="font-semibold text-gray-600">
              Cardholder&rsquo;s Name
            </p>
            <div className="p-1.5 border focus:ring-2 bg-slate-100 ">
              <input
                type="text"
                className="w-full border-none outline-0 p-0 text-sm"
                placeholder="Cardholder's name"
              />
            </div>
          </label>
        </div>
        <div className="mt-2">
          <label htmlFor="NumberElement" className="mt-2">
            <p className="font-semibold text-gray-600">Card Number</p>
            <div className="p-2 border  focus:ring-2 bg-slate-100   border-input">
              <CardNumberElement
                id="NumberElement"
                onChange={(e) => console.log(e)}
                options={{ placeholder: "xxxx xxxx xxxx xxxx" }}
              />
            </div>
          </label>
        </div>
        <div className="w-full flex items-center justify-start gap-4">
          <div className="mt-2">
            <label htmlFor="CardExpiryElement" className="mt-2">
              <p className="font-semibold text-gray-600">Expire date</p>
              <div className="p-2 border   bg-slate-100 w-[150px]">
                <CardExpiryElement
                  onChange={(e) => console.log(e)}
                  id="CardExpiryElement"
                />
              </div>
            </label>
          </div>

          <div className="mt-2">
            <label htmlFor="CardCvcElement" className="mt-2">
              <p className="font-semibold text-gray-600">CVV</p>
              <div className="p-2 border   bg-slate-100 w-[100px]">
                <CardCvcElement
                  onChange={(e) => console.log(e)}
                  id="CardCvcElement"
                />
              </div>
            </label>
          </div>
        </div>
        {/* <PaymentElement /> */}
        <Button
          type="submit"
          className="w-full rounded-none mt-4"
          disabled={!stripe || !elements}
        >
          Pay Now $273.00
        </Button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </Card>
  );
};

export default StripeGetway;
