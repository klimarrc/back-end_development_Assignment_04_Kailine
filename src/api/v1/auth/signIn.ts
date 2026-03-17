import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "src/constants/httpConstants";

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const apiKey = process.env.FIREBASE_API_KEY;

        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Authentication failed",
                error: data
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            idToken: data.idToken,
            email: data.email,
            localId: data.localId,
            expiresIn: data.expiresIn,
            refreshToken: data.refreshToken
        });

    } catch (error) {
        console.error(error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};