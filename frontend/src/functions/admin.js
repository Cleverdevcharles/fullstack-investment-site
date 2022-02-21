import axios from "axios";
import { BACKEND_API } from "../config";

export const getOrders = async (authtoken) =>
  await axios.get(`${BACKEND_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${BACKEND_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
