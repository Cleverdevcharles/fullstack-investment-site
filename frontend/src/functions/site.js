import { BACKEND_API } from "../config";

export const createSite = (userId, token, site) => {
  return fetch(`${BACKEND_API}/site/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: site,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSites = () => {
  return fetch(`${BACKEND_API}/sites?limit=1`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteSite = (siteId, userId, token) => {
  return fetch(`${BACKEND_API}/site/${siteId}/${userId}`, {
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

export const getSite = (siteId) => {
  return fetch(`${BACKEND_API}/site/${siteId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateSite = (siteId, userId, token, site) => {
  return fetch(`${BACKEND_API}/site/${siteId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: site,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
