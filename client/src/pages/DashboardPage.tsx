export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:px-8">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Secure Academic Management System</p>
              <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Academic operations dashboard</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Monitor admissions, classes, attendance, and institutional performance from one secure workspace.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
              System status: online and secure
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            { label: 'Active students', value: '12,480', detail: '+8.2% this term' },
            { label: 'Teachers online', value: '184', detail: '97% attendance' },
            { label: 'Pending approvals', value: '24', detail: '3 flagged for review' },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/10">
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
              <p className="mt-2 text-sm text-emerald-400">{card.detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Today's overview</h2>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">Live</span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                ['Exams scheduled', '48 sessions'],
                ['Attendance captured', '91.7%'],
                ['Fee collections', '₹4.2M'],
              ].map(([title, value]) => (
                <div key={title} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  <span className="text-slate-300">{title}</span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">Quick actions</h2>
            <div className="mt-6 space-y-3">
              {['Create timetable', 'Review reports', 'Manage notices'].map((action) => (
                <button
                  key={action}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-left text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-300"
                >
                  <span>{action}</span>
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
