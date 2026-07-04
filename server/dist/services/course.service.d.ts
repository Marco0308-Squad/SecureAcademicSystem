declare class CourseService {
    listCourses(): Promise<({
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
        code: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        semesterId: string;
        totalCredits: number;
        description: string | null;
        syllabus: string | null;
    })[]>;
    createCourse(input: any): Promise<{
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
        code: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        semesterId: string;
        totalCredits: number;
        description: string | null;
        syllabus: string | null;
    }>;
    updateCourse(id: string, input: any): Promise<{
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
        code: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        semesterId: string;
        totalCredits: number;
        description: string | null;
        syllabus: string | null;
    }>;
}
declare const _default: CourseService;
export default _default;
//# sourceMappingURL=course.service.d.ts.map