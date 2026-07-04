import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/authService'
import { ROUTES } from '../constants'

export default function MainLayout() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        await authService.logout(refreshToken)
      }
    } catch {
      // Ignore errors during logout
    }
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b-2 border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="text-xl font-black tracking-tight text-white hover:text-cyan-400"
            >
              SAMS
            </button>
            <button
              onClick={() => navigate(ROUTES.ACADEMICS)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
            >
              Academics
            </button>
            <button
              onClick={() => navigate(ROUTES.FACULTY)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
            >
              Faculty
            </button>
            <button
              onClick={() => navigate(ROUTES.COURSES)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
            >
              Courses
            </button>
            <button
              onClick={() => navigate(ROUTES.SUBJECTS)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
            >
              Subjects
            </button>
            <button
              onClick={() => navigate(ROUTES.ATTENDANCE)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
            >
              Attendance
            </button>
            <button
              onClick={() => navigate(ROUTES.MARKS)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
            >
              Marks
            </button>
            <button
              onClick={() => navigate(ROUTES.ASSIGNMENTS)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
            >
              Assignments
            </button>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                {user.firstName} {user.lastName}
              </span>
              <span className="rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-400">
                {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-xl border-2 border-slate-700 bg-slate-800 px-4 py-2 text-sm font-bold text-slate-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] transition hover:border-red-500 hover:text-red-400 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
