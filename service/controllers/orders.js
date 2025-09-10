import Order from "../models/orders.js";

export const createOrder = async (req, res) => {
  try {
    const { products, totalPrice } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Chưa xác thực user" });
    }

    const newOrder = new Order({
      userId: req.user.id,
      products,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
