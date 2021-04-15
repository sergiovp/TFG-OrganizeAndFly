import bcrypt from 'bcrypt';

export async function validateEncryptedPass(introducedPass: string, DBPass: string): Promise<boolean> {
    return await bcrypt.compare(introducedPass, DBPass);
}

export function validateEmail(email: string): boolean {
    const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validateSecurePass(pass: string): boolean {
    return pass.length >= 6 ? true : false;
}
