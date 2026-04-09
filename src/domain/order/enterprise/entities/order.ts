import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { Cart } from '../../../cart/enterprise/entities/cart'
import { OrderItem } from './value-objects/order-item'
import { ShippingAddress } from './value-objects/shipping-address'

export enum OrderStatus {
  PENDING,
  PAID,
  SHIPPED,
  COMPLETED,
  CANCELED,
}

interface OrderProps {
  consumerId?: UniqueEntityID
  items: OrderItem[]
  total: number
  shippingAddress: ShippingAddress
  status: OrderStatus
  createdAt: Date
  updatedAt?: Date
}

export class Order extends Entity<OrderProps> {
  get consumerId() {
    return this.props.consumerId
  }

  get items() {
    return this.props.items
  }

  get total() {
    return this.props.total
  }

  get status() {
    return this.props.status
  }

  get shippingAddress() {
    return this.props.shippingAddress
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  markAsPaid() {
    if (!this.canBePaid()) {
      throw new Error('Order cannot be paid')
    }

    this.props.status = OrderStatus.PAID
    this.touch()
  }

  canBePaid(): boolean {
    return this.props.status === OrderStatus.PENDING && this.props.total > 0
  }

  ship() {
    if (this.props.status !== OrderStatus.PAID) {
      throw new Error('Order must be paid before shipping')
    }

    this.props.status = OrderStatus.SHIPPED
    this.touch()
  }

  complete() {
    if (this.props.status !== OrderStatus.SHIPPED) {
      throw new Error('Order must be shipped before completion')
    }

    this.props.status = OrderStatus.COMPLETED
    this.touch()
  }

  cancel() {
    if (this.props.status === OrderStatus.SHIPPED) {
      throw new Error('Cannot cancel shipped order')
    }

    this.props.status = OrderStatus.CANCELED
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static fromCart(cart: Cart, shippingAddress: ShippingAddress): Order {
    return this.create({
      consumerId: cart.consumerId,
      items: cart.items.map(
        (item) =>
          new OrderItem({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }),
      ),
      shippingAddress,
    })
  }

  static create(
    props: Optional<OrderProps, 'createdAt' | 'status' | 'total'>,
    id?: UniqueEntityID,
  ) {
    const total = props.items.reduce((acc, item) => acc + item.total, 0)

    return new Order(
      {
        consumerId: props.consumerId,
        items: props.items,
        total,
        shippingAddress: props.shippingAddress,
        status: OrderStatus.PENDING,
        createdAt: new Date(),
        updatedAt: props.updatedAt,
      },
      id,
    )
  }
}
