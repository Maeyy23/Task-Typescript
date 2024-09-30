import mongoose from "mongoose";
import { ICustomer } from "../@types/types";

const customerSchema = new mongoose.Schema<ICustomer>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
});

export default mongoose.model<ICustomer>("Customers", customerSchema);
