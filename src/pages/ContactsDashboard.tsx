import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import {
  Inbox,
  CheckCircle,
  Clock,
  Search,
  Trash2,
  Phone,
  Mail,
  RefreshCw,
  Filter,
  ArrowUpDown,
  AlertTriangle,
  DownloadCloud,
  KeyRound,
} from 'lucide-react'
import DashboardHeader from '@/components/DashboardHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { useAuth } from '@/contexts/AuthContext'
import { useRealtime } from '@/hooks/use-realtime'
import { getContacts, updateContactStatus, deleteContact } from '@/services/contacts'
import { toast } from '@/hooks/use-toast'
import {
  CONTACT_NEED_LABELS,
  type ContactRecord,
  type ContactStatus,
  type ContactNeed,
} from '@/types'

export default function ContactsDashboard() {
  const [contacts, setContacts] = useState<ContactRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'todos' | 'novo' | 'respondido'>('todos')
  const [sortOrder, setSortOrder] = useState<'-created' | 'created'>('-created')

  // Item selecionado para exclusão
  const [contactToDelete, setContactToDelete] = useState<ContactRecord | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Mensagens expandidas no card / tabela
  const [expandedMessages, setExpandedMessages] = useState<Record<string, boolean>>({})

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Carregar contatos da API
  const fetchContacts = useCallback(async () => {
    try {
      const data = await getContacts(undefined, sortOrder)
      setContacts(data)
    } catch (err: any) {
      console.error('Erro ao carregar contatos:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar contatos',
        description: err?.message || 'Verifique sua conexão ou tente novamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }, [sortOrder])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  // Realtime hook para novos leads ou atualizações sem refresh
  useRealtime<ContactRecord>('contacts', (event) => {
    if (event.action === 'create') {
      setContacts((prev) => [event.record, ...prev.filter((r) => r.id !== event.record.id)])
      toast({
        title: 'Novo contato recebido!',
        description: `${event.record.name} solicitou atendimento.`,
      })
    } else if (event.action === 'update') {
      setContacts((prev) => prev.map((r) => (r.id === event.record.id ? event.record : r)))
    } else if (event.action === 'delete') {
      setContacts((prev) => prev.filter((r) => r.id !== event.record.id))
    }
  })

  // Alternar status do contato inline
  const handleStatusChange = async (contactId: string, newStatus: ContactStatus) => {
    try {
      // Atualização otimista
      setContacts((prev) => prev.map((c) => (c.id === contactId ? { ...c, status: newStatus } : c)))

      await updateContactStatus(contactId, newStatus)

      toast({
        title: 'Status atualizado',
        description: `Contato marcado como ${newStatus === 'novo' ? 'Novo' : 'Respondido'}.`,
      })
    } catch (err: any) {
      console.error('Erro ao atualizar status:', err)
      fetchContacts() // reverte em caso de erro
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar status',
        description: err?.message || 'Tente novamente.',
      })
    }
  }

  // Confirmar exclusão
  const handleConfirmDelete = async () => {
    if (!contactToDelete) return
    setIsDeleting(true)
    try {
      await deleteContact(contactToDelete.id)
      setContacts((prev) => prev.filter((c) => c.id !== contactToDelete.id))
      toast({
        title: 'Contato excluído',
        description: 'O registro foi removido com sucesso.',
      })
    } catch (err: any) {
      console.error('Erro ao excluir contato:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir contato',
        description: err?.message || 'Tente novamente.',
      })
    } finally {
      setIsDeleting(false)
      setContactToDelete(null)
    }
  }

  const toggleMessageExpand = (id: string) => {
    setExpandedMessages((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Métricas
  const totalCount = contacts.length
  const newCount = contacts.filter((c) => c.status === 'novo').length
  const answeredCount = contacts.filter((c) => c.status === 'respondido').length

  // Filtragem e Busca
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      // Filtro de status
      if (statusFilter !== 'todos' && c.status !== statusFilter) {
        return false
      }

      // Busca por nome, whatsapp, email, contact antigo ou necessidade
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesName = c.name.toLowerCase().includes(query)
        const matchesWhatsapp = (c.whatsapp || '').toLowerCase().includes(query)
        const matchesEmail = (c.email || '').toLowerCase().includes(query)
        const matchesContact = (c.contact || '').toLowerCase().includes(query)
        const matchesNeed = (CONTACT_NEED_LABELS[c.need] || '').toLowerCase().includes(query)
        const matchesMessage = (c.message || '').toLowerCase().includes(query)
        if (
          !matchesName &&
          !matchesWhatsapp &&
          !matchesEmail &&
          !matchesContact &&
          !matchesNeed &&
          !matchesMessage
        ) {
          return false
        }
      }

      return true
    })
  }, [contacts, statusFilter, searchQuery])

  // Formatação de data amigável em pt-BR
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    } catch {
      return dateString
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/painel', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar unificada do Painel */}
      <DashboardHeader currentTab="contatos" />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Cabeçalho da Página */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#004173] tracking-tight">
              Contatos e Solicitações
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Gerencie os pedidos de cotação recebidos através da landing page.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/painel/depoimentos"
              className="sm:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-50 text-[#004173] text-xs font-semibold border border-sky-200/60"
            >
              <span>Depoimentos</span>
            </Link>
            <Link
              to="/painel/recursos"
              className="sm:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-50 text-[#004173] text-xs font-semibold border border-sky-200/60"
            >
              <DownloadCloud className="w-3.5 h-3.5 text-[#0979B0]" />
              <span>Ícones</span>
            </Link>
            <Link
              to="/painel/alterar-senha"
              className="sm:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-50 text-[#004173] text-xs font-semibold border border-sky-200/60"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#0979B0]" />
              <span>Senha</span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchContacts}
              disabled={isLoading}
              className="rounded-xl border-slate-200 hover:bg-white text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#0979B0]' : ''}`}
              />
              <span>Atualizar</span>
            </Button>
          </div>
        </div>

        {/* 1. CARDS DE RESUMO (MÉTRICAS) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Card Total */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Total de Contatos
              </span>
              <span className="font-serif font-black text-3xl text-slate-900 mt-1 block">
                {totalCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#004173] flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          {/* Card Novos */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-sm flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-amber-400" />
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
                Novos (Aguardando)
              </span>
              <span className="font-serif font-black text-3xl text-amber-600 mt-1 block">
                {newCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card Respondidos */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-sm flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500" />
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                Respondidos
              </span>
              <span className="font-serif font-black text-3xl text-emerald-600 mt-1 block">
                {answeredCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 2. BARRA DE FILTROS, BUSCA E ORDENAÇÃO */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filtrar:
            </span>
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
              variant={statusFilter === 'novo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('novo')}
              className={`rounded-xl text-xs h-8 px-3 ${
                statusFilter === 'novo'
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'text-amber-700 border-amber-200 bg-amber-50/50 hover:bg-amber-100/50'
              }`}
            >
              Novos ({newCount})
            </Button>

            <Button
              variant={statusFilter === 'respondido' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('respondido')}
              className={`rounded-xl text-xs h-8 px-3 ${
                statusFilter === 'respondido'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'text-emerald-700 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50'
              }`}
            >
              Respondidos ({answeredCount})
            </Button>
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Input
                type="text"
                placeholder="Buscar por nome, contato ou necessidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl h-9 pl-9 pr-4 text-xs border-slate-200 focus-visible:ring-[#004173]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <Select
              value={sortOrder}
              onValueChange={(val: '-created' | 'created') => setSortOrder(val)}
            >
              <SelectTrigger className="rounded-xl h-9 text-xs border-slate-200 w-[140px]">
                <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent className="rounded-xl text-xs">
                <SelectItem value="-created">Mais recentes</SelectItem>
                <SelectItem value="created">Mais antigos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 3. LISTA DE CONTATOS (TABELA DESKTOP / CARDS MOBILE) */}
        {filteredContacts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm animate-fade-in flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0979B0] flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">
              {searchQuery || statusFilter !== 'todos'
                ? 'Nenhum contato encontrado para este filtro'
                : 'Nenhum contato ainda'}
            </h3>
            <p className="text-sm text-slate-500 max-w-sm">
              {searchQuery || statusFilter !== 'todos'
                ? 'Tente ajustar os termos da busca ou selecionar outro status.'
                : 'Os leads recebidos através da página inicial aparecerão aqui automaticamente.'}
            </p>
            {(searchQuery || statusFilter !== 'todos') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setStatusFilter('todos')
                }}
                className="mt-4 rounded-xl text-xs"
              >
                Limpar filtros
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View (>= 1024px) */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Nome do Lead</th>
                      <th className="py-3.5 px-4">WhatsApp</th>
                      <th className="py-3.5 px-4">E-mail</th>
                      <th className="py-3.5 px-4">Necessidade</th>
                      <th className="py-3.5 px-4">Mensagem</th>
                      <th className="py-3.5 px-4">Recebido em</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredContacts.map((contact) => {
                      const isExpanded = !!expandedMessages[contact.id]
                      // Resolver whatsapp e email considerando fallback para legado em contact
                      const whatsappValue =
                        contact.whatsapp || (!contact.contact?.includes('@') ? contact.contact : '')
                      const emailValue =
                        contact.email || (contact.contact?.includes('@') ? contact.contact : '')
                      const whatsappDigits = whatsappValue.replace(/\D/g, '')

                      return (
                        <tr
                          key={contact.id}
                          className="hover:bg-slate-50/80 transition-colors group"
                        >
                          {/* Nome */}
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-900 text-sm block">
                              {contact.name}
                            </span>
                          </td>

                          {/* WhatsApp */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 font-medium text-slate-800">
                              {whatsappDigits ? (
                                <>
                                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <a
                                    href={`https://api.whatsapp.com/send?phone=55${whatsappDigits}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#004173] hover:underline text-emerald-700 font-semibold"
                                    title="Chamar no WhatsApp"
                                  >
                                    {whatsappValue}
                                  </a>
                                </>
                              ) : (
                                <span className="text-slate-400 italic">—</span>
                              )}
                            </div>
                          </td>

                          {/* E-mail */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 font-medium text-slate-800">
                              {emailValue ? (
                                <>
                                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <a
                                    href={`mailto:${emailValue}`}
                                    className="hover:text-[#004173] hover:underline text-slate-700"
                                    title="Enviar e-mail"
                                  >
                                    {emailValue}
                                  </a>
                                </>
                              ) : (
                                <span className="text-slate-400 italic">—</span>
                              )}
                            </div>
                          </td>

                          {/* Necessidade */}
                          <td className="py-3.5 px-4">
                            <Badge
                              variant="secondary"
                              className="bg-sky-50 text-[#0979B0] border border-sky-100 rounded-lg font-medium text-[11px]"
                            >
                              {CONTACT_NEED_LABELS[contact.need] || contact.need}
                            </Badge>
                          </td>

                          {/* Mensagem */}
                          <td className="py-3.5 px-4 max-w-xs">
                            {contact.message ? (
                              <div>
                                <p className={`text-slate-600 ${isExpanded ? '' : 'line-clamp-2'}`}>
                                  {contact.message}
                                </p>
                                {contact.message.length > 80 && (
                                  <button
                                    type="button"
                                    onClick={() => toggleMessageExpand(contact.id)}
                                    className="text-[11px] font-semibold text-[#0979B0] hover:underline mt-1"
                                  >
                                    {isExpanded ? 'Ver menos' : 'Ver mais'}
                                  </button>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">Sem mensagem</span>
                            )}
                          </td>

                          {/* Recebido em */}
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                            {formatDate(contact.created)}
                          </td>

                          {/* Status Inline */}
                          <td className="py-3.5 px-4">
                            <Select
                              value={contact.status}
                              onValueChange={(val: ContactStatus) =>
                                handleStatusChange(contact.id, val)
                              }
                            >
                              <SelectTrigger
                                className={`rounded-xl h-8 text-xs font-semibold w-[125px] border ${
                                  contact.status === 'novo'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                }`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl text-xs">
                                <SelectItem value="novo" className="text-amber-700 font-medium">
                                  ● Novo
                                </SelectItem>
                                <SelectItem
                                  value="respondido"
                                  className="text-emerald-700 font-medium"
                                >
                                  ✓ Respondido
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </td>

                          {/* Ações */}
                          <td className="py-3.5 px-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setContactToDelete(contact)}
                              className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-1.5 h-8 w-8"
                              title="Excluir contato"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile / Tablet Card View (< 1024px) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
              {filteredContacts.map((contact) => {
                const isExpanded = !!expandedMessages[contact.id]
                const whatsappValue =
                  contact.whatsapp || (!contact.contact?.includes('@') ? contact.contact : '')
                const emailValue =
                  contact.email || (contact.contact?.includes('@') ? contact.contact : '')
                const whatsappDigits = whatsappValue.replace(/\D/g, '')

                return (
                  <div
                    key={contact.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif font-bold text-base text-slate-900">
                            {contact.name}
                          </h3>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            Recebido em {formatDate(contact.created)}
                          </span>
                        </div>

                        <Select
                          value={contact.status}
                          onValueChange={(val: ContactStatus) =>
                            handleStatusChange(contact.id, val)
                          }
                        >
                          <SelectTrigger
                            className={`rounded-xl h-8 text-xs font-semibold w-[120px] border ${
                              contact.status === 'novo'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl text-xs">
                            <SelectItem value="novo" className="text-amber-700 font-medium">
                              ● Novo
                            </SelectItem>
                            <SelectItem value="respondido" className="text-emerald-700 font-medium">
                              ✓ Respondido
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-sky-50 text-[#0979B0] border border-sky-100 rounded-lg font-medium text-xs"
                        >
                          {CONTACT_NEED_LABELS[contact.need] || contact.need}
                        </Badge>
                      </div>

                      {/* Contatos Separados: WhatsApp e E-mail */}
                      <div className="space-y-2">
                        {whatsappValue && (
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-medium">WhatsApp:</span>
                            <a
                              href={`https://api.whatsapp.com/send?phone=55${whatsappDigits}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-emerald-700 hover:underline flex items-center gap-1.5"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-600" />
                              {whatsappValue}
                            </a>
                          </div>
                        )}

                        {emailValue && (
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-medium">E-mail:</span>
                            <a
                              href={`mailto:${emailValue}`}
                              className="font-semibold text-[#004173] hover:underline flex items-center gap-1.5 truncate max-w-[200px]"
                              title={emailValue}
                            >
                              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{emailValue}</span>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Mensagem */}
                      {contact.message && (
                        <div className="text-xs text-slate-600 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                          <p className={isExpanded ? '' : 'line-clamp-3'}>{contact.message}</p>
                          {contact.message.length > 100 && (
                            <button
                              type="button"
                              onClick={() => toggleMessageExpand(contact.id)}
                              className="text-[11px] font-semibold text-[#0979B0] hover:underline mt-1 block"
                            >
                              {isExpanded ? 'Ver menos' : 'Ver mais'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">ID: {contact.id}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setContactToDelete(contact)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs h-8 px-2.5 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Excluir</span>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>

      {/* DIÁLOGO DE CONFIRMAÇÃO DE EXCLUSÃO */}
      <AlertDialog
        open={!!contactToDelete}
        onOpenChange={(open) => !open && setContactToDelete(null)}
      >
        <AlertDialogContent className="rounded-3xl max-w-md">
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <AlertDialogTitle className="font-serif font-bold text-xl text-slate-900">
              Confirmar Exclusão
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-slate-600">
              Tem certeza que deseja excluir o contato de{' '}
              <strong className="text-slate-900">{contactToDelete?.name}</strong>? Esta ação não
              poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel disabled={isDeleting} className="rounded-xl border-slate-200">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              {isDeleting ? 'Excluindo...' : 'Excluir Contato'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
