import Stripe from 'stripe'
import { PaymentGatewayRepository } from '@/domain/payment/application/repositories/payment-gateway-repository'

export class StripeGateway {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    })
  }

  async createCheckoutSession({ amount, currency }: any) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'Compra no sistema',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })

    return {
      checkoutUrl: session.url!,
    }
  }
}
