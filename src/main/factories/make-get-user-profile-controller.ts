import { GetUserProfileController } from '@/infra/http/controllers/get-user-profile-controller'

export const makeGetUserProfileController = () => {
  const getUserProfileController = new GetUserProfileController()

  return getUserProfileController
}
