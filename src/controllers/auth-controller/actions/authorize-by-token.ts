import { PreparedUser } from '~models/user-model/types'
import { ApplicationRequestHandler, ErrorResponseBody, RequestWithOwnUser, SuccessResponseBody } from '~types'

interface AuthorizeByTokenResponseBody extends SuccessResponseBody {
	data: PreparedUser
}

const authAuthorizeByTokenAction: ApplicationRequestHandler<
	void,
	ErrorResponseBody | AuthorizeByTokenResponseBody
> = async (req, res) => {
	const user = (req as RequestWithOwnUser).ownUser

	return res.json({ isSuccess: true, data: user.getPrepared() })
}

export default authAuthorizeByTokenAction
