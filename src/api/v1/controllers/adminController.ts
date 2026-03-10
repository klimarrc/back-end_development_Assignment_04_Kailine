// External library imports
import { Request, Response, NextFunction } from "express";

// Internal module imports
import { auth } from "../../../../config/firebaseConfig";
import { successResponse } from "../models/responseModels";
import { HTTP_STATUS } from "../../../constants/httpConstants";


export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    console.log("uid, claims", req.body);
    const { uid, role } = req.body;

    try {
        // Set custom claims on the officer Firebase account
        await auth.setCustomOfficerClaims(uid, { role });

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                {},
                `Custom claims set for officer : ${uid}. User must obtain a new token for changes to take effect.`
            )
        );
    } catch (error) {
        next(error);
    }
};