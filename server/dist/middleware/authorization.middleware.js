"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = void 0;
const errors_1 = require("../errors");
const permissions_1 = require("../lib/permissions");
const requirePermission = (permission) => {
    return (req, _res, next) => {
        if (!req.user) {
            throw new errors_1.AuthenticationError('Authentication required');
        }
        const role = req.user.role;
        if (!(0, permissions_1.hasPermission)(role, permission)) {
            throw new errors_1.AuthorizationError('Insufficient permissions');
        }
        next();
    };
};
exports.requirePermission = requirePermission;
//# sourceMappingURL=authorization.middleware.js.map