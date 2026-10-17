import React from 'react'
import {
  Car,
  Bike,
  Truck,
  Home,
  Building2,
  Building,
  Heart,
  Plane,
  Smartphone,
  Briefcase,
  Cross,
  Shield,
  Zap,
  Wrench,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  Activity,
  ArrowRight,
  Phone,
  ShieldCheck,
  Check,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO'
import { LPHeader } from '@/components/LPHeader'
import { LPFooter } from '@/components/LPFooter'
import { COMPANY_INFO } from '@/types'
import { type LandingPageData } from '@/data/landingPages'

interface LandingPageViewProps {
  data: LandingPageData
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ data }) => {
  // Renderiza ícone ilustrativo temático para cada produto
  const renderHeroGraphic = () => {
    const iconWrapperClass =
      'w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-[#0CB7F2]/20 via-[#0979B0]/20 to-[#004173]/20 border border-sky-200/80 shadow-md flex items-center justify-center'

    let graphicIcon = <Car className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />

    switch (data.heroIconType) {
      case 'car':
        graphicIcon = <Car className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'moto':
        graphicIcon = <Bike className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'truck':
        graphicIcon = <Truck className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'home':
        graphicIcon = <Home className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'building':
        graphicIcon = <Building2 className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'condo':
        graphicIcon = <Building className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'life':
        graphicIcon = <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'travel':
        graphicIcon = <Plane className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'phone':
        graphicIcon = <Smartphone className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'rc':
        graphicIcon = <Briefcase className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
      case 'health':
        graphicIcon = <Cross className="w-16 h-16 sm:w-20 sm:h-20 text-[#004173]" />
        break
    }

    return (
      <div className="relative flex items-center justify-center">
        {/* Fundo decorativo sutil */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-sky-100/70 via-blue-50/50 to-transparent border border-sky-100/80 flex items-center justify-center p-6 shadow-sm">
          <div className={iconWrapperClass}>{graphicIcon}</div>
        </div>
      </div>
    )
  }

  // Mapeamento de ícones de coberturas
  const getCoverageIcon = (iconName: string) => {
    const iconClass = 'w-5 h-5 text-[#0979B0]'
    switch (iconName) {
      case 'shield':
        return <Shield className={iconClass} />
      case 'zap':
        return <Zap className={iconClass} />
      case 'car':
        return <Car className={iconClass} />
      case 'truck':
        return <Truck className={iconClass} />
      case 'home':
        return <Home className={iconClass} />
      case 'wrench':
        return <Wrench className={iconClass} />
      case 'file-text':
        return <FileText className={iconClass} />
      case 'users':
        return <Users className={iconClass} />
      case 'alert-triangle':
        return <AlertTriangle className={iconClass} />
      case 'heart':
        return <Heart className={iconClass} />
      case 'plane':
        return <Plane className={iconClass} />
      case 'smartphone':
        return <Smartphone className={iconClass} />
      case 'briefcase':
        return <Briefcase className={iconClass} />
      case 'activity':
        return <Activity className={iconClass} />
      case 'check':
      default:
        return <CheckCircle className={iconClass} />
    }
  }

  // Canonical URL
  const origin = typeof window !== 'undefined' ? window.location.origin : COMPANY_INFO.siteUrl
  const canonicalUrl = `${origin}${data.slug}`

  // Organização completa da 3S Corretora para herança em todas as LPs
  const organizationEntity = {
    '@type': 'InsuranceAgency',
    '@id': `${COMPANY_INFO.siteUrl}/#organization`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.corporateName,
    alternateName: COMPANY_INFO.corporateName,
    url: COMPANY_INFO.siteUrl,
    telephone: COMPANY_INFO.phoneWhatsApp,
    email: COMPANY_INFO.email,
    taxID: COMPANY_INFO.cnpj,
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'CNPJ',
        value: COMPANY_INFO.cnpj,
      },
      {
        '@type': 'PropertyValue',
        name: 'Registro SUSEP Corretora',
        value: COMPANY_INFO.susepBroker,
      },
      {
        '@type': 'PropertyValue',
        name: 'SUSEP Responsável Técnica',
        value: `${COMPANY_INFO.technicalManager} (SUSEP ${COMPANY_INFO.susepTechnical})`,
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Álvaro Ramos, 235 / Sala 51',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '03058-060',
      addressCountry: 'BR',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
  }

  // JSON-LD estruturado (Schema.org) com @graph contendo Service e FAQPage
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: data.productName,
        name: `${data.productName} — 3S Corretora de Seguros`,
        description: data.seo.description,
        provider: organizationEntity,
        publisher: organizationEntity,
        areaServed: {
          '@type': 'Country',
          name: 'Brasil',
        },
        url: canonicalUrl,
      },
      ...(data.faq && data.faq.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: data.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. SEO Head Tags Injetadas */}
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        canonicalUrl={canonicalUrl}
        keywords={data.seo.keywords}
        jsonLd={jsonLdGraph}
      />

      {/* 2. Header Mínimo (apenas logo e CTA) */}
      <LPHeader quoteUrl={data.quoteUrl} ctaText={data.ctaText} />

      {/* 3. HERO SECTION (Enxuta, direta e com CTA imediato) */}
      <section className="bg-gradient-to-b from-[#F5F8FB] via-white to-white py-12 sm:py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#004173]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0CB7F2]" />
                <span>{data.tagline}</span>
              </div>

              <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#004173] tracking-tight leading-tight">
                {data.heroTitle}{' '}
                <span className="text-[#0979B0] underline decoration-[#0CB7F2] decoration-4 underline-offset-4">
                  {data.heroTitleHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {data.heroSubtitle}
              </p>

              {data.definition && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed text-left">
                  <strong className="text-[#004173] font-semibold">O que é: </strong>
                  <span>{data.definition}</span>
                </div>
              )}

              {/* CTA Principal Imediato */}
              <div className="pt-2">
                <a
                  href={data.quoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
                >
                  {data.isWhatsApp ? (
                    <Phone className="w-4 h-4 text-[#0CB7F2]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#0CB7F2]" />
                  )}
                  <span>Faça sua cotação</span>
                </a>
              </div>

              {/* Prova de Confiança */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Análise consultiva e sem compromisso</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Consultoria com corretor registrado SUSEP</span>
                </div>
              </div>
            </div>

            {/* Ilustração Visual Hero */}
            <div className="lg:col-span-5 flex justify-center">{renderHeroGraphic()}</div>
          </div>
        </div>
      </section>

      {/* 4. BLOCO DE MAIS INFORMAÇÕES: COBERTURAS COMUNS */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0979B0] block mb-2">
              Proteção Sob Medida
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#004173] tracking-tight mb-3">
              Principais Coberturas do {data.productName}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Conheça as garantias mais contratadas e monte a apólice ideal com a orientação da
              nossa equipe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.coverages.map((cov, index) => (
              <div
                key={index}
                className="bg-[#F5F8FB] rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-start"
              >
                <div className="w-11 h-11 rounded-xl bg-white text-[#0979B0] flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                  {getCoverageIcon(cov.icon)}
                </div>
                <h3 className="font-serif font-bold text-base text-[#004173] mb-2">{cov.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cov.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA de fim da seção de coberturas */}
          <div className="mt-10 text-center">
            <a
              href={data.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              {data.isWhatsApp ? (
                <Phone className="w-4 h-4 text-[#0CB7F2]" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#0CB7F2]" />
              )}
              <span>Quero cotar meu seguro</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. IMPORTÂNCIA E BENEFÍCIOS DE CONTRATAR */}
      <section className="py-14 sm:py-16 bg-[#F5F8FB] border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0979B0] block mb-2">
              Por Que Contratar com a 3S
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#004173] tracking-tight mb-3">
              Vantagens e Benefícios Exclusivos
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Assessoria transparente para você não pagar nada além do que realmente precisa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.benefits.map((b, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#004173] flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5 text-[#0CB7F2]" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#004173] mb-2">{b.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>

          {/* CTA de fim da seção de benefícios */}
          <div className="mt-10 text-center">
            <a
              href={data.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              {data.isWhatsApp ? (
                <Phone className="w-4 h-4 text-[#0CB7F2]" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#0CB7F2]" />
              )}
              <span>Receba sua cotação</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. EXEMPLOS PRÁTICOS DE USO NO DIA A DIA */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0979B0] block mb-2">
              Situações Reais
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#004173] tracking-tight mb-3">
              Como o Seguro Funciona na Prática
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Veja exemplos cotidianos em que a apólice faz toda a diferença para o seu bolso e
              tranquilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.practicalExamples.map((ex, index) => (
              <div
                key={index}
                className="bg-[#F5F8FB] rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white text-xs font-bold text-[#004173] border border-slate-200">
                    <span>Cenário {index + 1}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900">{ex.title}</h3>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <p className="italic text-slate-700 bg-white/60 p-3 rounded-xl border border-slate-200/60">
                      <strong>Imprevisto:</strong> {ex.situation}
                    </p>
                    <p className="text-slate-700 pt-1">
                      <strong className="text-emerald-700">Como resolveu:</strong> {ex.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA de fim da seção de exemplos práticos */}
          <div className="mt-10 text-center">
            <a
              href={data.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              {data.isWhatsApp ? (
                <Phone className="w-4 h-4 text-[#0CB7F2]" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#0CB7F2]" />
              )}
              <span>Proteja seu {data.protectItemName} agora</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6.1. SEÇÃO DE PERGUNTAS FREQUENTES (FAQ GEO) */}
      {data.faq && data.faq.length > 0 && (
        <section className="py-14 sm:py-16 bg-[#F5F8FB] border-b border-slate-200/70">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0979B0] block mb-2">
                Dúvidas Comuns
              </span>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#004173] tracking-tight mb-3">
                Perguntas Frequentes sobre {data.productName}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Respostas diretas e factuais para esclarecer as principais questões sobre este
                seguro.
              </p>
            </div>

            <div className="space-y-4">
              {data.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0979B0] flex items-center justify-center shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#004173] mb-2">
                        {item.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href={data.quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
              >
                {data.isWhatsApp ? (
                  <Phone className="w-4 h-4 text-[#0CB7F2]" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#0CB7F2]" />
                )}
                <span>Tirar dúvidas e cotar com o corretor</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 7. CTA FINAL DE FECHAMENTO (Mesmo link de cotação) */}
      <section className="bg-gradient-to-r from-[#004173] via-[#0979B0] to-[#004173] py-14 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-sky-100 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0CB7F2]" />
            <span>Atendimento Consultivo e Personalizado</span>
          </div>

          <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
            Pronto para garantir a sua tranquilidade?
          </h2>

          <p className="text-sky-100 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Envie sua solicitação de cotação e receba a análise detalhada com a indicação ideal para
            o seu {data.productName}.
          </p>

          <div className="pt-2">
            <Button
              asChild
              size="lg"
              className="h-12 sm:h-13 px-7 sm:px-8 rounded-2xl bg-white hover:bg-slate-100 text-[#004173] font-bold text-sm sm:text-base shadow-xl transition-colors inline-flex items-center gap-2"
            >
              <a href={data.quoteUrl} target="_blank" rel="noopener noreferrer">
                {data.isWhatsApp ? (
                  <Phone className="w-5 h-5 text-[#0979B0]" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-[#0979B0]" />
                )}
                <span>Encontre o seguro ideal</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Footer LP Dedicado (Sem redes sociais e sem Acesso da Corretora) */}
      <LPFooter allowWhatsAppContactLink={data.isWhatsApp} />
    </div>
  )
}

export default LandingPageView
