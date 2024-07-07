import { model, Schema, Types } from 'mongoose'

import { commonSchema } from '~models/common-schema'
import { TableKeys } from '~models/types'
import { getRandomNumberByLength } from '~utils'

import { AuthCode } from './types'

const authCodeSchema = new Schema<AuthCode>({
	value: { type: String, required: true, minlength: 6, maxlength: 6, default: () => `${getRandomNumberByLength(6)}` },
	expireDate: {
		type: Date,
		required: true,
		default: () => {
			const date = new Date()
			date.setHours(date.getHours() + 2)

			return +date
		},
	},
	isDone: {
		type: Boolean,
		default: false,
	},
	disableDate: {
		type: Date,
		required: true,
		default: () => {
			const date = new Date()
			date.setMinutes(date.getMinutes() + 2)

			return +date
		},
	},
	userId: { type: Types.UUID, ref: TableKeys.USER },
}).add(commonSchema)

const AuthCodeModel = model(TableKeys.AUTH_CODE, authCodeSchema, 'auth-codes')

export default AuthCodeModel
