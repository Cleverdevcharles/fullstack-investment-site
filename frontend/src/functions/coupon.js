import axios from "axios";
import { BACKEND_API } from "../config";

export const getCoupons = async () =>
  await axios.get(`${BACKEND_API}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${BACKEND_API}/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${BACKEND_API}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
