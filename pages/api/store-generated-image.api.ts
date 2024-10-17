// pages/api/store-generated-image.ts

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `${uuidv4()}.jpg`;
    const dirPath = path.join(process.cwd(), 'public', 'generated-images');
    const filePath = path.join(dirPath, fileName);

    // Ensure the directory exists
    await fs.mkdir(dirPath, { recursive: true });

    // Use writeFile instead of writeFileSync for better performance
    await fs.writeFile(filePath, buffer);

    const storedImageUrl = `/generated-images/${fileName}`;

    return res.status(200).json({ storedImageUrl });
  } catch (error) {
    console.error('Error storing generated image:', error);
    return res.status(500).json({ error: 'Failed to store generated image', details: error.message });
  }
}