import React from 'react'
import { MapPin, Phone, Smartphone, Mail, ShieldCheck } from 'lucide-react'
import { COMPANY_INFO } from '@/types'
import { Logo } from '@/components/Logo'

interface LPFooterProps {
  allowWhatsAppContactLink?: boolean
}

export const LPFooter: React.FC<LPFooterProps> = ({ allowWhatsAppContactLink = false }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#002847] text-white pt-12 sm:pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 border-b border-slate-800/80">
          {/* Coluna 1: Marca e Proposta */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white shadow-md flex items-center justify-center">
                <Logo height={40} showText={false} alt="3S Corretora de Seguros" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight text-white tracking-tight">
                  3S Corretora de Seguros
                </span>
                <span className="text-xs text-sky-200">Seguros e planos de saúde</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Atendimento próximo e humano, soluções completas para você, sua família e sua empresa.
              Tranquilidade com quem entende e cuida de verdade.
            </p>
          </div>

          {/* Coluna 2: Atendimento e Contato */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-white tracking-wide">Atendimento</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Smartphone className="w-4 h-4 text-[#0CB7F2] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">WhatsApp / Celular</span>
                  {allowWhatsAppContactLink ? (
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors font-medium text-white underline decoration-[#0CB7F2]"
                    >
                      {COMPANY_INFO.phoneWhatsApp}
                    </a>
                  ) : (
                    <span className="font-medium text-white">{COMPANY_INFO.phoneWhatsApp}</span>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0CB7F2] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">Telefone Fixo</span>
                  <span className="text-slate-200">{COMPANY_INFO.phoneLandline}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0CB7F2] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">E-mail</span>
                  <span className="text-slate-200 break-all">{COMPANY_INFO.email}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Localização e Atendimento */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-white tracking-wide">
              Onde Estamos
            </h3>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-[#0CB7F2] mt-1 shrink-0" />
              <div>
                <p className="leading-relaxed">{COMPANY_INFO.address}</p>
                <p className="text-xs text-sky-200 mt-2">
                  Atendimento presencial com hora marcada e digital para todo o Brasil.
                </p>
              </div>
            </div>
          </div>

          {/* Coluna 4: Registro e Dados Regulatórios */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-white tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0CB7F2]" />
              Dados Oficiais
            </h3>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 text-xs text-slate-300">
              <p>
                <strong className="text-white">Razão Social:</strong>
                <br />
                {COMPANY_INFO.corporateName}
              </p>
              <p>
                <strong className="text-white">CNPJ:</strong> {COMPANY_INFO.cnpj}
              </p>
              <p>
                <strong className="text-white">SUSEP Corretora:</strong> {COMPANY_INFO.susepBroker}
              </p>
              <div className="pt-2 border-t border-white/10">
                <strong className="text-white">Resp. Técnica:</strong>
                <br />
                {COMPANY_INFO.technicalManager}
                <br />
                <span className="text-slate-400">SUSEP: {COMPANY_INFO.susepTechnical}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé inferior sem links de redes sociais nem Acesso da Corretora */}
        <div className="pt-6 text-center text-xs text-slate-400">
          <p>
            © {currentYear} {COMPANY_INFO.corporateName}. CNPJ {COMPANY_INFO.cnpj}. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default LPFooter
