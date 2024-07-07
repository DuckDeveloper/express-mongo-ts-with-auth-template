import { getErrorResponseBody } from '~helpers'
import { createAuthCode, hasDisabledAuthCode } from '~helpers/models/auth-code'
import { UserModel } from '~models'
import { ApplicationRequestHandler, ErrorCodes, ErrorResponseBody, SuccessResponseBody } from '~types'

interface RepeatCodeRequestBody {
	phone: string
}

const authRepeatCodeAction: ApplicationRequestHandler<
	RepeatCodeRequestBody,
	ErrorResponseBody | SuccessResponseBody
> = async (req, res) => {
	const { phone } = req.body

	const probableUser = await UserModel.findOne({ phone, deleted: false })

	if (!probableUser) {
		return res.status(ErrorCodes.NOT_FOUND).json(getErrorResponseBody('Пользователя не существует!'))
	}

	const isDisabledCode = await hasDisabledAuthCode(probableUser._id)

	if (isDisabledCode) {
		return res.status(ErrorCodes.BAD_REQUEST).json(getErrorResponseBody('Код уже отправлен. Попробуйте позже.'))
	}

	await createAuthCode(probableUser)
	return res.json({ isSuccess: true })
}

export default authRepeatCodeAction
