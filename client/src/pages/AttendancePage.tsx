import { useEffect, useState } from 'react'
import api from '../services/api'

interface AttendanceRecord {
  id: string
  date: string
  status: string
  remarks?: string
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

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const response = await api.get('/attendance')
        setRecords(response.data.data ?? [])
      } finally {
        setLoading(false)
      }
    }

    loadAttendance()
  }, [])

  if (loading) {
    return <div className="text-slate-300">Loading attendance records...</div>
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Attendance tracking</h1>
        <p className="mt-2 text-sm text-slate-400">Capture and review attendance across subjects with a clear, auditable record.</p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="space-y-3">
          {records.map((record) => (
            <div key={record.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-white">{record.student.user.firstName} {record.student.user.lastName}</p>
                  <p className="text-sm text-slate-400">{record.subject.name}</p>
                  <p className="text-sm text-cyan-300">{record.remarks ?? 'No remarks'}</p>
                </div>
                <div className="text-sm text-slate-400">
                  <p>{new Date(record.date).toLocaleDateString()}</p>
                  <p>Status: {record.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
