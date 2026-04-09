import { OrderRepository } from '../../../order/application/repositories/order-repository'
import { Order } from '../../../order/enterprise/entities/order'
import {
  ShippingAddress,
  ShippingAddressProps,
} from '../../../order/enterprise/entities/value-objects/shipping-address'
import { CartRepository } from '../repositories/cart-repository'

interface CheckoutCartUseCaseRequest {
  consumerId: string
  shippingAddress: ShippingAddressProps
}

export class CheckoutCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute({ consumerId, shippingAddress }: CheckoutCartUseCaseRequest) {
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
