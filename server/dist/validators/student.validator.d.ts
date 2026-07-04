import { z } from 'zod';
export declare const createStudentSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    rollNumber: z.ZodString;
    registrationNumber: z.ZodString;
    departmentId: z.ZodString;
    semesterId: z.ZodString;
    admissionDate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "ON_LEAVE", "GRADUATED", "DROPPED", "SUSPENDED"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    registrationNumber: string;
    rollNumber: string;
    departmentId: string;
    semesterId: string;
    status?: "ACTIVE" | "SUSPENDED" | "DROPPED" | "ON_LEAVE" | "GRADUATED" | undefined;
    admissionDate?: string | undefined;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    registrationNumber: string;
    rollNumber: string;
    departmentId: string;
    semesterId: string;
    status?: "ACTIVE" | "SUSPENDED" | "DROPPED" | "ON_LEAVE" | "GRADUATED" | undefined;
    admissionDate?: string | undefined;
}>;
export declare const updateStudentSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    rollNumber: z.ZodOptional<z.ZodString>;
    registrationNumber: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    semesterId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "ON_LEAVE", "GRADUATED", "DROPPED", "SUSPENDED"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "ACTIVE" | "SUSPENDED" | "DROPPED" | "ON_LEAVE" | "GRADUATED" | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    registrationNumber?: string | undefined;
    rollNumber?: string | undefined;
    departmentId?: string | undefined;
    semesterId?: string | undefined;
}, {
    status?: "ACTIVE" | "SUSPENDED" | "DROPPED" | "ON_LEAVE" | "GRADUATED" | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    registrationNumber?: string | undefined;
    rollNumber?: string | undefined;
    departmentId?: string | undefined;
    semesterId?: string | undefined;
}>;
export declare const studentQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    status?: string | undefined;
    search?: string | undefined;
}, {
    status?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}>;
//# sourceMappingURL=student.validator.d.ts.map