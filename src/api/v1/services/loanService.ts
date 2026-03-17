
import { Loan, PostStatus } from "../models/loanPostModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const LOANS_COLLECTION = "loans";

//create a new loan 
export const createLoan = async (postData: { applicant: string; amount: number; status?: PostStatus; }): Promise<Loan> => {
    try {

        const newLoanData = {
            ...postData,
            status: postData.status || "pending" as PostStatus,
            createdAt: firestoreRepository.normalizeTimestamps(new Date()),

        }

        const id = await firestoreRepository.createLoanDocument<Loan>(LOANS_COLLECTION, newLoanData)
        return { id, ...newLoanData } as Loan;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create post: ${errorMessage}`
        );
    }
};

//get all loans

export const getAllLoans = async (): Promise<Loan[]> => {
    try {
        const loans = await firestoreRepository.getAllLoanDocuments(LOANS_COLLECTION);
        return loans as Loan[];
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to retrieve loans: ${errorMessage}`);
    }
};

// get a single loan by Id
export const getLoanById = async (id: string): Promise<Loan> => {
    try {
        const loan = await firestoreRepository.getLoanDocumentById(LOANS_COLLECTION, id);

        if (!loan) {
            throw new Error(`Loan with id ${id} not found`);
        }

        return loan as Loan;

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
        await firestoreRepository.updateLoanDocument(LOANS_COLLECTION, id, updatedLoanData);
        const updatedLoan = await firestoreRepository.getLoanDocumentById(LOANS_COLLECTION, id);
        if (!updatedLoan) {
            throw new Error(`Loan with id ${id} not found after update`);
        }
        return updatedLoan as Loan;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update loan: ${errorMessage}`);
    }
};

// delete a loan by Id
export const deleteLoan = async (id: string): Promise<void> => {
    try {
        await firestoreRepository.deleteLoanDocument(LOANS_COLLECTION, id);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete loan: ${errorMessage}`);
    }
};
