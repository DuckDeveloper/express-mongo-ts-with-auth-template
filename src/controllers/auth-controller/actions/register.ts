import bcrypt from 'bcrypt'

import { getErrorResponseBody } from '~helpers'
import { setAccessTokenCookie } from '~helpers/auth'
import { CheckAuthCodeIsValidMiddlewareRequestBody } from '~middlewares/auth/check-auth-code-is-valid'
import { UserModel } from '~models'
import { ApplicationRequestHandler, ErrorCodes, ErrorResponseBody, SuccessResponseBody } from '~types'

interface RegisterRequestBody extends CheckAuthCodeIsValidMiddlewareRequestBody {
	email?: string
	fullName: string
	password: string
}

const authRegisterAction: ApplicationRequestHandler<
	RegisterRequestBody,
	ErrorResponseBody | SuccessResponseBody
> = async (req, res) => {
	const { id: userId, email, fullName, password } = req.body

	const probableUser = await UserModel.findOne({ _id: userId, deleted: false })

	if (!probableUser) {
		return res.status(ErrorCodes.NOT_FOUND).json(getErrorResponseBody('Пользователя не существует!'))
	}

	if (email) {
		probableUser.email = email
	}

	probableUser.password = await bcrypt.hash(password, 12)
	probableUser.fullName = fullName
	probableUser.isActive = true

	await probableUser.save()

	setAccessTokenCookie(res, userId)

	return res.json({ isSuccess: true })
}

export default authRegisterAction
