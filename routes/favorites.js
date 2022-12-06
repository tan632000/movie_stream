import express from "express";
import { Test } from "../controllers/favorite.js";

const router = express.Router();

router.get("/test", Test);

export default router;
