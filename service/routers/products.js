import { Router } from "express";
import { createProduct } from "../controllers/products.js";
import authentication from "../middlewares/authentication.js";

const productsRouter = Router();

productsRouter.post("/create", authentication, createProduct); // http://localhost:8080/products/register

export default productsRouter;
