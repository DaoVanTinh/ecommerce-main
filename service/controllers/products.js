import productsModel from "../models/products.js";
import Joi from "joi";

export const createProduct = async (req, res) => {
  try {
    console.log("body", req.body);
    const { name, price, quantity } = req.body;

    const newProduct = await productsModel.create({
      name,
      price,
      quantity,
      image: "img",
      createdBy: req.userId,
    });
    return res.status(201).json({
      product: newProduct,
      message: "Tao san pham thanh cong",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
