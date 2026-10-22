import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Star,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  MessageSquareQuote,
  Eye,
  EyeOff,
} from 'lucide-react'
import DashboardHeader from '@/components/DashboardHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GoogleIcon } from '@/components/SocialIcons'
import { toast } from '@/hooks/use-toast'
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialActive,
  swapTestimonialsOrder,
} from '@/services/testimonials'
import type { TestimonialRecord, TestimonialSource } from '@/types'

export default function TestimonialsDashboard() {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sourceFilter, setSourceFilter] = useState<'todos' | 'site' | 'google'>('todos')
  const [statusFilter, setStatusFilter] = useState<'todos' | 'ativos' | 'inativos'>('todos')

  // Modal de Criação / Edição
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TestimonialRecord | null>(null)
  const [formName, setFormName] = useState('')
  const [formText, setFormText] = useState('')
  const [formRating, setFormRating] = useState<number>(5)
  const [formSource, setFormSource] = useState<TestimonialSource>('google')
  const [formActive, setFormActive] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState(false)

  // Confirmação de Exclusão
  const [itemToDelete, setItemToDelete] = useState<TestimonialRecord | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Reordenação em andamento
  const [isReordering, setIsReordering] = useState(false)

  // Carregar lista de depoimentos
  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getTestimonials(undefined, 'sort_order')
      setTestimonials(data)
    } catch (err: any) {
      console.error('Erro ao carregar depoimentos:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar depoimentos',
        description: err?.message || 'Tente novamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  // Abrir modal para novo depoimento
  const handleOpenCreate = () => {
    setEditingItem(null)
    setFormName('')
    setFormText('')
    setFormRating(5)
    setFormSource('google')
    setFormActive(true)
    setIsDialogOpen(true)
  }

  // Abrir modal para edição
  const handleOpenEdit = (item: TestimonialRecord) => {
    setEditingItem(item)
    setFormName(item.name)
    setFormText(item.text)
    setFormRating(item.rating || 5)
    setFormSource(item.source)
    setFormActive(item.active)
    setIsDialogOpen(true)
  }

  // Salvar (criação ou edição)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formText.trim()) {
      toast({
        variant: 'destructive',
        title: 'Campos obrigatórios',
        description: 'Preencha o nome da pessoa/empresa e o texto do depoimento.',
      })
      return
    }

    setIsSaving(true)
    try {
      if (editingItem) {
        // Atualização
        const updated = await updateTestimonial(editingItem.id, {
          name: formName,
          text: formText,
          rating: formRating,
          source: formSource,
          active: formActive,
        })
        setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
        toast({
          title: 'Depoimento atualizado',
          description: `As alterações em "${updated.name}" foram salvas.`,
        })
      } else {
        // Criação: calculamos a próxima ordem (maior atual + 1)
        const maxOrder = testimonials.reduce((max, t) => Math.max(max, t.sort_order || 0), 0)
        const nextOrder = maxOrder + 1

        const created = await createTestimonial({
          name: formName,
          text: formText,
          rating: formRating,
          source: formSource,
          active: formActive,
          sort_order: nextOrder,
        })
        setTestimonials((prev) => [...prev, created])
        toast({
          title: 'Depoimento criado com sucesso',
          description: `"${created.name}" agora está cadastrado no sistema.`,
        })
      }
      setIsDialogOpen(false)
    } catch (err: any) {
      console.error('Erro ao salvar depoimento:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: err?.message || 'Tente novamente.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Alternar ativo/inativo
  const handleToggleActive = async (item: TestimonialRecord) => {
    try {
      // Otimista
      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, active: !item.active } : t)),
      )
      await toggleTestimonialActive(item.id, item.active)
      toast({
        title: item.active ? 'Depoimento desativado' : 'Depoimento ativado',
        description: item.active
          ? `"${item.name}" não será mais exibido na home.`
          : `"${item.name}" agora está visível na home pública.`,
      })
    } catch (err: any) {
      console.error('Erro ao alternar status:', err)
      fetchTestimonials()
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar status',
        description: err?.message || 'Tente novamente.',
      })
    }
  }

  // Confirmar exclusão
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)
    try {
      await deleteTestimonial(itemToDelete.id)
      setTestimonials((prev) => prev.filter((t) => t.id !== itemToDelete.id))
      toast({
        title: 'Depoimento excluído',
        description: 'O registro foi removido com sucesso.',
      })
    } catch (err: any) {
      console.error('Erro ao excluir depoimento:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir',
        description: err?.message || 'Tente novamente.',
      })
    } finally {
      setIsDeleting(false)
      setItemToDelete(null)
    }
  }

  // Subir na ordem
  const handleMoveUp = async (index: number) => {
    if (index <= 0 || isReordering) return
    const current = testimonials[index]
    const previous = testimonials[index - 1]

    setIsReordering(true)
    try {
      // Otimista na lista local
      const newList = [...testimonials]
      newList[index - 1] = current
      newList[index] = previous
      setTestimonials(newList)

      await swapTestimonialsOrder(
        { id: current.id, sort_order: current.sort_order },
        { id: previous.id, sort_order: previous.sort_order },
      )
    } catch (err: any) {
      console.error('Erro ao reordenar:', err)
      fetchTestimonials()
      toast({
        variant: 'destructive',
        title: 'Erro ao reordenar',
        description: 'Não foi possível alterar a ordem.',
      })
    } finally {
      setIsReordering(false)
    }
  }

  // Descer na ordem
  const handleMoveDown = async (index: number) => {
    if (index >= testimonials.length - 1 || isReordering) return
    const current = testimonials[index]
    const next = testimonials[index + 1]

    setIsReordering(true)
    try {
      const newList = [...testimonials]
      newList[index + 1] = current
      newList[index] = next
      setTestimonials(newList)

      await swapTestimonialsOrder(
        { id: current.id, sort_order: current.sort_order },
        { id: next.id, sort_order: next.sort_order },
      )
    } catch (err: any) {
      console.error('Erro ao reordenar:', err)
      fetchTestimonials()
      toast({
        variant: 'destructive',
        title: 'Erro ao reordenar',
        description: 'Não foi possível alterar a ordem.',
      })
    } finally {
      setIsReordering(false)
    }
  }

  // Contadores
  const totalCount = testimonials.length
  const activeCount = testimonials.filter((t) => t.active).length
  const inactiveCount = totalCount - activeCount
  const googleCount = testimonials.filter((t) => t.source === 'google').length

  // Depoimentos filtrados
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      if (sourceFilter !== 'todos' && item.source !== sourceFilter) return false
      if (statusFilter === 'ativos' && !item.active) return false
      if (statusFilter === 'inativos' && item.active) return false

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesText = item.text.toLowerCase().includes(query)
        if (!matchesName && !matchesText) return false
      }

      return true
    })
  }, [testimonials, sourceFilter, statusFilter, searchQuery])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DashboardHeader currentTab="depoimentos" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Cabeçalho da Página */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/60 text-xs font-semibold text-[#0979B0] mb-2">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#0CB7F2]" />
              Prova Social da Home
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#004173] tracking-tight">
              Gerenciar Depoimentos
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Cadastre e edite os depoimentos de clientes que aparecem na home. Seus depoimentos
              reais podem substituir os exemplos fictícios a qualquer momento.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchTestimonials}
              disabled={isLoading}
              className="rounded-xl border-slate-200 hover:bg-white text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#0979B0]' : ''}`}
              />
              <span>Atualizar</span>
            </Button>

            <Button
              onClick={handleOpenCreate}
              size="sm"
              className="rounded-xl bg-[#004173] hover:bg-[#00335c] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Depoimento</span>
            </Button>
          </div>
        </div>

        {/* ALERTA INFORMATIVO SOBRE REQUISITO DO SISTEMA */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-white text-[#0979B0] shadow-sm border border-sky-200 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-[#0CB7F2]" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700 space-y-1">
            <p className="font-semibold text-[#004173]">
              Como funciona a exibição no site público:
            </p>
            <p className="text-slate-600 leading-relaxed">
              •{' '}
              <strong>
                A seção de depoimentos da home fica oculta quando não há depoimentos ativos.
              </strong>{' '}
              Se todos forem desativados ou excluídos, a home esconde o carrossel automaticamente
              sem deixar espaços vazios.
            </p>
            <p className="text-slate-600 leading-relaxed">
              • Os depoimentos cadastrados alimentam o <strong>carrossel infinito</strong> da home
              sem limite de quantidade. No desktop, aparecem 3 no centro e os laterais desfocados;
              no mobile, 1 em destaque com suporte a arrastar com o dedo.
            </p>
          </div>
        </div>

        {/* CARDS DE RESUMO (MÉTRICAS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Total Cadastrados
              </span>
              <span className="font-serif font-black text-2xl sm:text-3xl text-slate-900 mt-1 block">
                {totalCount}
              </span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#004173] flex items-center justify-center">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-sm flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500" />
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                Ativos no Site
              </span>
              <span className="font-serif font-black text-2xl sm:text-3xl text-emerald-600 mt-1 block">
                {activeCount}
              </span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Inativos (Pausados)
              </span>
              <span className="font-serif font-black text-2xl sm:text-3xl text-slate-600 mt-1 block">
                {inactiveCount}
              </span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
                Origem Google
              </span>
              <span className="font-serif font-black text-2xl sm:text-3xl text-amber-600 mt-1 block">
                {googleCount}
              </span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <GoogleIcon className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>

        {/* BARRA DE FILTROS E BUSCA */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-1">Status:</span>
            <Button
              variant={statusFilter === 'todos' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('todos')}
              className={`rounded-xl text-xs h-8 px-3 ${
                statusFilter === 'todos'
                  ? 'bg-[#004173] text-white hover:bg-[#00335c]'
                  : 'text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Todos ({totalCount})
            </Button>
            <Button
              variant={statusFilter === 'ativos' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('ativos')}
              className={`rounded-xl text-xs h-8 px-3 ${
                statusFilter === 'ativos'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'text-emerald-700 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50'
              }`}
            >
              Ativos ({activeCount})
            </Button>
            <Button
              variant={statusFilter === 'inativos' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('inativos')}
              className={`rounded-xl text-xs h-8 px-3 ${
                statusFilter === 'inativos'
                  ? 'bg-slate-700 text-white hover:bg-slate-800'
                  : 'text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Inativos ({inactiveCount})
            </Button>

            <span className="text-xs font-semibold text-slate-500 ml-2 mr-1">Origem:</span>
            <Button
              variant={sourceFilter === 'todos' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSourceFilter('todos')}
              className={`rounded-xl text-xs h-8 px-2.5 ${
                sourceFilter === 'todos'
                  ? 'bg-[#004173] text-white hover:bg-[#00335c]'
                  : 'text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Todas
            </Button>
            <Button
              variant={sourceFilter === 'google' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSourceFilter('google')}
              className={`rounded-xl text-xs h-8 px-2.5 flex items-center gap-1.5 ${
                sourceFilter === 'google'
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'text-amber-700 border-amber-200 bg-amber-50/50 hover:bg-amber-100/50'
              }`}
            >
              <GoogleIcon className="w-3.5 h-3.5 fill-current" />
              <span>Google ({googleCount})</span>
            </Button>
            <Button
              variant={sourceFilter === 'site' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSourceFilter('site')}
              className={`rounded-xl text-xs h-8 px-2.5 ${
                sourceFilter === 'site'
                  ? 'bg-[#0979B0] text-white hover:bg-[#086898]'
                  : 'text-[#0979B0] border-sky-200 bg-sky-50/50 hover:bg-sky-100/50'
              }`}
            >
              Site ({totalCount - googleCount})
            </Button>
          </div>

          <div className="relative w-full md:w-72">
            <Input
              type="text"
              placeholder="Buscar por nome ou conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl h-9 pl-9 pr-4 text-xs border-slate-200 focus-visible:ring-[#004173]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* LISTAGEM DE DEPOIMENTOS */}
        {filteredTestimonials.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0979B0] flex items-center justify-center mb-4">
              <MessageSquareQuote className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">
              {searchQuery || sourceFilter !== 'todos' || statusFilter !== 'todos'
                ? 'Nenhum depoimento encontrado para este filtro'
                : 'Nenhum depoimento cadastrado'}
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mb-6">
              {searchQuery || sourceFilter !== 'todos' || statusFilter !== 'todos'
                ? 'Tente remover os filtros ou pesquisar com outros termos.'
                : 'Cadastre o primeiro depoimento de cliente para exibi-lo na home.'}
            </p>
            {searchQuery || sourceFilter !== 'todos' || statusFilter !== 'todos' ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setSourceFilter('todos')
                  setStatusFilter('todos')
                }}
                className="rounded-xl text-xs"
              >
                Limpar filtros
              </Button>
            ) : (
              <Button
                onClick={handleOpenCreate}
                size="sm"
                className="rounded-xl bg-[#004173] hover:bg-[#00335c] text-white text-xs font-semibold"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Cadastrar Depoimento
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTestimonials.map((item, index) => {
              const originalIndex = testimonials.findIndex((t) => t.id === item.id)
              const canMoveUp = originalIndex > 0
              const canMoveDown = originalIndex < testimonials.length - 1

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all duration-200 shadow-sm hover:shadow-md ${
                    item.active
                      ? 'border-slate-200/90'
                      : 'border-slate-200/50 bg-slate-50/70 opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Informações Principais */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Status Ativo/Inativo */}
                        {item.active ? (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Ativo na Home
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-600 border-slate-200 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Inativo (Oculto)
                          </Badge>
                        )}

                        {/* Badge de Origem */}
                        {item.source === 'google' ? (
                          <Badge className="bg-amber-50 text-amber-800 border-amber-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                            <GoogleIcon className="w-3 h-3 fill-current text-amber-600" />
                            <span>Avaliação do Google</span>
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-sky-200 text-[#0979B0] bg-sky-50 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                          >
                            Enviado pelo Site
                          </Badge>
                        )}

                        {/* Estrelas */}
                        <div className="flex items-center gap-0.5 text-amber-400 ml-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>

                        {/* Ordem */}
                        <span className="text-[11px] text-slate-400 font-mono">
                          Ordem #{originalIndex + 1}
                        </span>
                      </div>

                      {/* Nome do Autor */}
                      <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">
                        {item.name}
                      </h3>

                      {/* Texto do Depoimento */}
                      <p className="text-slate-700 text-sm leading-relaxed italic bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                        &quot;{item.text}&quot;
                      </p>
                    </div>

                    {/* Barra de Ações Rápidas */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Controles de Ordenação (Subir / Descer) */}
                      <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveUp(originalIndex)}
                          disabled={!canMoveUp || isReordering}
                          className="h-8 w-8 p-0 text-slate-600 hover:text-[#004173] hover:bg-white rounded-lg disabled:opacity-30"
                          title="Mover para cima na fila do carrossel"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveDown(originalIndex)}
                          disabled={!canMoveDown || isReordering}
                          className="h-8 w-8 p-0 text-slate-600 hover:text-[#004173] hover:bg-white rounded-lg disabled:opacity-30"
                          title="Mover para baixo na fila do carrossel"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Ações: Ativar/Pausar, Editar, Excluir */}
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(item)}
                          className={`h-8 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                            item.active
                              ? 'text-amber-700 border-amber-200 hover:bg-amber-50'
                              : 'text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                          }`}
                          title={
                            item.active ? 'Pausar exibição na home' : 'Ativar exibição na home'
                          }
                        >
                          {item.active ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Pausar</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Ativar</span>
                            </>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(item)}
                          className="h-8 px-2.5 rounded-xl text-xs font-medium text-slate-700 border-slate-200 hover:text-[#004173] hover:bg-sky-50"
                          title="Editar dados deste depoimento"
                        >
                          <Pencil className="w-3.5 h-3.5 mr-1 text-[#0979B0]" />
                          <span>Editar</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setItemToDelete(item)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                          title="Excluir depoimento permanentemente"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* MODAL DIALOG: CRIAR OU EDITAR DEPOIMENTO */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-6">
          <form onSubmit={handleSave}>
            <DialogHeader className="mb-4">
              <DialogTitle className="font-serif font-bold text-xl text-[#004173]">
                {editingItem ? 'Editar Depoimento' : 'Novo Depoimento de Cliente'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Os dados preenchidos serão exibidos nos cards do carrossel na página inicial do
                site.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Nome do Cliente / Autor */}
              <div className="space-y-1.5">
                <Label htmlFor="testimonial-name" className="text-xs font-semibold text-slate-700">
                  Nome do Cliente / Empresa <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="testimonial-name"
                  placeholder="Ex: Marcelo Santoro — Cliente Seguro Auto"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="rounded-xl text-sm border-slate-200 focus-visible:ring-[#004173]"
                  required
                />
                <p className="text-[11px] text-slate-400">
                  Dica: você pode colocar &quot;Nome Sobrenome&quot; ou adicionar cargo/tipo (ex:
                  Cláudia Regina — Empresária).
                </p>
              </div>

              {/* Origem e Avaliação (Estrelas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="testimonial-source"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Origem do Depoimento
                  </Label>
                  <Select
                    value={formSource}
                    onValueChange={(val: TestimonialSource) => setFormSource(val)}
                  >
                    <SelectTrigger
                      id="testimonial-source"
                      className="rounded-xl text-xs border-slate-200"
                    >
                      <SelectValue placeholder="Selecione a origem" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl text-xs">
                      <SelectItem value="google">Google Meu Negócio (com selo)</SelectItem>
                      <SelectItem value="site">Enviado diretamente à corretora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="testimonial-rating"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Nota / Estrelas (1 a 5)
                  </Label>
                  <Select
                    value={String(formRating)}
                    onValueChange={(val) => setFormRating(Number(val))}
                  >
                    <SelectTrigger
                      id="testimonial-rating"
                      className="rounded-xl text-xs border-slate-200"
                    >
                      <SelectValue placeholder="Selecione as estrelas" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl text-xs">
                      <SelectItem value="5">★★★★★ 5 Estrelas (Excelente)</SelectItem>
                      <SelectItem value="4">★★★★☆ 4 Estrelas (Muito bom)</SelectItem>
                      <SelectItem value="3">★★★☆☆ 3 Estrelas (Bom)</SelectItem>
                      <SelectItem value="2">★★☆☆☆ 2 Estrelas (Regular)</SelectItem>
                      <SelectItem value="1">★☆☆☆☆ 1 Estrela</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Texto do Depoimento */}
              <div className="space-y-1.5">
                <Label htmlFor="testimonial-text" className="text-xs font-semibold text-slate-700">
                  Texto do Depoimento <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="testimonial-text"
                  placeholder="Conte o relato do cliente, atendimento recebido, sinistro atendido ou benefício alcançado..."
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  rows={4}
                  className="rounded-xl text-sm border-slate-200 focus-visible:ring-[#004173] leading-relaxed resize-none"
                  required
                />
              </div>

              {/* Status Ativo (checkbox ou seletor amigável) */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Exibir na home</span>
                  <span className="text-[11px] text-slate-500">
                    Se desmarcado, fica salvo aqui sem aparecer para os visitantes.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setFormActive(!formActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    formActive ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                  role="switch"
                  aria-checked={formActive}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <DialogFooter className="mt-6 flex flex-row items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSaving}
                className="rounded-xl text-xs"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-[#004173] hover:bg-[#00335c] text-white text-xs font-semibold"
              >
                {isSaving
                  ? 'Salvando...'
                  : editingItem
                    ? 'Salvar Alterações'
                    : 'Cadastrar Depoimento'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* CONFIRMAÇÃO DE EXCLUSÃO */}
      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent className="rounded-3xl p-6 sm:max-w-md">
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <AlertDialogTitle className="font-serif font-bold text-xl text-slate-900">
              Excluir este depoimento?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Você está prestes a excluir o depoimento de{' '}
              <strong className="text-slate-900">&quot;{itemToDelete?.name}&quot;</strong>. Esta
              ação não poderá ser desfeita e ele deixará de ser exibido na home.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 flex flex-row items-center justify-end gap-2">
            <AlertDialogCancel disabled={isDeleting} className="rounded-xl text-xs">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
            >
              {isDeleting ? 'Excluindo...' : 'Sim, Excluir Depoimento'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
