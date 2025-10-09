import { Router } from "express";
import productsRouter from "./product.js";
import ordersRouter from "./order.js";
import usersRouter from "./auth.js";
import adminRouter from "./adminAuth.js";
import categorysRouter from "./category.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/orders", ordersRouter);
router.use("/admin", adminRouter);
router.use("/category", categorysRouter);

export default router;
