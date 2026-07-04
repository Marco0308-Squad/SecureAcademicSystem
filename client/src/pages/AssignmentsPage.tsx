import { useEffect, useState } from 'react'
import api from '../services/api'

interface AssignmentRecord {
  id: string
  title: string
  description?: string
  totalMarks?: number
  dueDate: string
  subject: {
    name: string
  }
  faculty: {
    user: {
      firstName: string
      lastName: string
    }
  }
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const response = await api.get('/assignments')
        setAssignments(response.data.data ?? [])
      } finally {
        setLoading(false)
      }
    }

    loadAssignments()
  }, [])

  if (loading) {
    return <div className="text-slate-300">Loading assignments...</div>
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Assignment tracker</h1>
        <p className="mt-2 text-sm text-slate-400">Keep deadlines, subjects, and faculty owners visible in a single place.</p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-white">{assignment.title}</p>
                  <p className="text-sm text-slate-400">{assignment.subject.name}</p>
                  <p className="text-sm text-cyan-300">{assignment.description ?? 'No description'}</p>
                </div>
                <div className="text-sm text-slate-400">
                  <p>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                  <p>Marks: {assignment.totalMarks ?? 0}</p>
                  <p>Faculty: {assignment.faculty.user.firstName} {assignment.faculty.user.lastName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
