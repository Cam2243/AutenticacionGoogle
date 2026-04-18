import axios from "axios";

const api = axios.create({
  baseURL: "https://expert-space-trout-rq9g6wr776p3x97p-3000.app.github.dev/",
  withCredentials: true,
});

export default api;