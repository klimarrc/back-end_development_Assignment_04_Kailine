//import { db } from "../../../../config/firebaseConfig";
import { Loan, PostStatus } from "../models/loanPostModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import * as counterRepository from "../repositories/counterRepository";


const COLLECTION = "loans";

//create a new loan 
export const createLoan = async (postdata:
    {
        applicant: string;
        amount: number;
        status: PostStatus;
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
            createdAt: new Date(),

        }


        await firestoreRepository.createLoanDocument(COLLECTION, newLoanData);

        return { ...newLoanData } as Loan;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

        throw new Error(`Failed to create post: ${errorMessage}`);

    }
};

//get all posts

export const getAllLoans = async (): Promise<Loan[]> => {
    try {
        const posts = await firestoreRepository.getAllLoanDocuments<Loan>(COLLECTION);
        return loans;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

        throw new Error(`Failed to retrieve posts: ${errorMessage}`);
    }
};

// get a single post by Id
export const getLoanById = async (id: string): Promise<Loan> => {
    try {
        const post = await firestoreRepository.getLoanDocumentById<Loan>(COLLECTION, id);

        if (!post) {
            throw new Error(`Post with id ${id} not found`);
        }

        return post;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to retrieve post: ${errorMessage}`);
    }
};

// update an existing post
export const updateLoan = async (id: string, postData:
    {
        applicant?: string;
        amount?: number;
        status?: PostStatus;
    }
): Promise<Post> => {
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

        // update the post domcument
        await firestoreRepository.updateLoanDocument<Loan>(COLLECTION, id, updatedLoanData);
        const updatedPost = await firestoreRepository.getLoanDocumentById<Loan>(COLLECTION, id);
        if (!updatedPost) {
            throw new Error(`Post with id ${id} not found after update`);
        }
        return updatedPost;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update post: ${errorMessage}`);
    }
};

// delete a post by Id
export const deleteLoan = async (id: string): Promise<void> => {
    try {
        await firestoreRepository.deleteLoanDocument(COLLECTION, id);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete post: ${errorMessage}`);
    }
};
