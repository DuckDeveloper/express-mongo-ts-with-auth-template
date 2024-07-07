import { ApplicationRequestHandler, ErrorResponseBody, SuccessResponseBody } from '~types'

const authLogoutAction: ApplicationRequestHandler<void, ErrorResponseBody | SuccessResponseBody> = async (req, res) => {
	res.clearCookie('access_token')

	return res.json({ isSuccess: true })
}

export default authLogoutAction
