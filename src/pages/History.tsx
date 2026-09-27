import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'

export default function History() {
  const bakes = useLiveQuery(() => db.bakes.orderBy('date').reverse().toArray())
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Historique</h1>
      <ul className="space-y-2">
        {(bakes ?? []).map((b) => (
          <li key={b.id} className="rounded-lg bg-white p-3 shadow-sm">
            <div className="flex justify-between font-semibold">
              <span>{b.breadType}</span>
              <span className="text-stone-400 text-sm">{new Date(b.date).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="text-sm text-stone-500">
              {b.flourType} · {Math.round((b.waterG / b.flourG) * 100)}% d'hydratation
              {b.notes ? ` · ${b.notes}` : ''}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
