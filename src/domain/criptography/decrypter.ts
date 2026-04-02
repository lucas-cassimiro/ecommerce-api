export interface Decrypter<T = any> {
  decrypt(token: string): Promise<T>
}
