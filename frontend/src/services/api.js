import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5003/api", // 🔥 hardcoded for now
});

export const loginUser = (data) => API.post("/auth/login", data);
