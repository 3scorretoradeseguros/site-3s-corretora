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

  // Navegar próximo com loop infinito
  const handleNext = useCallback(() => {
    if (count === 0) return
    setCurrentIndex((prev) => (prev + 1) % count)
  }, [count])

  // Navegar anterior com loop infinito
  const handlePrev = useCallback(() => {
    if (count === 0) return
    setCurrentIndex((prev) => (prev - 1 + count) % count)
  }, [count])

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

  // Suporte a Mouse Drag para arrastar com o mouse
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

  // Offsets relativos ao centro:
  // -2: extremo esquerdo (cortado + blur + sombreado)
  // -1: card esquerdo central (visível)
  //  0: card centro (visível)
  // +1: card direito central (visível)
  // +2: extremo direito (cortado + blur + sombreado)
  const offsets = [-2, -1, 0, 1, 2]

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
        {/* 3 cards no centro, laterais cortadas com blur e sombreado */}
        {/* ======================================================== */}
        <div className="hidden md:block relative select-none">
          {/* Setas de navegação flutuantes laterais com alto contraste */}
          <div className="absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-30">
            <Button
              type="button"
              onClick={handlePrev}
              size="icon"
              className="w-12 h-12 rounded-full bg-white text-[#004173] hover:bg-slate-50 border border-slate-200/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </Button>
          </div>

          <div className="absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-30">
            <Button
              type="button"
              onClick={handleNext}
              size="icon"
              className="w-12 h-12 rounded-full bg-white text-[#004173] hover:bg-slate-50 border border-slate-200/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </Button>
          </div>

          {/* Efeito de Vinheta / Gradiente de Blur e Sombra nas Bordas Laterais do carrossel */}
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#F5F8FB] via-[#F5F8FB]/80 to-transparent pointer-events-none z-20 backdrop-blur-[2px]" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#F5F8FB] via-[#F5F8FB]/80 to-transparent pointer-events-none z-20 backdrop-blur-[2px]" />

          {/* Container que acomoda os cards com overflow controlado */}
          <div
            className="overflow-hidden py-4 px-2"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex items-stretch justify-center gap-6 transition-transform duration-500 ease-out">
              {offsets.map((offset) => {
                const item = getItemAtOffset(offset)
                if (!item) return null

                const isEdge = Math.abs(offset) === 2
                const isCenter = offset === 0

                return (
                  <div
                    key={`${item.id}-${offset}`}
                    className={`w-[320px] lg:w-[360px] shrink-0 rounded-2xl bg-white p-7 border flex flex-col justify-between transition-all duration-300 relative ${
                      isEdge
                        ? 'opacity-40 blur-[2px] scale-95 shadow-inner border-slate-200/50 pointer-events-none'
                        : isCenter
                          ? 'border-[#0CB7F2]/40 shadow-md scale-100 ring-1 ring-[#0CB7F2]/20'
                          : 'border-slate-200/90 shadow-sm opacity-95 scale-100'
                    }`}
                  >
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
                        <h4 className="font-serif font-bold text-sm text-slate-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {item.source === 'google'
                            ? 'Avaliação verificada no Google'
                            : 'Cliente 3S Corretora'}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Indicadores de Posição (Bolinhas) */}
          {count > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? 'w-6 h-2 bg-[#004173]'
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* MOBILE CAROUSEL (visível apenas em telas < md)           */}
        {/* 1 depoimento em destaque, setas dos lados, swipe arrastar */}
        {/* NÃO empilham verticalmente                                */}
        {/* ======================================================== */}
        <div className="md:hidden relative select-none">
          <div
            className="touch-pan-y relative overflow-hidden px-2 py-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {(() => {
              const currentItem = getItemAtOffset(0)
              if (!currentItem) return null

              return (
                <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md flex flex-col justify-between min-h-[260px] animate-fade-in relative transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(currentItem.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>

                      {currentItem.source === 'google' ? (
                        <Badge className="bg-amber-50 text-amber-800 border-amber-200/80 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-none">
                          <GoogleIcon className="w-3 h-3 fill-current text-amber-600" />
                          <span>do Google</span>
                        </Badge>
                      ) : (
                        <Quote className="w-4 h-4 text-sky-200" />
                      )}
                    </div>

                    <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                      &quot;{currentItem.text}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 text-[#004173] font-bold text-sm flex items-center justify-center shrink-0">
                      {getInitials(currentItem.name)}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900 leading-tight">
                        {currentItem.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {currentItem.source === 'google'
                          ? 'Avaliação verificada no Google'
                          : 'Cliente 3S Corretora'}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Setas e Controles de Navegação no Mobile */}
          <div className="flex items-center justify-between mt-5 px-2">
            <Button
              type="button"
              onClick={handlePrev}
              size="sm"
              variant="outline"
              className="rounded-xl border-slate-200 bg-white text-[#004173] shadow-sm hover:bg-slate-50 h-9 px-3 text-xs font-semibold flex items-center gap-1"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Button>

            {/* Indicador de Bolinhas e Contador */}
            <div className="flex items-center gap-1.5">
              {count <= 8 ? (
                testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentIndex ? 'w-5 h-2 bg-[#004173]' : 'w-2 h-2 bg-slate-300'
                    }`}
                    aria-label={`Ir para depoimento ${idx + 1}`}
                  />
                ))
              ) : (
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  {currentIndex + 1} de {count}
                </span>
              )}
            </div>

            <Button
              type="button"
              onClick={handleNext}
              size="sm"
              variant="outline"
              className="rounded-xl border-slate-200 bg-white text-[#004173] shadow-sm hover:bg-slate-50 h-9 px-3 text-xs font-semibold flex items-center gap-1"
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
