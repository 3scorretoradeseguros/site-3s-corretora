import React from 'react'
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
  ExternalLink,
  Phone,
  ArrowRight,
} from 'lucide-react'
import { SERVICES_CATALOG, type ServiceItem } from '@/types'

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
                    Cotação Ágil
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

            <div className="pt-4 border-t border-slate-100 mt-auto">
              <a
                href={service.quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0979B0] group-hover:text-[#004173] transition-colors focus:outline-none focus-visible:underline"
                title={`Cotar agora ${service.title}`}
              >
                <span>{isWhatsapp ? 'Falar no WhatsApp' : 'Cotar agora'}</span>
                {isWhatsapp ? (
                  <Phone className="w-4 h-4 text-[#0CB7F2] group-hover:translate-x-0.5 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#0CB7F2] group-hover:translate-x-0.5 transition-transform" />
                )}
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
