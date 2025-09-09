import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.js";

const usersRouter = Router();

usersRouter.post("/register", registerUser); // http://localhost:8080/users/register
usersRouter.post("/login", loginUser);

export default usersRouter;
