import { refreshToken } from "firebase-admin/app";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { HTTP_STATUS } from "src/constants/httpConstants";
import { errorResponse } from "../models/responseModels";
import { Request, Response, NextFunction } from "express";

// Ensure we're using the client SDK auth instance
const auth = getAuth();

export const signIn = async (
    req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Email and password are required" });
        }

        // Firebase sign-in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get ID token (contains custom claims)
        const idToken = await user.getIdToken();

        res.json({
            idToken: idToken,
            email: user.email,
            localId: user.uid,
            expiresIn: 3600, // Token expiration time in seconds
            refreshToken: refreshToken(user)

        });

    } catch (error) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json(
            errorResponse("Authentication failed", "AUTH_FAILED")
        );
    }
};

