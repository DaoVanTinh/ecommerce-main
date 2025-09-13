import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    payment_date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { versionKey: false }
);

export default mongoose.model("Payment", paymentSchema);
