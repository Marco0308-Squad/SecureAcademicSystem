"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMarks = exports.createMarks = exports.listMarks = void 0;
const marks_service_1 = __importDefault(require("../services/marks.service"));
const apiResponse_1 = require("../utils/apiResponse");
const listMarks = async (_req, res, next) => {
    try {
        const marks = await marks_service_1.default.listMarks();
        res.json(apiResponse_1.ApiResponseFormatter.success(marks, 'Marks retrieved'));
    }
    catch (error) {
        next(error);
    }
};
exports.listMarks = listMarks;
const createMarks = async (req, res, next) => {
    try {
        const marks = await marks_service_1.default.createMarks(req.body);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(marks, 'Marks recorded'));
    }
    catch (error) {
        next(error);
    }
};
exports.createMarks = createMarks;
const updateMarks = async (req, res, next) => {
    try {
        const marks = await marks_service_1.default.updateMarks(req.params.id, req.body);
        res.json(apiResponse_1.ApiResponseFormatter.success(marks, 'Marks updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateMarks = updateMarks;
//# sourceMappingURL=marks.controller.js.map