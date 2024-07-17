import "dotenv/config";
import { MultiOnClient } from "multion";

const multion = new MultiOnClient({
    apiKey: process.env.MULTION_API_KEY,
});

// Create a new session
// Follow an account on X
const followResponse = await multion.browse({
    cmd: "Follow @MultiOn_AI on X",
    url: "https://x.com",
    local: true, // run the agent locally in the browser
});

console.log(followResponse.message); // The @MultiOn_AI account is already being followed.

// Store the session ID
const sessionId = followResponse.sessionId;

// Resume the session
// Post a tweet
const postResponse = await multion.browse({
    sessionId: sessionId,
    cmd: "Post 'Hello from @MultiOn_AI agent!'",
});

console.log(postResponse.message); // The tweet "Hello from @MultiOn_AI agent!" has been successfully posted.