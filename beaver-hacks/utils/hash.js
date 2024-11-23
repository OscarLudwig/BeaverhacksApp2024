import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10; 

export async function hashPassword(pw) {
    return await bcrypt.hash(pw, SALT_ROUNDS);
}

export async function verifyPassword(pw, hashedPw) {
    return await bcrypt.compare(pw, hashedPw)
}

