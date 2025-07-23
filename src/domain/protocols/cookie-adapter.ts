export interface CookieHandler {
    setCookie(name: string, value: string, options?: CookieOptions): Promise<void>
    getCookie(name: string): Promise<string | undefined>
    clearCookie(name: string): Promise<void>
}

export interface CookieOptions {
    httpOnly?: boolean
    secure?: boolean
    path?: string
    maxAge?: number
    sameSite?: 'lax' | 'strict' | 'none'
}
