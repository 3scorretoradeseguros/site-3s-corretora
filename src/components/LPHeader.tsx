import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronRight } from 'lucide-react'
import { Logo } from '@/components/Logo'

interface LPHeaderProps {
  quoteUrl: string
  ctaText?: string
  hasFaq?: boolean
}

export const LPHeader: React.FC<LPHeaderProps> = ({
  quoteUrl,
  ctaText = 'Cotar Agora',
  hasFaq = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false)
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
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

  const navItems = [
    { label: 'Início', anchor: 'inicio' },
    { label: 'Coberturas', anchor: 'coberturas' },
    { label: 'Vantagens', anchor: 'vantagens' },
    { label: 'Na prática', anchor: 'na-pratica' },
    ...(hasFaq ? [{ label: 'FAQ', anchor: 'faq-section' }] : []),
  ]

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/50 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo que linka de volta para a Home */}
          <Link
            to="/"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004173] rounded-lg group"
            title="3S Corretora de Seguros — Voltar à página inicial"
          >
            <div className="p-1 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Logo height={40} showText={false} alt="3S Corretora de Seguros" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg leading-tight text-[#004173] tracking-tight">
                3S Corretora
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                Seguros & Planos de Saúde
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.anchor}
                type="button"
                onClick={() => scrollToAnchor(item.anchor)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#004173] rounded-lg hover:bg-slate-100/70 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Ações / CTA: mesmo link de cotação da LP */}
          <div className="flex items-center gap-2">
            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#004173] hover:bg-[#00335c] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              {ctaText}
            </a>

            {/* Botão Hambúrguer Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-[#004173] rounded-lg hover:bg-slate-100"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.anchor}
                type="button"
                onClick={() => scrollToAnchor(item.anchor)}
                className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-100 text-left transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-100">
            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center rounded-xl bg-[#004173] hover:bg-[#00335c] text-white py-2.5 text-sm font-semibold shadow-sm transition-colors"
            >
              {ctaText}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default LPHeader
