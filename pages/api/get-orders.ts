import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        imageMetadata: {
          select: {
            prompt: true,
            imageUrl: true,
          },
        },
        printOptions: {
          select: {
            size: true,
            quantity: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Sort orders by creation date, newest first
      },
    });

    // Format the orders to match the expected structure in the frontend
    const formattedOrders = orders.map(order => ({
      id: order.id,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      imageMetadata: {
        prompt: order.imageMetadata.prompt,
        imageUrl: order.imageMetadata.imageUrl,
      },
      printOptions: {
        size: order.printOptions.size,
        quantity: order.printOptions.quantity,
      },
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
}