export declare const USER_ROLES: {
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly ADMIN: "ADMIN";
    readonly PRINCIPAL: "PRINCIPAL";
    readonly HOD: "HOD";
    readonly FACULTY: "FACULTY";
    readonly STUDENT: "STUDENT";
};
export declare const USER_STATUS: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly ARCHIVED: "ARCHIVED";
};
export declare const STUDENT_STATUS: {
    readonly ACTIVE: "ACTIVE";
    readonly ON_LEAVE: "ON_LEAVE";
    readonly GRADUATED: "GRADUATED";
    readonly DROPPED: "DROPPED";
    readonly SUSPENDED: "SUSPENDED";
};
export declare const FACULTY_STATUS: {
    readonly ACTIVE: "ACTIVE";
    readonly ON_LEAVE: "ON_LEAVE";
    readonly INACTIVE: "INACTIVE";
    readonly RETIRED: "RETIRED";
};
export declare const ATTENDANCE_STATUS: {
    readonly PRESENT: "PRESENT";
    readonly ABSENT: "ABSENT";
    readonly LATE: "LATE";
    readonly EXCUSED: "EXCUSED";
};
export declare const FEE_STATUS: {
    readonly PENDING: "PENDING";
    readonly PARTIALLY_PAID: "PARTIALLY_PAID";
    readonly PAID: "PAID";
    readonly OVERDUE: "OVERDUE";
    readonly WAIVED: "WAIVED";
};
export declare const ENROLLMENT_STATUS: {
    readonly ACTIVE: "ACTIVE";
    readonly WITHDRAWN: "WITHDRAWN";
    readonly DROPPED: "DROPPED";
    readonly COMPLETED: "COMPLETED";
};
export declare const SEMESTER_STATUS: {
    readonly PLANNING: "PLANNING";
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly ARCHIVED: "ARCHIVED";
};
export declare const EXAM_TYPES: {
    readonly INTERNAL: "INTERNAL";
    readonly EXTERNAL: "EXTERNAL";
    readonly MIDTERM: "MIDTERM";
    readonly FINAL: "FINAL";
    readonly PRACTICAL: "PRACTICAL";
};
export declare const AUDIT_ACTIONS: {
    readonly LOGIN: "LOGIN";
    readonly LOGOUT: "LOGOUT";
    readonly PASSWORD_CHANGE: "PASSWORD_CHANGE";
    readonly ROLE_CHANGE: "ROLE_CHANGE";
    readonly ATTENDANCE_UPDATE: "ATTENDANCE_UPDATE";
    readonly MARKS_UPDATE: "MARKS_UPDATE";
    readonly RECORD_CREATE: "RECORD_CREATE";
    readonly RECORD_UPDATE: "RECORD_UPDATE";
    readonly RECORD_DELETE: "RECORD_DELETE";
    readonly ADMIN_ACTION: "ADMIN_ACTION";
};
export declare const JWT_CONFIG: {
    readonly ALGORITHM: "HS256";
    readonly EXPIRY: string;
    readonly REFRESH_EXPIRY: string;
};
export declare const PAGINATION: {
    readonly DEFAULT_PAGE: 1;
    readonly DEFAULT_LIMIT: 20;
    readonly MAX_LIMIT: 100;
};
export declare const RATE_LIMITS: {
    readonly LOGIN: {
        readonly windowMs: number;
        readonly max: 5;
    };
    readonly API: {
        readonly windowMs: number;
        readonly max: 100;
    };
    readonly PASSWORD_RESET: {
        readonly windowMs: number;
        readonly max: 3;
    };
};
export declare const PASSWORD_POLICY: {
    readonly MIN_LENGTH: 8;
    readonly REQUIRE_UPPERCASE: true;
    readonly REQUIRE_LOWERCASE: true;
    readonly REQUIRE_NUMBER: true;
    readonly REQUIRE_SPECIAL: true;
    readonly SPECIAL_CHARS: "!@#$%^&*";
};
export declare const FILE_UPLOAD: {
    readonly MAX_SIZE: number;
    readonly ALLOWED_TYPES: readonly ["application/pdf", "application/msword", "text/plain"];
    readonly UPLOAD_DIR: "./uploads";
};
export declare const VALIDATION_MESSAGES: {
    readonly EMAIL_REQUIRED: "Email is required";
    readonly EMAIL_INVALID: "Invalid email address";
    readonly EMAIL_EXISTS: "Email already exists";
    readonly PASSWORD_REQUIRED: "Password is required";
    readonly PASSWORD_TOO_SHORT: "Password must be at least 8 characters";
    readonly PASSWORD_WEAK: "Password must contain uppercase, lowercase, number, and special character";
    readonly FIRST_NAME_REQUIRED: "First name is required";
    readonly LAST_NAME_REQUIRED: "Last name is required";
};
export declare const ERROR_MESSAGES: {
    readonly UNAUTHORIZED: "Unauthorized - Invalid or expired token";
    readonly FORBIDDEN: "Forbidden - You do not have permission";
    readonly NOT_FOUND: "Resource not found";
    readonly INTERNAL_ERROR: "Internal server error";
    readonly INVALID_CREDENTIALS: "Invalid email or password";
    readonly ACCOUNT_LOCKED: "Account is locked due to too many failed login attempts";
    readonly ACCOUNT_INACTIVE: "Account is inactive";
    readonly ACCOUNT_SUSPENDED: "Account is suspended";
};
export declare const HTTP_HEADERS: {
    readonly AUTHORIZATION: "Authorization";
    readonly CONTENT_TYPE: "Content-Type";
    readonly X_FORWARDED_FOR: "X-Forwarded-For";
    readonly X_REAL_IP: "X-Real-IP";
    readonly USER_AGENT: "User-Agent";
};
//# sourceMappingURL=index.d.ts.map