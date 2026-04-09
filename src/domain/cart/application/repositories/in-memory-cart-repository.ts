import { Cart } from "../../enterprise/entities/cart";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export class InMemoryCartRepository {
  private carts: Cart[] = [];

  async findByConsumerId(consumerId: string): Promise<Cart | null> {
    return (
      this.carts.find((c) => c.consumerId.toString() === consumerId) ?? null
    );
  }

  async save(cart: Cart): Promise<void> {
    const index = this.carts.findIndex(
      (c) => c.id.toString() === cart.id.toString(),
    );
    if (index >= 0) {
      this.carts[index] = cart;
    } else {
      this.carts.push(cart);
    }
  }

  async clear(): Promise<void> {
    this.carts = [];
  }
}
