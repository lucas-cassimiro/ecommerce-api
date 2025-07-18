import bcrypt from 'bcryptjs'

import { Encrypter } from "../../domain/criptography/encrypter";
import { HashComparer } from "../../domain/criptography/hash-comparer";

export class BcryptAdapter implements Encrypter, HashComparer {
    constructor(private readonly salt: number) { }

    async encrypt(value: string): Promise<string> {
        return bcrypt.hash(value, this.salt)
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}
