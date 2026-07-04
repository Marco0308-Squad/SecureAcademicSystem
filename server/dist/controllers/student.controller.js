"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudent = exports.listStudents = void 0;
const student_service_1 = __importDefault(require("../services/student.service"));
const apiResponse_1 = require("../utils/apiResponse");
const listStudents = async (req, res, next) => {
    try {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 20);
        const search = typeof req.query.search === 'string' ? req.query.search : undefined;
        const status = typeof req.query.status === 'string' ? req.query.status : undefined;
        const result = await student_service_1.default.listStudents({ page, limit, search, status });
        res.json(apiResponse_1.ApiResponseFormatter.paginated(result.data, result.total, result.page, result.limit, 'Students retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.listStudents = listStudents;
const getStudent = async (req, res, next) => {
    try {
        const student = await student_service_1.default.getStudent(req.params.id);
        res.json(apiResponse_1.ApiResponseFormatter.success(student, 'Student retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.getStudent = getStudent;
const createStudent = async (req, res, next) => {
    try {
        const student = await student_service_1.default.createStudent(req.body);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(student, 'Student created'));
    }
    catch (error) {
        next(error);
    }
};
exports.createStudent = createStudent;
const updateStudent = async (req, res, next) => {
    try {
        const student = await student_service_1.default.updateStudent(req.params.id, req.body);
        res.json(apiResponse_1.ApiResponseFormatter.success(student, 'Student updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res, next) => {
    try {
        await student_service_1.default.deleteStudent(req.params.id);
        res.json(apiResponse_1.ApiResponseFormatter.success(null, 'Student deleted'));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=student.controller.js.map