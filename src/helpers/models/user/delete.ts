import { FilterQuery } from 'mongoose'

import { User, UserModel, WalletModel } from '~models'

const deleteUser = async (filter: FilterQuery<User>) => {
	const user = await UserModel.findOneAndUpdate(filter, { deleted: true })

	if (user) {
		await WalletModel.findOneAndUpdate({ _id: user.walletId }, { deleted: true })
	}
}

export default deleteUser
