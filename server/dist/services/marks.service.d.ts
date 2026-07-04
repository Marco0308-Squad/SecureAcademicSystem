declare class MarksService {
    listMarks(): Promise<({
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        assignment: number | null;
        studentId: string;
        subjectId: string;
        test1: number | null;
        test2: number | null;
        test3: number | null;
        totalMarks: number | null;
        outOfMarks: number;
        percentage: import("@prisma/client/runtime/library").Decimal | null;
    })[]>;
    createMarks(input: any): Promise<{
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        assignment: number | null;
        studentId: string;
        subjectId: string;
        test1: number | null;
        test2: number | null;
        test3: number | null;
        totalMarks: number | null;
        outOfMarks: number;
        percentage: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    updateMarks(id: string, input: any): Promise<{
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        assignment: number | null;
        studentId: string;
        subjectId: string;
        test1: number | null;
        test2: number | null;
        test3: number | null;
        totalMarks: number | null;
        outOfMarks: number;
        percentage: import("@prisma/client/runtime/library").Decimal | null;
    }>;
}
declare const _default: MarksService;
export default _default;
//# sourceMappingURL=marks.service.d.ts.map