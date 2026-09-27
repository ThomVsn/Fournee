import { NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import NewBake from './pages/NewBake'
import History from './pages/History'
import Recipes from './pages/Recipes'
import Levain from './pages/Levain'

const link = ({ isActive }: { isActive: boolean }) =>
  `flex-1 text-center py-3 text-sm ${isActive ? 'font-bold text-amber-800' : 'text-stone-500'}`

export default function App() {
  return (
    <div className="mx-auto max-w-md min-h-screen pb-16 flex flex-col">
      <header className="px-4 py-3 bg-amber-900 text-amber-50 font-bold text-lg">
        🥖 Fournée
      </header>
      <main className="flex-1 px-4 py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nouvelle" element={<NewBake />} />
          <Route path="/historique" element={<History />} />
          <Route path="/recettes" element={<Recipes />} />
          <Route path="/levain" element={<Levain />} />
        </Routes>
      </main>
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-stone-200 flex">
        <NavLink to="/" className={link}>Tableau</NavLink>
        <NavLink to="/nouvelle" className={link}>+ Fournée</NavLink>
        <NavLink to="/historique" className={link}>Historique</NavLink>
        <NavLink to="/recettes" className={link}>Recettes</NavLink>
        <NavLink to="/levain" className={link}>Levain</NavLink>
      </nav>
    </div>
  )
}
