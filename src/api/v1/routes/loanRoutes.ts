import express from "express";
import {
    createLoanHandler,
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


// router.get("/loans", authenticate, getLoansHandler);

// router.get("/loans/:id", authenticate, getLoanByIdHandler);

// router.put(
//     "/loans/:id",
//     authenticate,
//     isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
//     updatePostHandler
// );

// router.delete(
//     "/loans/:id",
//     authenticate,
//     isAuthorized({ hasRole: ["admin", "manager"] }),
//     deletePostHandler
// );

export default router;
