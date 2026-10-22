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
  // Identifica rotas da área restrita / painel / autenticação:
  // /painel e quaisquer sub-rotas (/painel/contatos, /painel/depoimentos, /painel/recursos, /painel/alterar-senha...),
  // além das telas de autenticação (/recuperar-senha, /redefinir-senha).
  const isPanelOrAuthRoute =
    location.pathname === '/painel' ||
    location.pathname.startsWith('/painel/') ||
    location.pathname === '/recuperar-senha' ||
    location.pathname === '/redefinir-senha'

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

  // Caso 1: Área logada / Telas do painel e autenticação
  // Removidos por completo: Header público, Footer público, WhatsApp flutuante e Botão de acessibilidade flutuante.
  // As preferências de acessibilidade continuam ativas via AccessibilityProvider.
  if (isPanelOrAuthRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 relative">
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    )
  }

  // Caso 2: Landing Pages dedicadas (possuem seu próprio LPHeader e LPFooter; sem WhatsApp flutuante; com Botão de acessibilidade)
  if (isLandingPageRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-slate-900 relative">
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* Botão nativo de acessibilidade visível nas LPs */}
        <AccessibilityFloatingButton hasWhatsAppBelow={false} />
      </div>
    )
  }

  // Caso 3: Páginas públicas (Home, 404, etc.)
  // Exibe Header, Footer, WhatsApp flutuante e Botão de acessibilidade flutuante.
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 relative">
      <Header />
      <main className="flex-grow pt-[76px]">
        <Outlet />
      </main>
      <Footer />

      {/* Botão flutuante de WhatsApp fixo nas telas públicas */}
      <WhatsAppFloatingButton />

      {/* Botão nativo de acessibilidade visível nas páginas públicas, empilhado acima do WhatsApp */}
      <AccessibilityFloatingButton hasWhatsAppBelow={true} />
    </div>
  )
}
