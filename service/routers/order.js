import express from "express";
import { createOrder, getOrdersByUser } from "../controllers/orders.js";
import authentication from "../middlewares/authentication.js";

const ordersRouter = express.Router();

ordersRouter.post("/", authentication, createOrder);
ordersRouter.get("/", authentication, getOrdersByUser);

export default ordersRouter;
