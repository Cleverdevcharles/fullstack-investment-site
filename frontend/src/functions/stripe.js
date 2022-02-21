import axios from "axios";
import { BACKEND_API } from "../config";

export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    `${BACKEND_API}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
