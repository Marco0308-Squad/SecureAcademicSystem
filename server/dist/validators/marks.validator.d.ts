import { z } from 'zod';
export declare const createMarksSchema: z.ZodObject<{
    studentId: z.ZodString;
    subjectId: z.ZodString;
    test1: z.ZodOptional<z.ZodNumber>;
    test2: z.ZodOptional<z.ZodNumber>;
    test3: z.ZodOptional<z.ZodNumber>;
    assignment: z.ZodOptional<z.ZodNumber>;
    outOfMarks: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    studentId: string;
    subjectId: string;
    assignment?: number | undefined;
    test1?: number | undefined;
    test2?: number | undefined;
    test3?: number | undefined;
    outOfMarks?: number | undefined;
}, {
    studentId: string;
    subjectId: string;
    assignment?: number | undefined;
    test1?: number | undefined;
    test2?: number | undefined;
    test3?: number | undefined;
    outOfMarks?: number | undefined;
}>;
export declare const updateMarksSchema: z.ZodObject<{
    studentId: z.ZodOptional<z.ZodString>;
    subjectId: z.ZodOptional<z.ZodString>;
    test1: z.ZodOptional<z.ZodNumber>;
    test2: z.ZodOptional<z.ZodNumber>;
    test3: z.ZodOptional<z.ZodNumber>;
    assignment: z.ZodOptional<z.ZodNumber>;
    outOfMarks: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    assignment?: number | undefined;
    studentId?: string | undefined;
    subjectId?: string | undefined;
    test1?: number | undefined;
    test2?: number | undefined;
    test3?: number | undefined;
    outOfMarks?: number | undefined;
}, {
    assignment?: number | undefined;
    studentId?: string | undefined;
    subjectId?: string | undefined;
    test1?: number | undefined;
    test2?: number | undefined;
    test3?: number | undefined;
    outOfMarks?: number | undefined;
}>;
//# sourceMappingURL=marks.validator.d.ts.map