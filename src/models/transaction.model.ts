import mongoose from "mongoose";
import { ITransaction } from "../@types/types";

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Completed", "Refunded", "Cancelled"],
      default: "Completed",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    refundDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
