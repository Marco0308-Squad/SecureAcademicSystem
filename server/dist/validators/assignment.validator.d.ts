import { z } from 'zod';
export declare const createAssignmentSchema: z.ZodObject<{
    subjectId: z.ZodString;
    facultyId: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    totalMarks: z.ZodDefault<z.ZodNumber>;
    dueDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    facultyId: string;
    subjectId: string;
    totalMarks: number;
    title: string;
    dueDate: string;
    description?: string | undefined;
}, {
    facultyId: string;
    subjectId: string;
    title: string;
    dueDate: string;
    description?: string | undefined;
    totalMarks?: number | undefined;
}>;
export declare const updateAssignmentSchema: z.ZodObject<{
    subjectId: z.ZodOptional<z.ZodString>;
    facultyId: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    totalMarks: z.ZodOptional<z.ZodNumber>;
    dueDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    facultyId?: string | undefined;
    subjectId?: string | undefined;
    totalMarks?: number | undefined;
    title?: string | undefined;
    dueDate?: string | undefined;
}, {
    description?: string | undefined;
    facultyId?: string | undefined;
    subjectId?: string | undefined;
    totalMarks?: number | undefined;
    title?: string | undefined;
    dueDate?: string | undefined;
}>;
//# sourceMappingURL=assignment.validator.d.ts.map