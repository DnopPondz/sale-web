/* eslint-env node */
import { Schema, model, models } from "mongoose";
import { hashPassword } from "../utils/password";

type Role = "user" | "admin";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    tel: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.set("password", hashPassword(String(this.get("password"))));
  next();
});

type UpdateWithSet = { $set?: Record<string, unknown> } & Record<string, unknown>;

userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as UpdateWithSet | undefined;
  if (!update) return next();

  const set = update.$set ?? update;
  const pwd = set?.password;
  if (typeof pwd === "string" && pwd.trim()) {
    const hashed = hashPassword(pwd);
    if (update.$set) {
      update.$set.password = hashed;
    } else {
      update.password = hashed;
    }
  }
  next();
});

const removePassword = (_doc: unknown, ret: Record<string, unknown>) => {
  delete ret.password;
  return ret;
};

userSchema.set("toJSON", { transform: removePassword });
userSchema.set("toObject", { transform: removePassword });

export type UserDocument = typeof userSchema extends infer T
  ? T extends Schema<infer U>
    ? U & { role: Role }
    : never
  : never;

export const User = models.User || model("User", userSchema);
