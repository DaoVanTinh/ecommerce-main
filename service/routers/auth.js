import express from "express";
import { register, login } from "../controllers/auths.js";
import authentication from "../middlewares/authentication.js";

const usersRouter = express.Router();

usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.get("/me", authentication, (req, res) => {
  res.json(req.user); 
});

export default usersRouter;
