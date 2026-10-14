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

                {/* Ilustração do Escudo com texto integrado "CUIDADO & PROTEÇÃO" */}
                <div className="relative z-10 w-64 h-72 sm:w-72 sm:h-80 flex items-center justify-center select-none">
                  {/* Escudo SVG em camadas com gradientes corporativos (#004173, #0979B0, #0CB7F2) */}
                  <svg
                    viewBox="0 0 240 280"
                    className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,65,115,0.30)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Escudo de proteção 3S Corretora: Cuidado e Proteção"
                  >
                    <defs>
                      {/* Borda externa com gradiente da marca */}
                      <linearGradient
                        id="shieldOuterGlow"
                        x1="120"
                        y1="4"
                        x2="120"
                        y2="276"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#0CB7F2" />
                        <stop offset="50%" stopColor="#0979B0" />
                        <stop offset="100%" stopColor="#004173" />
                      </linearGradient>

                      {/* Corpo do escudo: azul nobre e profundo para contraste de texto */}
                      <linearGradient
                        id="shieldBodyGrad"
                        x1="40"
                        y1="16"
                        x2="200"
                        y2="265"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#004f8c" />
                        <stop offset="55%" stopColor="#004173" />
                        <stop offset="100%" stopColor="#002b4d" />
                      </linearGradient>

                      {/* Brilho superior suave sem ofuscar texto */}
                      <linearGradient
                        id="shieldHighlight"
                        x1="120"
                        y1="16"
                        x2="120"
                        y2="100"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#0CB7F2" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0979B0" stopOpacity="0" />
                      </linearGradient>

                      {/* Gradiente da insígnia/emblema central */}
                      <linearGradient
                        id="emblemGrad"
                        x1="120"
                        y1="40"
                        x2="120"
                        y2="95"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#0CB7F2" />
                        <stop offset="100%" stopColor="#0979B0" />
                      </linearGradient>

                      {/* Gradiente da faixa de destaque onde apoia o texto */}
                      <linearGradient
                        id="bannerGrad"
                        x1="120"
                        y1="125"
                        x2="120"
                        y2="225"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#00355e" />
                        <stop offset="100%" stopColor="#00223d" />
                      </linearGradient>
                    </defs>

                    {/* Camada 1: Moldura externa com brilho nas cores oficiais */}
                    <path
                      d="M120 6 L220 36 C220 134 188 218 120 274 C52 218 20 134 20 36 L120 6 Z"
                      fill="url(#shieldOuterGlow)"
                    />

                    {/* Camada 2: Contorno intermediário ciano sutil */}
                    <path
                      d="M120 12 L212 39 C212 130 182 210 120 264 C58 210 28 130 28 39 L120 12 Z"
                      fill="#0CB7F2"
                      fillOpacity="0.35"
                    />

                    {/* Camada 3: Corpo principal do escudo azul escuro corporativo */}
                    <path
                      d="M120 16 L206 43 C206 128 178 204 120 256 C62 204 34 128 34 43 L120 16 Z"
                      fill="url(#shieldBodyGrad)"
                      stroke="#0CB7F2"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />

                    {/* Camada 4: Brilho/reflexo na cúpula do escudo */}
                    <path
                      d="M120 18 L200 45 C190 90 160 110 120 110 C80 110 50 90 40 45 L120 18 Z"
                      fill="url(#shieldHighlight)"
                    />

                    {/* Camada 5: Emblema / Brasão Superior de Proteção */}
                    <circle
                      cx="120"
                      cy="66"
                      r="26"
                      fill="#002b4d"
                      stroke="#0CB7F2"
                      strokeWidth="2"
                    />
                    <circle cx="120" cy="66" r="21" fill="url(#emblemGrad)" fillOpacity="0.25" />
                    {/* Ícone clássico de escudo + check de proteção no brasão */}
                    <path
                      d="M120 50 L134 56 C134 68 128 77 120 82 C112 77 106 68 106 56 L120 50 Z"
                      fill="#0CB7F2"
                    />
                    <path
                      d="M114 65 L118.5 69.5 L127 60"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Linha divisória de luz sob o emblema */}
                    <line
                      x1="65"
                      y1="108"
                      x2="175"
                      y2="108"
                      stroke="#0CB7F2"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                    />
                    <circle cx="120" cy="108" r="3" fill="#0CB7F2" />

                    {/* Bloco de Fundo de Alto Contraste para o Texto */}
                    <rect
                      x="48"
                      y="124"
                      width="144"
                      height="92"
                      rx="12"
                      fill="url(#bannerGrad)"
                      stroke="#0979B0"
                      strokeWidth="1.2"
                      strokeOpacity="0.8"
                    />

                    {/* Filete ciano decorativo na barra */}
                    <line
                      x1="62"
                      y1="126"
                      x2="178"
                      y2="126"
                      stroke="#0CB7F2"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* TEXTO INTEGRADO: CUIDADO (topo) */}
                    <text
                      x="120"
                      y="156"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                      fontWeight="900"
                      fontSize="17"
                      letterSpacing="2.5"
                    >
                      CUIDADO
                    </text>

                    {/* Divisor com o caractere & em destaque ciano */}
                    <line
                      x1="60"
                      y1="172"
                      x2="100"
                      y2="172"
                      stroke="#0CB7F2"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />
                    <circle
                      cx="120"
                      cy="172"
                      r="10"
                      fill="#004173"
                      stroke="#0CB7F2"
                      strokeWidth="1.5"
                    />
                    <text
                      x="120"
                      y="176.5"
                      textAnchor="middle"
                      fill="#0CB7F2"
                      fontFamily="Georgia, serif"
                      fontWeight="700"
                      fontSize="13"
                    >
                      &amp;
                    </text>
                    <line
                      x1="140"
                      y1="172"
                      x2="180"
                      y2="172"
                      stroke="#0CB7F2"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />

                    {/* TEXTO INTEGRADO: PROTEÇÃO (base) */}
                    <text
                      x="120"
                      y="202"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                      fontWeight="900"
                      fontSize="17"
                      letterSpacing="2.5"
                    >
                      PROTEÇÃO
                    </text>

                    {/* 3 estrelas na ponta inferior simbolizando a 3S */}
                    <g fill="#0CB7F2">
                      <polygon points="120,226 122,231 127,231 123,234 125,239 120,236 115,239 117,234 113,231 118,231" />
                      <polygon
                        points="104,223 105.5,227 109.5,227 106.5,229 108,233 104,231 100,233 101.5,229 98.5,227 102.5,227"
                        opacity="0.75"
                      />
                      <polygon
                        points="136,223 137.5,227 141.5,227 138.5,229 140,233 136,231 132,233 133.5,229 130.5,227 134.5,227"
                        opacity="0.75"
                      />
                    </g>
                  </svg>
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-2 -left-2 sm:top-4 sm:left-0 z-20 animate-float bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0979B0] flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Atendimento Ágil</span>
                    <span className="text-[10px] text-slate-500">Resposta humanizada</span>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 z-20 animate-float [animation-delay:1.5s] bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0979B0] flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Cotação Simplificada
                    </span>
                    <span className="text-[10px] text-slate-500">Parcerias com seguradoras</span>
                  </div>
                </div>

                <div className="absolute -bottom-3 sm:bottom-2 left-6 z-20 animate-float [animation-delay:3s] bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0979B0] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Atendemos PJ e PF
                    </span>
                    <span className="text-[10px] text-slate-500">Planos e seguros sob medida</span>
                  </div>
                </div>
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
            Converse agora mesmo com nossa equipe e receba um atendimento consultivo e sob medida.
          </p>
          <Button
            asChild
            size="lg"
            className="h-14 px-8 rounded-2xl bg-white hover:bg-slate-100 text-[#004173] font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5 text-emerald-600 mr-2" />
              <span>Falar no WhatsApp</span>
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
