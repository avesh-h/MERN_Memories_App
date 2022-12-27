import express from "express";
import { signup, signin } from "../controllers/userController";

const router = express.Router();

router.post("", signin);

router.post("", signup);
