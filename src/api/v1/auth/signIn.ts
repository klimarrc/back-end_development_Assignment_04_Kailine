
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, "test@example.com", "password123")
    .then(userCredential => {
        console.log("User created:", userCredential.user);
    })
    .catch(error => {
        console.error("Error:", error);
    });

