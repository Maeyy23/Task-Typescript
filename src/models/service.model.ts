import mongoose from "mongoose";
import { IService } from "../@types/types";

const serviceSchema = new mongoose.Schema<IService>(
  {
    nameOfService: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IService>("Service", serviceSchema);
