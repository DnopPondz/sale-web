import { Schema, model, models } from 'mongoose';

const promotionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    discount: { type: Number, required: true },
    active: { type: Boolean, default: true },
    startsAt: Date,
    endsAt: Date,
  },
  { timestamps: true }
);

export const Promotion = models.Promotion || model('Promotion', promotionSchema);
