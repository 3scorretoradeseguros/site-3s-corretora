/* Layout Component - A component that wraps the main content of the app
   - Use this file to add a header, footer, or other elements that should be present on every page
   - This component is used in the App.tsx file to wrap the main content of the app */

import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export default function Layout() {
  const location = useLocation()
  const isDashboardRoute = location.pathname.startsWith('/painel/contatos')

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      {!isDashboardRoute && <Header />}
      <main className={`flex-grow ${!isDashboardRoute ? 'pt-[76px]' : ''}`}>
        <Outlet />
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  )
}
