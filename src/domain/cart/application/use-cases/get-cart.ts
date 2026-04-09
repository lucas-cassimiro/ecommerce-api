import { CartRepository } from "../repositories/cart-repository";

interface GetCartUseCaseRequest {
  consumerId: string;
}

export class GetCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute({ consumerId }: GetCartUseCaseRequest) {
    const cart = await this.cartRepository.findByConsumerId(consumerId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    return { cart };
  }
}
