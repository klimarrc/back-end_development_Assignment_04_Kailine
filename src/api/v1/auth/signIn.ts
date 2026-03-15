

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
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // Get ID token (contains custom claims)
                const idToken = user.getIdToken();
                const refreshToken = user.getIdTokenResult();

                return res.status(HTTP_STATUS.OK).json({
                    idToken,
                    email: user.email,
                    localId: user.uid,
                    expiresIn: 3600,
                    refreshToken
                });
            })
    } catch (error) {
        next(error);

    }
};