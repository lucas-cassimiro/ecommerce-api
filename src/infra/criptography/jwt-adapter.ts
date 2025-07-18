import jwt from 'jsonwebtoken'
import { TokenGenerator } from '../../domain/protocols/token-generator'

export class JwtAdapter implements TokenGenerator {
    constructor(
        private readonly secret: jwt.Secret,
        private readonly expiresIn: jwt.SignOptions['expiresIn']
    ) { }

    async generate(payload: object): Promise<string> {
        const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })

        return token
    }
}
