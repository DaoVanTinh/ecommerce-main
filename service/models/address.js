import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    street: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
  },
  { versionKey: false }
);

export default mongoose.model("Address", addressSchema);
