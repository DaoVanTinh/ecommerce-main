import axios from "axios";

const productInstance = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

export const getProducts = () => productInstance.get("/");
export const getProduct = (id) => productInstance.get(`/${id}`);
export const getNewProducts = () => productInstance.get("/new");
export const getRandomProducts = () => productInstance.get("/random");
