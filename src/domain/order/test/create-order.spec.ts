import { describe, it, expect, beforeEach } from 'vitest'
import { CreateOrderUseCase } from '../application/use-cases/create-order'

import { InMemoryOrderRepository } from '../application/repositories/in-memory-order-repository'
import { InMemoryProductRepository } from '@/domain/product/application/repositories/in-memory-product-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product } from '@/domain/product/enterprise/entities/product'

describe('CreateOrderUseCase', () => {
  let orderRepository: InMemoryOrderRepository
  let productRepository: InMemoryProductRepository
  let sut: CreateOrderUseCase

  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository()
    productRepository = new InMemoryProductRepository()
    sut = new CreateOrderUseCase(orderRepository, productRepository)
  })

  function makeProduct(data: { id: string } & Partial<Omit<Product, 'id'>>) {
    return {
      id: new UniqueEntityID(data.id),
      name: data.name ?? 'Produto',
      sku: data.sku ?? `sku-${data.id}`,
      price: data.price ?? 10,
      stock: data.stock ?? 10,
      isActive: data.isActive ?? true,
      categoryId: new UniqueEntityID(data.categoryId?.toString() ?? 'cat-1'),
    } as unknown as Product
  }

  const shippingAddress = {
    street: 'Rua exemplo',
    number: 100,
    city: 'Cidade',
    state: 'Estado',
    zipCode: '12345678',
    country: 'BR',
  }

  it('should create an order successfully', async () => {
    await productRepository.create(makeProduct({ id: '1' }))
    await productRepository.create(makeProduct({ id: '2' }))

    const { order } = await sut.execute({
      consumerId: '1',
      shippingAddress,
      items: [
        { productId: '1', quantity: 2 },
        { productId: '2', quantity: 1 },
      ],
    })

    expect(order).toBeTruthy()
    expect(orderRepository.items.length).toBe(1)
    expect(order.items).toHaveLength(2)
  })

  it('should create order without consumerId', async () => {
    await productRepository.create(makeProduct({ id: '1' }))

    const { order } = await sut.execute({
      shippingAddress,
      items: [{ productId: '1', quantity: 1 }],
    })

    expect(order.consumerId).toBeUndefined()
  })

  it('should throw if no items are provided', async () => {
    await expect(() =>
      sut.execute({
        shippingAddress,
        items: [],
      }),
    ).rejects.toThrow('Order must have at least one item')
  })

  it('should throw if product does not exist', async () => {
    await expect(() =>
      sut.execute({
        shippingAddress,
        items: [{ productId: '999', quantity: 1 }],
      }),
    ).rejects.toThrow('Product 999 not found')
  })

  it('should throw if product is inactive', async () => {
    await productRepository.create(makeProduct({ id: '1', isActive: false }))

    await expect(() =>
      sut.execute({
        shippingAddress,
        items: [{ productId: '1', quantity: 1 }],
      }),
    ).rejects.toThrow('Product Produto is not available')
  })

  it('should throw if stock is insufficient', async () => {
    await productRepository.create(makeProduct({ id: '1', stock: 1 }))

    await expect(() =>
      sut.execute({
        shippingAddress,
        items: [{ productId: '1', quantity: 5 }],
      }),
    ).rejects.toThrow('Insufficient stock for product Produto')
  })
})
