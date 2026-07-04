import api from './api'
import type { ApiResponse, AuthUser, AuthTokens } from '../types'

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResult {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

class AuthService {
  async login(input: LoginInput): Promise<AuthResult> {
    const response = await api.post<ApiResponse<AuthResult>>('/auth/login', input)
    return response.data.data!
  }

  async register(input: RegisterInput): Promise<AuthResult> {
    const response = await api.post<ApiResponse<AuthResult>>('/auth/register', input)
    return response.data.data!
  }

  async logout(refreshToken: string): Promise<void> {
    await api.post('/auth/logout', { refreshToken })
  }

  async refreshToken(token: string): Promise<AuthTokens> {
    const response = await api.post<ApiResponse<AuthTokens>>('/auth/refresh', {
      refreshToken: token,
    })
    return response.data.data!
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', { currentPassword, newPassword })
  }

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email })
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword })
  }

  async getMe(): Promise<AuthUser> {
    const response = await api.get<ApiResponse<AuthUser>>('/auth/me')
    return response.data.data!
  }
}

export const authService = new AuthService()
