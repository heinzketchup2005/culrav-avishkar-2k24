import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const algorithm = "aes-256-cbc";

const key = Buffer.from(process.env.ENCRYPTION_KEY, "base64"); // Should be 32 bytes for AES-256
const iv = Buffer.from(process.env.ENCRYPTION_IV, "base64"); // Should be 16 bytes for AES

export function encryptPassword(password) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return { encryptedData: encrypted, iv: iv.toString("hex") };
}

export function decryptPassword(encryptedData, ivHex) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

export function isMatch(password, encryptedData, ivHex) {
  const decrypted = decryptPassword(encryptedData, ivHex);
  return decrypted === password;
}
