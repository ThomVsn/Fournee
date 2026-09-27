import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, hydration } from '../db'
import type { Bake } from '../types'

const empty: Bake = {
  date: new Date().toISOString().slice(0, 10),
  breadType: '', flourType: 'T65', flourG: 500, waterG: 325,
  saltG: 10, starterG: 100, coldRetard: false,
  scoreCrumb: undefined,
  scoreCrust: undefined,
  scoreTaste: undefined,
}

const ScoreSlider = ({ label, value, onChange }: { label: string, value: number | undefined, onChange: (v: number) => void }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span className="font-semibold text-amber-800">{value ?? '—'}</span>
    </div>
    <input
      type="range" min={1} max={5} step={1}
      value={value ?? 3}
      onChange={(e) => onChange(+e.target.value)}
      className="w-full accent-amber-800"
    />
    <div className="flex justify-between text-xs text-stone-400 px-1">
      <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
    </div>
  </div>
)

const input = 'w-full rounded-lg border border-stone-300 px-3 py-2'

export default function NewBake() {
  const [b, setB] = useState<Bake>(empty)
  const nav = useNavigate()
  const set = (patch: Partial<Bake>) => setB({ ...b, ...patch })

  async function save() {
    await db.bakes.add({ ...b, date: new Date(b.date).toISOString() })
    nav('/')
  }

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Nouvelle fournée</h1>
      <input className={input} placeholder="Type de pain" value={b.breadType} onChange={(e) => set({ breadType: e.target.value })} />
      <div className="grid grid-cols-2 gap-3">
        <select className={input} value={b.flourType} onChange={(e) => set({ flourType: e.target.value })}>
          {['T45', 'T65', 'T80', 'T110', 'Seigle', 'Épeautre', 'Méteil', 'Autre'].map((t) => <option key={t}>{t}</option>)}
        </select>
        <input className={input} type="number" placeholder="Farine (g)" value={b.flourG} onChange={(e) => set({ flourG: +e.target.value })} />
        <input className={input} type="number" placeholder="Eau (g)" value={b.waterG} onChange={(e) => set({ waterG: +e.target.value })} />
        <input className={input} type="number" placeholder="Sel (g)" value={b.saltG} onChange={(e) => set({ saltG: +e.target.value })} />
        <input className={input} type="number" placeholder="Levain (g)" value={b.starterG} onChange={(e) => set({ starterG: +e.target.value })} />
        <input className={input} type="number" placeholder="Temp. ambiante (°C)" onChange={(e) => set({ ambientTempC: +e.target.value })} />
        <input className={input} type="number" placeholder="Pointage (h)" step="0.5" onChange={(e) => set({ bulkHours: +e.target.value })} />
        <input className={input} type="number" placeholder="Apprêt (h)" step="0.5" onChange={(e) => set({ proofHours: +e.target.value })} />
      </div>
      <p className="text-sm text-amber-800 font-semibold">Hydratation : {hydration(b)} %</p>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={b.coldRetard} onChange={(e) => set({ coldRetard: e.target.checked })} />
        Retard au froid
      </label>
      
      <h2 className="text-lg font-bold text-amber-900 pt-2 border-t border-stone-200">Résultat</h2>
      <div className="space-y-4 bg-white p-4 rounded-xl">
        <ScoreSlider label="Mie" value={b.scoreCrumb} onChange={(v) => set({ scoreCrumb: v })} />
        <ScoreSlider label="Croûte" value={b.scoreCrust} onChange={(v) => set({ scoreCrust: v })} />
        <ScoreSlider label="Goût" value={b.scoreTaste} onChange={(v) => set({ scoreTaste: v })} />
      </div>
      
      <textarea className={input} rows={3} placeholder="Notes (résultat, corrections...)" onChange={(e) => set({ notes: e.target.value })} />
      <button onClick={save} disabled={!b.breadType} className="w-full bg-amber-900 text-white rounded-lg py-3 font-bold disabled:opacity-40">
        Enregistrer la fournée
      </button>
    </div>
  )
}
