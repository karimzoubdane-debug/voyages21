import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "./mongodb.js";

export function generateAccessToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function checkAdminKey(headerValue) {
  const expected = process.env.ADMIN_KEY;
  if (!expected) return false;
  if (typeof headerValue !== "string") return false;
  const a = Buffer.from(headerValue);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export async function findUserByAccessToken(token) {
  if (!token || typeof token !== "string") return null;
  const users = await getUsersCollection();
  return users.findOne({ accessToken: token });
}

export async function ensureMonthlyReset(user) {
  if (!user || !user.resetDate) return user;
  const now = new Date();
  if (now < new Date(user.resetDate)) return user;
  const users = await getUsersCollection();
  const newResetDate = addDays(now, 30);
  await users.updateOne(
    { _id: user._id },
    { $set: { tokensUsed: 0, resetDate: newResetDate } },
  );
  return { ...user, tokensUsed: 0, resetDate: newResetDate };
}

export function sanitizeUser(user) {
  if (!user) return null;
  const { accessToken, passwordHash, _id, ...rest } = user;
  return { id: String(_id), ...rest };
}
