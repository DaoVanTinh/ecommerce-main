import express from "express";
import { createOrder, getOrdersByUser } from "../controllers/orders.js";
import { authentication } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/", authentication, createOrder);
router.get("/", authentication, getOrdersByUser);

export default router;
