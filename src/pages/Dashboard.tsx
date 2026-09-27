import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'

export default function Dashboard() {
  const bakes = useLiveQuery(() => db.bakes.orderBy('date').reverse().limit(5).toArray())
  const count = useLiveQuery(() => db.bakes.count())

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Tableau de bord</h1>
      <div className="rounded-xl bg-white p-4 shadow text-3xl font-bold text-amber-800">
        {count ?? '…'} fournées enregistrées
      </div>
      <h2 className="font-semibold pt-2">Dernières fournées</h2>
      <ul className="space-y-2">
        {(bakes ?? []).map((b) => (
          <li key={b.id} className="rounded-lg bg-white p-3 shadow-sm flex justify-between">
            <span>{b.breadType}</span>
            <span className="text-stone-400 text-sm">{new Date(b.date).toLocaleDateString('fr-FR')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
