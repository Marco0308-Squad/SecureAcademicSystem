import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
export declare function validateRequest(schema: z.ZodSchema): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.middleware.d.ts.map