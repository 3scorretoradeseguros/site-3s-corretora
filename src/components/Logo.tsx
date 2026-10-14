import React from 'react'
import logoSrc from '@/assets/logo3s-v2-removebg-preview-d36a8.png'

interface LogoProps {
  /**
   * Tamanho / altura da imagem do logo. Padrão: 44px
   */
  height?: number | string
  /**
   * Se true, renderiza dentro de uma cápsula/fundo branco com borda suave,
   * ideal para fundos escuros (como o Footer) ou fundos transparentes.
   */
  variant?: 'default' | 'card' | 'badge'
  /**
   * Se true, exibe também os textos de apoio ao lado (se falso, apenas a imagem do logo).
   */
  showText?: boolean
  className?: string
  alt?: string
}

export const Logo: React.FC<LogoProps> = ({
  height = 44,
  variant = 'default',
  showText = true,
  className = '',
  alt = '3S Corretora de Seguros',
}) => {
  // Ajuste de classes do contêiner da imagem com base no variant
  const containerClasses =
    variant === 'card'
      ? 'bg-white p-1.5 rounded-xl shadow-sm border border-slate-200/80 inline-flex items-center justify-center shrink-0'
      : variant === 'badge'
        ? 'bg-white p-1 rounded-lg inline-flex items-center justify-center shrink-0 shadow-sm'
        : 'inline-flex items-center justify-center shrink-0'

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={containerClasses}>
        <img
          src={logoSrc}
          alt={alt}
          style={{ height: typeof height === 'number' ? `${height}px` : height, width: 'auto' }}
          className="object-contain block max-w-full"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif font-bold text-lg leading-tight text-[#004173] tracking-tight">
            3S Corretora
          </span>
          <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
            Seguros & Planos de Saúde
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
