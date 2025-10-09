import Category from "../models/categorys.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    if (!category_name || category_name.trim() === "") {
      return res.status(400).json({ error: "category_name is required" });
    }

    const existing = await Category.findOne({
      category_name: category_name.trim(),
    });
    if (existing) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = new Category({ category_name: category_name.trim() });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
};
