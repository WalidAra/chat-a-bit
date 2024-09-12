import * as crypto from 'crypto';

export function generateRandomChars(length: number): string {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}
