import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/login.js";
import cookieParser from "cookie-parser";
import { topRouter } from "./routes/top.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const corsOptions = {
  origin: [
    "https://legendary-alpaca-475d99.netlify.app",
    "https://spotifywrappedapp-5143b8c04d17.herokuapp.com/",
  ],
  // Add any other required CORS options here
};

app.use(cors(corsOptions));

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use("/auth", userRouter);
app.use("/mytop", topRouter);
app.listen(process.env.PORT || 7001);
//app.listen(7001, () => console.log("Server started"));
