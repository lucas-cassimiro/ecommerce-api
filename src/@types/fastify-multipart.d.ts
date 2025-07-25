import 'fastify'

declare module 'fastify' {
    interface FastifyRequest {
        upload?: {
            file: {
                buffer: Buffer
                fileName: string
                mimetype: string
                size: number
            }
            fields: Record<string, any>
        }
    }
}
