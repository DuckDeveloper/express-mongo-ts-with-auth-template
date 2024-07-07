import { UUID } from 'bson'

import { getErrorResponseBody } from '~helpers'
import { AuthCodeModel } from '~models'
import { ApplicationRequestHandler, ErrorCodes, ErrorResponseBody } from '~types'

export interface CheckAuthCodeIsValidMiddlewareRequestBody {
	id: UUID
	key: UUID
}

const checkAuthCodeIsValidMiddleware: ApplicationRequestHandler<
	CheckAuthCodeIsValidMiddlewareRequestBody,
	ErrorResponseBody
> = async (req, res, next) => {
	const { id: userId, key: authCodeId } = req.body

	if (!userId || !authCodeId) {
		return res.status(ErrorCodes.BAD_REQUEST).json(getErrorResponseBody('Переданы неверные данные.'))
	}

	const authCode = await AuthCodeModel.findOne({
		_id: authCodeId,
		userId,
		deleted: false,
	})

	if (!authCode) {
		return res.status(ErrorCodes.NOT_FOUND).json(getErrorResponseBody('Произошла ошибка. Попробуйте заново.'))
	}

	if (+authCode.expireDate < Date.now()) {
		return res
			.status(ErrorCodes.BAD_REQUEST)
			.json(getErrorResponseBody('Время для регистрации прошло. Попробуйте заново.'))
	}

	if (!authCode.isDone) {
		return res.status(ErrorCodes.BAD_REQUEST).json(getErrorResponseBody('Произошла ошибка. Попробуйте заново.'))
	}

	next()
}

export default checkAuthCodeIsValidMiddleware
