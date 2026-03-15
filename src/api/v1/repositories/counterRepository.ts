import { db } from "../../../config/firebaseConfig";

export async function getNextLoanId(): Promise<string> {
    const counterDocRef = db.collection("counters").doc("loan");

    const nextId = await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(counterDocRef);
        let lastNumber = 0;

        if (snapshot.exists) {
            lastNumber = snapshot.data()?.lastNumber || 0;
        }

        const newNumber = lastNumber + 1;

        transaction.set(counterDocRef, { lastNumber: newNumber });

        return newNumber.toString();
    });

    return nextId;
}

