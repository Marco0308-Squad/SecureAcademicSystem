"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendance_controller_1 = require("../controllers/attendance.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const attendance_validator_1 = require("../validators/attendance.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), attendance_controller_1.listAttendance);
router.post('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('attendance.mark'), (0, validation_middleware_1.validateRequest)(attendance_validator_1.createAttendanceSchema), attendance_controller_1.createAttendance);
router.put('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('attendance.edit'), (0, validation_middleware_1.validateRequest)(attendance_validator_1.updateAttendanceSchema), attendance_controller_1.updateAttendance);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map