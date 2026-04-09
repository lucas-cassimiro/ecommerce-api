import fastify from 'fastify'
import cors from '@fastify/cors'
import { fastifyCookie } from '@fastify/cookie'
import multipart from '@fastify/multipart'

import { appRoutes } from './infra/http/routes'

export const app = fastify()

app.register(cors, {
  origin: true,
  credentials: true,
})

app.register(fastifyCookie, {
  secret: 'mysecretkey',
})

app.register(multipart, {
  limits: {
    fieldNameSize: 100,
    fieldSize: 100,
    fields: 10,
    fileSize: 1000000,
    files: 1,
    headerPairs: 2000,
  },
  attachFieldsToBody: false,
})

app.register(appRoutes)
