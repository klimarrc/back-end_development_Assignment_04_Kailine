import { ServiceAccount } from "firebase-admin/app";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

//
import serviceAccountJson from "lima-kailine-assignment-4-firebase-adminsdk-fbsvc-d8ef2a9822.json";


initializeApp({
    credential: cert(serviceAccountJson as ServiceAccount),
});

const auth: Auth = getAuth();

const db: Firestore = getFirestore();

export { db, auth };
