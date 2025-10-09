import axios from "axios";

const authInstance = axios.create({
  baseURL: "http://localhost:5000/api/users",
});

export const login = (name, password) =>
  authInstance.post("/login", { name, password });

export const register = (data) => authInstance.post("/register", data);

export const getProfile = (token) =>
  authInstance.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
