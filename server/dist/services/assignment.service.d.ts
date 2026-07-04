declare class AssignmentService {
    listAssignments(): Promise<({
        faculty: {
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
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
        description: string | null;
        facultyId: string;
        subjectId: string;
        totalMarks: number;
        title: string;
        dueDate: Date;
        createdDate: Date;
    })[]>;
    createAssignment(input: any): Promise<{
        faculty: {
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
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
        description: string | null;
        facultyId: string;
        subjectId: string;
        totalMarks: number;
        title: string;
        dueDate: Date;
        createdDate: Date;
    }>;
    updateAssignment(id: string, input: any): Promise<{
        faculty: {
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
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
        description: string | null;
        facultyId: string;
        subjectId: string;
        totalMarks: number;
        title: string;
        dueDate: Date;
        createdDate: Date;
    }>;
}
declare const _default: AssignmentService;
export default _default;
//# sourceMappingURL=assignment.service.d.ts.map