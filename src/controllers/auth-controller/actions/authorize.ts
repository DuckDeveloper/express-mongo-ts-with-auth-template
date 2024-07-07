import bcrypt from 'bcrypt'

import { getErrorResponseBody } from '~helpers'
import { setAccessTokenCookie } from '~helpers/auth'
import { UserModel } from '~models'
import { ApplicationRequestHandler, ErrorCodes, ErrorResponseBody, SuccessResponseBody } from '~types'

interface AuthorizeRequestBody {
	phone: string
	password: string
}

const authAuthorizeAction: ApplicationRequestHandler<
	AuthorizeRequestBody,
	ErrorResponseBody | SuccessResponseBody
> = async (req, res) => {
	const { phone, password } = req.body

	const probableUser = await UserModel.findOne({ phone, deleted: false, isActive: true })

	if (!probableUser) {
		return res.status(ErrorCodes.NOT_FOUND).json(getErrorResponseBody('Пользователя не существует!'))
	}

	const passwordsIsMatch = await bcrypt.compare(password, probableUser.password)

	if (!passwordsIsMatch) {
		return res.status(ErrorCodes.BAD_REQUEST).json(getErrorResponseBody('Неверный логин или пароль!'))
	}

	setAccessTokenCookie(res, probableUser._id)

	return res.json({ isSuccess: true })
}

export default authAuthorizeAction
