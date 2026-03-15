import { ServiceAccount } from "firebase-admin/app";
import admin from "firebase-admin"
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

//
import serviceAccountJson from "../assignment04kailinelima-firebase-adminsdk-fbsvc-50e1a75b7e.json";


admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson as ServiceAccount),
});

const auth: Auth = getAuth();

const db: Firestore = getFirestore();

export { admin, db, auth };
