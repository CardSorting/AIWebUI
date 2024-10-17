import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Adjust this import based on your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const generatedImages = await prisma.imageMetadata.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20, // Limit to the most recent 20 images, adjust as needed
    });

    return res.status(200).json(generatedImages);
  } catch (error) {
    console.error('Error fetching generated images:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch generated images', 
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
}