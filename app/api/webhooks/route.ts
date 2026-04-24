import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not defined');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        console.log('Checkout session completed:', session.id);

        // Handle successful payment
        // You can add order fulfillment logic here:
        // - Save order to database
        // - Send confirmation email
        // - Update inventory
        // - Clear cart (client-side)

        if (session.metadata?.cartCleared !== 'true') {
          console.log('Payment successful for session:', session.id);
          // Add your order fulfillment logic here
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as any;
        console.log('Checkout session expired:', session.id);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as any;
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as any;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export const dynamic = 'force-dynamic';
