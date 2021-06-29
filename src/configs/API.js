import axios from "axios";

export const API = axios.create({
  baseURL: "https://apis-dev.aspenku.com/api/v1/",
});

export const APIV3 = axios.create({
  baseURL: "https://apis-dev.aspenku.com/api/v3/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["authorization"] = `Basic ${token}`;
    APIV3.defaults.headers.common["authorization"] = `Basic ${token}`;
  } else {
    delete API.defaults.headers.common["authorization"];
    delete APIV3.defaults.headers.common["authorization"];
  }
};
