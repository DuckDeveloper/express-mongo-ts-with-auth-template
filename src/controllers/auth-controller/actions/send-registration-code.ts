import { getErrorResponseBody } from '~helpers'
import { createAuthCode, hasDisabledAuthCode } from '~helpers/models/auth-code'
import { createUser } from '~helpers/models/user'
import { AuthCodeModel, UserModel } from '~models'
import { ApplicationRequestHandler, ErrorCodes, ErrorResponseBody, SuccessResponseBody } from '~types'

interface SendRegistrationCodeRequestBody {
	phone: string
}

const authSendRegistrationCodeAction: ApplicationRequestHandler<
	SendRegistrationCodeRequestBody,
	ErrorResponseBody | SuccessResponseBody
> = async (req, res) => {
	const { phone } = req.body

	const probableUser = await UserModel.findOne({ phone, deleted: false })

	if (probableUser?.isActive) {
		return res.status(ErrorCodes.BAD_REQUEST).json(getErrorResponseBody('Пользователь уже существует!'))
	}

	if (probableUser) {
		const isDisabledCode = await hasDisabledAuthCode(probableUser._id)

		if (!isDisabledCode) {
			await createAuthCode(probableUser)
		}

		return res.json({ isSuccess: true })
	}

	const user = await createUser({ phone })
	await createAuthCode(user)

	res.json({ isSuccess: true })
}

export default authSendRegistrationCodeAction
