import { PaymentGatewayRepository } from '../repositories/payment-gateway-repository'

interface CreatePaymentRequest {
  amount: number
}

export class CreatePaymentUseCase {
  constructor(private paymentGateway: PaymentGatewayRepository) {}

  async execute({ amount }: CreatePaymentRequest) {
    if (amount <= 0) {
      throw new Error('Invalid amount')
    }

    const session = await this.paymentGateway.createCheckoutSession({
      amount,
      currency: 'BRL',
    })

    return {
      checkoutUrl: session.checkoutUrl,
    }
  }
}
