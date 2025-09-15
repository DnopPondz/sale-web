/* eslint-env node */
import { Schema, model, models } from "mongoose";

const promotionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    discount: { type: Number, required: true },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

export const Promotion = models.Promotion || model("Promotion", promotionSchema);
