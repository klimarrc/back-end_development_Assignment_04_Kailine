
import { db } from "../../../config/firebaseConfig";
import { Loan } from "../models/loanPostModel";
import { FirestoreDataTypes } from "../types/firestore";

const LOANS_COLLECTION = "loans";

interface FieldValuePair {
    fieldName: string;
    fieldValue: FirestoreDataTypes;
}

// Create a new document in a specified Firestore collection with optional custom ID
export const createLoanDocument = async (
    data: Partial<Loan>,
    id?: string
): Promise<string> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;

        if (id) {
            docRef = db.collection(LOANS_COLLECTION).doc(id);
            await docRef.set(data);
        } else {
            docRef = await db.collection(LOANS_COLLECTION).add(data);
        }

        return docRef.id;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create document in ${LOANS_COLLECTION}: ${errorMessage}`
        );
    }
};

/**
 * Retrieves all documents from a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @returns {Promise<Loan[]>} - An array of Loan objects.
 */
export const getAllLoanDocuments = async (): Promise<Loan[]> => {
    try {
        const snapshot = await db.collection(LOANS_COLLECTION).get();

        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(),
            } as Loan;
        });
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to fetch documents from ${LOANS_COLLECTION}: ${errorMessage}`
        );
    }
};

/**
 * Retrieves a document by its ID from a specified Firestore collection.
 * @param {string} id - The ID of the document to retrieve.
 * @returns {Promise<Loan | null>} - The document or null if it doesn't exist.
 */
export const getLoanDocumentById = async (
    id: string
): Promise<Loan | null> => {
    try {
        const doc: FirebaseFirestore.DocumentSnapshot = await db
            .collection(LOANS_COLLECTION)
            .doc(id)
            .get();
        if (doc?.exists) {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data?.createdAt.toDate(),
            } as Loan;
        } else {
            return null;
        }
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to fetch document ${id} from ${LOANS_COLLECTION}: ${errorMessage}`
        );
    }
};

/**
 * Updates an existing document in a specified Firestore collection.
 * @param {string} id - The ID of the document to update.
 * @param {Partial<Loan>} data - The updated document data.
 * @returns {Promise<void>}
 */
export const updateLoanDocument = async <T>(
    id: string,
    data: Partial<Loan>
): Promise<void> => {
    try {
        await db.collection(LOANS_COLLECTION).doc(id).update(data);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update document ${id} in ${LOANS_COLLECTION}: ${errorMessage}`
        );
    }
};

/**
 * Deletes a document from a specified Firestore collection.
 * Can operate within a transaction if provided, otherwise performs a direct delete.
 * @param {string} id - The ID of the document to delete.
 * @param {FirebaseFirestore.Transaction} [transaction] - Optional Firestore transaction.
 * @returns {Promise<void>}
 */
export const deleteLoanDocument = async (
    id: string,
): Promise<void> => {
    try {
        await db.collection(LOANS_COLLECTION).doc(id).delete();
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete document ${id} from ${LOANS_COLLECTION}: ${errorMessage}`
        );
    }
};

/**
 * Deletes documents from a specified collection based on multiple field values.
 * Can operate within a transaction if provided, otherwise performs a batch delete.
 * @param {string} collectionName - The name of the collection to delete from.
 * @param {FieldValuePair[]} fieldValuePairs - An array of field-value pairs to filter on.
 * @returns {Promise<void>}
 */
export const deleteDocumentsByFieldValues = async (
    collectionName: string,
    fieldValuePairs: FieldValuePair[],

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