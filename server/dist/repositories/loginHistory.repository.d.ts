import { LoginStatus, type LoginHistory } from '@prisma/client';
export interface CreateLoginHistoryInput {
    userId: string;
    ipAddress: string;
    userAgent?: string | null;
    status: LoginStatus;
    reason?: string | null;
}
declare class LoginHistoryRepository {
    create(data: CreateLoginHistoryInput): Promise<LoginHistory>;
    findRecentFailedAttempts(userId: string, windowMinutes?: number): Promise<number>;
}
declare const _default: LoginHistoryRepository;
export default _default;
//# sourceMappingURL=loginHistory.repository.d.ts.map