import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GoogleIcon } from '@/components/SocialIcons'
import { getActiveTestimonials } from '@/services/testimonials'
import type { TestimonialRecord } from '@/types'

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Referência e estados para suporte a touch / swipe no mobile e arrasto no desktop
  const touchStartXRef = useRef<number | null>(null)
  const touchEndXRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)

  // Carregar depoimentos ativos
  useEffect(() => {
    let isMounted = true

    async function loadTestimonials() {
      try {
        const data = await getActiveTestimonials()
        if (isMounted) {
          setTestimonials(data)
        }
      } catch (err) {
        console.error('Erro ao carregar depoimentos da home:', err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTestimonials()

    return () => {
      isMounted = false
    }
  }, [])

  const count = testimonials.length

  // Transição com animação lateral deslizante contínua
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const animTimeoutRef = useRef<number | null>(null)

  // Navegar próximo com loop infinito e animação de passagem para o lado
  const handleNext = useCallback(() => {
    if (count === 0 || isAnimating) return
    setIsAnimating(true)
    setSlideDirection('next')

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
    animTimeoutRef.current = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % count)
      setSlideDirection(null)
      setIsAnimating(false)
    }, 450)
  }, [count, isAnimating])

  // Navegar anterior com loop infinito e animação de passagem para o lado
  const handlePrev = useCallback(() => {
    if (count === 0 || isAnimating) return
    setIsAnimating(true)
    setSlideDirection('prev')

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
    animTimeoutRef.current = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + count) % count)
      setSlideDirection(null)
      setIsAnimating(false)
    }, 450)
  }, [count, isAnimating])

  // Limpar timeout no unmount
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
    }
  }, [])

  // Eventos de Touch para mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX
    touchEndXRef.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return
    const diff = touchStartXRef.current - touchEndXRef.current
    const minSwipeDistance = 45

    if (diff > minSwipeDistance) {
      handleNext()
    } else if (diff < -minSwipeDistance) {
      handlePrev()
    }

    touchStartXRef.current = null
    touchEndXRef.current = null
  }

  // Suporte a Mouse Drag para arrastar com o mouse no desktop e mobile
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartXRef.current = e.clientX
    touchEndXRef.current = null
    isDraggingRef.current = true
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    touchEndXRef.current = e.clientX
  }

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    if (touchStartXRef.current === null || touchEndXRef.current === null) return
    const diff = touchStartXRef.current - touchEndXRef.current
    const minSwipeDistance = 45

    if (diff > minSwipeDistance) {
      handleNext()
    } else if (diff < -minSwipeDistance) {
      handlePrev()
    }

    touchStartXRef.current = null
    touchEndXRef.current = null
  }

  // Se não há depoimentos ativos ou ainda está carregando sem dados,
  // o componente retorna null e a home esconde o bloco de depoimentos.
  if (!isLoading && count === 0) {
    return null
  }

  // Gera as iniciais do nome para o avatar estilizado
  const getInitials = (name: string) => {
    const clean = name
      .trim()
      .replace(/—.*$/, '')
      .trim()
    const parts = clean.split(' ').filter(Boolean)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return parts[0]?.slice(0, 2).toUpperCase() || '3S'
  }

  // Helper para obter o item com índice circular (looping infinito positivo ou negativo)
  const getItemAtOffset = (offset: number): TestimonialRecord | null => {
    if (count === 0) return null
    const index = (((currentIndex + offset) % count) + count) % count
    return testimonials[index]
  }

  // Renders standard card content identically to preserve layout exactly
  const renderCardContent = (item: TestimonialRecord) => (
    <>
      {/* Badge de Aspas elegantes no topo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(item.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
        </div>

        {item.source === 'google' ? (
          <Badge className="bg-amber-50 text-amber-800 border-amber-200/80 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-none">
            <GoogleIcon className="w-3 h-3 fill-current text-amber-600" />
            <span>do Google</span>
          </Badge>
        ) : (
          <Quote className="w-4 h-4 text-sky-200" />
        )}
      </div>

      {/* Texto do Depoimento */}
      <p className="text-slate-700 text-sm leading-relaxed italic mb-6 line-clamp-5 flex-grow">
        &quot;{item.text}&quot;
      </p>

      {/* Autor do Depoimento */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-sky-100 text-[#004173] font-bold text-sm flex items-center justify-center shrink-0 shadow-inner">
          {getInitials(item.name)}
        </div>
        <div className="overflow-hidden">
          <h4 className="font-serif font-bold text-sm text-slate-900 truncate">{item.name}</h4>
          <p className="text-[11px] text-slate-500">
            {item.source === 'google' ? 'Avaliação verificada no Google' : 'Cliente 3S Corretora'}
          </p>
        </div>
      </div>
    </>
  )

  return (
    <div className="mt-14">
      {/* Cabeçalho dos depoimentos */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0979B0] block mb-2">
          Depoimentos Reais
        </span>
        <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#004173] tracking-tight">
          Quem confia, recomenda
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Experiências reais de clientes atendidos com a consultoria e suporte da 3S Corretora.
        </p>
      </div>

      <div className="relative mt-8">
        {/* ======================================================== */}
        {/* DESKTOP CAROUSEL (visível a partir de md:)                */}
        {/* Referência Slider Revolution: card central em destaque    */}
        {/* 100% visível, e os 2 laterais menores e levemente        */}
        {/* apagados (escala + opacidade reduzida), sem blur pesado. */}
        {/* Animação suave de deslizamento lateral.                  */}
        {/* ======================================================== */}
        <div className="hidden md:block relative select-none">
          {/* Setas de navegação flutuantes laterais */}
          <div className="absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-30">
            <Button
              type="button"
              disabled={isAnimating}
              onClick={handlePrev}
              size="icon"
              className="w-12 h-12 rounded-full bg-white text-[#004173] hover:bg-slate-50 border border-slate-200/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </Button>
          </div>

          <div className="absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-30">
            <Button
              type="button"
              disabled={isAnimating}
              onClick={handleNext}
              size="icon"
              className="w-12 h-12 rounded-full bg-white text-[#004173] hover:bg-slate-50 border border-slate-200/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </Button>
          </div>

          {/* Container do carrossel com overflow oculto */}
          <div
            className="overflow-hidden py-6 px-2 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Visualizador com janela deslizante:
                5 posições relativas: [-2, -1, 0, +1, +2].
                Em repouso, o centro está em offset 0 (exibindo -1, 0, +1 centralizados na tela).
                Ao avançar (next), desliza suavemente 1 card para a esquerda: translateX calc(-360px - gap).
                Ao voltar (prev), desliza suavemente 1 card para a direita: translateX calc(360px + gap).
                Ao término dos 450ms, o índice atualiza e volta suavemente ao centro sem salto.
            */}
            <div className="flex justify-center items-center">
              <div
                className="flex items-center justify-center gap-6"
                style={{
                  transform:
                    slideDirection === 'next'
                      ? 'translateX(calc(-360px - 1.5rem))'
                      : slideDirection === 'prev'
                        ? 'translateX(calc(360px + 1.5rem))'
                        : 'translateX(0)',
                  transition: isAnimating
                    ? 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)'
                    : 'none',
                }}
              >
                {[-2, -1, 0, 1, 2].map((offset) => {
                  const item = getItemAtOffset(offset)
                  if (!item) return null

                  // Se estiver deslizando para 'next', o card em +1 está se tornando o centro
                  // Se estiver deslizando para 'prev', o card em -1 está se tornando o centro
                  // Em repouso, o card em 0 é o centro
                  let isTargetCenter = offset === 0
                  if (slideDirection === 'next') {
                    isTargetCenter = offset === 1
                  } else if (slideDirection === 'prev') {
                    isTargetCenter = offset === -1
                  }

                  return (
                    <div
                      key={`slot-${offset}-${item.id}`}
                      onClick={() => {
                        if (offset === -1) handlePrev()
                        if (offset === 1) handleNext()
                      }}
                      className={`w-[320px] lg:w-[360px] shrink-0 rounded-2xl bg-white p-7 border flex flex-col justify-between select-none min-h-[300px] ${
                        isTargetCenter
                          ? 'opacity-100 scale-100 shadow-xl border-[#0CB7F2]/40 ring-1 ring-[#0CB7F2]/25 z-20 cursor-default'
                          : 'opacity-55 hover:opacity-75 scale-90 shadow-sm border-slate-200/80 z-10 cursor-pointer'
                      }`}
                      style={{
                        transformOrigin: 'center center',
                        transition: isAnimating
                          ? 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1), opacity 450ms ease, box-shadow 450ms ease, border-color 450ms ease'
                          : 'transform 300ms ease, opacity 300ms ease, box-shadow 300ms ease, border-color 300ms ease',
                      }}
                    >
                      {renderCardContent(item)}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Indicadores de Posição (Bolinhas) */}
          {count > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {testimonials.map((_, idx) => {
                const isSelected =
                  isAnimating && slideDirection === 'next'
                    ? idx === (currentIndex + 1) % count
                    : isAnimating && slideDirection === 'prev'
                      ? idx === (currentIndex - 1 + count) % count
                      : idx === currentIndex

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (isAnimating || idx === currentIndex) return
                      const diff = (idx - currentIndex + count) % count
                      if (diff === 1 || diff > count / 2) {
                        if (diff === 1) handleNext()
                        else handlePrev()
                      } else {
                        handleNext()
                      }
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      isSelected
                        ? 'w-6 h-2 bg-[#004173]'
                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Ir para depoimento ${idx + 1}`}
                  />
                )
              })}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* MOBILE CAROUSEL (visível apenas em telas < md)           */}
        {/* 1 depoimento em destaque com transição suave de          */}
        {/* deslizamento lateral ('passagem para o lado'), setas e   */}
        {/* arraste por swipe/touch com loop contínuo infinito.      */}
        {/* ======================================================== */}
        <div className="md:hidden relative select-none">
          <div
            className="touch-pan-y relative overflow-hidden px-2 py-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Três slots [-1, 0, +1]:
                Em repouso: translateX(-100%), exibindo exatamente o card central (offset 0).
                Ao clicar em Próximo (next): desliza para translateX(-200%) com 450ms ease.
                Ao clicar em Anterior (prev): desliza para translateX(0%) com 450ms ease.
                Após 450ms, o índice atualiza e a faixa reseta instantaneamente para translateX(-100%).
                Isso garante rolagem infinita lateral 100% contínua e sem saltos visíveis.
            */}
            <div
              className="flex w-full"
              style={{
                transform:
                  slideDirection === 'next'
                    ? 'translateX(-200%)'
                    : slideDirection === 'prev'
                      ? 'translateX(0%)'
                      : 'translateX(-100%)',
                transition: isAnimating ? 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              }}
            >
              {[-1, 0, 1].map((offset) => {
                const item = getItemAtOffset(offset)
                if (!item) return null
                return (
                  <div key={`m-slot-${offset}-${item.id}`} className="w-full shrink-0 px-1">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md flex flex-col justify-between min-h-[260px]">
                      {renderCardContent(item)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Setas e Controles de Navegação no Mobile */}
          <div className="flex items-center justify-between mt-5 px-2">
            <Button
              type="button"
              disabled={isAnimating}
              onClick={handlePrev}
              size="sm"
              variant="outline"
              className="rounded-xl border-slate-200 bg-white text-[#004173] shadow-sm hover:bg-slate-50 h-9 px-3 text-xs font-semibold flex items-center gap-1 disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Button>

            {/* Indicador de Bolinhas e Contador */}
            <div className="flex items-center gap-1.5">
              {count <= 8 ? (
                testimonials.map((_, idx) => {
                  const isSelected =
                    isAnimating && slideDirection === 'next'
                      ? idx === (currentIndex + 1) % count
                      : isAnimating && slideDirection === 'prev'
                        ? idx === (currentIndex - 1 + count) % count
                        : idx === currentIndex

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (isAnimating || idx === currentIndex) return
                        if (idx > currentIndex) handleNext()
                        else handlePrev()
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        isSelected ? 'w-5 h-2 bg-[#004173]' : 'w-2 h-2 bg-slate-300'
                      }`}
                      aria-label={`Ir para depoimento ${idx + 1}`}
                    />
                  )
                })
              ) : (
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  {currentIndex + 1} de {count}
                </span>
              )}
            </div>

            <Button
              type="button"
              disabled={isAnimating}
              onClick={handleNext}
              size="sm"
              variant="outline"
              className="rounded-xl border-slate-200 bg-white text-[#004173] shadow-sm hover:bg-slate-50 h-9 px-3 text-xs font-semibold flex items-center gap-1 disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Próximo depoimento"
            >
              <span>Próximo</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-[11px] text-center text-slate-400 mt-2">
            Dica: você também pode deslizar o dedo para os lados
          </p>
        </div>
      </div>
    </div>
  )
}
export default TestimonialsSection
