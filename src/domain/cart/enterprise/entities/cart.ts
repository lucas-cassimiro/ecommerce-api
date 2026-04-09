import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { CartItem } from "./value-objects/cart-item";

interface CartProps {
  consumerId: UniqueEntityID;
  items: CartItem[];
  total: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class Cart extends Entity<CartProps> {
  get consumerId() {
    return this.props.consumerId;
  }

  get items() {
    return this.props.items;
  }

  get total() {
    return this.props.total;
  }

  addItem(data: { productId: string; quantity: number; price: number }) {
    const existingItem = this.props.items.find(
      (item) => item.productId === data.productId,
    );

    if (existingItem) {
      existingItem.increaseQuantity(data.quantity);
    } else {
      this.props.items.push(new CartItem(data));
    }

    this.recalculateTotal();
    this.touch();
  }

  removeItem(productId: string) {
    this.props.items = this.props.items.filter(
      (item) => item.productId !== productId,
    );
    this.recalculateTotal();
    this.touch();
  }

  clear() {
    this.props.items = [];
    this.props.total = 0;
    this.touch();
  }

  private recalculateTotal() {
    this.props.total = this.props.items.reduce(
      (total, item) => total + item.total,
      0,
    );
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: { consumerId: UniqueEntityID }) {
    return new Cart({
      consumerId: props.consumerId,
      items: [],
      total: 0,
      createdAt: new Date(),
    });
  }
}
