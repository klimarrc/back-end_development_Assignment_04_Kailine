import express from "express";
import {
    createLoanHandler,
    deleteLoanHandler,
    getAllLoanHandler,
    getLoanByIdHandler,
    updateLoanHandler,
} from "../controllers/loansController";

import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    createLoanHandler
);


router.get("/", authenticate, getAllLoanHandler);

router.get("/:id", authenticate, getLoanByIdHandler);

router.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    updateLoanHandler
);

router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    deleteLoanHandler
);

export default router;
