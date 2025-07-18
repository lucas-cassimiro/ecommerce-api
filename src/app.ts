import fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(cors, {
    origin: true
})

app.register(appRoutes)
