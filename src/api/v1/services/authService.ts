import { auth } from "../../../../config/firebaseConfig";
import { errorResponse } from "../models/responseModels";

export const authService = {
    signInWithEmailAndPassword: async (email: string, password: string) => {
        try {
            const userRecord = await auth.getUserByEmail(email);
            if (!userRecord) {
                return { error: errorResponse("User not found", "USER_NOT_FOUND") };
            }
        } catch (error: unknown) {
            return { error: errorResponse("Error fetching user data", "USER_FETCH_ERROR") };
        }

        // You must use Firebase Client SDK for this functionality
        return { error: errorResponse("Sign-in with email and password is not supported on the server. Use Firebase Client SDK on the client side.", "UNSUPPORTED_OPERATION") };
    },
};



