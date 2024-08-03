import "dotenv/config";
import { MultiOnClient } from "multion";

if (!process.env.MULTION_API_KEY) {
    throw new Error("Missing environment variable: MULTION_API_KEY");
}

const multion = new MultiOnClient({
    apiKey: process.env.MULTION_API_KEY,
});

export default multion;