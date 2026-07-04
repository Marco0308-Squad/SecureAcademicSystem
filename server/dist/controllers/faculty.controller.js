"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFaculty = exports.createFaculty = exports.listFaculty = void 0;
const faculty_service_1 = __importDefault(require("../services/faculty.service"));
const apiResponse_1 = require("../utils/apiResponse");
const listFaculty = async (_req, res, next) => {
    try {
        const faculty = await faculty_service_1.default.listFaculty();
        res.json(apiResponse_1.ApiResponseFormatter.success(faculty, 'Faculty retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.listFaculty = listFaculty;
const createFaculty = async (req, res, next) => {
    try {
        const faculty = await faculty_service_1.default.createFaculty(req.body);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(faculty, 'Faculty created'));
    }
    catch (error) {
        next(error);
    }
};
exports.createFaculty = createFaculty;
const updateFaculty = async (req, res, next) => {
    try {
        const faculty = await faculty_service_1.default.updateFaculty(req.params.id, req.body);
        res.json(apiResponse_1.ApiResponseFormatter.success(faculty, 'Faculty updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateFaculty = updateFaculty;
//# sourceMappingURL=faculty.controller.js.map