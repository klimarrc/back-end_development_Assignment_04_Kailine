import { auth } from "../../../../config/firebaseConfig";

const createAdmin = async (): Promise<void> => {
    try {
        const email = "admin@pixell-river.com";
        const password = "password123";

        let userRecord;

        try {
            userRecord = await auth.getUserByEmail(email);
            console.log("Admin already exists:", userRecord.uid);
        } catch {
            userRecord = await auth.createUser({
                email,
                password,
            });
            console.log("Admin created:", userRecord.uid);
        }

        await auth.setCustomUserClaims(userRecord.uid, { role: "admin" });

        console.log("Admin role assigned successfully");
        console.log("UID:", userRecord.uid);
        console.log("Email:", userRecord.email);
    } catch (error) {
        console.error("Error creating admin:", error);
    }
};

void createAdmin();