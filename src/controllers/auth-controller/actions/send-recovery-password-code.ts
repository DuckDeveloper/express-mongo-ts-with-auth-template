import { getErrorResponseBody } from '~helpers'
import { createAuthCode, hasDisabledAuthCode } from '~helpers/models/auth-code'
import { createUser } from '~helpers/models/user'
import { UserModel } from '~models'
import { ApplicationRequestHandler, ErrorCodes, ErrorResponseBody, SuccessResponseBody } from '~types'

interface SendRecoveryPasswordCodeRequestBody {
	phone: string
}

const authSendRecoveryPasswordCodeAction: ApplicationRequestHandler<
	SendRecoveryPasswordCodeRequestBody,
	ErrorResponseBody | SuccessResponseBody
> = async (req, res) => {
	const { phone } = req.body

	const probableUser = await UserModel.findOne({ phone, deleted: false, isActive: true })

	if (!probableUser) {
		return res.status(ErrorCodes.NOT_FOUND).json(getErrorResponseBody('Пользователя не существует!'))
	}

	const isDisabledCode = await hasDisabledAuthCode(probableUser._id)

	if (!isDisabledCode) {
		await createAuthCode(probableUser)
	}

	return res.json({ isSuccess: true })
}

export default authSendRecoveryPasswordCodeAction
