import axios from "axios";

const cartApi = axios.create({
  baseURL: "http://localhost:5000/api/orders",
});

cartApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createOrder = async (cartItems, total) => {
  const response = await cartApi.post("/", {
    products: cartItems.map((item) => ({
      product_id: item._id,
      quantity: item.quantity,
      price: item.price,
    })),
    total_amount: total,
  });
  return response.data;
};

export const getUserOrders = async () => {
  const response = await cartApi.get("/");
  return response.data;
};
