import { Product } from '../../enterprise/entities/product'

export interface ProductRepository {
  create(product: Product): Promise<void>
  save(product: Product): Promise<void>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Product | null>
  findBySku(sku: string): Promise<Product | null>
  findByIds(ids: string[]): Promise<Product[]>
  findAll(): Promise<Product[]>
  findManyPaginated(params: { page: number; pageSize: number }): Promise<{
    items: Product[]
    total: number
  }>
  findManyByFilters(params: {
    name?: string
    categoryId?: string
    minPrice?: number
    maxPrice?: number
  }): Promise<Product[]>
  exists(id: string): Promise<boolean>
  count(): Promise<number>
}
