"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academic_controller_1 = require("../controllers/academic.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const academic_validator_1 = require("../validators/academic.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const router = express_1.default.Router();
router.get('/departments', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), academic_controller_1.listDepartments);
router.post('/departments', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.create'), (0, validation_middleware_1.validateRequest)(academic_validator_1.createDepartmentSchema), academic_controller_1.createDepartment);
router.put('/departments/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.update'), (0, validation_middleware_1.validateRequest)(academic_validator_1.updateDepartmentSchema), academic_controller_1.updateDepartment);
router.get('/semesters', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), academic_controller_1.listSemesters);
router.post('/semesters', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.create'), (0, validation_middleware_1.validateRequest)(academic_validator_1.createSemesterSchema), academic_controller_1.createSemester);
router.put('/semesters/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.update'), (0, validation_middleware_1.validateRequest)(academic_validator_1.updateSemesterSchema), academic_controller_1.updateSemester);
exports.default = router;
//# sourceMappingURL=academic.routes.js.map