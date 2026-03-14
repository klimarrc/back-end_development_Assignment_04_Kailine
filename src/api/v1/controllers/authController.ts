import { NextFunction, Request, Response } from "express";
import { successResponse, errorResponse } from "../models/responseModels";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { authService } from "../services/authService";


interface SignInRequestBody {
    email: string;
    password: string;
}


interface SignInSuccess {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


export const signInHandler = async (
    req: Request<{}, {}, SignInRequestBody>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Email and password are required", "VALIDATION_ERROR")
            );
            return;
        }

        const signInResponse: any = await authService.signInWithEmailAndPassword(email, password);

        // Check for error in signInResponse
        if (signInResponse && signInResponse.error) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json(
                errorResponse(`Sign-in failed: ${signInResponse.error.message}`, signInResponse.error.code)
            );
            return;
        }
        // If signInResponse is successful, send the token and user info back to the client
        res.status(HTTP_STATUS.OK).json(
            successResponse(signInResponse as SignInSuccess, "Sign-in successful")
        );
    } catch (error: unknown) {
        next(error);
    }
};






//     const signInResult: SignInResponseData = await authService.signInWithEmailAndPassword(email, password);
