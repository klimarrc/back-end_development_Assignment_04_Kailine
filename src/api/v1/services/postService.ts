//import { db } from "../../../../config/firebaseConfig";
import { PostStatus, Post } from "../models/loanPostModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import * as counterRepository from "../repositories/counterRepository";
import { loanPostModels } from "../models/loanPostModel";


const COLLECTION = "posts";

//create a new post 
export const createPost = async (postdata:
    {
        applicant: string;
        amount: number;
        status: PostStatus;
    }): Promise<Post> => {

    try {
        const id = await counterRepository.getNextLoanId();
        const numericId = typeof id === "number" ? id : Number(id);

        if (Number.isNaN(numericId)) {
            throw new Error("Invalid loan id generated");
        }

        const newPostData = {

            createdAt: new Date(),
            ...postdata,
            id,

        }


        await firestoreRepository.createDocument(COLLECTION, newPostData);

        return { ...newPostData } as Post;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

        throw new Error(`Failed to create post: ${errorMessage}`);

    }
};

// //get all posts

// export const getAllPosts = async (): Promise<Post[]> => {
//     try {
//         const posts = await firestoreRepository.getAllDocuments<Post>(COLLECTION);
//         return posts;
//     } catch (error: unknown) {
//         const errorMessage =
//             error instanceof Error ? error.message : "Unknown error";

//         throw new Error(`Failed to retrieve posts: ${errorMessage}`);
//     }
// };

// // get a single post by Id
// export const getPostById = async (id: string): Promise<Post> => {
//     try {
//         const post = await firestoreRepository.getDocumentById<Post>(COLLECTION, id);

//         if (!post) {
//             throw new Error(`Post with id ${id} not found`);
//         }

//         return post;

//     } catch (error: unknown) {
//         const errorMessage =
//             error instanceof Error ? error.message : "Unknown error";
//         throw new Error(`Failed to retrieve post: ${errorMessage}`);
//     }
// };

// // update an existing post
// export const updatePost = async (id: string, postData:
//     {
//         applicant?: string;
//         amount?: number;
//         status?: PostStatus;
//     }
// ): Promise<Post> => {
//     try {
//         const updatedPostData: Partial<Post> = {};
//         if (postData.applicant !== undefined) {
//             updatedPostData.applicant = postData.applicant;
//         }
//         if (postData.amount !== undefined) {
//             updatedPostData.amount = postData.amount;
//         }
//         if (postData.status !== undefined) {
//             updatedPostData.status = postData.status;
//         }
//         if (Object.keys(updatedPostData).length === 0) {
//             throw new Error("No valid fields provided for update");
//         }

//         // update the post domcument
//         await firestoreRepository.updateDocument<Post>(COLLECTION, id, updatedPostData);
//         const updatedPost = await firestoreRepository.getDocumentById<Post>(COLLECTION, id);
//         if (!updatedPost) {
//             throw new Error(`Post with id ${id} not found after update`);
//         }
//         return updatedPost;
//     } catch (error: unknown) {
//         const errorMessage =
//             error instanceof Error ? error.message : "Unknown error";
//         throw new Error(`Failed to update post: ${errorMessage}`);
//     }
// };

// // delete a post by Id
// export const deletePost = async (id: string): Promise<void> => {
//     try {
//         await firestoreRepository.deleteDocument(COLLECTION, id);
//     } catch (error: unknown) {
//         const errorMessage =
//             error instanceof Error ? error.message : "Unknown error";
//         throw new Error(`Failed to delete post: ${errorMessage}`);
//     }
// };
