import axios from "axios";

//IP wifi
const request = axios.create({
  baseURL: "http://172.16.22.75:9999/",
});
export default request;
