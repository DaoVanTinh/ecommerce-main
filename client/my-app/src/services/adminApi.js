import axios from "axios";

const adminInstance = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

adminInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminLogin = (email, password) =>
  adminInstance.post("/login", { email, password });

export const getProducts = () => adminInstance.get("/products");
export const createProduct = (data) => adminInstance.post("/products", data);
export const updateProduct = (id, data) =>
  adminInstance.put(`/products/${id}`, data);
export const deleteProduct = (id) => adminInstance.delete(`/products/${id}`);

export default adminInstance;
