/* Layout Component - A component that wraps the main content of the app
   - Use this file to add a header, footer, or other elements that should be present on every page
   - This component is used in the App.tsx file to wrap the main content of the app */

import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton'
import { AccessibilityFloatingButton } from './AccessibilityFloatingButton'

export default function Layout() {
  const location = useLocation()
  const isLoginRoute = location.pathname === '/painel'
  const isDashboardRoute =
    location.pathname.startsWith('/painel/contatos') ||
    location.pathname.startsWith('/painel/recursos') ||
    location.pathname.startsWith('/painel/alterar-senha')
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

  // O WhatsApp só é exibido na Home pública e páginas públicas genéricas (não nas LPs, Dashboard ou Login)
  const showWhatsApp = !isDashboardRoute && !isLoginRoute && !isLandingPageRoute

  if (isLandingPageRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-slate-900 relative">
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* Botão nativo de acessibilidade visível também nas LPs */}
        <AccessibilityFloatingButton hasWhatsAppBelow={false} />
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

      {/* Botão flutuante de WhatsApp fixo nas telas públicas (ex: Home) */}
      {showWhatsApp && <WhatsAppFloatingButton />}

      {/* Botão nativo de acessibilidade visível em todas as telas (Home, Login, Painel) empilhado acima do WhatsApp quando ele estiver presente */}
      <AccessibilityFloatingButton hasWhatsAppBelow={showWhatsApp} />
    </div>
  )
}
