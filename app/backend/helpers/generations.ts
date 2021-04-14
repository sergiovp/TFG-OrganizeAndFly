import jwt from 'jsonwebtoken';

const SECRET = 'app_secret_key';

export function generateUserToken(userData: string): string {
    return jwt.sign(userData, SECRET);
}
