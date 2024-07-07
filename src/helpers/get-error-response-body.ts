import { ErrorResponseBody } from '~types'

type GetErrorResponseBody = (errorMessage?: string) => ErrorResponseBody

const getErrorResponseBody: GetErrorResponseBody = errorMessage => ({
	isSuccess: false,
	message: errorMessage || 'Произошла непредвиденная ошибка.',
})

export default getErrorResponseBody
