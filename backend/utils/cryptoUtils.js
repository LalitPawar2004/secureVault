import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';


const ALGORITHM = 'aes-256-cbc';
// Ensure your ENCRYPTION_KEY in .env is exactly 32 bytes long
if (!process.env.ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY is missing');
}

const ENCRYPTION_KEY = Buffer.from(
  process.env.ENCRYPTION_KEY,
  'utf8'
);

const IV_LENGTH = 16; // AES block size

// Encrypt plain text into an iv:encryptedText string
export const encrypt = (text) => {
  if (!text) return '';
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Prepend initialization vector so it can be read during decryption
  return `${iv.toString('hex')}:${encrypted}`;
};

// Decrypt iv:encryptedText back into plain text
export const decrypt = (text) => {
  if (!text || !text.includes(':')) return '';
  
  try {
    const [ivHex, encryptedHex] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error.message);
    return ' [Error Decrypting Data] ';
  }
};