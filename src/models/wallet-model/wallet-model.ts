import { model, Schema } from 'mongoose'

import { commonSchema } from '~models/common-schema'
import { TableKeys } from '~models/types'

import { Wallet } from './types'

const walletSchema = new Schema<Wallet>({
	value: { type: Number, required: true, default: 0, min: 0 },
}).add(commonSchema)

const WalletModel = model(TableKeys.WALLET, walletSchema, 'wallets')

export default WalletModel
