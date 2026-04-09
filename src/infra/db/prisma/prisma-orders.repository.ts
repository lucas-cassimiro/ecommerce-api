import { OrderRepository } from '@/domain/order/application/repositories/order-repository'
import { Order } from '@/domain/order/enterprise/entities/order'
import { PrismaClient } from '@/generated/prisma'

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(order: Order) {
    await this.prisma.order.create({
      data: {},
    })
  }

  async save(order: Order) {}

  async findById(id: string) {
    const data = await this.prisma.order.findUnique({ 
        where: {
            id
        }
     })

    if (!data) return null

    return toDomain(data) // 🔥 mapeia pra entidade
  }
}
