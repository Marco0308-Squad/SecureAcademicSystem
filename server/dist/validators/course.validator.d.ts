import { z } from 'zod';
export declare const createCourseSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    departmentId: z.ZodString;
    semesterId: z.ZodString;
    totalCredits: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    syllabus: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    departmentId: string;
    semesterId: string;
    totalCredits: number;
    description?: string | undefined;
    syllabus?: string | undefined;
}, {
    code: string;
    name: string;
    departmentId: string;
    semesterId: string;
    totalCredits: number;
    description?: string | undefined;
    syllabus?: string | undefined;
}>;
export declare const updateCourseSchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    semesterId: z.ZodOptional<z.ZodString>;
    totalCredits: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    syllabus: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code?: string | undefined;
    name?: string | undefined;
    departmentId?: string | undefined;
    semesterId?: string | undefined;
    totalCredits?: number | undefined;
    description?: string | undefined;
    syllabus?: string | undefined;
}, {
    code?: string | undefined;
    name?: string | undefined;
    departmentId?: string | undefined;
    semesterId?: string | undefined;
    totalCredits?: number | undefined;
    description?: string | undefined;
    syllabus?: string | undefined;
}>;
//# sourceMappingURL=course.validator.d.ts.map