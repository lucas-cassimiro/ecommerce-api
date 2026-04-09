import { Product } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface CreateProductRequest {
  name: string
  description: string
  price: number
  stock: number
  sku: string
}

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ name, description, price, stock, sku }: CreateProductRequest) {
    const productAlreadyExists = await this.productRepository.findBySku(sku)

    if (productAlreadyExists) {
      throw new Error('Product with this SKU already exists')
    }

    const product = Product.create({
      name,
      description,
      price,
      stock,
      sku,
    })

    await this.productRepository.save(product)

    return { product }
  }
}
