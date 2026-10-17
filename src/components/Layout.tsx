/* Layout Component - A component that wraps the main content of the app
   - Use this file to add a header, footer, or other elements that should be present on every page
   - This component is used in the App.tsx file to wrap the main content of the app */

import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton'

export default function Layout() {
  const location = useLocation()
  const isDashboardRoute = location.pathname.startsWith('/painel/contatos')
  const isLandingPageRoute =
    location.pathname === '/seguro-auto-carro' ||
    location.pathname === '/seguro-auto-moto' ||
    location.pathname === '/seguro-auto-caminhao' ||
    location.pathname === '/seguro-residencial' ||
    location.pathname === '/seguro-empresarial' ||
    location.pathname === '/seguro-condominio' ||
    location.pathname === '/seguro-de-vida' ||
    location.pathname === '/seguro-viagem' ||
    location.pathname === '/seguro-celular' ||
    location.pathname === '/seguro-rc-profissional' ||
    location.pathname === '/planos-de-saude'

  if (isLandingPageRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-slate-900 relative">
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 relative">
      {!isDashboardRoute && <Header />}
      <main className={`flex-grow ${!isDashboardRoute ? 'pt-[76px]' : ''}`}>
        <Outlet />
      </main>
      {!isDashboardRoute && <Footer />}
      {/* Botão flutuante de WhatsApp fixo em todas as telas públicas exceto LPs e Dashboard */}
      {!isDashboardRoute && <WhatsAppFloatingButton />}
    </div>
  )
}
