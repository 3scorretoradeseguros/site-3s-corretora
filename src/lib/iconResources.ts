/**
 * Catálogo e geradores dos ícones SVG vetorizados do site 3S Corretora.
 *
 * Cada ícone possui:
 * - id: identificador estável
 * - title: nome amigável do seguro/recurso
 * - category: categoria do recurso ('seguro' | 'diferencial')
 * - description: breve contexto de uso
 * - innerSvgMarkup: string dos elementos SVG internos (caminhos, círculos, etc)
 * - getSvgMarkup(options): string de marcação SVG pura com xmlns, perfeita para download SVG ou conversão em PNG via Canvas.
 */

export interface IconResourceItem {
  id: string
  title: string
  category: 'seguros' | 'diferenciais'
  description: string
  keywords: string[]
  recommendedFileName: string
  viewBox: string
  innerSvgMarkup: string
  getSvgMarkup: (options?: {
    color?: string
    size?: number
    background?: 'transparent' | 'white' | 'circle'
  }) => string
}

const DEFAULT_STROKE = '#0979B0'

/**
 * Escudo Oficial Hero 3S: "CUIDADO & PROTEÇÃO"
 * Reproduz o escudo SVG minimalista flat da página inicial com seus gradientes e tipografia integrados.
 */
function getHeroShieldSvgMarkup(
  size = 512,
  background: 'transparent' | 'white' = 'transparent',
): string {
  const bgRect =
    background === 'white' ? `<rect width="${size}" height="${size}" fill="#FFFFFF" rx="48"/>` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 380" width="${size}" height="${size}">
  ${bgRect}
  <defs>
    <linearGradient id="shieldOuterGradient" x1="290" y1="16" x2="70" y2="364" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0CB7F2"/>
      <stop offset="50%" stop-color="#0979B0"/>
      <stop offset="100%" stop-color="#004173"/>
    </linearGradient>
    <linearGradient id="shieldInnerGradient" x1="270" y1="30" x2="90" y2="350" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0CB7F2"/>
      <stop offset="35%" stop-color="#0979B0"/>
      <stop offset="70%" stop-color="#004173"/>
      <stop offset="100%" stop-color="#002b4d"/>
    </linearGradient>
    <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#001830" flood-opacity="0.7"/>
    </filter>
  </defs>
  <path d="M 180 16 L 332 72 C 332 236 262 332 180 364 C 98 332 28 236 28 72 Z" fill="url(#shieldOuterGradient)"/>
  <path d="M 180 34 L 312 83 C 312 222 248 310 180 340 C 112 310 48 222 48 83 Z" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round" fill="url(#shieldInnerGradient)"/>
  <path d="M 180 44 L 300 90 C 300 130 292 170 278 200 C 248 170 215 155 180 155 C 145 155 112 170 82 200 C 68 170 60 130 60 90 Z" fill="#FFFFFF" fill-opacity="0.06"/>
  <text x="180" y="152" text-anchor="middle" fill="#FFFFFF" filter="url(#textGlow)" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="3.5">CUIDADO</text>
  <line x1="94" y1="190" x2="150" y2="190" stroke="#0CB7F2" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
  <circle cx="180" cy="190" r="16" fill="#00223d" stroke="#0CB7F2" stroke-width="2"/>
  <text x="180" y="196.5" text-anchor="middle" fill="#0CB7F2" font-family="Georgia, serif" font-weight="700" font-size="18">&amp;</text>
  <line x1="210" y1="190" x2="266" y2="190" stroke="#0CB7F2" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
  <text x="180" y="238" text-anchor="middle" fill="#FFFFFF" filter="url(#textGlow)" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="3.5">PROTEÇÃO</text>
</svg>`
}

/**
 * Cria markup SVG padrão 24x24 (formato Lucide) pronto para download ou canvas
 */
function createStandardSvgMarkup(
  pathsMarkup: string,
  options?: { color?: string; size?: number; background?: 'transparent' | 'white' | 'circle' },
): string {
  const color = options?.color || DEFAULT_STROKE
  const size = options?.size || 512
  const bg = options?.background || 'transparent'

  let bgMarkup = ''
  if (bg === 'white') {
    bgMarkup = `<rect width="24" height="24" rx="4" fill="#FFFFFF"/>\n  `
  } else if (bg === 'circle') {
    bgMarkup = `<circle cx="12" cy="12" r="11" fill="#F0F7FB" stroke="#0CB7F2" stroke-width="1"/>\n  `
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  ${bgMarkup}${pathsMarkup}
</svg>`
}

export const ICON_RESOURCES: IconResourceItem[] = [
  // 1. Seguro Auto Carro
  {
    id: 'seguro_auto_carro',
    title: 'Seguro Auto Carro',
    category: 'seguros',
    description:
      'Ícone de automóvel de passeio para apólices de seguro auto e cotações de veículos.',
    keywords: ['carro', 'automóvel', 'auto', 'veículo'],
    recommendedFileName: '3s-icone-seguro-auto-carro',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
  <circle cx="7" cy="17" r="2"/>
  <path d="M9 17h6"/>
  <circle cx="17" cy="17" r="2"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
  <circle cx="7" cy="17" r="2"/>
  <path d="M9 17h6"/>
  <circle cx="17" cy="17" r="2"/>`,
        options,
      ),
  },

  // 2. Seguro Auto Moto
  {
    id: 'seguro_auto_moto',
    title: 'Seguro Auto Moto',
    category: 'seguros',
    description: 'Ícone de motocicleta para proteção de duas rodas e assistência ao motociclista.',
    keywords: ['moto', 'motocicleta', 'duas rodas', 'bike'],
    recommendedFileName: '3s-icone-seguro-auto-moto',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<circle cx="18.5" cy="17.5" r="3.5"/>
  <circle cx="5.5" cy="17.5" r="3.5"/>
  <circle cx="15" cy="5" r="1"/>
  <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<circle cx="18.5" cy="17.5" r="3.5"/>
  <circle cx="5.5" cy="17.5" r="3.5"/>
  <circle cx="15" cy="5" r="1"/>
  <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>`,
        options,
      ),
  },

  // 3. Seguro Auto Caminhão
  {
    id: 'seguro_auto_caminhao',
    title: 'Seguro Auto Caminhão',
    category: 'seguros',
    description: 'Ícone de caminhão para transporte de carga, pesados e apólices de frota.',
    keywords: ['caminhão', 'carga', 'transporte', 'pesados', 'frota'],
    recommendedFileName: '3s-icone-seguro-auto-caminhao',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
  <path d="M15 18H9"/>
  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
  <circle cx="17" cy="18" r="2"/>
  <circle cx="7" cy="18" r="2"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
  <path d="M15 18H9"/>
  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
  <circle cx="17" cy="18" r="2"/>
  <circle cx="7" cy="18" r="2"/>`,
        options,
      ),
  },

  // 4. Seguro Residencial
  {
    id: 'seguro_residencial',
    title: 'Seguro Residencial',
    category: 'seguros',
    description: 'Ícone de casa/residência para cobertura de incêndio, roubo e danos elétricos.',
    keywords: ['casa', 'residência', 'lar', 'apartamento', 'residencial'],
    recommendedFileName: '3s-icone-seguro-residencial',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>`,
        options,
      ),
  },

  // 5. Seguro Empresarial
  {
    id: 'seguro_empresarial',
    title: 'Seguro Empresarial',
    category: 'seguros',
    description:
      'Ícone de edifícios corporativos para patrimônio empresarial, lojas e escritórios.',
    keywords: ['empresa', 'empresarial', 'comércio', 'escritório', 'pj'],
    recommendedFileName: '3s-icone-seguro-empresarial',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
  <path d="M10 6h4"/>
  <path d="M10 10h4"/>
  <path d="M10 14h4"/>
  <path d="M10 18h4"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
  <path d="M10 6h4"/>
  <path d="M10 10h4"/>
  <path d="M10 14h4"/>
  <path d="M10 18h4"/>`,
        options,
      ),
  },

  // 6. Seguro Condomínio
  {
    id: 'seguro_condominio',
    title: 'Seguro Condomínio',
    category: 'seguros',
    description: 'Ícone de edifício predial para condomínios residenciais e comerciais.',
    keywords: ['condomínio', 'prédio', 'edifício', 'síndico'],
    recommendedFileName: '3s-icone-seguro-condominio',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
  <path d="M9 22v-4h6v4"/>
  <path d="M8 6h.01"/>
  <path d="M16 6h.01"/>
  <path d="M12 6h.01"/>
  <path d="M12 10h.01"/>
  <path d="M12 14h.01"/>
  <path d="M16 10h.01"/>
  <path d="M16 14h.01"/>
  <path d="M8 10h.01"/>
  <path d="M8 14h.01"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
  <path d="M9 22v-4h6v4"/>
  <path d="M8 6h.01"/>
  <path d="M16 6h.01"/>
  <path d="M12 6h.01"/>
  <path d="M12 10h.01"/>
  <path d="M12 14h.01"/>
  <path d="M16 10h.01"/>
  <path d="M16 14h.01"/>
  <path d="M8 10h.01"/>
  <path d="M8 14h.01"/>`,
        options,
      ),
  },

  // 7. Seguro de Vida
  {
    id: 'seguro_vida',
    title: 'Seguro de Vida',
    category: 'seguros',
    description: 'Ícone de pulso cardíaco para seguro de vida individual, familiar e em grupo.',
    keywords: ['vida', 'coração', 'saúde', 'família', 'benefício'],
    recommendedFileName: '3s-icone-seguro-vida',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>`,
        options,
      ),
  },

  // 8. Seguro Viagem
  {
    id: 'seguro_viagem',
    title: 'Seguro Viagem',
    category: 'seguros',
    description: 'Ícone de avião para assistência médica e bagagem no Brasil e exterior.',
    keywords: ['viagem', 'avião', 'turismo', 'exterior', 'voo'],
    recommendedFileName: '3s-icone-seguro-viagem',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>`,
        options,
      ),
  },

  // 9. Seguro Celular
  {
    id: 'seguro_celular',
    title: 'Seguro Celular',
    category: 'seguros',
    description:
      'Ícone de smartphone para proteção contra roubo, furto qualificado e danos acidentais.',
    keywords: ['celular', 'smartphone', 'mobile', 'aparelho', 'telefone'],
    recommendedFileName: '3s-icone-seguro-celular',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
  <path d="M12 18h.01"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
  <path d="M12 18h.01"/>`,
        options,
      ),
  },

  // 10. Planos de Saúde
  {
    id: 'planos_saude',
    title: 'Planos de Saúde',
    category: 'seguros',
    description: 'Ícone de estetoscópio para convênios médicos, odontológicos e saúde corporativa.',
    keywords: ['saúde', 'plano de saúde', 'médico', 'estetoscópio', 'hospital'],
    recommendedFileName: '3s-icone-planos-de-saude',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
  <circle cx="20" cy="10" r="2"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
  <circle cx="20" cy="10" r="2"/>`,
        options,
      ),
  },

  // 11. Responsabilidade Civil Profissional (RC)
  {
    id: 'responsabilidade_civil',
    title: 'RC Profissional',
    category: 'seguros',
    description:
      'Ícone de balança de justiça para responsabilidade civil profissional, médicos, advogados e engenheiros.',
    keywords: ['rc', 'responsabilidade civil', 'justiça', 'balança', 'processos', 'danos'],
    recommendedFileName: '3s-icone-rc-profissional',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
  <path d="M7 21h10"/>
  <path d="M12 3v18"/>
  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
  <path d="M7 21h10"/>
  <path d="M12 3v18"/>
  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>`,
        options,
      ),
  },

  // 12. Outros Seguros / Consultoria Personalizada
  {
    id: 'outros',
    title: 'Outros Seguros & Soluções',
    category: 'seguros',
    description:
      'Ícone de suporte/interrogação para seguros especiais, garantias e consultoria personalizada.',
    keywords: ['outros', 'ajuda', 'suporte', 'especiais', 'dúvidas'],
    recommendedFileName: '3s-icone-outros-seguros',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<circle cx="12" cy="12" r="10"/>
  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
  <path d="M12 17h.01"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<circle cx="12" cy="12" r="10"/>
  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
  <path d="M12 17h.01"/>`,
        options,
      ),
  },

  // 13. Guarda-chuva (Seguros / Proteção Geral - Trust Bar)
  {
    id: 'diferencial_guarda_chuva',
    title: 'Guarda-chuva (Proteção & Seguros)',
    category: 'diferenciais',
    description:
      'Ícone de guarda-chuva utilizado na faixa de confiança para representar o ramo geral de seguros.',
    keywords: ['guarda-chuva', 'seguros', 'proteção', 'trust bar', 'cobertura'],
    recommendedFileName: '3s-icone-guarda-chuva-seguros',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="M22 12a10.06 10.06 0 0 0-20 0Z"/>
  <path d="M12 12v8a2 2 0 0 0 4 0"/>
  <path d="M12 2v1"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="M22 12a10.06 10.06 0 0 0-20 0Z"/>
  <path d="M12 12v8a2 2 0 0 0 4 0"/>
  <path d="M12 2v1"/>`,
        options,
      ),
  },

  // 14. Cruz Médica (Planos de Saúde - Trust Bar)
  {
    id: 'diferencial_cruz_medica',
    title: 'Cruz Médica (Planos de Saúde)',
    category: 'diferenciais',
    description: 'Ícone de cruz médica utilizado na faixa de confiança e chips para saúde.',
    keywords: ['cruz médica', 'saúde', 'hospital', 'médico', 'trust bar'],
    recommendedFileName: '3s-icone-cruz-medica-saude',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/>`,
        options,
      ),
  },

  // 15. Escudo SUSEP / Verificação (ShieldCheck)
  {
    id: 'diferencial_escudo_susep',
    title: 'Escudo de Registro SUSEP',
    category: 'diferenciais',
    description:
      'Ícone de escudo checado utilizado para certificar a habilitação oficial SUSEP da corretora.',
    keywords: ['susep', 'escudo', 'segurança', 'licença', 'garantia'],
    recommendedFileName: '3s-icone-escudo-susep',
    viewBox: '0 0 24 24',
    innerSvgMarkup: `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
  <path d="m9 12 2 2 4-4"/>`,
    getSvgMarkup: (options) =>
      createStandardSvgMarkup(
        `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
  <path d="m9 12 2 2 4-4"/>`,
        options,
      ),
  },

  // 16. Escudo Hero Oficial 3S "CUIDADO & PROTEÇÃO"
  {
    id: 'diferencial_escudo_hero_3s',
    title: 'Escudo Oficial 3S (Cuidado & Proteção)',
    category: 'diferenciais',
    description:
      'O emblema principal desenhado em vetor da home da 3S Corretora com os lemas e gradientes corporativos.',
    keywords: ['escudo', 'emblema', 'cuidado e proteção', 'hero', 'marca', 'logo'],
    recommendedFileName: '3s-emblema-escudo-cuidado-protecao',
    viewBox: '0 0 360 380',
    innerSvgMarkup: `<defs>
    <linearGradient id="shieldOuterGradientRes" x1="290" y1="16" x2="70" y2="364" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0CB7F2"/>
      <stop offset="50%" stop-color="#0979B0"/>
      <stop offset="100%" stop-color="#004173"/>
    </linearGradient>
    <linearGradient id="shieldInnerGradientRes" x1="270" y1="30" x2="90" y2="350" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0CB7F2"/>
      <stop offset="35%" stop-color="#0979B0"/>
      <stop offset="70%" stop-color="#004173"/>
      <stop offset="100%" stop-color="#002b4d"/>
    </linearGradient>
  </defs>
  <path d="M 180 16 L 332 72 C 332 236 262 332 180 364 C 98 332 28 236 28 72 Z" fill="url(#shieldOuterGradientRes)"/>
  <path d="M 180 34 L 312 83 C 312 222 248 310 180 340 C 112 310 48 222 48 83 Z" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round" fill="url(#shieldInnerGradientRes)"/>
  <path d="M 180 44 L 300 90 C 300 130 292 170 278 200 C 248 170 215 155 180 155 C 145 155 112 170 82 200 C 68 170 60 130 60 90 Z" fill="#FFFFFF" fill-opacity="0.06"/>
  <text x="180" y="152" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="3.5">CUIDADO</text>
  <line x1="94" y1="190" x2="150" y2="190" stroke="#0CB7F2" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
  <circle cx="180" cy="190" r="16" fill="#00223d" stroke="#0CB7F2" stroke-width="2"/>
  <text x="180" y="196.5" text-anchor="middle" fill="#0CB7F2" font-family="Georgia, serif" font-weight="700" font-size="18">&amp;</text>
  <line x1="210" y1="190" x2="266" y2="190" stroke="#0CB7F2" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
  <text x="180" y="238" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="3.5">PROTEÇÃO</text>`,
    getSvgMarkup: (_options) => getHeroShieldSvgMarkup(512),
  },
]
