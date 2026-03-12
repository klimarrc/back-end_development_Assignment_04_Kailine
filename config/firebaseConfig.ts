import { ServiceAccount } from "firebase-admin/app";
import admin from "firebase-admin";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import serviceAccountJson from "../assignment04kailinelima-firebase-adminsdk-fbsvc-50e1a75b7e.json";


const serviceAccount = serviceAccountJson as unknown as ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();

const db: Firestore = getFirestore();

export { db, auth };
