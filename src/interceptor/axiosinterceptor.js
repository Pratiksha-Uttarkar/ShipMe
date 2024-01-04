import axios from "axios";
import LocalStorage from "../helpers/Localstorage";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log("token set");
    // get token
    const token = LocalStorage.get("token");

    //set token in request header
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
