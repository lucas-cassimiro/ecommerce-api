export interface ShippingAddressProps {
  street: string;
  number: number;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class ShippingAddress {
  private props: ShippingAddressProps;

  constructor(props: ShippingAddressProps) {
    this.props = props;
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }

  get zipCode() {
    return this.props.zipCode;
  }

  get country() {
    return this.props.country;
  }
}
