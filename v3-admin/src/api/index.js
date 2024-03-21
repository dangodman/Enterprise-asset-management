import axios from "axios";
import router from "../router";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.timeout = 5000;

axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if(token) {
    config.headers.Authorization = token;
  }
  return config;
});

axios.interceptors.response.use((res) => {
  if (res.data.code && res.data.code !== 0) {
    return Promise.reject(res.data.error);
    if (res.data.status >= 400 && res.data.status < 500) {
      router.push("/login");
      return Promise.reject(res.data);
    }
  }
  return res;
});

export function post(url, body) {
  return axios.post(url, body).then((res) => res.data);
}
