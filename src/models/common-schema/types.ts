import { Types } from 'mongoose'

export interface Common {
	_id: Types.UUID

	createdBy: Date
	updatedBy: Date
	deleted: boolean
}
