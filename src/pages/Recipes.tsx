import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'

export default function Recipes() {
  const recipes = useLiveQuery(() => db.recipes.toArray())
  const [name, setName] = useState('')
  const [phase, setPhase] = useState(1)

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Recettes</h1>
      <div className="flex gap-2">
        <input className="flex-1 rounded-lg border border-stone-300 px-3 py-2" placeholder="Nom de la recette" value={name} onChange={(e) => setName(e.target.value)} />
        <select className="rounded-lg border border-stone-300 px-2" value={phase} onChange={(e) => setPhase(+e.target.value)}>
          {[1, 2, 3, 4, 5].map((p) => <option key={p} value={p}>Phase {p}</option>)}
        </select>
        <button className="bg-amber-900 text-white rounded-lg px-3 font-bold" onClick={async () => { if (name) { await db.recipes.add({ name, phase, flourType: 'T65', hydrationTargetPct: 70, steps: '' }); setName('') } }}>
          +
        </button>
      </div>
      <ul className="space-y-2">
        {(recipes ?? []).map((r) => (
          <li key={r.id} className="rounded-lg bg-white p-3 shadow-sm flex justify-between">
            <span>{r.name}</span>
            <span className="text-stone-400 text-sm">Phase {r.phase}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
