import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../models/responseModels";

const errorHandler = (
    err: Error | null,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (!err) {
        console.error("Error: null or undefined error received");
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
        );
        return;
    }

    // Log the error message for debugging
    console.error(`Error: ${err.message}`);

    // Log stack trace for non-production environments
    if (process.env.NODE_ENV !== "production") {
        console.error(`Stack: ${err.stack}`);
    }

    if (err instanceof AppError) {
        // Handle our custom application errors with their specific status codes
        res.status(err.statusCode).json(errorResponse(err.message, err.code));
    } else {
        // Handle unexpected errors (programming errors, third-party library errors, etc.)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
        );
    }
};

export default errorHandler;
