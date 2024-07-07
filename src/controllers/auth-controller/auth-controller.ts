import {
	authAuthorizeAction,
	authAuthorizeByTokenAction,
	authChangePasswordAction,
	authCheckCodeAction,
	authLogoutAction,
	authRecoverPasswordAction,
	authRegisterAction,
	authRepeatCodeAction,
	authSendRecoveryPasswordCodeAction,
	authSendRegistrationCodeAction,
} from './actions'

class AuthController {
	sendRegistrationCode = authSendRegistrationCodeAction
	repeatCode = authRepeatCodeAction
	checkCode = authCheckCodeAction
	register = authRegisterAction
	authorize = authAuthorizeAction
	authorizeByToken = authAuthorizeByTokenAction
	logout = authLogoutAction
	changePassword = authChangePasswordAction
	sendRecoveryPasswordCode = authSendRecoveryPasswordCodeAction
	recoverPassword = authRecoverPasswordAction
}

export default new AuthController()
