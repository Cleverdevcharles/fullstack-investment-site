import { BACKEND_API } from "../config";

export const getInvestmentPackages = () => {
  return fetch(`${BACKEND_API}/investmentpackages`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};



export const deleteInvestmentPackage = (investmentpackageId, userId, token) => {
  return fetch(
    `${BACKEND_API}/investmentpackage/${investmentpackageId}/${userId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateInvestmentPackage = (
  investmentpackageId,
  userId,
  token,
  investmentpackage
) => {
  return fetch(
    `${BACKEND_API}/investmentpackage/update/${investmentpackageId}/${userId}`,
    {
      method: "PUT",
      headers: {
        // content type?
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(investmentpackage),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createInvestmentPackage = (userId, token, investmentpackage) => {
  return fetch(`${BACKEND_API}/investmentpackage/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(investmentpackage),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      console.log(`Bearer ${token}`);
    });
};

export const getInvestmentPackage = (investmentpackageId) => {
  console.log(`${BACKEND_API}/investmentpackage/${investmentpackageId}`);
  return fetch(`${BACKEND_API}/investmentpackage/${investmentpackageId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};