import { useEffect, useState } from 'react'
import api from '../services/api'

interface MarkRecord {
  id: string
  test1?: number
  test2?: number
  test3?: number
  assignment?: number
  totalMarks?: number
  outOfMarks?: number
  percentage?: number
  student: {
    user: {
      firstName: string
      lastName: string
    }
  }
  subject: {
    name: string
  }
}

export default function MarksPage() {
  const [marks, setMarks] = useState<MarkRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMarks = async () => {
      try {
        const response = await api.get('/marks')
        setMarks(response.data.data ?? [])
      } finally {
        setLoading(false)
      }
    }

    loadMarks()
  }, [])

  if (loading) {
    return <div className="text-slate-300">Loading marks...</div>
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Marks management</h1>
        <p className="mt-2 text-sm text-slate-400">Track internal assessment scores and compute simple percentage summaries for each subject.</p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="space-y-3">
          {marks.map((record) => (
            <div key={record.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-white">{record.student.user.firstName} {record.student.user.lastName}</p>
                  <p className="text-sm text-slate-400">{record.subject.name}</p>
                </div>
                <div className="text-sm text-slate-400">
                  <p>Test 1: {record.test1 ?? 0}</p>
                  <p>Test 2: {record.test2 ?? 0}</p>
                  <p>Test 3: {record.test3 ?? 0}</p>
                  <p>Assignment: {record.assignment ?? 0}</p>
                  <p className="text-cyan-300">Total: {record.totalMarks ?? 0} / {record.outOfMarks ?? 100} • {record.percentage?.toFixed(2) ?? '0.00'}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
