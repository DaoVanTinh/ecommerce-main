import express from "express";
import { getMe, updateMe, register, login } from "../controllers/auths.js";
import { authentication } from "../middlewares/authentication.js";

const usersRouter = express.Router();

usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.get("/me", authentication, getMe);

usersRouter.put("/me", authentication, updateMe);

export default usersRouter;
