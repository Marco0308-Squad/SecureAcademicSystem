"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("../controllers/faculty.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const faculty_validator_1 = require("../validators/faculty.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), faculty_controller_1.listFaculty);
router.post('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.create'), (0, validation_middleware_1.validateRequest)(faculty_validator_1.createFacultySchema), faculty_controller_1.createFaculty);
router.put('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.update'), (0, validation_middleware_1.validateRequest)(faculty_validator_1.updateFacultySchema), faculty_controller_1.updateFaculty);
exports.default = router;
//# sourceMappingURL=faculty.routes.js.map