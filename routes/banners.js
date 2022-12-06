import express from "express";
import { Test } from "../controllers/banner.js";

const router = express.Router();

router.get("/test", Test);

export default router;
