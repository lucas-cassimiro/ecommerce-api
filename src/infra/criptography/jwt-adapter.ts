import jwt, { JwtPayload } from 'jsonwebtoken'
import { Encrypter } from '../../domain/criptography/encrypter'
import { Decrypter } from '../../domain/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(
    private readonly secret: string,
    private readonly expiresInAccessToken: jwt.SignOptions['expiresIn'],
    private readonly expiresInRefreshToken: jwt.SignOptions['expiresIn']
  ) {}

  async generateAccessToken(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresInAccessToken,
    })
  }

  async generateRefreshToken(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresInRefreshToken,
    })
  }

  async decrypt<T = JwtPayload>(token: string): Promise<T> {
    return jwt.verify(token, this.secret) as T
  }
}
