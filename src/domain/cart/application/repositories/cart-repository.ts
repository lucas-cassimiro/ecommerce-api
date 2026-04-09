import { Cart } from "../../enterprise/entities/cart";

export interface CartRepository {
  findByConsumerId(consumerId: string): Promise<Cart | null>;
  save(cart: Cart): Promise<void>;
  clear(cartId: string): Promise<void>;
}
