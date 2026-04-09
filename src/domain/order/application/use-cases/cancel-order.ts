import { PaymentGatewayRepository } from '@/domain/payment/application/repositories/payment-gateway-repository'
import { OrderRepository } from '../repositories/order-repository'

interface CancelOrderUseCaseRequest {
  orderId: string
}

export class CancelOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private paymentRepository: PaymentGatewayRepository,
  ) {}

  async execute({ orderId }: CancelOrderUseCaseRequest) {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    const payment = await this.paymentRepository.findByOrderId(orderId)

    if (payment) {
      payment.cancel()
      await this.paymentRepository.save(payment)
    }

    order.cancel()
    await this.orderRepository.save(order)

    return { order, payment }
  }
}
