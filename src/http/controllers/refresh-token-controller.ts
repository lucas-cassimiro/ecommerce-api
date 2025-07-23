import { FastifyRequest, FastifyReply } from 'fastify'
import { JwtAdapter } from '../../infra/criptography/jwt-adapter'

interface JwtPayload {
    id: number
    email: string
    iat?: number
    exp?: number
}

export class RefreshTokenController {
    constructor(private readonly jwtAdapter: JwtAdapter) { }

    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const refreshToken = request.cookies.refreshToken

            if (!refreshToken) {
                return response.status(401).send({ message: 'Refresh token is missing.' })
            }

            const decoded = await this.jwtAdapter.decrypt(refreshToken) as unknown as JwtPayload

            if (!decoded) {
                return response.status(401).send({ message: 'Refresh token invalid.' })
            }

            const user = {
                id: decoded.id,
                email: decoded.email
            }

            const accessToken = await this.jwtAdapter.generateAccessToken(user)
            const newRefreshToken = await this.jwtAdapter.generateRefreshToken(user)

            return response
                .status(200)
                .setCookie('refreshToken', newRefreshToken, {
                    path: '/',
                    secure: false,
                    sameSite: 'lax',
                    httpOnly: true,
                })
                .send({
                    accessToken,
                })
        } catch (err) {
            console.error(err)
            return response.status(400).send({
                message: 'Erro ao autenticar usuário',
                error: err instanceof Error ? err.message : err
            })
        }

    }
}
