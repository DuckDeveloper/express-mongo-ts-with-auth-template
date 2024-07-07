import { Router } from 'express'

import authController from '~controllers/auth-controller'
import { checkAuthCodeIsValidMiddleware, checkTokenIsValidMiddleware } from '~middlewares/auth'
const router = Router()

router.post('/send-registration-code', authController.sendRegistrationCode)
router.post('/send-recovery-password-code', authController.sendRecoveryPasswordCode)

router.post('/repeat-code', authController.repeatCode)
router.post('/check-code', authController.checkCode)

router.post('/register', checkAuthCodeIsValidMiddleware, authController.register)
router.post('/recover-password', checkAuthCodeIsValidMiddleware, authController.recoverPassword)

router.post('/authorize', authController.authorize)
router.get('/check-authorize', checkTokenIsValidMiddleware, authController.authorizeByToken)
router.get('/logout', checkTokenIsValidMiddleware, authController.logout)

router.post('/change-password', checkTokenIsValidMiddleware, authController.changePassword)

export default router
