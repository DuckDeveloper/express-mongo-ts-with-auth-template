import { UUID } from 'bson'

import { AuthCodeModel } from '~models'

const hasDisabledAuthCode = async (userId: UUID) =>
	!!(await AuthCodeModel.findOne({ userId, deleted: false, disableDate: { $gt: new Date() } }))

export default hasDisabledAuthCode
