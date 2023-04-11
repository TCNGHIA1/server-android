import axios from "axios";

const request = axios.create({
  baseURL: "http://172.16.27.104:9999/",
});
export default request;
