"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controllers/course.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const course_validator_1 = require("../validators/course.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), course_controller_1.listCourses);
router.post('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.create'), (0, validation_middleware_1.validateRequest)(course_validator_1.createCourseSchema), course_controller_1.createCourse);
router.put('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.update'), (0, validation_middleware_1.validateRequest)(course_validator_1.updateCourseSchema), course_controller_1.updateCourse);
exports.default = router;
//# sourceMappingURL=course.routes.js.map