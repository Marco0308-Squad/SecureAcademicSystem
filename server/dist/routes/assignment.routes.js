"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assignment_controller_1 = require("../controllers/assignment.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const assignment_validator_1 = require("../validators/assignment.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), assignment_controller_1.listAssignments);
router.post('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('marks.publish'), (0, validation_middleware_1.validateRequest)(assignment_validator_1.createAssignmentSchema), assignment_controller_1.createAssignment);
router.put('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('marks.publish'), (0, validation_middleware_1.validateRequest)(assignment_validator_1.updateAssignmentSchema), assignment_controller_1.updateAssignment);
exports.default = router;
//# sourceMappingURL=assignment.routes.js.map