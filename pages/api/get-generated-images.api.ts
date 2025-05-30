import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { databaseAPI, ImageMetadata } from '@lib/DatabaseAPI';

interface ApiResponse {
  images: ImageMetadata[];
  totalCount: number;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    console.warn(`Method ${req.method} not allowed`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const limit = parseInt(req.query.limit as string) || 20;

  console.log(`Fetching generated images. Limit: ${limit}`);

  try {
    await databaseAPI.initialize();

    const [generatedImages, totalCount] = await Promise.all([
      databaseAPI.getRecentImages(limit),
      databaseAPI.getTotalImageCount(),
    ]);

    const responsePayload: ApiResponse = {
      images: generatedImages,
      totalCount: totalCount,
    };

    console.log(
      `Successfully fetched ${generatedImages.length} images. Total count: ${totalCount}`,
    );

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error('Error fetching generated images:', error);
    return handleError(error, res);
  } finally {
    await databaseAPI.close();
  }
}

function handleError(error: unknown, res: NextApiResponse) {
  if (error instanceof Error) {
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    let errorMessage = error.message;
    let statusCode = 500;

    const lowerCaseMessage = error.message.toLowerCase();
    if (lowerCaseMessage.includes('database')) {
      errorMessage = 'A database error occurred. Please try again later.';
      statusCode = 503;
    } else if (lowerCaseMessage.includes('timeout')) {
      errorMessage = 'The request timed out. Please try again later.';
      statusCode = 504;
    }

    return res.status(statusCode).json({
      error: 'Failed to fetch generated images',
      message: errorMessage,
      timestamp: new Date().toISOString(),
      requestId: res.req.headers['x-request-id'] || 'unknown',
    });
  } else {
    console.error('Unknown error structure:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred',
      message: 'An unknown error occurred while processing your request.',
      timestamp: new Date().toISOString(),
      requestId: res.req.headers['x-request-id'] || 'unknown',
    });
  }
}
