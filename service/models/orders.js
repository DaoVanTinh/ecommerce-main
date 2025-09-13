import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_date: { type: Date, default: Date.now },
    status: { type: String, default: "pending" },
    total_amount: { type: Number, required: true },
  },
  { versionKey: false }
);

export default mongoose.model("Order", orderSchema);
