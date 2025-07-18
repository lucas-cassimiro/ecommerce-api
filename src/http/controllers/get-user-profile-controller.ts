import { FastifyRequest, FastifyReply } from 'fastify'
import { z, ZodError } from 'zod'
import { GetUserProfileService } from '../../services/get-user-profile'

const querySchema = z.object({
    userId: z.coerce.number()
})

export class GetUserProfileController {
    constructor(private readonly getUserProfileService: GetUserProfileService) { }

    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const { userId } = querySchema.parse(request.params)

            const { user } = await this.getUserProfileService.execute({ userId })

            return response.status(200).send(user)
        } catch (err) {
            if (err instanceof ZodError) {
                return response.status(400).send({ message: 'Invalid user id', error: err.issues })
            }
            return response.status(500).send({ message: 'Internal server error', err })
        }
    }
}
