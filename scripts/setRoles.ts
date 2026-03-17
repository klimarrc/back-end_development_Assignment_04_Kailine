import { auth } from "../src/config/firebaseConfig";

async function setRole(uid: string, role: string) {
    await auth.setCustomUserClaims(uid, { role });
    console.log(`Role '${role}' assigned to user ${uid}`);
}

setRole("52O1kBaK3YO7c6F4wxXLTmJ3vFH3", "manager");
setRole("gnAWy8cFdXRUTz79S9SBAUjC6MC2", "admin");
setRole("n7LTkx0YQjRKNsLrhNppToFulQD2", "officer");