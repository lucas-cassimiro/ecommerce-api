import { describe, it, expect, beforeEach } from 'vitest'
import { Cart } from '../enterprise/entities/cart'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'

describe('Cart entity', () => {
  let cart: Cart

  beforeEach(() => {
    cart = Cart.create({ consumerId: new UniqueEntityID() })
  })

  it('should add a new item', () => {
    cart.addItem({ productId: 'p1', quantity: 2, price: 10 })
    expect(cart.items.length).toBe(1)
    expect(cart.total).toBe(20)
  })

  it('should increase quantity if item already exists', () => {
    cart.addItem({ productId: 'p1', quantity: 2, price: 10 })
    cart.addItem({ productId: 'p1', quantity: 3, price: 10 })
    expect(cart.items.length).toBe(1)
    expect(cart.items[0].quantity).toBe(5)
    expect(cart.total).toBe(50)
  })

  it('should clear cart', () => {
    cart.addItem({ productId: 'p1', quantity: 2, price: 10 })
    cart.clear()
    expect(cart.items.length).toBe(0)
    expect(cart.total).toBe(0)
  })
})
