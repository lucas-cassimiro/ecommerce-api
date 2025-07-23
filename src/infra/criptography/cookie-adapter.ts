import { FastifyReply, FastifyRequest } from "fastify";
import { CookieHandler, CookieOptions } from "../../domain/protocols/cookie-adapter";

export class CookieAdapter implements CookieHandler {
    constructor(
        private readonly request: FastifyRequest,
        private readonly response: FastifyReply
    ) { }

    async setCookie(name: string, value: string, options?: CookieOptions): Promise<void> {
        this.response.setCookie(name, value, {
            path: options?.path ?? '/',
            httpOnly: options?.httpOnly ?? true,
            secure: options?.secure ?? true,
            sameSite: options?.sameSite ?? 'lax',
            maxAge: options?.maxAge
        })
    }

    async getCookie(name: string): Promise<string | undefined> {
        return this.request.cookies[name]
    }

    async clearCookie(name: string): Promise<void> {
        this.response.clearCookie(name)
    }
}
