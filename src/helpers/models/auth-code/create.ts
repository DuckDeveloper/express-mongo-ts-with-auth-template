import { AuthCodeModel, User } from '~models'
import { sendSms } from '~packages'

const createAuthCode = async (user: User) => {
	await AuthCodeModel.updateMany({ userId: user._id, deleted: false }, { deleted: true })

	const authCode = new AuthCodeModel({ userId: user._id })

	const { isSuccess } = await sendSms(user.phone, authCode.value)

	if (!isSuccess) {
		return
	}

	await authCode.save()
}

export default createAuthCode
