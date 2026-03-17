import { Loan, PostStatus } from "../models/loanPostModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import * as counterRepository from "../repositories/counterRepository";

//create a new loan 
export const createLoan = async (postdata:
    {
        applicant: string;
        amount: number;
    }): Promise<Loan> => {

    try {
        const id = await counterRepository.getNextLoanId();
        const numericId = typeof id === "number" ? id : Number(id);

        if (Number.isNaN(numericId)) {
            throw new Error("Invalid loan id generated");
        }

        const newLoanData = {

            id,
            ...postdata,
            status: "pending" as PostStatus,
            createdAt: new Date(),

        }

        await firestoreRepository.createLoanDocument(newLoanData);

        return { ...newLoanData } as Loan;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

        throw new Error(`Failed to create loan: ${errorMessage}`);

    }
};

//get all loans

export const getAllLoans = async (): Promise<Loan[]> => {
    try {
        const loans = await firestoreRepository.getAllLoanDocuments();
        return loans;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to retrieve loans: ${errorMessage}`);
    }
};

// get a single loan by Id
export const getLoanById = async (id: string): Promise<Loan> => {
    try {
        const loan = await firestoreRepository.getLoanDocumentById(id);

        if (!loan) {
            throw new Error(`Loan with id ${id} not found`);
        }

        return loan;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to retrieve loan: ${errorMessage}`);
    }
};

// update an existing loan
export const updateLoan = async (id: string, postData:
    {
        applicant?: string;
        amount?: number;
        status?: PostStatus;
    }
): Promise<Loan> => {
    try {
        const updatedLoanData: Partial<Loan> = {};
        if (postData.applicant !== undefined) {
            updatedLoanData.applicant = postData.applicant;
        }
        if (postData.amount !== undefined) {
            updatedLoanData.amount = postData.amount;
        }
        if (postData.status !== undefined) {
            updatedLoanData.status = postData.status;
        }
        if (Object.keys(updatedLoanData).length === 0) {
            throw new Error("No valid fields provided for update");
        }

        // update the loan document
        await firestoreRepository.updateLoanDocument(id, updatedLoanData);
        const updatedLoan = await firestoreRepository.getLoanDocumentById(id);
        if (!updatedLoan) {
            throw new Error(`Loan with id ${id} not found after update`);
        }
        return updatedLoan;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update loan: ${errorMessage}`);
    }
};

// delete a loan by Id
export const deleteLoan = async (id: string): Promise<void> => {
    try {
        await firestoreRepository.deleteLoanDocument(id);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete loan: ${errorMessage}`);
    }
};
