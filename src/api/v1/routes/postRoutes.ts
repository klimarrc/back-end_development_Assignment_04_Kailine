import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/postController";
import { postSchemas } from "../validation/postSchemas";

const router = express.Router();

router.post(
    "/",
    validateRequest(postSchemas.create),
    postController.createPost
);

export default router;
