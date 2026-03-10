import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const serviceAccount = require("../firebase-key.json") as ServiceAccount;

initializeApp({
    credential: cert(serviceAccount),
});

const db: Firestore = getFirestore();

export { db };
