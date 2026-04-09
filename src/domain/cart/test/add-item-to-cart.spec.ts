import { describe, it, expect, beforeEach } from 'vitest'
import { AddItemToCartUseCase } from '../application/use-cases/add-item-to-cart'
import { InMemoryCartRepository } from '../application/repositories/in-memory-cart-repository'

describe('AddItemToCartUseCase', () => {
  let inMemoryCartRepository: InMemoryCartRepository
  let sut: AddItemToCartUseCase

  beforeEach(() => {
    inMemoryCartRepository = new InMemoryCartRepository()
    sut = new AddItemToCartUseCase(inMemoryCartRepository)
  })

  it('should create a cart if none exists', async () => {
    const { cart } = await sut.execute({
      consumerId: 'c1',
      productId: 'p1',
      quantity: 2,
      price: 10,
    })
    expect(cart.items.length).toBe(1)
    expect(cart.total).toBe(20)
  })

  it('should increase item quantity if it already exists', async () => {
    await sut.execute({
      consumerId: 'c1',
      productId: 'p1',
      quantity: 2,
      price: 10,
    })
    const { cart } = await sut.execute({
      consumerId: 'c1',
      productId: 'p1',
      quantity: 3,
      price: 10,
    })
    expect(cart.items[0].quantity).toBe(5)
    expect(cart.total).toBe(50)
  })
})
