// pages/api/predictions/index.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    console.log("Sending request to Replicate API for prompt:", prompt); // Logging the prompt

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",
        input: { prompt },
      }),
    });

    if (response.status !== 201) {
      console.error("Non-201 response from Replicate API:", response.status); // Logging the response status
      const errorText = await response.text(); // Reading the response as text to log it
      console.error("Response body:", errorText); // Logging the response body
      res.status(500).json({ detail: 'Error from Replicate API' });
      return;
    }

    const prediction = await response.json();
    res.status(201).json(prediction);
  } catch (error) {
    console.error('Server-side error in /api/predictions:', error); // Detailed error log
    res.status(500).json({ error: 'Internal Server Error' });
  }
}