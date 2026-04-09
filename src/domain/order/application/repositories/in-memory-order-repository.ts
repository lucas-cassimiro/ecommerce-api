import { Order } from '../../enterprise/entities/order'

export class InMemoryOrderRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }

  async save(order: Order): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === order.id.toString())

    if (index >= 0) {
      this.items[index] = order
    } else {
      this.items.push(order)
    }
  }

  async findById(id: string) {
    return this.items.find((order) => order.id.toString() === id) ?? null
  }
}
