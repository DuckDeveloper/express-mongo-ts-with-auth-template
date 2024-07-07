import { UUID } from 'bson'
import { Request, RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { Document } from 'mongoose'

import { User } from '~models'
import { Common } from '~models/common-schema'

export enum ErrorCodes {
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	SERVER_SIDE = 500,
}

type ApplicationDocument<T extends Common> = Document<unknown, object, T> & T & Required<{ _id: UUID }>

export interface RequestWithOwnUser extends Request {
	userId: UUID
	ownUser: ApplicationDocument<User>
}

export interface ErrorResponseBody {
	isSuccess: boolean
	message: string
}

export interface SuccessResponseBody {
	isSuccess: boolean
}

export type ApplicationRequestHandler<RequestBody, ResponseBody> = RequestHandler<
	ParamsDictionary,
	ResponseBody,
	RequestBody
>
