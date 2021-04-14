import bcrypt from 'bcrypt';

export async function validateEncryptedPass(introducedPass: string, DBPass: string): Promise<boolean> {
    return await bcrypt.compare(introducedPass, DBPass);
}
