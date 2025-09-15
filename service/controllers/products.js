import mongoose from "mongoose";
import Product from "../models/products.js";
import ProductImage from "../models/productImages.js";
import cloudinary from "../config/cloudinary.js";

const formatProduct = async (product) => {
  const images = await ProductImage.find({ product_id: product._id });
  return {
    ...product.toObject(),
    images: images.map((img) => img.image_url),
  };
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const formatted = await Promise.all(products.map((p) => formatProduct(p)));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNewProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(12);
    const formatted = await Promise.all(products.map((p) => formatProduct(p)));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRandomProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 8 } }]);
    const formatted = await Promise.all(
      products.map((p) => formatProduct(new Product(p)))
    );
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    const formatted = await formatProduct(product);
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category_id,
    });
    const savedProduct = await product.save();

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        const productImage = new ProductImage({
          product_id: savedProduct._id,
          image_url: uploadResult.secure_url,
        });
        return productImage.save();
      });

      await Promise.all(uploadPromises);
    }

    const formatted = await formatProduct(savedProduct);
    res.status(201).json({
      message: "Tạo sản phẩm thành công",
      product: formatted,
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(400).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    const formatted = await formatProduct(updated);
    res.json(formatted);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    await ProductImage.deleteMany({ product_id: req.params.id });

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
