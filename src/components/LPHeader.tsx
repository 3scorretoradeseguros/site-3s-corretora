import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/Logo'

interface LPHeaderProps {
  quoteUrl: string
  ctaText?: string
}

export const LPHeader: React.FC<LPHeaderProps> = ({ quoteUrl, ctaText = 'Cotar Agora' }) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo que linka de volta para a Home */}
        <Link
          to="/"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004173] rounded-lg group"
          title="3S Corretora de Seguros — Voltar à página inicial"
        >
          <div className="p-1 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
            <Logo height={38} showText={false} alt="3S Corretora de Seguros" />
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

        {/* Único CTA da barra: leva exatamente ao link de cotação da LP */}
        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-[#004173] hover:bg-[#00335c] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </header>
  )
}

export default LPHeader
