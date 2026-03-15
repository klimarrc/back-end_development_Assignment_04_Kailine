
// getErrorMessage and getErrorMessage functions to extract message and code from errors, especially Firebase errors
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

// getErrorCode function to extract code from Firebase errors or return a default code
export const getErrorCode = (error: unknown): string => {
    if (error instanceof Error) {
        // Firebase errors often have a 'code' property
        const firebaseError = error as any;
        return firebaseError.code || "UNKNOWN_ERROR";
    }
    return "UNKNOWN_ERROR";
};
