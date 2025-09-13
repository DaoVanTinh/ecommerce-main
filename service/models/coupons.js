import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiration_date: { type: Date, required: true },
  },
  { versionKey: false }
);

export default mongoose.model("Coupon", couponSchema);
