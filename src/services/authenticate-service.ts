import { UsersRepository } from '../repositories/users-repository'
import { User } from '../generated/prisma'
import { TokenGenerator } from '../domain/protocols/token-generator'
import { HashComparer } from '../domain/criptography/hash-comparer'

interface AuthenticateRequest {
    email: string
    password: string
}

interface AuthenticateResponse {
    user: User
    accessToken: string
    refreshToken: string
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

        const userData = {
            id: user.id,
            email: user.email
        }

        const accessToken = await this.tokenGenerator.generateAccessToken(userData)
        const refreshToken = await this.tokenGenerator.generateRefreshToken(userData)

        return {
            user,
            accessToken,
            refreshToken
        }
    }
}
