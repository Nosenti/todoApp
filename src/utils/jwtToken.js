import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();
/**
 * 
 */
export const jwtToken = {
  createToken({
    id
  }) {
    return jwt.sign({
      id
    },
    process.env.SECRET_OR_KEY, { expiresIn: '24h' });
  },
};

/**
 * verify token
 * @param {string} token 
 */
export function verifyingToken(token) {
  const verifiedToken = jwt.verify(token, process.env.SECRET_OR_KEY);
  return verifiedToken;
}

export const hashPassword = (password) => bcrypt.hashSync(password, 10);
/**
 * Compare password with with the password saved in the database
 * @param {string} password 
 * @param {string} hash 
 * @returns {void}
 */
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);