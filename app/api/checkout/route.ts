import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        // DEFENSIVE CHECK: Ensure the environment variable is loaded
        if (!process.env.NEXT_PUBLIC_URL) {
            console.error("CRITICAL ERROR: NEXT_PUBLIC_URL is not defined in .env.local");
            return NextResponse.json(
                { error: "Server configuration error: Missing NEXT_PUBLIC_URL" },
                { status: 500 }
            );
        }

        const { cartItems } = await req.json();

        // Safety Check: Don't let Stripe try to process an empty cart
        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Map items to Stripe's format
        const line_items = cartItems.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: item.image_url ? [item.image_url] : [],
                    ...(item.description && { description: item.description }),
                },
                unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: item.quantity || 1,
        }));

        // Create the Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
            metadata: {
                cartItemCount: cartItems.length.toString(),
            },
        });

        // Return the secure URL to the frontend
        return NextResponse.json({ url: session.url, sessionId: session.id });

    } catch (error: any) {
        console.error('--- STRIPE API ERROR ---');
        console.error(error.message);

        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
