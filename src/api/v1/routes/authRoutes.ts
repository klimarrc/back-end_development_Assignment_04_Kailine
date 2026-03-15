import express, { Router } from "express";
import { signIn } from "../auth/signIn";


//import authenticate from "../middleware/authenticate";
//import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

// Only admins can view detailed user information
router.post("/signIn", signIn);
export default router;
