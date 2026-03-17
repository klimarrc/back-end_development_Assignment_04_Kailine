
import { db } from "../../../config/firebaseConfig";
import { Loan } from "../models/loanPostModel";
import { FirestoreDataTypes } from "../types/firestore";
import { Timestamp } from "firebase-admin/firestore";

interface FieldValuePair {
    fieldName: string;
    fieldValue: FirestoreDataTypes;
}


// creating new document in firestore
export const createLoanDocument = async <Loan>(
    collectionName: string,
    data: Partial<Loan>
): Promise<string> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;
        // Add server timestamp here
        (data as any).createdAt = Timestamp.now();
        docRef = await db.collection(collectionName).add(data);


        return docRef.id.toString();

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create document in ${collectionName}: ${errorMessage}`
        );
    }
};

export const getAllLoanDocuments = async <T>(
    collectionName: string
): Promise<Loan[]> => {
    try {
        const snapshot = await db.collection(collectionName).get();

        return snapshot.docs.map(doc => {
            const data = doc.data() as any;

            if (data.createdAt instanceof Timestamp) {
                data.createdAt = data.createdAt.toDate().toISOString();
            }

            return {
                id: doc.id,
                ...data,
            };
        });

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve all documents in ${collectionName}: ${errorMessage}`
        );
    }
};


export const getLoanDocumentById = async <T>(
    collectionName: string,
    id: string,
): Promise<T | null> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).doc(id);

        const snapshot = await docRef.get();

        if (!snapshot) {
            return null;
        }

        return {
            id: snapshot.id,
            ... (snapshot.data() as T),
        }

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to find the document in ${collectionName}: ${errorMessage}`
        );
    }
};


export const updateLoanDocument = async <T>(
    collectionName: string,
    id: string,
    data: Partial<T>
): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).update(data);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update document in ${collectionName}: ${errorMessage}`
        );
    }
};


export const deleteLoanDocument = async <T>(
    collectionName: string,
    id: string,
): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).delete();
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete document in ${collectionName}: ${errorMessage}`
        );
    }
};

export const deleteDocumentsByFieldValues = async (
    collectionName: string,
    fieldValuePairs: FieldValuePair[],
    transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
    try {
        let query: FirebaseFirestore.Query = db.collection(collectionName);

        // Apply all field-value filters
        fieldValuePairs.forEach(({ fieldName, fieldValue }) => {
            query = query.where(fieldName, "==", fieldValue);
        });

    } catch (error: unknown) {
        const fieldValueString: string = fieldValuePairs
            .map(({ fieldName, fieldValue }) => `${fieldName} == ${fieldValue}`)
            .join(" AND ");
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete documents from ${collectionName} where ${fieldValueString}: ${errorMessage}`
        );
    }
};