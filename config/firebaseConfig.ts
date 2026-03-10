import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { auth } from "firebase-admin/lib/auth/auth-namespace";
import serviceAccount from "../authentication-m4-firebase-adminsdk-fbsvc-ae729b0456.json";

const serviceAccount = require("../firebase-key.json") as ServiceAccount;

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

export { auth, db };
