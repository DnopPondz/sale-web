/* eslint-env node */
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

export const hashPassword = (password: string): string => {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const derivedKey = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${derivedKey}`;
};

export const verifyPassword = (password: string, storedHash: string): boolean => {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const hashedBuffer = Buffer.from(key, "hex");
    const derived = scryptSync(password, salt, KEY_LENGTH);
    if (hashedBuffer.length !== derived.length) return false;
    return timingSafeEqual(hashedBuffer, derived);
  } catch (error) {
    console.error("Failed to verify password", error);
    return false;
  }
};
