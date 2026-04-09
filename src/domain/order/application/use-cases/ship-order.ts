import { OrderRepository } from '../repositories/order-repository'

interface ShipOrderUseCaseRequest {
  orderId: string
  trackingCode?: string
}

export class ShipOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ orderId, trackingCode }: ShipOrderUseCaseRequest) {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    if (!order.canBeShipped()) {
      throw new Error('Order cannot be shipped')
    }

    order.ship()

    if (trackingCode) {
      order.addTrackingCode?.(trackingCode) // se você tiver isso na entidade
    }

    await this.orderRepository.save(order)

    return { order }
  }
}
