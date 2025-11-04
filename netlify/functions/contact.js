export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const FORM_ID = process.env.FORMSPREE_ID;
  if (!FORM_ID) {
    return { statusCode: 500, body: "Form ID missing" };
  }

  const formspreeUrl = `https://formspree.io/f/${FORM_ID}`;

  try {
    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": event.headers["content-type"] || "application/x-www-form-urlencoded",
      },
      body: event.body,
    });

    const text = await response.text();
    return { statusCode: response.ok ? 200 : 502, body: text };
  } catch (err) {
    console.error("Error in contact function:", err);
    return { statusCode: 500, body: "Server error" };
  }
}








// // Exporting a handler function so Netlify can run this as a serverless function
// export async function handler(event) {
//   // Check if the incoming request is a POST request
//   // Only POST requests should submit form data
//   if (event.httpMethod !== "POST") {
//     return { statusCode: 405, body: "Method Not Allowed" };
//     // 405 means the HTTP method used (GET, PUT, etc.) is not allowed here
//   }

//   // Get the Formspree ID from environment variables
//   // This ensures the actual ID is never exposed in your frontend code
//   const FORM_ID = process.env.FORMSPREE_ID;

//   // If the FORM_ID is missing for some reason, return a server error
//   if (!FORM_ID) {
//     return { statusCode: 500, body: "Form ID missing" };
//     // 500 indicates an internal server error
//   }

//   // Construct the full Formspree endpoint URL using your secret FORM_ID
//   const formspreeUrl = `https://formspree.io/f/${FORM_ID}`;

//   try {
//     // Forward the form submission to Formspree
//     // event.body contains the data sent from the frontend
//     const response = await fetch(formspreeUrl, {
//       method: "POST", // send form data via POST
//       headers: {
//         Accept: "application/json", // we want Formspree to respond in JSON
//         "Content-Type": event.headers["content-type"] || "application/x-www-form-urlencoded",
//         // Use the same content-type sent from frontend, or fallback to x-www-form-urlencoded
//       },
//       body: event.body, // actual form data
//     });

//     // Read the response from Formspree
//     const text = await response.text();

//     // Return the response back to the frontend
//     return {
//       statusCode: response.ok ? 200 : 502,
//       // 200 means success, 502 means bad gateway (Formspree failed)
//       body: text, // forward Formspree's response
//     };
//   } catch (err) {
//     // Catch any errors in fetching or processing
//     console.error("Error in contact function:", err);
//     return {
//       statusCode: 500, // internal server error
//       body: "Server error", // send generic message to frontend
//     };
//   }
// }

