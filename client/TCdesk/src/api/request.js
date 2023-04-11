import axios from "axios";

//IP wifi
const request = axios.create({
  baseURL: "http://192.168.15.136:9999/",
});
export default request;
