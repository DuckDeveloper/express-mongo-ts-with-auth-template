import { UUID } from 'bson'

import { getErrorResponseBody } from '~helpers'
import { AuthCodeModel, UserModel } from '~models'
import { ApplicationRequestHandler, ErrorCodes, ErrorResponseBody, SuccessResponseBody } from '~types'

interface CheckCodeRequestBody {
	phone: string
	code: string
}

interface CheckCodeResponseBody extends SuccessResponseBody {
	id: UUID
	key: UUID
}

const authCheckCodeAction: ApplicationRequestHandler<
	CheckCodeRequestBody,
	ErrorResponseBody | CheckCodeResponseBody
> = async (req, res) => {
	const { phone, code } = req.body

	const probableUser = await UserModel.findOne({ phone, deleted: false })

	if (!probableUser) {
		return res.status(ErrorCodes.NOT_FOUND).json(getErrorResponseBody('Пользователя не существует!'))
	}

	const lastValidCode = await AuthCodeModel.findOne({
		userId: probableUser._id,
		deleted: false,
		expireDate: { $gt: new Date() },
	})

	if (!lastValidCode) {
		return res
			.status(ErrorCodes.NOT_FOUND)
			.json(getErrorResponseBody('Код не найден. Возможно, он просрочен. Попробуйте заново.'))
	}

	if (lastValidCode.value !== code) {
		return res.status(ErrorCodes.BAD_REQUEST).json(getErrorResponseBody('Неверный код.'))
	}

	const newExpireDate = new Date()
	newExpireDate.setHours(newExpireDate.getHours() + 2)

	lastValidCode.expireDate = newExpireDate
	lastValidCode.isDone = true

	await lastValidCode.save()

	return res.json({ isSuccess: true, id: probableUser._id, key: lastValidCode._id })
}

export default authCheckCodeAction
