declare class SubjectService {
    listSubjects(): Promise<({
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
        course: {
            code: string;
            name: string;
            id: string;
        };
    } & {
        code: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        semesterId: string;
        courseId: string;
        credits: number;
        totalLectures: number;
        totalPracticals: number;
        facultyId: string;
    })[]>;
    createSubject(input: any): Promise<{
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
        course: {
            code: string;
            name: string;
            id: string;
        };
    } & {
        code: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        semesterId: string;
        courseId: string;
        credits: number;
        totalLectures: number;
        totalPracticals: number;
        facultyId: string;
    }>;
    updateSubject(id: string, input: any): Promise<{
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
        course: {
            code: string;
            name: string;
            id: string;
        };
    } & {
        code: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        semesterId: string;
        courseId: string;
        credits: number;
        totalLectures: number;
        totalPracticals: number;
        facultyId: string;
    }>;
}
declare const _default: SubjectService;
export default _default;
//# sourceMappingURL=subject.service.d.ts.map