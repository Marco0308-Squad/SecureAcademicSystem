import { useEffect, useState } from 'react'
import api from '../services/api'

interface SubjectRecord {
  id: string
  code: string
  name: string
  credits: number
  course?: { name: string }
  faculty?: { user?: { firstName: string; lastName: string } }
}

export default function SubjectPage() {
  const [subjects, setSubjects] = useState<SubjectRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const response = await api.get('/subjects')
        setSubjects(response.data.data ?? [])
      } finally {
        setLoading(false)
      }
    }

    loadSubjects()
  }, [])

  if (loading) {
    return <div className="text-slate-300">Loading subjects...</div>
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Subject catalog</h1>
        <p className="mt-2 text-sm text-slate-400">Teaching plans, faculty assignments, and credit details are available in the administration workspace.</p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="space-y-3">
          {subjects.map((subject) => (
            <div key={subject.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-white">{subject.name}</p>
                  <p className="text-sm text-slate-400">{subject.code}</p>
                  <p className="text-sm text-cyan-300">{subject.course?.name ?? 'Unassigned'} • {subject.faculty?.user ? `${subject.faculty.user.firstName} ${subject.faculty.user.lastName}` : 'No faculty'}</p>
                </div>
                <div className="text-sm text-slate-400">
                  <p>Credits: {subject.credits}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
