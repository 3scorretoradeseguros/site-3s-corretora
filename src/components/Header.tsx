import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck, Menu, X, Phone, Lock, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COMPANY_INFO } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import { Logo } from '@/components/Logo'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fecha o menu móvel ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false)
    if (!isHome) {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-transform duration-200 group-hover:opacity-95"
          >
            <div className="p-1 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Logo height={42} showText={false} alt="3S Corretora de Seguros" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-tight text-[#004173] tracking-tight">
                3S Corretora
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                Seguros & Planos de Saúde
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              type="button"
              onClick={() => {
                if (isHome) {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  window.location.href = '/'
                }
              }}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#004173] rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              Início
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('coberturas')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#004173] rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              Coberturas
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('por-que-a-3s')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#004173] rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              Por que a 3S
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('depoimentos')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#004173] rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              Depoimentos
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('contato')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#004173] rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              className="bg-[#004173] hover:bg-[#00335c] text-white shadow-sm rounded-xl px-4 py-2 font-medium flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Falar no WhatsApp"
              >
                <Phone className="w-4 h-4 text-[#0CB7F2]" />
                <span>Falar com Corretor</span>
              </a>
            </Button>

            <Link
              to={isAuthenticated ? '/painel/contatos' : '/painel'}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:text-[#004173] hover:bg-slate-100 transition-colors"
              title={isAuthenticated ? 'Painel de Contatos' : 'Acesso da Corretora'}
              aria-label="Acesso ao Painel"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              asChild
              size="sm"
              className="bg-[#004173] text-white rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#004173] rounded-lg hover:bg-slate-100"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-lg">
          <nav className="flex flex-col space-y-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                if (isHome) {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  window.location.href = '/'
                }
              }}
              className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100"
            >
              <span>Início</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('coberturas')}
              className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100"
            >
              <span>Coberturas</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('por-que-a-3s')}
              className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100"
            >
              <span>Por que a 3S</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('depoimentos')}
              className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100"
            >
              <span>Depoimentos</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('contato')}
              className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100"
            >
              <span>Contato</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Button
              asChild
              className="w-full bg-[#004173] hover:bg-[#00335c] text-white rounded-xl py-2.5 font-medium flex items-center justify-center gap-2"
            >
              <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 text-[#0CB7F2]" />
                <span>Falar no WhatsApp</span>
              </a>
            </Button>

            <Link
              to={isAuthenticated ? '/painel/contatos' : '/painel'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 text-sm text-slate-600 hover:text-[#004173] font-medium"
            >
              <Lock className="w-4 h-4" />
              <span>{isAuthenticated ? 'Painel de Contatos' : 'Acesso da Corretora'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
