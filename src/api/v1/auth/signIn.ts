import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email, password } = req.body;

    try {
        const auth = getAuth();

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const idToken = await user.getIdToken();
        const tokenResult = await user.getIdTokenResult();

        res.status(HTTP_STATUS.OK).json({
            idToken,
            email: user.email,
            localId: user.uid,
            expiresIn: 3600,
            claims: tokenResult.claims,
        });
    } catch (error) {
        next(error);
    }
};

