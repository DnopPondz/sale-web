/* eslint-env node */
import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    codex/add-mongodb-database-connection-32h9cj
    category: { type: String, required: true },

  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", productSchema);
