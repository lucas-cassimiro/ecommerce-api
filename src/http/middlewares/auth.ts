import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

import { prisma } from '../../lib/prisma'

export async function authMiddleware(request: FastifyRequest, response: FastifyReply) {
    try {
        const token = request.headers['authorization']?.split(' ')[1]

        if (!token) {
            return response.status(403).send({ message: 'Unauthorized.' })
        }

        const decodedToken = jwt.verify(token, 'mysecretkey') as { id: number, email: string }

        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id
            }
        })

        if (!user) {
            return response.status(403).send({ message: 'Unauthorized.' })
        }

        const { passwordHash, ...loggedUser } = user

        request.user = loggedUser
    } catch (error) {
        return response.status(500).send({ error: 'Invalid token. ' })
    }
}
