import { Router } from "express";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  getLogout
} from "../controllers/authControllers.js";
import { checkUser } from "../middleware/requireAuth.js"

const router = Router();

router.get("/signup", getSignup);

router.post("/signup", postSignup);

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/logout", getLogout)

export default router;
