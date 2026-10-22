import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Inbox,
  MessageSquareQuote,
  DownloadCloud,
  KeyRound,
  ExternalLink,
  LogOut,
} from 'lucide-react'

interface DashboardHeaderProps {
  currentTab?: 'contatos' | 'depoimentos' | 'recursos' | 'senha'
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentTab }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const active =
    currentTab ||
    (location.pathname.startsWith('/painel/depoimentos')
      ? 'depoimentos'
      : location.pathname.startsWith('/painel/recursos')
        ? 'recursos'
        : location.pathname.startsWith('/painel/alterar-senha')
          ? 'senha'
          : 'contatos')

  const handleLogout = () => {
    logout()
    navigate('/painel', { replace: true })
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/painel/contatos" className="flex items-center gap-2.5 group">
              <div className="p-1 rounded-xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center">
                <Logo height={32} showText={false} alt="3S Corretora de Seguros" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm leading-tight text-[#004173]">
                  3S Corretora
                </span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                  Área Logada
                </span>
              </div>
            </Link>
          </div>

          {/* Navegação entre seções da área logada (Desktop) */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <Link
              to="/painel/contatos"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                active === 'contatos'
                  ? 'bg-white text-[#004173] shadow-sm'
                  : 'text-slate-600 hover:text-[#004173] hover:bg-white/60'
              }`}
            >
              <Inbox className="w-3.5 h-3.5 text-[#0979B0]" />
              <span>Contatos & Leads</span>
            </Link>
            <Link
              to="/painel/depoimentos"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                active === 'depoimentos'
                  ? 'bg-white text-[#004173] shadow-sm'
                  : 'text-slate-600 hover:text-[#004173] hover:bg-white/60'
              }`}
              title="Gerenciar depoimentos exibidos no site"
            >
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#0979B0]" />
              <span>Depoimentos</span>
            </Link>
            <Link
              to="/painel/recursos"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                active === 'recursos'
                  ? 'bg-white text-[#004173] shadow-sm'
                  : 'text-slate-600 hover:text-[#004173] hover:bg-white/60'
              }`}
              title="Acessar biblioteca de ícones e recursos da corretora"
            >
              <DownloadCloud className="w-3.5 h-3.5 text-[#0979B0]" />
              <span>Recursos & Ícones</span>
            </Link>
            <Link
              to="/painel/alterar-senha"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                active === 'senha'
                  ? 'bg-white text-[#004173] shadow-sm'
                  : 'text-slate-600 hover:text-[#004173] hover:bg-white/60'
              }`}
              title="Alterar senha de acesso ao painel"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#0979B0]" />
              <span>Alterar senha</span>
            </Link>
          </div>

          {/* Perfil & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-7 h-7 rounded-lg bg-[#004173] text-white flex items-center justify-center text-xs font-bold">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-slate-800 block leading-tight max-w-[150px] truncate">
                  {user?.name || user?.email || 'Corretora'}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block">Online</span>
              </div>
            </div>

            <Link
              to="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-[#004173] rounded-xl hover:bg-slate-100 transition-colors"
              title="Abrir site público em nova aba"
            >
              <span>Ver Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-1.5 text-xs font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default DashboardHeader
