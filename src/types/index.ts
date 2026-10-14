export type ContactNeed =
  | 'seguro_auto_carro'
  | 'seguro_auto_moto'
  | 'seguro_auto_caminhao'
  | 'seguro_residencial'
  | 'seguro_empresarial'
  | 'seguro_condominio'
  | 'seguro_vida'
  | 'seguro_viagem'
  | 'seguro_celular'
  | 'planos_saude'
  | 'responsabilidade_civil'
  | 'outros'

export type ContactStatus = 'novo' | 'respondido'

export interface ContactRecord {
  id: string
  collectionId: string
  collectionName: string
  name: string
  whatsapp: string
  email: string
  contact?: string
  need: ContactNeed
  message?: string
  status: ContactStatus
  created: string
  updated: string
}

export interface CreateContactInput {
  name: string
  whatsapp: string
  email: string
  contact?: string
  need: ContactNeed
  message?: string
}

export const CONTACT_NEED_LABELS: Record<ContactNeed, string> = {
  seguro_auto_carro: 'Seguro Auto — Carro',
  seguro_auto_moto: 'Seguro Auto — Moto',
  seguro_auto_caminhao: 'Seguro Auto — Caminhão',
  seguro_residencial: 'Seguro Residencial',
  seguro_empresarial: 'Seguro Empresarial',
  seguro_condominio: 'Seguro Condomínio',
  seguro_vida: 'Seguro de Vida',
  seguro_viagem: 'Seguro Viagem',
  seguro_celular: 'Seguro Celular',
  planos_saude: 'Planos de Saúde',
  responsabilidade_civil: 'Responsabilidade Civil',
  outros: 'Outros Seguros',
}

export const COMPANY_INFO = {
  name: '3S Corretora de Seguros',
  subtitle: 'corretora de seguros e planos de saúde',
  corporateName: 'TRES ESSES CORRETORA DE SEGUROS LTDA',
  cnpj: '51.431.616/0001-58',
  susepBroker: '232148773',
  technicalManager: 'Ana Paula Marques Torres de Souza',
  susepTechnical: '221139174',
  address: 'Av. Álvaro Ramos, 235 / Sala 51 - Belenzinho, São Paulo - SP, 03058-060',
  phoneLandline: '(11) 2777-5052',
  phoneWhatsApp: '(11) 99463-5763',
  phoneWhatsAppDigits: '5511994635763',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=5511994635763',
  email: 'seguros3scorretora@gmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/seguros3scorretora/',
    instagram: 'https://www.instagram.com/seguros3scorretora/',
    facebook: 'https://www.facebook.com/seguros3scorretora/',
    google: 'https://share.google/sOEJ12p6LE92C1Mqm',
  },
} as const

export interface ServiceItem {
  id: ContactNeed
  title: string
  shortDescription: string
  quoteUrl: string
  badge?: string
  isExternalQuote?: boolean
}

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'seguro_auto_carro',
    title: 'Seguro Auto Carro',
    shortDescription: 'Proteção completa para o seu veículo, com assistência 24h e cotação rápida.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/auto',
    isExternalQuote: true,
  },
  {
    id: 'seguro_auto_moto',
    title: 'Seguro Auto Moto',
    shortDescription: 'Segurança para você pilotar tranquilo, com coberturas flexíveis.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/moto',
    isExternalQuote: true,
  },
  {
    id: 'seguro_auto_caminhao',
    title: 'Seguro Auto Caminhão',
    shortDescription: 'Cobertura robusta para sua frota ou caminhão, com condições especiais.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/caminhao',
    isExternalQuote: true,
  },
  {
    id: 'seguro_residencial',
    title: 'Seguro Residencial',
    shortDescription: 'Seu lar protegido contra imprevistos: incêndio, roubo e muito mais.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/residencial',
    isExternalQuote: true,
  },
  {
    id: 'seguro_empresarial',
    title: 'Seguro Empresarial',
    shortDescription: 'Proteção para o seu negócio: patrimônio, responsabilidade e continuidade.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/empresarial',
    isExternalQuote: true,
  },
  {
    id: 'seguro_condominio',
    title: 'Seguro Condomínio',
    shortDescription: 'Cobertura para áreas comuns e estrutura do seu condomínio.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/condominio',
    isExternalQuote: true,
  },
  {
    id: 'seguro_vida',
    title: 'Seguro de Vida',
    shortDescription: 'Tranquilidade para sua família, com planos que cabem no seu bolso.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/vida',
    isExternalQuote: true,
  },
  {
    id: 'seguro_viagem',
    title: 'Seguro Viagem',
    shortDescription: 'Assistência e cobertura para suas viagens no Brasil e exterior.',
    quoteUrl: 'http://www.porto.vc/VIAGEM_52R04J_1d42503f554f4613952f7754d4da35ce',
    isExternalQuote: true,
  },
  {
    id: 'seguro_celular',
    title: 'Seguro Celular',
    shortDescription: 'Proteção contra roubo, furto e danos acidentais do seu aparelho.',
    quoteUrl: 'http://www.porto.vc/SEGUROCELULAR_52R04J_7ded94f85d5542d499a77898d8c8c23a',
    isExternalQuote: true,
  },
  {
    id: 'planos_saude',
    title: 'Planos de Saúde',
    shortDescription: 'Encontre o plano ideal para você ou sua empresa, com atendimento próximo.',
    quoteUrl: 'https://api.whatsapp.com/send?phone=5511994635763',
    badge: 'Fale via WhatsApp',
  },
  {
    id: 'responsabilidade_civil',
    title: 'Responsabilidade Civil',
    shortDescription: 'Proteção financeira para danos causados a terceiros.',
    quoteUrl: 'https://api.whatsapp.com/send?phone=5511994635763',
    badge: 'Fale via WhatsApp',
  },
  {
    id: 'outros',
    title: 'Outros Seguros',
    shortDescription: 'Não encontrou o que precisa? Fale com a gente e encontramos a solução.',
    quoteUrl: 'https://api.whatsapp.com/send?phone=5511994635763',
    badge: 'Fale via WhatsApp',
  },
]
