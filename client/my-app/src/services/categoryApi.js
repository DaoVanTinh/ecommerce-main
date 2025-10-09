import axios from "axios";

const categoryInstance = axios.create({
  baseURL: "http://localhost:5000/api/category",
});

export const getCategories = () => categoryInstance.get("/");
export const createCategory = (data) => categoryInstance.post("/", data);
export const deleteCategory = (id) => categoryInstance.delete(`/${id}`);
