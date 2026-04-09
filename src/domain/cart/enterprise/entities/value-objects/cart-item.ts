interface CartItemProps {
  productId: string;
  quantity: number;
  price: number;
}

export class CartItem {
  private props: CartItemProps;

  constructor(props: CartItemProps) {
    if (props.quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    if (props.price < 0) {
      throw new Error("Price cannot be negative");
    }

    this.props = props;
  }

  get productId() {
    return this.props.productId;
  }

  get quantity() {
    return this.props.quantity;
  }

  get price() {
    return this.props.price;
  }

  get total() {
    return this.props.price * this.props.quantity;
  }

  updateQuantity(quantity: number) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    this.props.quantity = quantity;
  }

  increaseQuantity(amount: number = 1) {
    this.updateQuantity(this.props.quantity + amount);
  }

  decreaseQuantity(amount: number = 1) {
    this.updateQuantity(this.props.quantity - amount);
  }
}
