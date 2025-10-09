import express from "express";
import { adminLogin } from "../controllers/adminAuths.js";
import { authentication, isAdmin } from "../middlewares/authentication.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/dashboard", authentication, isAdmin, (req, res) => {
  res.json({ message: "Chào admin, đây là dashboard!" });
});

export default adminRouter;
