import React, { useEffect, useState } from 'react'
import { ShieldCheck, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import { getReviewSeguroBadgeEnabled, setReviewSeguroBadgeEnabled } from '@/services/siteSettings'

/* Controle do selo ReviewSeguro na área logada (aba Depoimentos).
   A prévia é uma representação ilustrativa; o selo real só é carregado no rodapé da home. */
export const ReviewSeguroBadgeControl: React.FC = () => {
  const [enabled, setEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    getReviewSeguroBadgeEnabled()
      .then((value) => {
        if (!cancelled) setEnabled(value)
      })
      .catch((err: any) => {
        console.error('Erro ao carregar preferência do selo:', err)
        toast({
          variant: 'destructive',
          title: 'Erro ao carregar o selo',
          description: err?.message || 'Tente novamente.',
        })
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const handleToggle = async (checked: boolean) => {
    const previous = enabled
    setEnabled(checked)
    setIsSaving(true)
    try {
      await setReviewSeguroBadgeEnabled(checked)
      toast({
        title: checked ? 'Selo ativado' : 'Selo desativado',
        description: checked
          ? 'O selo do ReviewSeguro voltou a aparecer no rodapé da home.'
          : 'O selo do ReviewSeguro foi removido do rodapé da home.',
      })
    } catch (err: any) {
      console.error('Erro ao salvar preferência do selo:', err)
      setEnabled(previous)
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: err?.message || 'Não foi possível alterar o selo. Tente novamente.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section
      aria-labelledby="reviewseguro-section-title"
      className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="reviewseguro-section-title"
              className="font-serif font-bold text-lg text-[#004173]"
            >
              Selo do ReviewSeguro
            </h2>
            <Badge
              variant="outline"
              className={
                enabled
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }
            >
              {enabled ? 'Visível na home' : 'Oculto na home'}
            </Badge>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            O ReviewSeguro é um canal de avaliações do mercado de seguros. O selo mostra as
            avaliações vinculadas ao perfil da corretora. Ative quando houver um volume de
            avaliações para exibir.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <Switch
              id="reviewseguro-badge-switch"
              checked={enabled}
              disabled={isLoading || isSaving}
              onCheckedChange={handleToggle}
              aria-describedby="reviewseguro-badge-switch-help"
            />
            <div className="flex flex-col">
              <Label
                htmlFor="reviewseguro-badge-switch"
                className="text-sm font-semibold text-slate-800"
              >
                Exibir selo no rodapé da home
              </Label>
              <span id="reviewseguro-badge-switch-help" className="text-xs text-slate-500">
                {isLoading ? 'Carregando preferência...' : enabled ? 'Ativado' : 'Desativado'}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-80 shrink-0">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Prévia ilustrativa
          </span>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#0979B0]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                TRES ESSES CORRETORA DE SEGUROS LTDA
              </p>
              <div className="flex items-center gap-0.5 mt-0.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-slate-500">Avaliações no ReviewSeguro</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
