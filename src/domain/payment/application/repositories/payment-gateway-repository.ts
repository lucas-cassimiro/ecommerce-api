import { Payment } from '../../enterprise/entities/payment'

export interface PaymentGatewayRepository {
  createCheckoutSession(input: {
    amount: number
    currency: string
  }): Promise<{ checkoutUrl: string }>
  findByOrderId: (orderId: string) => Promise<Payment | null>
  save: (payment: Payment) => Promise<void>
  create: (payment: Payment) => Promise<void>
}
