import { CartRepository } from "../repositories/cart-repository";

interface ClearCartUseCaseRequest {
  consumerId: string;
}

export class ClearCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute({ consumerId }: ClearCartUseCaseRequest) {
    const cart = await this.cartRepository.findByConsumerId(consumerId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.clear();

    await this.cartRepository.save(cart);

    return { cart };
  }
}
