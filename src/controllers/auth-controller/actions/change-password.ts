import bcrypt from 'bcrypt'

import { getErrorResponseBody } from '~helpers'
import {
	ApplicationRequestHandler,
	ErrorCodes,
	ErrorResponseBody,
	RequestWithOwnUser,
	SuccessResponseBody,
} from '~types'

interface ChangePasswordRequestBody {
	password: string
}

const authChangePasswordAction: ApplicationRequestHandler<
	ChangePasswordRequestBody,
	ErrorResponseBody | SuccessResponseBody
> = async (req, res) => {
	const { password } = req.body

	const user = (req as RequestWithOwnUser).ownUser

	const passwordsIsMatch = await bcrypt.compare(password, user.password)

	if (passwordsIsMatch) {
		return res.status(ErrorCodes.BAD_REQUEST).json(getErrorResponseBody('Пароль не должен совпадать с предыдущим.'))
	}

	user.password = await bcrypt.hash(password, 12)

	await user.save()

	return res.json({ isSuccess: true })
}

export default authChangePasswordAction
