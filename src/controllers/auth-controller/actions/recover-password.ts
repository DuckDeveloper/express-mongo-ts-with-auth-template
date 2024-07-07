import bcrypt from 'bcrypt'

import { getErrorResponseBody } from '~helpers'
import { setAccessTokenCookie } from '~helpers/auth'
import { CheckAuthCodeIsValidMiddlewareRequestBody } from '~middlewares/auth/check-auth-code-is-valid'
import { UserModel } from '~models'
import { ApplicationRequestHandler, ErrorCodes, ErrorResponseBody, SuccessResponseBody } from '~types'

interface RecoverPasswordRequestBody extends CheckAuthCodeIsValidMiddlewareRequestBody {
	password: string
}

const authRecoverPasswordAction: ApplicationRequestHandler<
	RecoverPasswordRequestBody,
	ErrorResponseBody | SuccessResponseBody
> = async (req, res) => {
	const { id: userId, password } = req.body

	const probableUser = await UserModel.findOne({ _id: userId, deleted: false, isActive: true })

	if (!probableUser) {
		return res.status(ErrorCodes.NOT_FOUND).json(getErrorResponseBody('Пользователя не существует!'))
	}

	const passwordsIsMatch = await bcrypt.compare(password, probableUser.password)

	if (passwordsIsMatch) {
		return res.status(ErrorCodes.BAD_REQUEST).json(getErrorResponseBody('Пароль не должен быть схож с предыдущим.'))
	}

	probableUser.password = await bcrypt.hash(password, 12)

	await probableUser.save()

	setAccessTokenCookie(res, userId)

	return res.json({ isSuccess: true })
}

export default authRecoverPasswordAction
