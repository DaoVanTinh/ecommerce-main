import mongoose, { version } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: String, default: "active" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
