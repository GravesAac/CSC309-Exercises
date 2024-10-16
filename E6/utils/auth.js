import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRY = '15m';  // 15 minutes for access token
const REFRESH_TOKEN_EXPIRY = '7d';  // 7 days for refresh token

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
export async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

/**
 * Compares a plain text password to a hashed password.
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to true if passwords match, false otherwise.
 */
export async function comparePassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing password');
  }
}

/**
 * Generate an access token for a user.
 */
export function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  }
  
  /**
   * Generate a refresh token for a user.
   */
  export function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  }

  /**
 * Verifies a JWT from the Authorization header.
 * @param {string} token - The JWT token to verify.
 * @returns {object|null} - The decoded token payload if valid, or null if invalid.
 */
export function verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return decoded; // Contains payload (e.g., username, role, expiresAt)
    } catch (error) {
      return null; // Invalid or expired token
    }
  }

  /**
 * Verifies the refresh token.
 */
export function verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }