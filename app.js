import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { requireAuth } from "./middleware/requireAuth.js";

const app = express();

dotenv.config();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(authRoutes);
app.use(cookieParser());

app.get("/", requireAuth, (req, res) => {
  res.status(200).render("home", { title: "node-jwt-authentication" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
