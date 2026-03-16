import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { signInWithFirebaseEmailPassword } from "../services/firebaseAuthService";

export const signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email, password } = req.body;

    try {
        const signInData = await signInWithFirebaseEmailPassword(email, password);

        res.status(HTTP_STATUS.OK).json({
            idToken: signInData.idToken,
            email: signInData.email,
            localId: signInData.localId,
            expiresIn: Number(signInData.expiresIn),
            refreshToken: signInData.refreshToken,
        });
    } catch (error) {
        next(error);
    }
};
