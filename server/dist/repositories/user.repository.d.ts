import { UserRole, UserStatus, type User } from '@prisma/client';
export interface CreateUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
    status?: UserStatus;
}
export interface UpdateUserInput {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
}
declare class UserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: CreateUserInput): Promise<User>;
    update(id: string, data: UpdateUserInput): Promise<User>;
    updatePassword(id: string, newPassword: string): Promise<User>;
    updateLastLogin(id: string): Promise<User>;
}
declare const _default: UserRepository;
export default _default;
//# sourceMappingURL=user.repository.d.ts.map