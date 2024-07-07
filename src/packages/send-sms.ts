import { SMS_API_KEY } from '~env-constants'

interface SendSmsResult {
	isSuccess: boolean
	statusCode: number
}

const sendSms = async (phone: string, text: string): Promise<SendSmsResult> => {
	const response = await fetch(`https://sms.ru/sms/send?api_id=${SMS_API_KEY}&to=${phone}&msg=${text}&json=1`)

	const data = await response.json()

	return {
		isSuccess: data.status === 'OK',
		statusCode: data.status_code,
	}
}

export default sendSms
