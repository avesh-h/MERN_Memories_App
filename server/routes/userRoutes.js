import express from "express";
import { signup, signin } from "../controllers/userController";

const router = express.Router();

router.post("/signin", signin);

router.post("/signup", signup);
