import { Product } from '../../enterprise/entities/product'
import { ProductRepository } from './product-repository'

interface Filters {
  name?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
}

interface PaginationParams {
  page: number
  pageSize: number
}

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = []

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }

  async save(product: Product): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === product.id.toString())

    if (index >= 0) {
      this.items[index] = product
    } else {
      this.items.push(product)
    }
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id)
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id)

    return product ?? null
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = this.items.find((item) => item.sku === sku)

    return product ?? null
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return this.items.filter((item) => ids.includes(item.id.toString()))
  }

  async findAll(): Promise<Product[]> {
    return this.items
  }

  async findManyPaginated({ page, pageSize }: PaginationParams): Promise<{
    items: Product[]
    total: number
  }> {
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const paginatedItems = this.items.slice(start, end)

    return {
      items: paginatedItems,
      total: this.items.length,
    }
  }

  async findManyByFilters({ name, categoryId, minPrice, maxPrice }: Filters): Promise<Product[]> {
    return this.items.filter((item) => {
      const matchesName = !name || item.name.toLowerCase().includes(name.toLowerCase())
      const matchesCategory = !categoryId || item.categoryId === categoryId
      const matchesMinPrice = minPrice === undefined || item.price >= minPrice
      const matchesMaxPrice = maxPrice === undefined || item.price <= maxPrice
      return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice
    })
  }

  async exists(id: string): Promise<boolean> {
    return this.items.some((item) => item.id.toString() === id)
  }

  async count(): Promise<number> {
    return this.items.length
  }
}
