import express from "express";
import { createLoanHandler, getAllLoanHandler, getLoanByIdHandler, updateLoanHandler, deleteLoanHandler } from "../controllers/loanController"
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import { postSchemas } from "../validation/postSchemas";

const router: express.Router = express.Router();

router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    validateRequest(postSchemas.create), loanController.createLoanHandler)
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
