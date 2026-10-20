import React, { useState, useEffect, useRef } from 'react'
import { Accessibility, SunMoon, Type, BookOpen, RotateCcw, X, Check } from 'lucide-react'
import { useAccessibility, type FontSizeLevel } from '@/contexts/AccessibilityContext'

interface AccessibilityFloatingButtonProps {
  /**
   * Se o WhatsApp estiver presente na tela, o botão de acessibilidade é posicionado
   * logo acima dele (ex: WhatsApp em bottom-6 right-6, Acessibilidade em bottom-[88px] sm:bottom-24 right-6).
   * Se o WhatsApp não estiver na tela (ex: login, dashboard), o botão de acessibilidade
   * pode ficar na base padrão (bottom-6 right-6) ou ligeiramente acima.
   */
  hasWhatsAppBelow?: boolean
}

export const AccessibilityFloatingButton: React.FC<AccessibilityFloatingButtonProps> = ({
  hasWhatsAppBelow = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const {
    settings,
    toggleHighContrast,
    setFontSize,
    toggleReadingMode,
    resetAccessibility,
    isDefault,
  } = useAccessibility()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Fechar ao clicar fora
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Posição do botão empilhado:
  // Se hasWhatsAppBelow = true:
  // WhatsApp: w-14 h-14 (56px) sm:w-16 sm:h-16 (64px) em bottom-6 (24px) right-6 (24px). O topo do WhatsApp fica em 24+56=80px (mobile) e 24+64=88px (sm).
  // Portanto, para ficar ACIMA com espaçamento claro e seguro:
  // bottom-[88px] no mobile (88px > 80px, folga de 8px) ou bottom-[92px], sm:bottom-[104px] (104px > 88px, folga de 16px).
  // Se hasWhatsAppBelow = false:
  // bottom-6 (24px) right-6 (24px).
  const bottomPositionClass = hasWhatsAppBelow
    ? 'bottom-[88px] sm:bottom-[104px] right-6'
    : 'bottom-6 right-6'

  return (
    <aside
      aria-label="Ferramentas de acessibilidade do site"
      className={`fixed ${bottomPositionClass} z-50 flex items-center transition-all duration-500 ease-out ${
        mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
      }`}
    >
      {/* Botão FAB de Acessibilidade */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label={isOpen ? 'Fechar opções de acessibilidade' : 'Abrir opções de acessibilidade'}
        title="Opções de Acessibilidade"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#004173] text-white shadow-xl shadow-[#004173]/40 hover:bg-[#00335c] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0CB7F2]/50 border-2 border-white/20"
      >
        <Accessibility className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform duration-300 group-hover:rotate-12" />

        {/* Indicador de preferências ativas */}
        {!isDefault && (
          <span
            aria-label="Opções de acessibilidade ativas"
            className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#0CB7F2] border-2 border-white shadow-sm"
          />
        )}

        {/* Tooltip no hover (Desktop) */}
        {!isOpen && (
          <span className="hidden md:block absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-sm text-white text-xs font-semibold whitespace-nowrap shadow-lg opacity-0 translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
            Acessibilidade
            <span className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900/90 rotate-45" />
          </span>
        )}
      </button>

      {/* Painel de opções (Popover posicionado acima do botão, alinhado à direita) */}
      {isOpen && (
        <div
          id="accessibility-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Painel de preferências de acessibilidade"
          className="absolute bottom-full right-0 mb-3 w-[290px] sm:w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-4 sm:p-5 animate-fade-in z-50"
        >
          {/* Cabeçalho do Painel */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#004173] flex items-center justify-center">
                <Accessibility className="w-4 h-4 text-[#004173]" />
              </div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[#004173]">
                Acessibilidade
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004173]"
              aria-label="Fechar painel de acessibilidade"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Lista de Opções */}
          <div className="py-3 space-y-3.5 text-xs sm:text-sm">
            {/* Opção 1: Alto Contraste */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <SunMoon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block leading-tight">
                    Alto Contraste
                  </span>
                  <span className="text-[11px] text-slate-500">Texto e bordas reforçados</span>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={settings.highContrast}
                onClick={toggleHighContrast}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004173] focus-visible:ring-offset-2 ${
                  settings.highContrast ? 'bg-[#004173]' : 'bg-slate-200'
                }`}
              >
                <span className="sr-only">Ativar modo alto contraste</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    settings.highContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Opção 2: Tamanho da Fonte */}
            <div className="space-y-1.5 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Type className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block leading-tight">
                      Tamanho do Texto
                    </span>
                    <span className="text-[11px] text-slate-500">Aumentar legibilidade</span>
                  </div>
                </div>
              </div>

              {/* Botões seletivos de tamanho */}
              <div
                className="grid grid-cols-3 gap-1.5 pt-1"
                role="radiogroup"
                aria-label="Tamanho da fonte"
              >
                {(
                  [
                    { id: 'normal', label: 'Padrão', sizeLabel: 'A' },
                    { id: 'large', label: '+25%', sizeLabel: 'A+' },
                    { id: 'larger', label: '+50%', sizeLabel: 'A++' },
                  ] as const
                ).map((level) => {
                  const isActive = settings.fontSize === level.id
                  return (
                    <button
                      key={level.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setFontSize(level.id as FontSizeLevel)}
                      className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004173] ${
                        isActive
                          ? 'bg-[#004173] text-white border-[#004173] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs font-bold leading-none">{level.sizeLabel}</span>
                      <span className="text-[10px] mt-0.5 opacity-90">{level.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Opção 3: Modo de Leitura */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block leading-tight">
                    Modo Leitura
                  </span>
                  <span className="text-[11px] text-slate-500">Foco no conteúdo textual</span>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={settings.readingMode}
                onClick={toggleReadingMode}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004173] focus-visible:ring-offset-2 ${
                  settings.readingMode ? 'bg-[#004173]' : 'bg-slate-200'
                }`}
              >
                <span className="sr-only">Ativar modo de leitura</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    settings.readingMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Rodapé do Painel com Redefinir */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={resetAccessibility}
              disabled={isDefault}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004173] ${
                isDefault
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004173]"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Concluir</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}

export default AccessibilityFloatingButton
