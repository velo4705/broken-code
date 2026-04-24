import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        // DEFENSIVE CHECK: Ensure the environment variable is loaded
        // This prevents the "500 Internal Server Error" HTML page crash
        if (!process.env.NEXT_PUBLIC_URL) {
            console.error("CRITICAL ERROR: NEXT_PUBLIC_URL is not defined in .env.local");
            return NextResponse.json(
                { error: "Server configuration error: Missing NEXT_PUBLIC_URL" },
                { status: 500 }
            );
        }

        const { cartItems } = await req.json();

        // 1. Safety Check: Don't let Stripe try to process an empty cart
        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // 2. Map items to Stripe's format
        const line_items = cartItems.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: item.image_url ? [item.image_url] : [],
                },
                unit_amount: Math.round(Number(item.price) * 100), // Added Number() for safety
            },
            quantity: item.quantity,
        }));

        // 3. Create the Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
        });

        // 4. Return the secure URL to the frontend
        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        // This log will appear in your terminal (Backend)
        console.error('--- STRIPE API ERROR ---');
        console.error(error.message);

        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}