declare class FacultyService {
    listFaculty(): Promise<({
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
    } & {
        status: import(".prisma/client").$Enums.FacultyStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        departmentId: string;
        employeeId: string;
        specialization: string | null;
        qualifications: string[];
        officePhone: string | null;
        officeLocation: string | null;
        consultationHours: string | null;
    })[]>;
    createFaculty(input: any): Promise<{
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
    } & {
        status: import(".prisma/client").$Enums.FacultyStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        departmentId: string;
        employeeId: string;
        specialization: string | null;
        qualifications: string[];
        officePhone: string | null;
        officeLocation: string | null;
        consultationHours: string | null;
    }>;
    updateFaculty(id: string, input: any): Promise<{
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
    } & {
        status: import(".prisma/client").$Enums.FacultyStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        departmentId: string;
        employeeId: string;
        specialization: string | null;
        qualifications: string[];
        officePhone: string | null;
        officeLocation: string | null;
        consultationHours: string | null;
    }>;
}
declare const _default: FacultyService;
export default _default;
//# sourceMappingURL=faculty.service.d.ts.map