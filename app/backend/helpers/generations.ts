import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET = 'app_secret_key';

export function generateUserToken(userData: string): string {
    return jwt.sign(userData, SECRET);
}

export async function generateEncryptedPass(pass: string, saltRound: number = 10): Promise<string> {
    return await bcrypt.hash(pass, saltRound);
}
