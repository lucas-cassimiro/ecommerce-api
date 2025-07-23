import fastify from 'fastify'
import cors from '@fastify/cors'
import { fastifyCookie } from '@fastify/cookie'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(cors, {
    origin: true,
    credentials: true
})

app.register(fastifyCookie, {
    secret: 'mysecretkey'
})

app.register(appRoutes)

