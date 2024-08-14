import axios from "axios";
// import { timestamp2date } from "@/plugin/common";
import { apiPrefix } from "@/constant/baseUrl";

const IAxiosUser = axios.create({
  baseURL: apiPrefix["user"],
  responseType: "json",
  timeout: 1000 * 30,
  headers: {},
});
const IAxiosServer = axios.create({
  baseURL: apiPrefix["server"],
  responseType: "json",
  timeout: 1000 * 30,
  // headers: {'api-key': 'eGfXafAyWEYZbhDE3QKG'}
  headers:
    process.env.NODE_ENV === "development"
      ? { "api-key": "eGfXafAyWEYZbhDE3QKG" }
      : {},
});

function timestamp2date(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

// Function convert json to object
function json2object(data) {
  // Convert date_time to Date object, if it exists
  if (data) {
    if (data.date_created)
      data.date_created = timestamp2date(data.date_created);
    if (data.date_updated)
      data.date_updated = timestamp2date(data.date_updated);
  }
  // For all elements in data, convert json to object
  for (let key in data) {
    if (typeof data[key] === "string") {
      try {
        data[key] = JSON.parse(data[key]);

        // Move all value in json to root
        if (typeof data[key] === "object") {
          for (let subkey in data[key]) {
            // Check if subkey is not exist in root
            if (data[subkey] !== undefined) {
              data[key + "_" + subkey] = data[key][subkey];
            } else {
              data[subkey] = data[key][subkey];
            }
          }
          delete data[key];
        }
      } catch (error) {
        // In case of error, do nothing
      }
    }
  }

  return data;
}

// Export
export default {
  install: (app) => {
    // Alias for fast use
    const cookies = app.config.globalProperties.$cookies;
    // Store
    const store = app.config.globalProperties.$store;

    function resetLogined() {
      store.commit("setAccountInfo", undefined);
    }

    // Function response interceptors
    function XPathResponse(response) {
      let res = response.data;
      if (response.status != 200 && response.status != 403) {
        return Promise.reject(
          res ? res : "An error occurred while processing your request. Please try again later."
        );
      }
      if (
        response.status == 403
        // response.status == 422 ||
        // response.status == 403 ||
        // res.success == "error"
      ) {
        if (store.state.accountInfo) resetLogined();
        return Promise.reject(
          res ? res : "An error occurred while processing your request. Please try again later."
        );
      }
      if (res.success == "error") {
        return Promise.reject(
          res.message
            ? res.message
            : "An error occurred while processing your request. Please try again later."
        );
      }
      let datas = res.data;
      if (Array.isArray(datas) && datas.length > 0) {
        datas = datas.map(json2object);
      }
      if (!Array.isArray(datas)) {
        datas = json2object(datas);
      }
      return datas;
    }

    // Add response interceptors
    IAxiosUser.interceptors.response.use(XPathResponse);
    IAxiosServer.interceptors.response.use(XPathResponse);

    // Request dynamic x-token
    IAxiosUser.interceptors.request.use(function (config) {
      config.headers["x-token"] = cookies.get("x-token");
      return config;
    });

    app.config.globalProperties.$axios = IAxiosUser;
    app.config.globalProperties.$axiosS = IAxiosServer;
  },
};
