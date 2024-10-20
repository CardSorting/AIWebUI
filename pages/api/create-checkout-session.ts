// pages/api/create-checkout-session.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { pricingTiers, PricingTier } from '@/config/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const prisma = new PrismaClient();

// Helper function to determine price per unit based on quantity
const getPricePerUnit = (quantity: number): number => {
  for (const tier of pricingTiers) {
    if (
      quantity >= tier.minQuantity &&
      (tier.maxQuantity === null || quantity <= tier.maxQuantity)
    ) {
      return tier.pricePerUnit;
    }
  }
  // Fallback price if no tier matches
  throw new Error('No pricing tier found for the given quantity.');
};

// Calculate total price based on tiered pricing
const calculatePrice = (quantity: number): number => {
  const pricePerUnit = getPricePerUnit(quantity);
  return pricePerUnit * quantity; // Total price in cents
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderItems, totalAmount } = req.body;

    // Input validation
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ error: 'Invalid order items' });
    }

    // Recalculate total amount to ensure integrity
    let calculatedTotal = 0;
    for (const item of orderItems) {
      const { printOptions, uploadedImage } = item;
      if (!printOptions || !uploadedImage) {
        return res.status(400).json({ error: 'Invalid order item structure' });
      }
      const { quantity } = printOptions;
      if (quantity < 1) {
        return res.status(400).json({ error: 'Quantity must be at least 1' });
      }
      calculatedTotal += calculatePrice(quantity);
    }

    if (calculatedTotal !== totalAmount) {
      return res.status(400).json({ error: 'Total amount mismatch' });
    }

    // Create line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = orderItems.map((item: any) => {
      const { printOptions, uploadedImage } = item;
      const pricePerUnit = getPricePerUnit(printOptions.quantity);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Print of ${uploadedImage.name}`,
            images: [uploadedImage.src], // Ensure this is a publicly accessible URL
          },
          unit_amount: pricePerUnit, // in cents
        },
        quantity: printOptions.quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout/cancel`,
      metadata: {
        orderItems: JSON.stringify(orderItems),
      },
    });

    // Save order to the database
    const order = await prisma.order.create({
      data: {
        status: 'pending',
        stripeSessionId: session.id,
        // Add other necessary fields based on your Prisma schema
      },
    });

    res.status(200).json({ id: session.id });
  } catch (err: any) {
    console.error('Error in create-checkout-session:', err);
    res.status(500).json({ error: err.message || 'An error occurred while creating the checkout session' });
  }
}