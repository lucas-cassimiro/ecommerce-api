import { RefreshTokenController } from '@/infra/http/controllers/refresh-token-controller'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'

export const makeRefreshTokenController = () => {
  const jwtAdapter = new JwtAdapter('mysecretkey', '1h', '7d')
  const refreshTokenController = new RefreshTokenController(jwtAdapter)

  return refreshTokenController
}
