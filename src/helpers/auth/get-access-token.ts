import { UUID } from 'bson'
import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY } from '~env-constants'

const getAccessToken = (userId: UUID) => jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '7d' })

export default getAccessToken
