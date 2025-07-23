export interface Encrypter {
    generateAccessToken(payload: object): Promise<string>
    generateRefreshToken(payload: object): Promise<string>
}
