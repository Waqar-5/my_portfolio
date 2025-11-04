import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const FORM_ID = process.env.FORMSPREE_ID;
  if (!FORM_ID) return { statusCode: 500, body: "Form ID missing" };

  const formspreeUrl = `https://formspree.io/f/${FORM_ID}`;

  try {
    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": event.headers["content-type"] || "application/x-www-form-urlencoded"
      },
      body: event.body
    });

    const text = await response.text();
    return { statusCode: response.ok ? 200 : 502, body: text };
  } catch (err) {
    return { statusCode: 500, body: "Server error" };
  }
}
