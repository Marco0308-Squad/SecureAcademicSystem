import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from './store/authStore'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import DashboardPage from './pages/DashboardPage'
import AcademicPage from './pages/AcademicPage'
import FacultyPage from './pages/FacultyPage'
import CoursePage from './pages/CoursePage'
import SubjectPage from './pages/SubjectPage'
import AttendancePage from './pages/AttendancePage'
import MarksPage from './pages/MarksPage'
import AssignmentsPage from './pages/AssignmentsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { ROUTES } from './constants'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
})

function AppContent() {
  const { hydrate, isAuthenticated } = useAuthStore()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path={ROUTES.LOGIN}
        element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LoginPage />}
      />
      <Route
        path={ROUTES.REGISTER}
        element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <RegisterPage />}
      />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.ACADEMICS} element={<AcademicPage />} />
        <Route path={ROUTES.FACULTY} element={<FacultyPage />} />
        <Route path={ROUTES.COURSES} element={<CoursePage />} />
        <Route path={ROUTES.SUBJECTS} element={<SubjectPage />} />
        <Route path={ROUTES.ATTENDANCE} element={<AttendancePage />} />
        <Route path={ROUTES.MARKS} element={<MarksPage />} />
        <Route path={ROUTES.ASSIGNMENTS} element={<AssignmentsPage />} />
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  )
}

export default App
