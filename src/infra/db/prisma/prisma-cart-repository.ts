import { CartRepository } from '@/domain/cart/application/repositories/cart-repository'
import { Cart } from '@/domain/cart/enterprise/entities/cart'
import { PrismaClient } from '@/generated/prisma'

export class PrismaCartRepository implements CartRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByConsumerId(consumerId: string): Promise<Cart | null> {
    // const cart = await this.prisma.cart
  }

  async save(cart: Cart): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async clear(cartId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
