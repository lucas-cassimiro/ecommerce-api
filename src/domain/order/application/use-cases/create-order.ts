import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Order } from '../../enterprise/entities/order'
import { OrderItem } from '../../enterprise/entities/value-objects/order-item'
import {
  ShippingAddress,
  ShippingAddressProps,
} from '../../enterprise/entities/value-objects/shipping-address'
import { OrderRepository } from '../repositories/order-repository'
import { ProductRepository } from '@/domain/product/application/repositories/product-repository'

interface CreateOrderUseCaseRequest {
  consumerId?: string
  items: {
    productId: string
    quantity: number
  }[]
  shippingAddress: ShippingAddressProps
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute({
    consumerId,
    items,
    shippingAddress,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    if (items.length === 0) {
      throw new Error('Order must have at least one item')
    }

    const orderItems: OrderItem[] = []

    for (const item of items) {
      const product = await this.productRepository.findById(item.productId)

      if (!product) {
        throw new Error(`Product ${item.productId} not found`)
      }

      if (!product.isActive) {
        throw new Error(`Product ${product.name} is not available`)
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`)
      }

      orderItems.push(
        new OrderItem({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        }),
      )
    }

    const order = Order.create({
      consumerId: consumerId ? new UniqueEntityID(consumerId) : undefined,
      shippingAddress: new ShippingAddress(shippingAddress),
      items: orderItems,
    })

    await this.orderRepository.create(order)

    return { order }
  }
}
