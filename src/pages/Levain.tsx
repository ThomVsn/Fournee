import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'

export default function Levain() {
  const logs = useLiveQuery(() => db.levainLogs.orderBy('datetime').reverse().toArray())
  const last = logs?.[0]
  const daysSince = last ? Math.floor((Date.now() - new Date(last.datetime).getTime()) / 86400000) : null
  const due = daysSince === null || daysSince >= 3

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Levain</h1>
      {due && (
        <div className="rounded-lg bg-amber-100 border border-amber-300 p-3 text-amber-900 font-semibold">
          ⏰ À nourrir ! Dernier rafraîchi {daysSince === null ? 'jamais enregistré' : `il y a ${daysSince} j`}.
        </div>
      )}
      <button className="w-full bg-amber-900 text-white rounded-lg py-3 font-bold" onClick={() => db.levainLogs.add({ datetime: new Date().toISOString(), ratio: '1:2:2', state: 'actif' })}>
        Rafraîchi fait ✅
      </button>
      <ul className="space-y-2">
        {(logs ?? []).slice(0, 20).map((l) => (
          <li key={l.id} className="rounded-lg bg-white p-3 shadow-sm flex justify-between text-sm">
            <span>{l.state} · {l.ratio}</span>
            <span className="text-stone-400">{new Date(l.datetime).toLocaleString('fr-FR')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
