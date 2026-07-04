import { useEffect, useState } from 'react'
import api from '../services/api'

interface Department { id: string; name: string; code: string; _count?: { students: number; faculties: number; subjects: number } }
interface Semester { id: string; number: number; name: string; status: string }

export default function AcademicPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [deptRes, semRes] = await Promise.all([
          api.get('/academics/departments'),
          api.get('/academics/semesters'),
        ])
        setDepartments(deptRes.data.data ?? [])
        setSemesters(semRes.data.data ?? [])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="text-slate-300">Loading academic records...</div>
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Academic structure</h1>
        <p className="mt-2 text-sm text-slate-400">Departments and semesters managed from the secure admin workspace.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Departments</h2>
          <div className="mt-4 space-y-3">
            {departments.map((department) => (
              <div key={department.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{department.name}</p>
                    <p className="text-sm text-slate-400">{department.code}</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                    {department._count?.students ?? 0} students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Semesters</h2>
          <div className="mt-4 space-y-3">
            {semesters.map((semester) => (
              <div key={semester.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{semester.name}</p>
                    <p className="text-sm text-slate-400">Semester {semester.number}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                    {semester.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
