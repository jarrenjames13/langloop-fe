import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://langloop-be.jarren.online//api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
