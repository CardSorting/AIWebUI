import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const validStatuses = ['pending', 'processing', 'shipped', 'cancelled'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId, newStatus } = req.body;

  // Input validation
  if (!orderId || typeof orderId !== 'string') {
    return res.status(400).json({ error: 'Invalid order ID' });
  }

  if (!newStatus || !validStatuses.includes(newStatus)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Prevent invalid status transitions
    if (order.status === 'shipped' && newStatus !== 'shipped') {
      return res.status(400).json({ error: 'Cannot change status of shipped orders' });
    }

    if (order.status === 'cancelled' && newStatus !== 'cancelled') {
      return res.status(400).json({ error: 'Cannot change status of cancelled orders' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
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
    });

    // Format the updated order to match the expected structure in the frontend
    const formattedOrder = {
      id: updatedOrder.id,
      status: updatedOrder.status,
      createdAt: updatedOrder.createdAt.toISOString(),
      imageMetadata: {
        prompt: updatedOrder.imageMetadata.prompt,
        imageUrl: updatedOrder.imageMetadata.imageUrl,
      },
      printOptions: {
        size: updatedOrder.printOptions.size,
        quantity: updatedOrder.printOptions.quantity,
      },
    };

    res.status(200).json(formattedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'An error occurred while updating order status' });
  }
}