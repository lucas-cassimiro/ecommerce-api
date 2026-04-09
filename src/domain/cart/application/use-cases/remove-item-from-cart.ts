import { CartRepository } from "../repositories/cart-repository";

interface RemoveItemFromCartUseCaseRequest {
  consumerId: string;
  productId: string;
}

export class RemoveItemFromCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute({ consumerId, productId }: RemoveItemFromCartUseCaseRequest) {
    const cart = await this.cartRepository.findByConsumerId(consumerId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.removeItem(productId);

    await this.cartRepository.save(cart);

    return {
      cart,
    };
  }
}
