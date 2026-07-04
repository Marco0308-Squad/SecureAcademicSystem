"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttendance = exports.createAttendance = exports.listAttendance = void 0;
const attendance_service_1 = __importDefault(require("../services/attendance.service"));
const apiResponse_1 = require("../utils/apiResponse");
const listAttendance = async (_req, res, next) => {
    try {
        const attendance = await attendance_service_1.default.listAttendance();
        res.json(apiResponse_1.ApiResponseFormatter.success(attendance, 'Attendance retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.listAttendance = listAttendance;
const createAttendance = async (req, res, next) => {
    try {
        const attendance = await attendance_service_1.default.createAttendance(req.body);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(attendance, 'Attendance recorded'));
    }
    catch (error) {
        next(error);
    }
};
exports.createAttendance = createAttendance;
const updateAttendance = async (req, res, next) => {
    try {
        const attendance = await attendance_service_1.default.updateAttendance(req.params.id, req.body);
        res.json(apiResponse_1.ApiResponseFormatter.success(attendance, 'Attendance updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateAttendance = updateAttendance;
//# sourceMappingURL=attendance.controller.js.map