"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Public routes
router.post('/login', (0, validation_middleware_1.validateRequest)(auth_validator_1.loginSchema), auth_controller_1.login);
router.post('/register', (0, validation_middleware_1.validateRequest)(auth_validator_1.registerSchema), auth_controller_1.register);
router.post('/refresh', (0, validation_middleware_1.validateRequest)(auth_validator_1.refreshTokenSchema), auth_controller_1.refresh);
router.post('/forgot-password', (0, validation_middleware_1.validateRequest)(auth_validator_1.forgotPasswordSchema), auth_controller_1.forgotPassword);
router.post('/reset-password', (0, validation_middleware_1.validateRequest)(auth_validator_1.resetPasswordSchema), auth_controller_1.resetPassword);
// Protected routes
router.post('/logout', auth_middleware_1.authenticateJWT, (0, validation_middleware_1.validateRequest)(auth_validator_1.refreshTokenSchema), auth_controller_1.logout);
router.post('/change-password', auth_middleware_1.authenticateJWT, (0, validation_middleware_1.validateRequest)(auth_validator_1.changePasswordSchema), auth_controller_1.changePassword);
router.get('/me', auth_middleware_1.authenticateJWT, auth_controller_1.getMe);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map