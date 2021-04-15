import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET = 'app_secret_key';

export function generateUserToken(userData: string): string {
    return jwt.sign(userData, SECRET);
}

export function generateID(): string {
    return uuidv4();
}

export async function generateEncryptedPass(pass: string, saltRound: number = 10): Promise<string> {
    return await bcrypt.hash(pass, saltRound);
}
