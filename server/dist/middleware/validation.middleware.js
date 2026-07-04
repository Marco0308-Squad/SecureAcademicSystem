"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const errors_1 = require("../errors");
function validateRequest(schema) {
    return (req, _res, next) => {
        try {
            const result = schema.safeParse(req.body);
            if (!result.success) {
                const errors = {};
                for (const issue of result.error.issues) {
                    const field = issue.path.join('.');
                    if (!errors[field])
                        errors[field] = [];
                    errors[field].push(issue.message);
                }
                throw new errors_1.ValidationError('Invalid request data', errors);
            }
            // Replace req.body with validated data
            req.body = result.data;
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=validation.middleware.js.map