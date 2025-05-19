// src/config/pricing.ts

export interface PricingTier {
  minQuantity: number;
  maxQuantity: number | null; // null signifies no upper limit
  pricePerUnit: number; // in cents
}

export const pricingTiers: PricingTier[] = [
  { minQuantity: 1, maxQuantity: 10, pricePerUnit: 300 }, // $5.00
  { minQuantity: 11, maxQuantity: 50, pricePerUnit: 250 }, // $4.00
  { minQuantity: 51, maxQuantity: 100, pricePerUnit: 200 }, // $3.50
  { minQuantity: 101, maxQuantity: 200, pricePerUnit: 150 }, // $3.00
  { minQuantity: 201, maxQuantity: 500, pricePerUnit: 100 }, // $2.50
  { minQuantity: 501, maxQuantity: null, pricePerUnit: 100 }, // $2.00
];
