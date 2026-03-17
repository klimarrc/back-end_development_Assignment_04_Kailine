import { Request, Response } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";
import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock Firebase auth
jest.mock("../src/config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("authenticate middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

    it("should pass AuthenticationError to next() when no token is provided", async () => {
        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
        const error = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Unauthorized: No token provided");
        expect(error.code).toBe("TOKEN_NOT_FOUND");
        expect(error.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
    });

    it("should pass AuthenticationError to next() when token verification fails", async () => {
        // Arrange
        mockRequest.headers = {
            authorization: "Bearer invalid-token",
        };

        (auth.verifyIdToken as jest.Mock).mockRejectedValueOnce(
            new Error("Invalid token")
        );

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
    });

    it("should call next() and set user data when token is valid", async () => {
        (auth.verifyIdToken as jest.Mock).mockResolvedValue({
            uid: "test-uid",
            role: "admin",
        });

        mockRequest = {
            headers: {
                authorization: "Bearer valid-token",
            },
        };

        mockResponse = {
            locals: {},
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(auth.verifyIdToken).toHaveBeenCalledWith("valid-token");
        expect(mockResponse.locals).toEqual({
            uid: "test-uid",
            role: "admin",
        });
        expect(nextFunction).toHaveBeenCalled();
    });

    it("should handle malformed authorization header", async () => {
        // Arrange
        // Missing "Bearer " prefix
        mockRequest.headers = {
            authorization: "InvalidFormat",
        };

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
        const error = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Unauthorized: No token provided");
    });
});