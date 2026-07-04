export interface CreateRefreshTokenInput {
    userId: string;
    token: string;
    expiresAt: Date;
}
declare class RefreshTokenRepository {
    create(data: CreateRefreshTokenInput): Promise<any>;
    findByToken(token: string): Promise<any>;
    revokeToken(token: string): Promise<any>;
    revokeAllUserTokens(userId: string): Promise<any>;
    deleteExpiredTokens(): Promise<any>;
}
declare const _default: RefreshTokenRepository;
export default _default;
//# sourceMappingURL=refreshToken.repository.d.ts.map