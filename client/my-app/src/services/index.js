import axios from "axios";
import { getValueFromLocalStorage } from "../utils";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

const authInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

authInstance.interceptors.request.use((config) => {
  const token = getValueFromLocalStorage("token");
  if (!token) {
    window.location.href = "/auth/login";
    return config;
  }
  try {
    config.headers.Authorization = `Bearer ${getValueFromLocalStorage(
      "token"
    )}`;
  } catch (error) {
    window.location.href = "/auth/login";
    console.log(error);
  }
  return config;
});

export const login = (name, password) => {
  return instance.post("users/login", { name, password });
};

export const createProduct = (data) => {
  return authInstance.post("/products/create", data);
};
