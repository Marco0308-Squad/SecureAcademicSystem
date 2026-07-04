"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourse = exports.createCourse = exports.listCourses = void 0;
const course_service_1 = __importDefault(require("../services/course.service"));
const apiResponse_1 = require("../utils/apiResponse");
const listCourses = async (_req, res, next) => {
    try {
        const courses = await course_service_1.default.listCourses();
        res.json(apiResponse_1.ApiResponseFormatter.success(courses, 'Courses retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.listCourses = listCourses;
const createCourse = async (req, res, next) => {
    try {
        const course = await course_service_1.default.createCourse(req.body);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(course, 'Course created'));
    }
    catch (error) {
        next(error);
    }
};
exports.createCourse = createCourse;
const updateCourse = async (req, res, next) => {
    try {
        const course = await course_service_1.default.updateCourse(req.params.id, req.body);
        res.json(apiResponse_1.ApiResponseFormatter.success(course, 'Course updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateCourse = updateCourse;
//# sourceMappingURL=course.controller.js.map