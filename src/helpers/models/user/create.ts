import { User, UserModel, WalletModel } from '~models'

const createUser = async (definition: Partial<User>) => {
	const wallet = new WalletModel()

	await wallet.save()

	const user = new UserModel({ ...definition, walletId: wallet._id })
	await user.save()

	return user
}

export default createUser
