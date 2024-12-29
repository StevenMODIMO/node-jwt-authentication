import dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("/", (req, res) => {
  res.status(200).render("home", { title: "REST CRUD API" });
});

app.get("/login", (req, res) => {
  res.status(200).render("login", { title: "Login" });
});

app.get("/signup", (req, res) => {
  res.status(200).render("signup", { title: "Get started" });
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
