import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // your backend base URL
  withCredentials: false, // if you're using cookies or auth tokens
});

export default api;