// pages/api/predictions/[id].js

export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${req.query.id}`,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      const error = await response.json();
      res.status(500).json({ detail: error.detail });
      return;
    }

    const prediction = await response.json();
    res.status(200).json(prediction);
  } catch (error) {
    console.error('Error in /api/predictions/[id]:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}