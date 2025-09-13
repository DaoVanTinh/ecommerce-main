import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getNewProducts,
  getRandomProducts,
} from "../controllers/products.js";
import { authentication, isAdmin } from "../middlewares/authentication.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);
productsRouter.get("/new", getNewProducts);
productsRouter.get("/random", getRandomProducts);
productsRouter.get("/:id", getProductById);

productsRouter.post("/", authentication, isAdmin, createProduct);
productsRouter.put("/:id", authentication, isAdmin, updateProduct);
productsRouter.delete("/:id", authentication, isAdmin, deleteProduct);

export default productsRouter;
