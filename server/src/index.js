import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/login.js";
import cookieParser from "cookie-parser";
import { topRouter } from "./routes/top.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();




app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use("/auth", userRouter);
app.use("/mytop", topRouter);

app.listen(7001, () => console.log("Server started"));
