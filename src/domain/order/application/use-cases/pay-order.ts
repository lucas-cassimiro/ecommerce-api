import { Payment } from '@/domain/payment/enterprise/entities/payment'
import { OrderRepository } from '../repositories/order-repository'
import { PaymentGatewayRepository } from '@/domain/payment/application/repositories/payment-gateway-repository'

interface PayOrderUseCaseRequest {
  orderId: string
}

export class PayOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private paymentRepository: PaymentGatewayRepository,
  ) {}

  async execute({ orderId }: PayOrderUseCaseRequest) {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    if (!order.canBePaid()) {
      throw new Error('Order cannot be paid')
    }

    const payment = Payment.create({
      orderId: order.id,
      amount: order.total,
      provider: 'stripe',
    })

    const externalId = 'payment_123'

    payment.markAsPaid(externalId)

    order.markAsPaid()

    await this.paymentRepository.create(payment)
    await this.orderRepository.save(order)

    return { order, payment }
  }
}
