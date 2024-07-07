import { model, Schema, Types } from 'mongoose'

import { commonSchema } from '~models/common-schema'
import { TableKeys } from '~models/types'

import { User } from './types'

const userSchema = new Schema<User>({
	fullName: { type: String },
	phone: { type: String, unique: true, required: true, maxlength: 10, minlength: 10 },
	email: { type: String, unique: true },
	password: { type: String },
	isActive: { type: Boolean, default: false },
	walletId: { type: Types.UUID, required: true, ref: TableKeys.WALLET },
}).add(commonSchema)

const UserModel = model(TableKeys.USER, userSchema, 'users')

UserModel.prototype.getPrepared = function () {
	return {
		id: this._id.toString(),
		phone: this.phone,
		walletId: this.walletId.toString(),
		createdBy: this.createdBy,
		updatedBy: this.updatedBy,
		email: this.email,
		fullName: this.fullName,
	}
}

export default UserModel
