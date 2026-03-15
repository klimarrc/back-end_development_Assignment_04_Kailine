import { HTTP_STATUS } from "../../../constants/httpConstants";


export class AppError extends Error {

    constructor(
        public message: string,
        public code: string,
        public statusCode: number
    ) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}


export class RepositoryError extends AppError {
    constructor(
        message: string,
        code: string,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        super(message, code, statusCode);
    }
}

export class LoanError extends AppError {
    constructor(
        message: string = "Loan application not found",
        code: string = "LOAN_NOT_FOUND",
        statusCode: number = HTTP_STATUS.NOT_FOUND
    ) {
        super(message, code, statusCode);
    }
}

export class AuthenticationError extends AppError {
    constructor(
        message: string = "Authentication failed",
        code: string = "AUTHENTICATION_ERROR",
        statusCode: number = HTTP_STATUS.UNAUTHORIZED
    ) {
        super(message, code, statusCode);
    }
}

export class AuthorizationError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHORIZATION_ERROR",
        statusCode: number = HTTP_STATUS.FORBIDDEN
    ) {
        super(message, code, statusCode);
    }
}
