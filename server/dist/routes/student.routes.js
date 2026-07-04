"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const student_validator_1 = require("../validators/student.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), (0, validation_middleware_1.validateRequest)(student_validator_1.studentQuerySchema), student_controller_1.listStudents);
router.get('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), student_controller_1.getStudent);
router.post('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.create'), (0, validation_middleware_1.validateRequest)(student_validator_1.createStudentSchema), student_controller_1.createStudent);
router.put('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.update'), (0, validation_middleware_1.validateRequest)(student_validator_1.updateStudentSchema), student_controller_1.updateStudent);
router.delete('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.delete'), student_controller_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=student.routes.js.map