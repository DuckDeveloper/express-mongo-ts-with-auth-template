import { Types } from 'mongoose'

import { Common } from '~models/common-schema'

export interface AuthCode extends Common {
	value: string
	expireDate: Date
	isDone: boolean
	disableDate: Date
	userId: Types.UUID
}
