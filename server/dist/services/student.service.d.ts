interface StudentListQuery {
    page: number;
    limit: number;
    search?: string;
    status?: string;
}
declare class StudentService {
    listStudents(query: StudentListQuery): Promise<{
        data: ({
            user: {
                status: import(".prisma/client").$Enums.UserStatus;
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
            department: {
                code: string;
                name: string;
                id: string;
            };
            semester: {
                number: number;
                name: string;
                id: string;
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getStudent(id: string): Promise<{
        user: {
            status: import(".prisma/client").$Enums.UserStatus;
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        department: {
            code: string;
            name: string;
            id: string;
        };
        semester: {
            number: number;
            name: string;
            id: string;
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
    }>;
    createStudent(input: any): Promise<{
        user: {
            status: import(".prisma/client").$Enums.UserStatus;
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        department: {
            code: string;
            name: string;
            id: string;
        };
        semester: {
            number: number;
            name: string;
            id: string;
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
    }>;
    updateStudent(id: string, input: any): Promise<{
        user: {
            status: import(".prisma/client").$Enums.UserStatus;
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        department: {
            code: string;
            name: string;
            id: string;
        };
        semester: {
            number: number;
            name: string;
            id: string;
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
    }>;
    deleteStudent(id: string): Promise<void>;
}
declare const _default: StudentService;
export default _default;
//# sourceMappingURL=student.service.d.ts.map