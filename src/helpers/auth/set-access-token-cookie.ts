import { UUID } from 'bson'
import { Response } from 'express'

import { isProduction } from '~env-constants'
import getAccessToken from '~helpers/auth/get-access-token'

const setAccessTokenCookie = (res: Response, userId: UUID) => {
	const token = getAccessToken(userId)

	res.cookie('access_token', token, { httpOnly: true, secure: isProduction })
}

export default setAccessTokenCookie
