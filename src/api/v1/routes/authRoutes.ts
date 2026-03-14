import express, { Router } from "express";
import { signIn } from "../controllers/authController";

//import authenticate from "../middleware/authenticate";
//import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

// Only admins can view detailed user information
router.post(
    "/signIn",
    //authenticate,
    // isAuthorized({ hasRole: ["admin"] }),
    signIn
);
export default router;
