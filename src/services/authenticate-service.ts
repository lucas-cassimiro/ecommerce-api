import { UsersRepository } from '../repositories/users-repository'
import { User } from '../generated/prisma'
import { TokenGenerator } from '../domain/protocols/token-generator'
import { HashComparer } from '../domain/criptography/hash-comparer'
import jwt from 'jsonwebtoken'

interface AuthenticateRequest {
    email: string
    password: string
}

interface AuthenticateResponse {
    user: User
    token: string
}

export class AuthenticateService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly hashComparer: HashComparer,
        private readonly tokenGenerator: TokenGenerator
    ) { }

    async execute({
        email,
        password,
    }: AuthenticateRequest): Promise<AuthenticateResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new Error()
        }

        const doesPasswordMatches = await this.hashComparer.compare(password, user.passwordHash)

        if (!doesPasswordMatches) {
            throw new Error()
        }

        const token = await this.tokenGenerator.generate({ id: user.id, email: user.email })

        return {
            user,
            token
        }
    }
}
