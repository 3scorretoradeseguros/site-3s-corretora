import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { useAuth } from '@/contexts/AuthContext'
import { ICON_RESOURCES, type IconResourceItem } from '@/lib/iconResources'
import { downloadSvgString, downloadSvgAsPng } from '@/lib/downloadHelpers'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Download,
  FileCode,
  ImageIcon,
  Search,
  LogOut,
  ExternalLink,
  Sparkles,
  Palette,
  Check,
  Layers,
  Copy,
  Info,
} from 'lucide-react'

// Paleta de cores da marca 3S disponíveis para pré-visualização e download
const COLOR_PRESETS = [
  { label: 'Azul 3S (Padrão)', value: '#0979B0' },
  { label: 'Azul Corporativo', value: '#004173' },
  { label: 'Ciano Vivo', value: '#0CB7F2' },
  { label: 'Grafite Escuro', value: '#1E293B' },
  { label: 'Branco (Fundo Escuro)', value: '#FFFFFF' },
]

export default function ResourcesIcons() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'seguros' | 'diferenciais'>(
    'todos',
  )
  const [selectedColor, setSelectedColor] = useState('#0979B0')
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleLogout = () => {
    logout()
    navigate('/painel', { replace: true })
  }

  // Filtragem dos ícones
  const filteredIcons = useMemo(() => {
    return ICON_RESOURCES.filter((icon) => {
      if (selectedCategory !== 'todos' && icon.category !== selectedCategory) {
        return false
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchTitle = icon.title.toLowerCase().includes(query)
        const matchDesc = icon.description.toLowerCase().includes(query)
        const matchKeywords = icon.keywords.some((k) => k.toLowerCase().includes(query))
        if (!matchTitle && !matchDesc && !matchKeywords) {
          return false
        }
      }

      return true
    })
  }, [selectedCategory, searchQuery])

  // Download SVG
  const handleDownloadSvg = (icon: IconResourceItem) => {
    try {
      const markup = icon.getSvgMarkup({ color: selectedColor, size: 512 })
      downloadSvgString(markup, `${icon.recommendedFileName}.svg`)
      toast({
        title: 'Download iniciado (SVG)',
        description: `Arquivo ${icon.recommendedFileName}.svg gerado com sucesso.`,
      })
    } catch (err: any) {
      console.error('Erro ao baixar SVG:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar SVG',
        description: err?.message || 'Tente novamente.',
      })
    }
  }

  // Download PNG (512x512)
  const handleDownloadPng = async (icon: IconResourceItem) => {
    setDownloadingId(icon.id)
    try {
      const markup = icon.getSvgMarkup({ color: selectedColor, size: 512 })
      await downloadSvgAsPng(markup, `${icon.recommendedFileName}-512x512.png`, 512, 512)
      toast({
        title: 'Download iniciado (PNG)',
        description: `Imagem PNG 512x512 com fundo transparente gerada com sucesso.`,
      })
    } catch (err: any) {
      console.error('Erro ao renderizar PNG:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar PNG',
        description: err?.message || 'Tente novamente.',
      })
    } finally {
      setDownloadingId(null)
    }
  }

  // Copiar código SVG para o clipboard
  const handleCopySvgCode = async (icon: IconResourceItem) => {
    try {
      const markup = icon.getSvgMarkup({ color: selectedColor, size: 24 })
      await navigator.clipboard.writeText(markup)
      setCopiedId(icon.id)
      toast({
        title: 'Código SVG copiado!',
        description: 'Cole diretamente no Figma, Canva, HTML ou Illustrator.',
      })
      setTimeout(() => setCopiedId(null), 2500)
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro ao copiar',
        description: 'Permissão de área de transferência não concedida.',
      })
    }
  }

  // Baixar pacote completo em lote (todos os SVGs)
  const handleDownloadAllSvgs = () => {
    let count = 0
    filteredIcons.forEach((icon, index) => {
      setTimeout(() => {
        const markup = icon.getSvgMarkup({ color: selectedColor, size: 512 })
        downloadSvgString(markup, `${icon.recommendedFileName}.svg`)
      }, index * 250)
      count++
    })
    toast({
      title: `Baixando ${count} ícones em SVG...`,
      description: 'Os arquivos estão sendo descarregados pelo navegador.',
    })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top bar dedicada da área logada */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/painel/contatos" className="flex items-center gap-2.5 group">
                <div className="p-1 rounded-xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center">
                  <Logo height={32} showText={false} alt="3S Corretora de Seguros" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-sm leading-tight text-[#004173]">
                    3S Corretora
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    Área Logada
                  </span>
                </div>
              </Link>
            </div>

            {/* Navegação entre seções da área logada */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
              <Link
                to="/painel/contatos"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#004173] hover:bg-white/60 transition-colors"
              >
                Contatos & Leads
              </Link>
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#004173] shadow-sm">
                Recursos & Ícones
              </span>
            </div>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-[#004173] text-white flex items-center justify-center text-xs font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-slate-800 block leading-tight max-w-[140px] truncate">
                    {user?.name || user?.email || 'Corretora'}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium block">
                    Autenticado
                  </span>
                </div>
              </div>

              <Link
                to="/"
                target="_blank"
                className="hidden lg:inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-[#004173] rounded-xl hover:bg-slate-100 transition-colors"
                title="Abrir site público em nova aba"
              >
                <span>Ver Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-1.5 text-xs font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Breadcrumb e botão Voltar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/painel/contatos"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#004173] px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#0979B0]" />
            <span>Voltar ao Painel de Contatos</span>
          </Link>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Acesso Restrito da Corretora
          </span>
        </div>

        {/* Hero Banner do Repositório de Recursos */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#004173] via-[#0979B0] to-[#002b4d] text-white p-6 sm:p-8 lg:p-10 mb-8 shadow-xl shadow-[#004173]/15">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#0CB7F2]" />
              Biblioteca Oficial de Ativos Vetoriais
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight mb-3">
              Download de Ícones e Ativos Gráficos 3S
            </h1>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed max-w-2xl">
              Coleção de todos os ícones desenhados para os 12 ramos de seguros e diferenciais do
              site. Faça download em <strong>SVG vetorizado</strong> para designers, desenvolvimento
              web e impressão, ou em <strong>PNG transparente de 512×512</strong> pronto para redes
              sociais, WhatsApp e Google Meu Negócio.
            </p>
          </div>
        </div>

        {/* BARRA DE CONTROLE: Busca, Filtros de Categoria, Seletor de Cores e Ações Rápidas */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Campo de Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="Buscar por seguro, veículo, residencial, saúde..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl border-slate-200 text-sm focus-visible:ring-[#004173]"
              />
            </div>

            {/* Filtros de Categoria */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={selectedCategory === 'todos' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('todos')}
                className={`rounded-xl text-xs h-9 px-3.5 ${
                  selectedCategory === 'todos'
                    ? 'bg-[#004173] text-white hover:bg-[#00335c]'
                    : 'text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-3.5 h-3.5 mr-1.5" />
                Todos ({ICON_RESOURCES.length})
              </Button>
              <Button
                variant={selectedCategory === 'seguros' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('seguros')}
                className={`rounded-xl text-xs h-9 px-3.5 ${
                  selectedCategory === 'seguros'
                    ? 'bg-[#004173] text-white hover:bg-[#00335c]'
                    : 'text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Seguros & Ramos (12)
              </Button>
              <Button
                variant={selectedCategory === 'diferenciais' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('diferenciais')}
                className={`rounded-xl text-xs h-9 px-3.5 ${
                  selectedCategory === 'diferenciais'
                    ? 'bg-[#004173] text-white hover:bg-[#00335c]'
                    : 'text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Diferenciais & Emblemas (4)
              </Button>
            </div>
          </div>

          {/* Seletor de Cor do Traço / SVG */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5 mr-1">
                <Palette className="w-4 h-4 text-[#0979B0]" />
                Cor do Traço SVG:
              </span>
              {COLOR_PRESETS.map((preset) => {
                const isSelected = selectedColor === preset.value
                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setSelectedColor(preset.value)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? 'border-[#004173] bg-sky-50 text-[#004173] font-semibold ring-2 ring-[#004173]/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: preset.value }}
                    />
                    <span>{preset.label}</span>
                  </button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadAllSvgs}
              className="rounded-xl border-[#0979B0]/40 text-[#004173] hover:bg-sky-50 text-xs font-semibold h-8 shrink-0 self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5 mr-1 text-[#0979B0]" />
              Baixar todos os {filteredIcons.length} em SVG
            </Button>
          </div>
        </div>

        {/* GRADE DE ÍCONES */}
        {filteredIcons.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">
            <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-800">Nenhum ícone encontrado</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Não encontramos resultados para a busca &quot;{searchQuery}&quot;. Tente outro termo
              ou limpe os filtros.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('todos')
              }}
              className="mt-4 rounded-xl"
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIcons.map((icon) => {
              const isDarkColor = selectedColor === '#FFFFFF'
              const previewBgClass = isDarkColor
                ? 'bg-gradient-to-br from-[#002b4d] to-[#004173] border-slate-700'
                : 'bg-gradient-to-b from-sky-50/70 via-white to-slate-50/50 border-sky-100/80'

              return (
                <div
                  key={icon.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#0CB7F2]/50 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Visualização em Destaque do Ícone */}
                  <div className="p-6 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between mb-4">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          icon.category === 'seguros'
                            ? 'bg-sky-50 text-[#0979B0] border border-sky-200/60'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        }`}
                      >
                        {icon.category === 'seguros' ? 'Ramo de Seguro' : 'Diferencial 3S'}
                      </Badge>

                      <button
                        type="button"
                        onClick={() => handleCopySvgCode(icon)}
                        title="Copiar código SVG"
                        className="text-slate-400 hover:text-[#004173] p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        {copiedId === icon.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Canvas / Palco de Pré-visualização Grande do Ícone */}
                    <div
                      className={`w-32 h-32 rounded-2xl flex items-center justify-center p-4 shadow-inner border transition-transform duration-200 group-hover:scale-105 ${previewBgClass}`}
                    >
                      <svg
                        viewBox={icon.viewBox}
                        className="w-full h-full max-w-[80px] max-h-[80px] drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke={selectedColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        dangerouslySetInnerHTML={{ __html: icon.innerSvgMarkup }}
                      />
                    </div>

                    {/* Título e Descrição */}
                    <div className="text-center mt-5 w-full">
                      <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#004173] transition-colors leading-snug">
                        {icon.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed h-8">
                        {icon.description}
                      </p>
                    </div>
                  </div>

                  {/* Ações de Download (SVG e PNG 512x512) */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        onClick={() => handleDownloadSvg(icon)}
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-slate-200 hover:border-[#0979B0] hover:bg-white text-slate-700 hover:text-[#004173] text-xs font-semibold h-9 flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        title="Baixar arquivo .svg vetorizado de alta precisão"
                      >
                        <FileCode className="w-3.5 h-3.5 text-[#0979B0]" />
                        <span>Baixar SVG</span>
                      </Button>

                      <Button
                        type="button"
                        onClick={() => handleDownloadPng(icon)}
                        disabled={downloadingId === icon.id}
                        variant="default"
                        size="sm"
                        className="rounded-xl bg-[#004173] hover:bg-[#00335c] text-white text-xs font-semibold h-9 flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        title="Baixar arquivo .png 512x512 transparente para redes sociais e apresentações"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-[#0CB7F2]" />
                        <span>{downloadingId === icon.id ? 'Gerando...' : 'Baixar PNG'}</span>
                      </Button>
                    </div>

                    <div className="text-[10px] text-center text-slate-400">
                      PNG 512×512 transparente • SVG nativo
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Guia Rápido de Uso dos Arquivos */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-[#004173] mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#0CB7F2]" />
            Dicas para o Uso dos Recursos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
              <strong className="text-slate-900 block text-sm mb-1">Qual formato escolher?</strong>
              <p>
                <strong>SVG:</strong> Ideal para designers (Figma, Canva, Adobe Illustrator) e
                código web. É vetor puro, nunca perde qualidade em qualquer tamanho.
              </p>
              <p className="mt-1">
                <strong>PNG:</strong> Perfeito para publicações imediatas em redes sociais
                (Instagram, LinkedIn, Facebook), Google Meu Negócio ou apresentações PowerPoint.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
              <strong className="text-slate-900 block text-sm mb-1">Cores da Identidade 3S</strong>
              <p>
                Utilize o seletor acima para alternar a cor do traço dos ícones. As cores
                pré-definidas correspondem aos tons oficiais da 3S Corretora: Azul Escuro (
                <code className="text-[#004173]">#004173</code>), Azul Médio (
                <code className="text-[#0979B0]">#0979B0</code>) e Ciano (
                <code className="text-[#0CB7F2]">#0CB7F2</code>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
              <strong className="text-slate-900 block text-sm mb-1">Privacidade do Recurso</strong>
              <p>
                Esta página é protegida pela sessão do painel da corretora. Motores de busca
                (Google, Bing) e visitantes anônimos não possuem acesso a esta URL nem aos arquivos
                listados aqui.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
