import { Types } from 'mongoose'

import { Common } from '~models/common-schema'

export interface User extends Common {
	fullName: string
	phone: string
	email?: string
	password: string
	isActive: boolean
	walletId: Types.UUID
	getPrepared: () => PreparedUser
}

export interface PreparedUser
	extends Omit<User, '_id' | 'walletId' | 'isActive' | 'deleted' | 'password' | 'getPrepared'> {
	id: string
	walletId: string
}
