/* eslint-env node */
import { Schema, model, models, Types } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    products: [{ type: Types.ObjectId, ref: "Product", required: true }],
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", orderSchema);
