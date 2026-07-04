import { z } from 'zod';
export declare const createDepartmentSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
}, {
    code: string;
    name: string;
}>;
export declare const updateDepartmentSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code?: string | undefined;
    name?: string | undefined;
}, {
    code?: string | undefined;
    name?: string | undefined;
}>;
export declare const createSemesterSchema: z.ZodObject<{
    number: z.ZodNumber;
    name: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["PLANNING", "ACTIVE", "COMPLETED", "ARCHIVED"]>>;
}, "strip", z.ZodTypeAny, {
    number: number;
    name: string;
    startDate: string;
    endDate: string;
    status?: "ACTIVE" | "ARCHIVED" | "COMPLETED" | "PLANNING" | undefined;
}, {
    number: number;
    name: string;
    startDate: string;
    endDate: string;
    status?: "ACTIVE" | "ARCHIVED" | "COMPLETED" | "PLANNING" | undefined;
}>;
export declare const updateSemesterSchema: z.ZodObject<{
    number: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["PLANNING", "ACTIVE", "COMPLETED", "ARCHIVED"]>>;
}, "strip", z.ZodTypeAny, {
    number?: number | undefined;
    status?: "ACTIVE" | "ARCHIVED" | "COMPLETED" | "PLANNING" | undefined;
    name?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    number?: number | undefined;
    status?: "ACTIVE" | "ARCHIVED" | "COMPLETED" | "PLANNING" | undefined;
    name?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
//# sourceMappingURL=academic.validator.d.ts.map