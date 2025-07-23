import bcrypt from 'bcryptjs'

import { HashComparer } from "../../domain/criptography/hash-comparer"
import { Hasher } from '../../domain/criptography/hasher'

export class BcryptAdapter implements Hasher, HashComparer {
    constructor(private readonly salt: number) { }

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.salt)
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}
