import { useEffect, useState } from 'react'
import api from '../services/api'

interface CourseRecord {
  id: string
  code: string
  name: string
  totalCredits: number
  department?: { name: string }
  semester?: { name: string }
}

export default function CoursePage() {
  const [courses, setCourses] = useState<CourseRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await api.get('/courses')
        setCourses(response.data.data ?? [])
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  if (loading) {
    return <div className="text-slate-300">Loading courses...</div>
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Course catalog</h1>
        <p className="mt-2 text-sm text-slate-400">Manage academic programs, credit loads, and course assignments from the administration workspace.</p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-white">{course.name}</p>
                  <p className="text-sm text-slate-400">{course.code}</p>
                  <p className="text-sm text-cyan-300">{course.department?.name ?? 'Unassigned'} • {course.semester?.name ?? 'Unscheduled'}</p>
                </div>
                <div className="text-sm text-slate-400">
                  <p>Credits: {course.totalCredits}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
