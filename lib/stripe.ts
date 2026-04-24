// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // Update this line to match the error message exactly
    apiVersion: '2026-04-22.dahlia' as any,
});