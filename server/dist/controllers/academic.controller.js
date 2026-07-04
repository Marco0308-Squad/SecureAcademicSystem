"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSemester = exports.createSemester = exports.listSemesters = exports.updateDepartment = exports.createDepartment = exports.listDepartments = void 0;
const academic_service_1 = __importDefault(require("../services/academic.service"));
const apiResponse_1 = require("../utils/apiResponse");
const listDepartments = async (_req, res, next) => {
    try {
        const departments = await academic_service_1.default.listDepartments();
        res.json(apiResponse_1.ApiResponseFormatter.success(departments, 'Departments retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.listDepartments = listDepartments;
const createDepartment = async (req, res, next) => {
    try {
        const department = await academic_service_1.default.createDepartment(req.body);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(department, 'Department created'));
    }
    catch (error) {
        next(error);
    }
};
exports.createDepartment = createDepartment;
const updateDepartment = async (req, res, next) => {
    try {
        const department = await academic_service_1.default.updateDepartment(req.params.id, req.body);
        res.json(apiResponse_1.ApiResponseFormatter.success(department, 'Department updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateDepartment = updateDepartment;
const listSemesters = async (_req, res, next) => {
    try {
        const semesters = await academic_service_1.default.listSemesters();
        res.json(apiResponse_1.ApiResponseFormatter.success(semesters, 'Semesters retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.listSemesters = listSemesters;
const createSemester = async (req, res, next) => {
    try {
        const semester = await academic_service_1.default.createSemester(req.body);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(semester, 'Semester created'));
    }
    catch (error) {
        next(error);
    }
};
exports.createSemester = createSemester;
const updateSemester = async (req, res, next) => {
    try {
        const semester = await academic_service_1.default.updateSemester(req.params.id, req.body);
        res.json(apiResponse_1.ApiResponseFormatter.success(semester, 'Semester updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateSemester = updateSemester;
//# sourceMappingURL=academic.controller.js.map