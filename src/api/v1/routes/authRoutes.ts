import { signInHandler } from "../controllers/authController";
import express from "express";

const router: express.Router = express.Router();

router.post("/signin", signInHandler);

export default router;
