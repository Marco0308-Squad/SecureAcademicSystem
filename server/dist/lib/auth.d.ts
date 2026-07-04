export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}
export declare function generateAccessToken(payload: JwtPayload): string;
export declare function generateRefreshToken(): string;
export declare function verifyAccessToken(token: string): JwtPayload;
export declare function hashPassword(password: string): Promise<string>;
export declare function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
export declare function generatePasswordResetToken(): string;
export declare function generateEmailVerificationToken(): string;
export declare function hashToken(token: string): string;
//# sourceMappingURL=auth.d.ts.map