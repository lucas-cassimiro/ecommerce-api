import { OrderRepository } from '@/domain/order/application/repositories/order-repository'
import { Order } from '@/domain/order/enterprise/entities/order'
import {
  ShippingAddress,
  ShippingAddressProps,
} from '@/domain/order/enterprise/entities/value-objects/shipping-address'
import { CartRepository } from '@/domain/cart/application/repositories/cart-repository'

interface CheckoutUseCaseRequest {
  consumerId: string
  shippingAddress: ShippingAddressProps
}

interface CheckoutUseCaseResponse {
  order: Order
}

export class CheckoutUseCase {
  constructor(
    private cartRepository: CartRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute({
    consumerId,
    shippingAddress,
  }: CheckoutUseCaseRequest): Promise<CheckoutUseCaseResponse> {
    const cart = await this.cartRepository.findByConsumerId(consumerId)

    if (!cart) throw new Error('Cart not found')
    if (cart.items.length === 0) throw new Error('Cart is empty')

    const order = Order.fromCart(cart, new ShippingAddress(shippingAddress))

    await this.orderRepository.create(order)

    await this.cartRepository.clear(cart.id.toString())

    return {
      order,
    }
  }
}
