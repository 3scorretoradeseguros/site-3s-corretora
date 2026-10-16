import React from 'react'
import {
  ShieldCheck,
  Star,
  Award,
  ArrowRight,
  Phone,
  CheckCircle,
  Building2,
  HeartHandshake,
  Zap,
  MapPin,
  Mail,
  Umbrella,
  Cross,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServicesGrid } from '@/components/ServicesGrid'
import { ContactForm } from '@/components/ContactForm'
import { COMPANY_INFO } from '@/types'

export default function Index() {
  const scrollToContact = () => {
    const el = document.getElementById('contato')
    if (el) {
      const headerOffset = 80
      const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
      window.scrollTo({ top: pos, behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    const el = document.getElementById('coberturas')
    if (el) {
      const headerOffset = 80
      const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
      window.scrollTo({ top: pos, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FB] via-white to-white py-16 sm:py-20 lg:py-28 border-b border-slate-100">
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#0CB7F2]/10 via-[#0979B0]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#004173]/5 via-[#0CB7F2]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100/80 text-xs font-semibold text-[#004173] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0CB7F2] animate-pulse" />
                Corretora de Seguros e Planos de Saúde
              </div>

              <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#004173] tracking-tight leading-[1.15]">
                Proteja{' '}
                <span className="relative inline-block text-[#0979B0] underline decoration-[#0CB7F2] decoration-4 underline-offset-4">
                  o que importa
                </span>
                , com quem cuida de você.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Seguros e planos de saúde para pessoa física e jurídica, com agilidade, condições
                sob medida e o atendimento acolhedor que você merece.
              </p>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Button
                  onClick={scrollToServices}
                  size="lg"
                  className="w-full sm:w-auto h-12 px-7 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white font-semibold shadow-lg shadow-[#004173]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Solicitar Cotação</span>
                  <ArrowRight className="w-4 h-4 text-[#0CB7F2]" />
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-300 hover:border-[#0979B0] hover:text-[#004173] hover:bg-sky-50/50 font-medium transition-all"
                >
                  <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4 text-[#0979B0] mr-2" />
                    <span>Falar com o Corretor</span>
                  </a>
                </Button>
              </div>

              {/* Mini prova de valor */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Cotação rápida e sem burocracia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Assessoria completa em todas as etapas</span>
                </div>
              </div>
            </div>

            {/* Ilustração Visual Hero */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                {/* Círculo com gradiente suave */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-100/60 via-blue-50/40 to-slate-100/40 border border-sky-100 shadow-inner" />
                {/* Ilustração do Escudo Minimalista com texto integrado "CUIDADO & PROTEÇÃO" */}
                <div className="relative z-10 w-60 h-64 sm:w-72 sm:h-80 flex items-center justify-center select-none">
                  {/* Escudo SVG minimalista flat com gradiente azul corporativo e contorno branco interno fino */}
                  <svg
                    viewBox="0 0 360 380"
                    className="w-full h-full drop-shadow-[0_16px_30px_rgba(0,65,115,0.25)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Escudo de proteção 3S Corretora: Cuidado & Proteção"
                  >
                    <defs>
                      {/* Gradiente da borda externa: ciano no topo direito até azul corporativo */}
                      <linearGradient
                        id="shieldOuterGradient"
                        x1="290"
                        y1="16"
                        x2="70"
                        y2="364"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#0CB7F2" />
                        <stop offset="50%" stopColor="#0979B0" />
                        <stop offset="100%" stopColor="#004173" />
                      </linearGradient>

                      {/* Gradiente do corpo interno do escudo: transição suave e com profundidade no miolo para legibilidade do texto */}
                      <linearGradient
                        id="shieldInnerGradient"
                        x1="270"
                        y1="30"
                        x2="90"
                        y2="350"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#0CB7F2" />
                        <stop offset="35%" stopColor="#0979B0" />
                        <stop offset="70%" stopColor="#004173" />
                        <stop offset="100%" stopColor="#002b4d" />
                      </linearGradient>

                      {/* Filtro sutil para garantir legibilidade máxima das letras brancas */}
                      <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow
                          dx="0"
                          dy="2"
                          stdDeviation="3"
                          floodColor="#001830"
                          floodOpacity="0.7"
                        />
                      </filter>
                    </defs>

                    {/* Camada 1: Corpo exterior do escudo clássico com proporção mais compacta */}
                    <path
                      d="M 180 16 L 332 72 C 332 236 262 332 180 364 C 98 332 28 236 28 72 Z"
                      fill="url(#shieldOuterGradient)"
                    />

                    {/* Camada 2: Contorno branco interno fino acompanhando a borda (estilo minimalista) */}
                    <path
                      d="M 180 34 L 312 83 C 312 222 248 310 180 340 C 112 310 48 222 48 83 Z"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      strokeLinejoin="round"
                      fill="url(#shieldInnerGradient)"
                    />

                    {/* Camada 3: Leve realce interno sutil na borda superior para acabamento refinado */}
                    <path
                      d="M 180 44 L 300 90 C 300 130 292 170 278 200 C 248 170 215 155 180 155 C 145 155 112 170 82 200 C 68 170 60 130 60 90 Z"
                      fill="#FFFFFF"
                      fillOpacity="0.06"
                    />

                    {/* TEXTO INTEGRADO CENTRAL: CUIDADO (perfeitamente centralizado verticalmente com o & e PROTEÇÃO) */}
                    <text
                      x="180"
                      y="152"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      filter="url(#textGlow)"
                      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                      fontWeight="900"
                      fontSize="24"
                      letterSpacing="3.5"
                    >
                      CUIDADO
                    </text>

                    {/* Divisor central com o & em destaque ciano */}
                    <line
                      x1="94"
                      y1="190"
                      x2="150"
                      y2="190"
                      stroke="#0CB7F2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <circle
                      cx="180"
                      cy="190"
                      r="16"
                      fill="#00223d"
                      stroke="#0CB7F2"
                      strokeWidth="2"
                    />
                    <text
                      x="180"
                      y="196.5"
                      textAnchor="middle"
                      fill="#0CB7F2"
                      fontFamily="Georgia, serif"
                      fontWeight="700"
                      fontSize="18"
                    >
                      &amp;
                    </text>
                    <line
                      x1="210"
                      y1="190"
                      x2="266"
                      y2="190"
                      stroke="#0CB7F2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />

                    {/* TEXTO INTEGRADO CENTRAL: PROTEÇÃO */}
                    <text
                      x="180"
                      y="238"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      filter="url(#textGlow)"
                      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                      fontWeight="900"
                      fontSize="24"
                      letterSpacing="3.5"
                    >
                      PROTEÇÃO
                    </text>
                  </svg>
                </div>{' '}
                {/* Floating Badges - Reposicionados nas bordas para NUNCA cobrir o texto central */}
                {/* Topo / Lateral esquerda alta */}
                <div className="absolute -top-3 -left-3 sm:-top-2 sm:-left-6 z-20 animate-float bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-50 text-[#0979B0] flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 block leading-tight">
                      Atendimento Ágil
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 block">
                      Resposta humanizada
                    </span>
                  </div>
                </div>
                {/* Lateral direita alta (acima da linha do texto central) */}
                <div className="absolute top-2 -right-3 sm:top-6 sm:-right-8 z-20 animate-float [animation-delay:1.5s] bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-50 text-[#0979B0] flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 block leading-tight">
                      Cotação Simplificada
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 block">
                      Parcerias com seguradoras
                    </span>
                  </div>
                </div>
                {/* Base / Lateral esquerda baixa (abaixo do escudo, sem cobrir o texto) */}
                <div className="absolute -bottom-4 left-2 sm:-bottom-4 sm:left-4 z-20 animate-float [animation-delay:3s] bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-50 text-[#0979B0] flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 block leading-tight">
                      Atendemos PJ e PF
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 block">
                      Planos e seguros sob medida
                    </span>
                  </div>
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR (Faixa de Confiança) */}
      <section className="bg-white border-b border-slate-200/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80">
              <ShieldCheck className="w-4 h-4 text-[#0979B0]" />
              <span>
                Corretora licenciada pela SUSEP:{' '}
                <strong className="text-slate-800">{COMPANY_INFO.susepBroker}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80">
              <Umbrella className="w-4 h-4 text-[#0979B0]" />
              <span>Seguros</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80">
              <Cross className="w-4 h-4 text-[#0979B0]" />
              <span>Planos de Saúde</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80">
              <MapPin className="w-4 h-4 text-[#0979B0]" />
              <span>Atendimento em todo o Brasil (Sede em SP)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COBERTURAS / SERVIÇOS SECTION */}
      <section
        id="coberturas"
        className="py-20 bg-[#F5F8FB] border-b border-slate-200/60 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0979B0] block mb-2">
              Nossos Ramos & Soluções
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#004173] tracking-tight mb-4">
              Coberturas que se adaptam à sua vida
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Do seu carro à sua vida, da sua casa à sua empresa, encontramos a proteção ideal para
              você.
            </p>
          </div>

          <ServicesGrid />

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 mb-4">
              Precisa de uma condição especial ou múltiplos seguros?
            </p>
            <Button
              onClick={scrollToContact}
              className="rounded-xl bg-[#004173] hover:bg-[#00335c] text-white px-6 font-medium shadow-md"
            >
              Fale com um corretor agora
            </Button>
          </div>
        </div>
      </section>

      {/* 4. POR QUE A 3S */}
      <section id="por-que-a-3s" className="py-20 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0979B0] block mb-2">
              Diferenciais 3S
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#004173] tracking-tight mb-4">
              Por que escolher a 3S Corretora?
            </h2>
            <p className="text-base text-slate-600">
              Mais do que vender apólices, construímos relacionamentos de longo prazo e cuidamos do
              que você conquistou.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#F5F8FB] rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#004173] text-white flex items-center justify-center mb-6 shadow-md shadow-[#004173]/20">
                <HeartHandshake className="w-7 h-7 text-[#0CB7F2]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#004173] mb-3">
                Atendimento Próximo
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Você nunca fica falando sozinho com um robô. Nossa equipe técnica é chefiada por
                profissionais experientes com registro SUSEP, disponíveis sempre que você precisar.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F5F8FB] rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#0979B0] text-white flex items-center justify-center mb-6 shadow-md shadow-[#0979B0]/20">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#004173] mb-3">
                Cotação Simplificada
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Formulários digitais integrados com as principais seguradoras do mercado para
                simular o melhor custo-benefício, sem burocracia.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F5F8FB] rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#004173] text-white flex items-center justify-center mb-6 shadow-md shadow-[#004173]/20">
                <Building2 className="w-7 h-7 text-[#0CB7F2]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#004173] mb-3">
                Especialistas em PJ e PF
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Seja para a proteção do seu patrimônio pessoal e familiar ou para a continuidade e
                benefícios coletivos da sua empresa, temos a apólice exata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROVA SOCIAL (Números + Depoimentos) */}
      <section
        id="depoimentos"
        className="py-20 bg-[#F5F8FB] border-b border-slate-200/60 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Faixa de Estatísticas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
              <span className="font-serif font-black text-3xl sm:text-4xl text-[#004173] block mb-1">
                500+
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                Clientes Atendidos
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
              <span className="font-serif font-black text-3xl sm:text-4xl text-[#004173] block mb-1">
                12
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                Tipos de Cobertura
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
              <span className="font-serif font-black text-3xl sm:text-4xl text-[#004173] block mb-1">
                Minutos
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-600">Cotação Rápida</span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="font-serif font-black text-3xl sm:text-4xl text-[#004173]">
                  4,9
                </span>
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-600">
                Avaliação no Google
              </span>
            </div>
          </div>

          {/* Cabeçalho dos depoimentos */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0979B0] block mb-2">
              Depoimentos Reais
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#004173] tracking-tight">
              Quem confia, recomenda
            </h2>
          </div>

          {/* Cards de Depoimentos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "Renovei o seguro do meu carro com a 3S e foi a melhor experiência. Atendimento
                  super ágil, encontraram um valor menor do que eu pagava e com assistência ainda
                  melhor."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 text-[#004173] font-bold text-sm flex items-center justify-center">
                  MS
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">Marcelo Santoro</h4>
                  <p className="text-xs text-slate-500">Cliente — Seguro Auto</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "A Ana Paula e sua equipe cuidaram de todo o seguro patrimonial da nossa empresa
                  no Belenzinho. Explicaram cada detalhe da apólice sem complicação. Recomendo
                  fortemente."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 text-[#004173] font-bold text-sm flex items-center justify-center">
                  CR
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">Cláudia Regina</h4>
                  <p className="text-xs text-slate-500">Empresária — Seguro Empresarial</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "Estávamos perdidos com tantas opções de plano de saúde para nossa família. A
                  corretora comparou as redes credenciadas e achou a opção com o melhor
                  custo-benefício."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 text-[#004173] font-bold text-sm flex items-center justify-center">
                  GF
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    Gustavo Figueiredo
                  </h4>
                  <p className="text-xs text-slate-500">Família — Plano de Saúde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FORMULÁRIO DE CONTATO (Split Layout) */}
      <section id="contato" className="py-20 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Informações da Corretora */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0979B0] block mb-2">
                  Atendimento Especializado
                </span>
                <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#004173] tracking-tight mb-4">
                  Fale com a gente e tire suas dúvidas
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Estamos prontos para entender o seu momento e encontrar as coberturas com as
                  condições mais vantajosas do mercado.
                </p>
              </div>

              {/* Cartões de Contato */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F5F8FB] border border-slate-200/80">
                  <div className="w-10 h-10 rounded-xl bg-[#004173] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#0CB7F2]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">
                      WhatsApp e Telefone Celular
                    </span>
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#004173] hover:underline"
                    >
                      {COMPANY_INFO.phoneWhatsApp}
                    </a>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Fixo: {COMPANY_INFO.phoneLandline}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F5F8FB] border border-slate-200/80">
                  <div className="w-10 h-10 rounded-xl bg-[#004173] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#0CB7F2]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">
                      E-mail Direto
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-sm font-bold text-[#004173] hover:underline break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F5F8FB] border border-slate-200/80">
                  <div className="w-10 h-10 rounded-xl bg-[#004173] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#0CB7F2]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Endereço</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registro SUSEP & CNPJ */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-slate-600 space-y-1">
                <p>
                  <strong className="text-[#004173]">SUSEP Corretora:</strong>{' '}
                  {COMPANY_INFO.susepBroker} • <strong className="text-[#004173]">CNPJ:</strong>{' '}
                  {COMPANY_INFO.cnpj}
                </p>
                <p>
                  <strong className="text-[#004173]">Responsável Técnica:</strong>{' '}
                  {COMPANY_INFO.technicalManager} (SUSEP {COMPANY_INFO.susepTechnical})
                </p>
              </div>
            </div>

            {/* O Formulário de Contato */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL WHATSAPP */}
      <section className="bg-gradient-to-r from-[#004173] via-[#0979B0] to-[#004173] py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-black text-3xl sm:text-4xl tracking-tight mb-4 text-white">
            Pronto para proteger o que é seu?
          </h2>
          <p className="text-sky-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-normal">
            Solicite agora o seu plano de proteção personalizado e receba um atendimento consultivo
            e sob medida.
          </p>
          <Button
            onClick={scrollToServices}
            size="lg"
            className="h-14 px-8 rounded-2xl bg-white hover:bg-slate-100 text-[#004173] font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-[#0CB7F2]" />
            <span>Solicitar plano de proteção</span>
          </Button>
        </div>
      </section>
    </div>
  )
}
