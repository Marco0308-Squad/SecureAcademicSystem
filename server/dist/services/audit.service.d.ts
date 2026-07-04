export type AuditStatusEnum = 'SUCCESS' | 'FAILURE' | 'UNAUTHORIZED';
export interface AuditLogInput {
    userId: string;
    action: string;
    module: string;
    entity: string;
    entityId?: string;
    changes?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
    status?: AuditStatusEnum;
}
declare class AuditService {
    log(input: AuditLogInput): Promise<void>;
    findByUser(userId: string, page?: number, limit?: number): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
        } & {
            status: import(".prisma/client").$Enums.AuditStatus;
            id: string;
            createdAt: Date;
            userId: string;
            ipAddress: string | null;
            userAgent: string | null;
            action: string;
            module: string;
            entity: string;
            entityId: string | null;
            changes: import("@prisma/client/runtime/library").JsonValue | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByModule(module: string, page?: number, limit?: number): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
        } & {
            status: import(".prisma/client").$Enums.AuditStatus;
            id: string;
            createdAt: Date;
            userId: string;
            ipAddress: string | null;
            userAgent: string | null;
            action: string;
            module: string;
            entity: string;
            entityId: string | null;
            changes: import("@prisma/client/runtime/library").JsonValue | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
        } & {
            status: import(".prisma/client").$Enums.AuditStatus;
            id: string;
            createdAt: Date;
            userId: string;
            ipAddress: string | null;
            userAgent: string | null;
            action: string;
            module: string;
            entity: string;
            entityId: string | null;
            changes: import("@prisma/client/runtime/library").JsonValue | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
declare const _default: AuditService;
export default _default;
//# sourceMappingURL=audit.service.d.ts.map