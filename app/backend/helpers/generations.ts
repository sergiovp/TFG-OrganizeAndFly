import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Configure DOTENV to use ENV variables.
dotenv.config();

const SECRET = process.env.JWT_SECRET || '';

/**
 * Sign user token.
 * @param userData The user data.
 * @return Signed user token.
 */
export function generateUserToken(userData: string): string {
    return jwt.sign(userData, SECRET);
}

/**
 * Generate an ID.
 * @returns Generated ID.
 */
export function generateID(): string {
    return uuidv4();
}

/**
 * Generate an encrypted pass.
 * @param pass Plain text password.
 * @param saltRound The cost of processing the data.
 * @return Encrypted pass.
 */
export async function generateEncryptedPass(pass: string, saltRound: number = 10): Promise<string> {
    return await bcrypt.hash(pass, saltRound);
}
