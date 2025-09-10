import jwt from "jsonwebtoken";
import userModel from "../models/users.js";

export const isAdmin = (req, res, next) => {
  console.log("Middleware isAdmin chạy");
  next();
};
const authentication = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập" });
  }

  const token = bearerToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

export default authentication;
