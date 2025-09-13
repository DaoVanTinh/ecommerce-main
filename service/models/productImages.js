import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  image_url: { type: String, required: true },
}, { versionKey: false });

export default mongoose.model("ProductImage", productImageSchema);
