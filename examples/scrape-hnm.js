import multion from "../lib/multion-client.js";

// Scrape single page
const retrieveResponse = await multion.retrieve({
    url: "https://www2.hm.com/en_us/men/products/view-all.html",
    cmd: "Get all items and their name, price, colors, purchase url, and image url.",
    fields: ["name", "price", "colors", "purchase_url", "image_url"],
    renderJs: true, // retrieve dynamically loaded content
    scrollToBottom: true,
    maxItems: 3,
});

console.log(retrieveResponse.data);

// Scrape multiple pages
// Create a new session
const createResponse = await multion.sessions.create({
    url: "https://www2.hm.com/en_us/men/products/view-all.html",
});

// Get the session ID
const sessionId = createResponse.sessionId;

for (let i = 1; i < 4; i++) {
  const retrieveResponse = await multion.retrieve({
    sessionId: sessionId,
    cmd: "Get all items and their name, price, colors, purchase url, and image url.",
    fields: ["name", "price", "colors", "purchase_url", "image_url"],
    maxItems: 3,
  });

  console.log("Data retrieved: ", retrieveResponse.data);

  if (i === 3) {
    // Close the session
    await multion.sessions.close(sessionId);
    break;
  };

  // Navigate to the next page
  // Note: this doesn't work as expected. Agent will stay on the same page and retrieve the same data
  const stepResponse = await multion.sessions.step(sessionId, {
    cmd: "Navigate to the next page.",
    mode: "standard",
  });

  console.log("Navigating to next page: ", stepResponse.message);
}

// Scrape multiple pages in parallel
// Works as expected
const pagePromises = Array.from({ length: 3 }).map(async (_, i) => {
    const retrieveResponse = await multion.retrieve({
      url: `https://www2.hm.com/en_us/men/products/view-all.html?page=${i + 1}`,
      cmd: "Get all items and their name, price, colors, purchase url, and image url.",
      fields: ["name", "price", "colors", "purchase_url", "image_url"],
      maxItems: 3,
    });

    console.log(`Data retrieved for page ${i + 1}: `, retrieveResponse.data);
    
    return retrieveResponse.data;
  });
  
await Promise.all(pagePromises);
  