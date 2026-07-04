import { Response, NextFunction } from 'express';
import { Permission } from '../lib/permissions';
import { AuthRequest } from './auth.middleware';
export declare const requirePermission: (permission: Permission) => (req: AuthRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorization.middleware.d.ts.map