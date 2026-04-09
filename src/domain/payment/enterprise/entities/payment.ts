import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Optional } from "../../../../core/types/optional";

enum PaymentStatus {
  PENDING,
  PAID,
  FAILED,
  CANCELED,
}

interface PaymentProps {
  orderId: UniqueEntityID;
  amount: number;
  status: PaymentStatus;
  provider: string;
  externalId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Payment extends Entity<PaymentProps> {
  get orderId() {
    return this.props.orderId;
  }

  get amount() {
    return this.props.amount;
  }

  get status() {
    return this.props.status;
  }

  get provider() {
    return this.props.provider;
  }

  get externalId() {
    return this.props.externalId;
  }

  markAsPaid(externalId: string) {
    if (this.props.status !== PaymentStatus.PENDING) {
      throw new Error("Payment cannot be marked as paid");
    }

    this.props.status = PaymentStatus.PAID;
    this.props.externalId = externalId;
    this.touch();
  }

  markAsFailed() {
    if (this.props.status !== PaymentStatus.PENDING) {
      throw new Error("Payment cannot be marked as failed");
    }

    this.props.status = PaymentStatus.FAILED;
    this.touch();
  }

  cancel() {
    if (this.props.status === PaymentStatus.PAID) {
      throw new Error("Cannot cancel a paid payment");
    }

    this.props.status = PaymentStatus.CANCELED;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<PaymentProps, 'createdAt' | 'status'>
  ) {
    return new Payment({
      orderId: props.orderId,
      amount: props.amount,
      provider: props.provider,
      status: PaymentStatus.PENDING,
      createdAt: new Date(),
    });
  }
}
