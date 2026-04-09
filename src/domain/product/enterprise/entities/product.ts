import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface ProductProps {
  name: string
  description: string
  sku: string
  categoryId: UniqueEntityID
  price: number
  stock: number
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get sku() {
    return this.props.sku
  }

  get categoryId() {
    return this.props.categoryId
  }

  get price() {
    return this.props.price
  }

  get stock() {
    return this.props.stock
  }

  get isActive() {
    return this.props.isActive
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  updateDetails(data: { name?: string; description?: string }) {
    if (data.name) this.props.name = data.name
    if (data.description) this.props.description = data.description

    this.touch()
  }

  changePrice(newPrice: number) {
    if (newPrice <= 0) {
      throw new Error('Price must be greater than 0')
    }

    this.props.price = newPrice
    this.touch()
  }

  increaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0')
    }

    this.props.stock += quantity
    this.touch()
  }

  decreaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0')
    }

    if (this.props.stock < quantity) {
      throw new Error('Insufficient stock')
    }

    this.props.stock -= quantity
    this.touch()
  }

  activate() {
    this.props.isActive = true
    this.touch()
  }

  deactivate() {
    this.props.isActive = false
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<ProductProps, 'createdAt' | 'isActive'>, id?: UniqueEntityID) {
    return new Product(
      {
        name: props.name,
        description: props.description,
        price: props.price,
        sku: props.sku,
        categoryId: props.categoryId, 
        stock: props.stock,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt,
      },
      id,
    )
  }
}
