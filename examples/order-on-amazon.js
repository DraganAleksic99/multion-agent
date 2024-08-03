import "dotenv/config";
import { MultiOnClient } from "multion";

const multion = new MultiOnClient({
    apiKey: process.env.MULTION_API_KEY,
});

// Create new session
// Add book to the cart
const cartResponse = await multion.browse({
    cmd: "Add the Principles: Life and Work book to my cart",
    url: "https://amazon.com",
    local: true,
});
  
console.log(cartResponse.message);

// Store the session ID
const sessionId = followResponse.sessionId

// Resume the session
// Buy the book
const purchaseResponse = await multion.browse({
  sessionId: sessionId,
  cmd: "Check out and purchase the book",
});

console.log(purchaseResponse.message);
