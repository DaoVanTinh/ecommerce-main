import axios from "axios";

const adminProductInstance = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

adminProductInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createProduct = (formData) =>
  adminProductInstance.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (id, data) =>
  adminProductInstance.put(`/${id}`, data);

export const deleteProduct = (id) => adminProductInstance.delete(`/${id}`);
