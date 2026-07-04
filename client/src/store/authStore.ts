import { create } from 'zustand'
import type { AuthUser } from '../types'
import { STORAGE_KEYS } from '../constants'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AuthUser) => void
  setLoading: (loading: boolean) => void
  login: (user: AuthUser, accessToken: string, refreshToken: string) => void
  logout: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: true }),

  setLoading: (isLoading) => set({ isLoading }),

  login: (user, accessToken, refreshToken) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    set({ user, isAuthenticated: true, isLoading: false })
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    set({ user: null, isAuthenticated: false, isLoading: false })
  },

  hydrate: () => {
    try {
      const userStr = localStorage.getItem(STORAGE_KEYS.USER)
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
      if (userStr && token) {
        const user = JSON.parse(userStr) as AuthUser
        set({ user, isAuthenticated: true, isLoading: false })
      } else {
        set({ isLoading: false })
      }
    } catch {
      localStorage.removeItem(STORAGE_KEYS.USER)
      set({ isLoading: false })
    }
  },
}))
