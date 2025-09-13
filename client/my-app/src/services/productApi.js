import axios from "axios";

const productInstance = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

const setAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getProducts = () => productInstance.get("/", setAuthHeader());
export const createProduct = (data) =>
  productInstance.post("/", data, setAuthHeader());
export const updateProduct = (id, data) =>
  productInstance.put(`/${id}`, data, setAuthHeader());
export const deleteProduct = (id) =>
  productInstance.delete(`/${id}`, setAuthHeader());
