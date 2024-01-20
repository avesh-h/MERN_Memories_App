import express from "express";
import {
  signup,
  signin,
  userVerification,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signin", signin);

//Verification of the user
router.get("/verification", userVerification);

router.post("/signup", signup);

export default router;
