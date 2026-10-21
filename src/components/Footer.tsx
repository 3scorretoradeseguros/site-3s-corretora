import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Smartphone, Mail, ShieldCheck, Lock } from 'lucide-react'
import { COMPANY_INFO } from '@/types'
import { Logo } from '@/components/Logo'
import { LinkedInIcon, InstagramIcon, FacebookIcon, GoogleIcon } from '@/components/SocialIcons'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#002847] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Coluna 1: Marca e Proposta */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white shadow-md flex items-center justify-center">
                <Logo height={42} showText={false} alt="3S Corretora de Seguros" />
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

            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block mb-2">
                Redes Sociais
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={COMPANY_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#0CB7F2] hover:text-[#002847] flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn da 3S Corretora"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href={COMPANY_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#0CB7F2] hover:text-[#002847] flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram da 3S Corretora"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href={COMPANY_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#0CB7F2] hover:text-[#002847] flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook da 3S Corretora"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href={COMPANY_INFO.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#0CB7F2] hover:text-[#002847] flex items-center justify-center text-white transition-colors"
                  aria-label="Avaliações no Google da 3S Corretora"
                  title="Google"
                >
                  <GoogleIcon className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 2: Atendimento e Contato */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-white tracking-wide">
              Fale Conosco
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Smartphone className="w-4 h-4 text-[#0CB7F2] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">WhatsApp / Celular</span>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors font-medium text-white"
                  >
                    {COMPANY_INFO.phoneWhatsApp}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0CB7F2] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">Telefone Fixo</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneLandline.replace(/\D/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {COMPANY_INFO.phoneLandline}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0CB7F2] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">E-mail</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {COMPANY_INFO.email}
                  </a>
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

        {/* Rodapé inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {COMPANY_INFO.name}. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/painel"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Acesso da Corretora</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
