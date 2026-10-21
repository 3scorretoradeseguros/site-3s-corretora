import React from 'react'
import { Link } from 'react-router-dom'
import {
  Car,
  Bike,
  Truck,
  Home,
  Building2,
  Building,
  HeartPulse,
  Plane,
  Smartphone,
  Stethoscope,
  Scale,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  Info,
} from 'lucide-react'
import { SERVICES_CATALOG, type ServiceItem } from '@/types'

const LP_ROUTE_MAP: Partial<Record<ServiceItem['id'], string>> = {
  seguro_auto_carro: '/seguro-auto-carro',
  seguro_auto_moto: '/seguro-auto-moto',
  seguro_auto_caminhao: '/seguro-auto-caminhao',
  seguro_residencial: '/seguro-residencial',
  seguro_empresarial: '/seguro-empresarial',
  seguro_condominio: '/seguro-condominio',
  seguro_vida: '/seguro-de-vida',
  seguro_viagem: '/seguro-viagem',
  seguro_celular: '/seguro-celular',
  responsabilidade_civil: '/seguro-rc-profissional',
  planos_saude: '/planos-de-saude',
}

const getServiceIcon = (id: ServiceItem['id']) => {
  const iconClass =
    'w-6 h-6 text-[#0979B0] group-hover:text-[#0CB7F2] transition-colors duration-200'
  switch (id) {
    case 'seguro_auto_carro':
      return <Car className={iconClass} />
    case 'seguro_auto_moto':
      return <Bike className={iconClass} />
    case 'seguro_auto_caminhao':
      return <Truck className={iconClass} />
    case 'seguro_residencial':
      return <Home className={iconClass} />
    case 'seguro_empresarial':
      return <Building2 className={iconClass} />
    case 'seguro_condominio':
      return <Building className={iconClass} />
    case 'seguro_vida':
      return <HeartPulse className={iconClass} />
    case 'seguro_viagem':
      return <Plane className={iconClass} />
    case 'seguro_celular':
      return <Smartphone className={iconClass} />
    case 'planos_saude':
      return <Stethoscope className={iconClass} />
    case 'responsabilidade_civil':
      return <Scale className={iconClass} />
    case 'outros':
    default:
      return <HelpCircle className={iconClass} />
  }
}

export const ServicesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {SERVICES_CATALOG.map((service) => {
        const isWhatsapp = service.quoteUrl.includes('whatsapp.com')
        const lpRoute = LP_ROUTE_MAP[service.id]
        const isTwoLineBroker =
          service.id === 'planos_saude' || service.id === 'responsabilidade_civil'

        return (
          <div
            key={service.id}
            className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-[#0CB7F2]/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 group-hover:bg-[#004173] flex items-center justify-center transition-colors duration-200 shadow-sm">
                  {getServiceIcon(service.id)}
                </div>

                {service.badge ? (
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {service.badge}
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0979B0] border border-sky-100">
                    FORMULÁRIO
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#004173] transition-colors mb-2">
                {service.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {service.shortDescription}
              </p>
            </div>

            <div
              className={`pt-4 border-t border-slate-100 mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 ${
                lpRoute ? 'justify-between' : 'justify-center'
              }`}
            >
              {lpRoute ? (
                <Link
                  to={lpRoute}
                  className="order-1 flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl border border-slate-300 hover:border-[#0979B0] text-slate-700 hover:text-[#004173] hover:bg-sky-50/50 text-xs sm:text-[13px] font-medium transition-all text-center whitespace-nowrap"
                  title={`Saiba mais sobre ${service.title}`}
                >
                  <Info className="w-3.5 h-3.5 text-[#0979B0] shrink-0" />
                  <span>Saiba mais</span>
                </Link>
              ) : null}

              <a
                href={service.quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`order-2 inline-flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-xl bg-[#004173] hover:bg-[#00335c] text-white text-xs sm:text-[13px] font-semibold shadow-md shadow-[#004173]/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-center ${
                  isTwoLineBroker ? '' : 'whitespace-nowrap'
                } ${lpRoute ? 'flex-1 sm:justify-center' : 'w-full sm:w-auto mx-auto'}`}
                title={`Cotar agora ${service.title}`}
              >
                {isTwoLineBroker ? (
                  <>
                    <span className="sm:hidden whitespace-nowrap">Fale com Corretor</span>
                    <span className="hidden sm:flex flex-col items-center text-center leading-[1.15]">
                      <span>Fale com</span>
                      <span>Corretor</span>
                    </span>
                  </>
                ) : (
                  <span className="whitespace-nowrap">
                    {isWhatsapp ? 'Fale com Corretor' : 'Cotar agora'}
                  </span>
                )}
                {isWhatsapp ? (
                  <MessageCircle className="w-3.5 h-3.5 text-[#0CB7F2] shrink-0" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-[#0CB7F2] shrink-0" />
                )}
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
