import { BACKEND_API } from "../config";

export const createInvestmentPlan = (userId, token, { investmentplan }) => {
  return fetch(`${BACKEND_API}/create/new/investmentplan/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(investmentplan),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * to perform crud on investment plan
 * get all investment plans
 * get a single investment plan
 * update single investment plan
 * delete single investment plan
 */

export const getAllInvestmentPlans = () => {
  return fetch(`${BACKEND_API}/investmentplans`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteInvestmentPlan = (id, token) => {
  return fetch(`${BACKEND_API}/delete/investmentplan/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getInvestmentPlanDetails = (id) => {
  return fetch(`${BACKEND_API}/investmentplan/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const productStar = async (productId, star, token) => {
  return fetch(`${BACKEND_API}/product/star/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: star,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (id, token, investmentplan) => {
  return fetch(`${BACKEND_API}/update/investmentplan/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: investmentplan,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
