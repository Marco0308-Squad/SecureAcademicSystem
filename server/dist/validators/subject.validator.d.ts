import { z } from 'zod';
export declare const createSubjectSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    courseId: z.ZodString;
    departmentId: z.ZodString;
    semesterId: z.ZodString;
    credits: z.ZodNumber;
    totalLectures: z.ZodNumber;
    totalPracticals: z.ZodNumber;
    facultyId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    departmentId: string;
    semesterId: string;
    courseId: string;
    credits: number;
    totalLectures: number;
    totalPracticals: number;
    facultyId: string;
}, {
    code: string;
    name: string;
    departmentId: string;
    semesterId: string;
    courseId: string;
    credits: number;
    totalLectures: number;
    totalPracticals: number;
    facultyId: string;
}>;
export declare const updateSubjectSchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    courseId: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    semesterId: z.ZodOptional<z.ZodString>;
    credits: z.ZodOptional<z.ZodNumber>;
    totalLectures: z.ZodOptional<z.ZodNumber>;
    totalPracticals: z.ZodOptional<z.ZodNumber>;
    facultyId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code?: string | undefined;
    name?: string | undefined;
    departmentId?: string | undefined;
    semesterId?: string | undefined;
    courseId?: string | undefined;
    credits?: number | undefined;
    totalLectures?: number | undefined;
    totalPracticals?: number | undefined;
    facultyId?: string | undefined;
}, {
    code?: string | undefined;
    name?: string | undefined;
    departmentId?: string | undefined;
    semesterId?: string | undefined;
    courseId?: string | undefined;
    credits?: number | undefined;
    totalLectures?: number | undefined;
    totalPracticals?: number | undefined;
    facultyId?: string | undefined;
}>;
//# sourceMappingURL=subject.validator.d.ts.map