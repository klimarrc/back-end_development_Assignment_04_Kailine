import { HTTP_STATUS } from "../../../constants/httpConstants";
import { AuthenticationError } from "../errors/errors";

export type FirebaseSignInResponse = {
    idToken: string;
    email: string;
    localId: string;
    expiresIn: string;
    refreshToken: string;
};

const FIREBASE_SIGN_IN_URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
const FIREBASE_WEB_API_KEY = "AIzaSyBGA3kTK_4yFM77_T74BMvehhQL2epYJ8A"

export const signInWithFirebaseEmailPassword = async (
    email: string,
    password: string
): Promise<FirebaseSignInResponse> => {
    const firebaseResponse = await fetch(`${FIREBASE_SIGN_IN_URL}?key=${FIREBASE_WEB_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
    });

    const responseBody = (await firebaseResponse.json()) as
        | FirebaseSignInResponse
        | { error?: { message?: string } };

    if (!firebaseResponse.ok) {
        const message =
            "error" in responseBody && responseBody.error?.message
                ? responseBody.error.message
                : "Invalid email or password";

        throw new AuthenticationError(message, "AUTHENTICATION_ERROR", HTTP_STATUS.UNAUTHORIZED);
    }

    return responseBody as FirebaseSignInResponse;
};
