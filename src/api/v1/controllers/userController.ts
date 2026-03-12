// External library imports
import { Request, Response, NextFunction } from "express";
import { UserRecord } from "firebase-admin/auth";

// Internal module imports
import { auth } from "../../../../config/firebaseConfig";
import { successResponse } from "../models/responseModels";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// Controller function to get user details by ID
export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id } = req.params;

    try {
        // Fetch user record from Firebase Authentication
        const user: UserRecord = await auth.getUser(id as string);
        res.status(HTTP_STATUS.OK).json(successResponse(user));
    } catch (error) {
        // Pass any errors to the centralized error handler
        next(error);
    }
};