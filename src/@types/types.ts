import { Types } from "mongoose";

export interface IService {
  nameOfService: string;
  description: string;
  price: number;
}

export interface ICustomer {
  name: string;
  email: string;
  address: string;
}

export interface ITransaction {
  customerId: Types.ObjectId;
  serviceId: Types.ObjectId;
  amount: number;
  status: "Completed" | "Refunded" | "Cancelled";
  createdAt: Date;
  refundDate: Date;
}
