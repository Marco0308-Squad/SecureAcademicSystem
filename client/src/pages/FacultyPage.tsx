import { useEffect, useState } from 'react'
import api from '../services/api'

interface FacultyRecord {
  id: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
  employeeId: string
  specialization?: string
  department?: {
    name: string
  }
  status: string
}

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<FacultyRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const response = await api.get('/faculty')
        setFaculty(response.data.data ?? [])
      } finally {
        setLoading(false)
      }
    }

    loadFaculty()
  }, [])

  if (loading) {
    return <div className="text-slate-300">Loading faculty records...</div>
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Faculty directory</h1>
        <p className="mt-2 text-sm text-slate-400">Staff records, departments, and teaching specializations are available from the secure administration panel.</p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="space-y-3">
          {faculty.map((member) => (
            <div key={member.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-white">{member.user.firstName} {member.user.lastName}</p>
                  <p className="text-sm text-slate-400">{member.user.email}</p>
                  <p className="text-sm text-cyan-300">{member.department?.name ?? 'Unassigned'} • {member.specialization ?? 'General'}</p>
                </div>
                <div className="text-sm text-slate-400">
                  <p>Employee ID: {member.employeeId}</p>
                  <p>Status: {member.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
