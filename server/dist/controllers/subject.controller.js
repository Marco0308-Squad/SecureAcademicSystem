"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubject = exports.createSubject = exports.listSubjects = void 0;
const subject_service_1 = __importDefault(require("../services/subject.service"));
const apiResponse_1 = require("../utils/apiResponse");
const listSubjects = async (_req, res, next) => {
    try {
        const subjects = await subject_service_1.default.listSubjects();
        res.json(apiResponse_1.ApiResponseFormatter.success(subjects, 'Subjects retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.listSubjects = listSubjects;
const createSubject = async (req, res, next) => {
    try {
        const subject = await subject_service_1.default.createSubject(req.body);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(subject, 'Subject created'));
    }
    catch (error) {
        next(error);
    }
};
exports.createSubject = createSubject;
const updateSubject = async (req, res, next) => {
    try {
        const subject = await subject_service_1.default.updateSubject(req.params.id, req.body);
        res.json(apiResponse_1.ApiResponseFormatter.success(subject, 'Subject updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateSubject = updateSubject;
//# sourceMappingURL=subject.controller.js.map