import express from "express";
import {
    createLoanHandler,
    getAllLoanHandler,
} from "../controllers/loansController";

import authenticate from "../middleware/authenticate";
//import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

router.post(
    "/",
    authenticate,
    // isAuthorized({ hasRole: [] }),
    createLoanHandler
);


router.get("/", authenticate, getAllLoanHandler);

// router.get("/:id", authenticate, getLoanByIdHandler);

// router.put(
//     "/:id",
//     authenticate,
//     isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
//     updatePostHandler
// );

// router.delete(
//     "/:id",
//     authenticate,
//     isAuthorized({ hasRole: ["admin", "manager"] }),
//     deletePostHandler
// );

export default router;
