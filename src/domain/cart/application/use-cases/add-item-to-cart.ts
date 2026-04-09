import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Cart } from "../../enterprise/entities/cart";
import { CartItem } from "../../enterprise/entities/value-objects/cart-item";
import { CartRepository } from "../repositories/cart-repository";

interface AddItemToCartUseCaseRequest {
  consumerId: string;
  productId: string;
  quantity: number;
  price: number;
}

export class AddItemToCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute({
    consumerId,
    productId,
    quantity,
    price,
  }: AddItemToCartUseCaseRequest) {
    let cart = await this.cartRepository.findByConsumerId(consumerId);

    if (!cart) {
      cart = Cart.create({
        consumerId: new UniqueEntityID(consumerId),
      });
    }

    cart.addItem({
      productId,
      quantity,
      price,
    });

    await this.cartRepository.save(cart);

    return {
      cart,
    };
  }
}
