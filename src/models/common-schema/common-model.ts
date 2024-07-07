import { Buffer } from 'buffer'
import { Binary } from 'mongodb'
import { Schema, Types } from 'mongoose'
import uuid from 'node-uuid'

import { Common } from './types'

const commonSchema = new Schema<Common>({
	_id: {
		type: Types.UUID,
		default: () => new Binary(uuid.v4(undefined, Buffer.alloc(16)), Binary.SUBTYPE_UUID),
	},

	createdBy: {
		type: Date,
		required: true,
		default: Date.now,
	},
	updatedBy: {
		type: Date,
		required: true,
		default: Date.now,
	},
	deleted: {
		type: Boolean,
		required: true,
		default: false,
	},
})

export default commonSchema
