declare class AcademicService {
    listDepartments(): Promise<({
        _count: {
            faculties: number;
            students: number;
            subjects: number;
        };
    } & {
        code: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    createDepartment(input: {
        name: string;
        code: string;
    }): Promise<{
        code: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateDepartment(id: string, input: {
        name?: string;
        code?: string;
    }): Promise<{
        code: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    listSemesters(): Promise<{
        number: number;
        status: import(".prisma/client").$Enums.SemesterStatus;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
    }[]>;
    createSemester(input: {
        number: number;
        name: string;
        startDate: string;
        endDate: string;
        status?: string;
    }): Promise<{
        number: number;
        status: import(".prisma/client").$Enums.SemesterStatus;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
    }>;
    updateSemester(id: string, input: Partial<{
        number: number;
        name: string;
        startDate: string;
        endDate: string;
        status: string;
    }>): Promise<{
        number: number;
        status: import(".prisma/client").$Enums.SemesterStatus;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
    }>;
}
declare const _default: AcademicService;
export default _default;
//# sourceMappingURL=academic.service.d.ts.map