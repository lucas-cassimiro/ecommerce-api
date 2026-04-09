export interface OrderItemProps {
  productId: string;
  quantity: number;
  price: number;
}

export class OrderItem {
  private props: OrderItemProps;

  constructor(props: OrderItemProps) {
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
}
