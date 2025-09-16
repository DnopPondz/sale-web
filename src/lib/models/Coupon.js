import { Schema, model, models } from 'mongoose';

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiresAt: Date,
    usageLimit: Number,
    used: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Coupon = models.Coupon || model('Coupon', couponSchema);
