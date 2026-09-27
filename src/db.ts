import Dexie, { type Table } from 'dexie'
import type { Bake, Recipe, LevainLog, Milestone } from './types'

class FourneeDB extends Dexie {
  bakes!: Table<Bake, number>
  recipes!: Table<Recipe, number>
  levainLogs!: Table<LevainLog, number>
  milestones!: Table<Milestone, number>

  constructor() {
    super('fournee')
    this.version(1).stores({
      bakes: '++id, date, breadType, flourType, recipeId',
      recipes: '++id, name, flourType, phase',
      levainLogs: '++id, datetime, state',
      milestones: '++id, phase',
    })
  }
}

export const db = new FourneeDB()

export function hydration(b: Bake): number {
  return Math.round((b.waterG / b.flourG) * 100)
}

export function exportAll(): Promise<string> {
  return Promise.all([
    db.bakes.toArray(),
    db.recipes.toArray(),
    db.levainLogs.toArray(),
    db.milestones.toArray(),
  ]).then(([bakes, recipes, levainLogs, milestones]) =>
    JSON.stringify({ bakes, recipes, levainLogs, milestones }, null, 2),
  )
}

export async function importAll(json: string) {
  const data = JSON.parse(json)
  await db.transaction('rw', [db.bakes, db.recipes, db.levainLogs, db.milestones], async () => {
    await db.bakes.clear(); await db.bakes.bulkAdd(data.bakes ?? [])
    await db.recipes.clear(); await db.recipes.bulkAdd(data.recipes ?? [])
    await db.levainLogs.clear(); await db.levainLogs.bulkAdd(data.levainLogs ?? [])
    await db.milestones.clear(); await db.milestones.bulkAdd(data.milestones ?? [])
  })
}
