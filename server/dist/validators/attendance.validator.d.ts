import { z } from 'zod';
export declare const createAttendanceSchema: z.ZodObject<{
    studentId: z.ZodString;
    subjectId: z.ZodString;
    date: z.ZodString;
    status: z.ZodEnum<["PRESENT", "ABSENT", "LATE", "EXCUSED"]>;
    remarks: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
    studentId: string;
    subjectId: string;
    date: string;
    remarks?: string | undefined;
}, {
    status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
    studentId: string;
    subjectId: string;
    date: string;
    remarks?: string | undefined;
}>;
export declare const updateAttendanceSchema: z.ZodObject<{
    studentId: z.ZodOptional<z.ZodString>;
    subjectId: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["PRESENT", "ABSENT", "LATE", "EXCUSED"]>>;
    remarks: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED" | undefined;
    studentId?: string | undefined;
    subjectId?: string | undefined;
    date?: string | undefined;
    remarks?: string | undefined;
}, {
    status?: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED" | undefined;
    studentId?: string | undefined;
    subjectId?: string | undefined;
    date?: string | undefined;
    remarks?: string | undefined;
}>;
//# sourceMappingURL=attendance.validator.d.ts.map