import jwt from "jsonwebtoken";
import userModel from "../models/users.js";

const authentication = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ message: "Ban chua dang nhap" });
  }
  const token = bearerToken.split(" ")[1];
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("checkToken", checkToken);

    const userId = checkToken.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Ban chua dang nhap 2" });
    }
    req.user = user;
    req.userId = userId;
    console.log("next", userId);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Ban chua dang nhap 3" });
  }
};

export default authentication;
