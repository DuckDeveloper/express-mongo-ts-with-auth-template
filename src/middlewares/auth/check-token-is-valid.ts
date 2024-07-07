import { UUID } from 'bson'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY } from '~env-constants'
import { getErrorResponseBody } from '~helpers'
import { setAccessTokenCookie } from '~helpers/auth'
import { UserModel } from '~models'
import { ErrorCodes, RequestWithOwnUser } from '~types'

const checkTokenIsValidMiddleware: RequestHandler = async (req, res, next) => {
	const token: string = req.cookies.access_token

	if (!token) {
		return res.status(ErrorCodes.UNAUTHORIZED).json(getErrorResponseBody('Не авторизован.'))
	}

	const payload = jwt.verify(token, JWT_SECRET_KEY) as { userId?: UUID }
	if (!payload.userId) {
		return res.status(ErrorCodes.FORBIDDEN).json(getErrorResponseBody('Доступ запрещен.'))
	}

	const probableUser = await UserModel.findOne({ _id: payload.userId, deleted: false, isActive: true })
	if (!probableUser) {
		return res.status(ErrorCodes.FORBIDDEN).json(getErrorResponseBody('Доступ запрещен.'))
	}

	;(req as RequestWithOwnUser).ownUser = probableUser
	;(req as RequestWithOwnUser).userId = payload.userId

	setAccessTokenCookie(res, payload.userId)

	next()
}

export default checkTokenIsValidMiddleware
