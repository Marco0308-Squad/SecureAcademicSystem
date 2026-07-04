"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subject_controller_1 = require("../controllers/subject.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const subject_validator_1 = require("../validators/subject.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), subject_controller_1.listSubjects);
router.post('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.create'), (0, validation_middleware_1.validateRequest)(subject_validator_1.createSubjectSchema), subject_controller_1.createSubject);
router.put('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.update'), (0, validation_middleware_1.validateRequest)(subject_validator_1.updateSubjectSchema), subject_controller_1.updateSubject);
exports.default = router;
//# sourceMappingURL=subject.routes.js.map