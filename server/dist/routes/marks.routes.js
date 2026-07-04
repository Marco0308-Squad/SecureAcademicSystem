"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const marks_controller_1 = require("../controllers/marks.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const marks_validator_1 = require("../validators/marks.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_middleware_1 = require("../middleware/authorization.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('student.read'), marks_controller_1.listMarks);
router.post('/', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('marks.publish'), (0, validation_middleware_1.validateRequest)(marks_validator_1.createMarksSchema), marks_controller_1.createMarks);
router.put('/:id', auth_middleware_1.authenticateJWT, (0, authorization_middleware_1.requirePermission)('marks.publish'), (0, validation_middleware_1.validateRequest)(marks_validator_1.updateMarksSchema), marks_controller_1.updateMarks);
exports.default = router;
//# sourceMappingURL=marks.routes.js.map