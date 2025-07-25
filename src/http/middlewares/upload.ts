import { FastifyReply, FastifyRequest } from "fastify"
import { MultipartFile } from "@fastify/multipart"

export const uploadMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = await request.file() as MultipartFile

        if (!data) {
            reply.code(400).send({ error: 'No data uploaded' })
            return
        }

        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

        if (!allowedMimeTypes.includes(data.mimetype)) {
            reply.code(400).send({ error: `Tipo de arquivo não permitido: ${data.mimetype}` })
            return
        }

        const maxSize = 5 * 1024 * 1024
        const buffer = await data.toBuffer()
        if (buffer.length > maxSize) {
            reply.code(400).send({ error: 'Arquivo muito grande. Máximo 5MB.' })
            return
        }

        const fields: Record<string, any> = {}

        if (data.fields) {
            Object.entries(data.fields).forEach(([key, field]: [string, any]) => {
                fields[key] = field.value
            })
        }

        request.upload = {
            file: {
                buffer,
                fileName: data.filename,
                mimetype: data.mimetype,
                size: buffer.length
            },
            fields
        }

        request.body = fields

    } catch (error) {
        reply.code(400).send({ error: 'Erro no upload do arquivo' })
    }
}
