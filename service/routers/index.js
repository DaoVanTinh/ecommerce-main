import { Router } from "express";
import productsRouter from "./product.js";
import ordersRouter from "./order.js";
import usersRouter from "./auth.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/", ordersRouter);

export default router;
