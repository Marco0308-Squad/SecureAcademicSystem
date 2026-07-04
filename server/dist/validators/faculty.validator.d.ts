import { z } from 'zod';
export declare const createFacultySchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    employeeId: z.ZodString;
    departmentId: z.ZodString;
    specialization: z.ZodOptional<z.ZodString>;
    qualifications: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    officePhone: z.ZodOptional<z.ZodString>;
    officeLocation: z.ZodOptional<z.ZodString>;
    consultationHours: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "ON_LEAVE", "INACTIVE", "RETIRED"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    departmentId: string;
    employeeId: string;
    status?: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "RETIRED" | undefined;
    specialization?: string | undefined;
    qualifications?: string[] | undefined;
    officePhone?: string | undefined;
    officeLocation?: string | undefined;
    consultationHours?: string | undefined;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    departmentId: string;
    employeeId: string;
    status?: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "RETIRED" | undefined;
    specialization?: string | undefined;
    qualifications?: string[] | undefined;
    officePhone?: string | undefined;
    officeLocation?: string | undefined;
    consultationHours?: string | undefined;
}>;
export declare const updateFacultySchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    employeeId: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    specialization: z.ZodOptional<z.ZodString>;
    qualifications: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    officePhone: z.ZodOptional<z.ZodString>;
    officeLocation: z.ZodOptional<z.ZodString>;
    consultationHours: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "ON_LEAVE", "INACTIVE", "RETIRED"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "RETIRED" | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    departmentId?: string | undefined;
    employeeId?: string | undefined;
    specialization?: string | undefined;
    qualifications?: string[] | undefined;
    officePhone?: string | undefined;
    officeLocation?: string | undefined;
    consultationHours?: string | undefined;
}, {
    status?: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "RETIRED" | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    departmentId?: string | undefined;
    employeeId?: string | undefined;
    specialization?: string | undefined;
    qualifications?: string[] | undefined;
    officePhone?: string | undefined;
    officeLocation?: string | undefined;
    consultationHours?: string | undefined;
}>;
//# sourceMappingURL=faculty.validator.d.ts.map