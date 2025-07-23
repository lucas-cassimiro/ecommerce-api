import jwt from 'jsonwebtoken'

import { Encrypter } from '../../domain/criptography/encrypter'
import { Decrypter } from '../../domain/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(
        private readonly secret: string,
        private readonly expiresInAccessToken: jwt.SignOptions['expiresIn'],
        private readonly expiresInRefreshToken: jwt.SignOptions['expiresIn']
    ) { }

    async generateAccessToken(payload: object): Promise<string> {
        const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresInAccessToken })

        return token
    }

    async generateRefreshToken(payload: object): Promise<string> {
        const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresInRefreshToken })

        return token
    }

    async decrypt(token: string): Promise<string> {
        return jwt.verify(token, this.secret) as any
    }
}
