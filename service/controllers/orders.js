import Order from "../models/orders.js";
import OrderItem from "../models/orderItems.js";

export const createOrder = async (req, res) => {
  try {
    const { products, total_amount } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Chưa xác thực user" });
    }

    if (!products || !products.length) {
      return res.status(400).json({ error: "Không có sản phẩm trong order" });
    }

    const newOrder = new Order({
      user_id: req.user._id,
      total_amount,
    });

    const savedOrder = await newOrder.save();

    await Promise.all(
      products.map((p) => {
        if (!p.product_id || !p.quantity || !p.price)
          throw new Error("Dữ liệu sản phẩm không hợp lệ");
        return new OrderItem({
          order_id: savedOrder._id,
          product_id: p.product_id,
          quantity: p.quantity,
          price: p.price,
        }).save();
      })
    );

    res.status(201).json({ orderId: savedOrder._id });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.find({ order_id: order._id }).populate(
          "product_id"
        );
        return { ...order, items };
      })
    );

    res.json(ordersWithItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
