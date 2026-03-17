// External library imports
import { Request, Response, NextFunction } from "express";
import { UserRecord } from "firebase-admin/auth";

// Internal module imports
import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModels";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// Controller function to get user details by ID
export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { uid } = req.params;
    try {

        const user: UserRecord = await auth.getUser(uid as string);
        res.status(HTTP_STATUS.OK).json(successResponse(user));
    } catch (error) {

        next(error);
    }
};