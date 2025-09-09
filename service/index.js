import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routers/index.js";
import morgan from "morgan";
import multer from "multer";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(upload.none(), router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
