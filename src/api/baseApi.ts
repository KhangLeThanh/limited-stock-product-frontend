import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

export default baseApi;
