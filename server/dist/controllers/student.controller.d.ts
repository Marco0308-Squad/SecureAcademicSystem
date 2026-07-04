import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const listStudents: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getStudent: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const createStudent: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateStudent: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteStudent: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=student.controller.d.ts.map