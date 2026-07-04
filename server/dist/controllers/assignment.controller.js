"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAssignment = exports.createAssignment = exports.listAssignments = void 0;
const assignment_service_1 = __importDefault(require("../services/assignment.service"));
const apiResponse_1 = require("../utils/apiResponse");
const listAssignments = async (_req, res, next) => {
    try {
        const assignments = await assignment_service_1.default.listAssignments();
        res.json(apiResponse_1.ApiResponseFormatter.success(assignments, 'Assignments retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.listAssignments = listAssignments;
const createAssignment = async (req, res, next) => {
    try {
        const assignment = await assignment_service_1.default.createAssignment(req.body);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(assignment, 'Assignment created'));
    }
    catch (error) {
        next(error);
    }
};
exports.createAssignment = createAssignment;
const updateAssignment = async (req, res, next) => {
    try {
        const assignment = await assignment_service_1.default.updateAssignment(req.params.id, req.body);
        res.json(apiResponse_1.ApiResponseFormatter.success(assignment, 'Assignment updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateAssignment = updateAssignment;
//# sourceMappingURL=assignment.controller.js.map