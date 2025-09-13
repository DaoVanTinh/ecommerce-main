import mongoose from "mongoose";

const orderCouponSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    coupon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("OrderCoupon", orderCouponSchema);
