import { Request, Response, NextFunction } from "express";
import * as loanService from "../services/loanService";
import { successResponse } from "../models/responseModels";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// Handles creating new Post
export const createLoanHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { applicant, amount } = req.body;
        const loanData = { applicant, amount };

        const newPost = await loanService.createLoan(loanData);

        res.status(HTTP_STATUS.CREATED).json(successResponse({ newPost }, " Loan application created"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles request to get all posts
export const getAllLoanHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const loans = await loanService.getAllLoans();
        res.status(HTTP_STATUS.OK).json(successResponse({ loans }, "Loan applications retrieved"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles request to get a single post by Id
export const getLoanByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const loans = await loanService.getLoanById(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse({ loans }, "Loan application retrieved "));
    } catch (error: unknown) {
        next(error);
    }
};

// handles request to update an exsting post
export const updateLoanHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { applicant, amount, status } = req.body;

        const updateLoanData = { applicant, amount, status };

        const updatedLoan = await loanService.updateLoan(id as string, updateLoanData);

        res.status(HTTP_STATUS.OK).json(successResponse({ updatedLoan }, "Loan application updated"));
    } catch (error: unknown) {
        next(error);
    }
};


// handles request to delete an exsting post
export const deleteLoanHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await loanService.deleteLoan(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse("Loan application deleted"));
    } catch (error: unknown) {
        next(error);
    }
};

