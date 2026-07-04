declare class AttendanceService {
    listAttendance(): Promise<({
        student: {
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
        } & {
            status: import(".prisma/client").$Enums.StudentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            registrationNumber: string;
            rollNumber: string;
            departmentId: string;
            semesterId: string;
            admissionDate: Date;
        };
        subject: {
            code: string;
            name: string;
            id: string;
        };
    } & {
        status: import(".prisma/client").$Enums.AttendanceStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        studentId: string;
        subjectId: string;
        date: Date;
        remarks: string | null;
    })[]>;
    createAttendance(input: any): Promise<{
        student: {
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
        } & {
            status: import(".prisma/client").$Enums.StudentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            registrationNumber: string;
            rollNumber: string;
            departmentId: string;
            semesterId: string;
            admissionDate: Date;
        };
        subject: {
            code: string;
            name: string;
            id: string;
        };
    } & {
        status: import(".prisma/client").$Enums.AttendanceStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        studentId: string;
        subjectId: string;
        date: Date;
        remarks: string | null;
    }>;
    updateAttendance(id: string, input: any): Promise<{
        student: {
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
        } & {
            status: import(".prisma/client").$Enums.StudentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            registrationNumber: string;
            rollNumber: string;
            departmentId: string;
            semesterId: string;
            admissionDate: Date;
        };
        subject: {
            code: string;
            name: string;
            id: string;
        };
    } & {
        status: import(".prisma/client").$Enums.AttendanceStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        studentId: string;
        subjectId: string;
        date: Date;
        remarks: string | null;
    }>;
}
declare const _default: AttendanceService;
export default _default;
//# sourceMappingURL=attendance.service.d.ts.map