export interface CoverageItem {
  title: string
  description: string
  icon:
    | 'shield'
    | 'zap'
    | 'car'
    | 'truck'
    | 'home'
    | 'wrench'
    | 'file-text'
    | 'users'
    | 'alert-triangle'
    | 'check'
    | 'heart'
    | 'plane'
    | 'smartphone'
    | 'briefcase'
    | 'activity'
}

export interface PracticalExample {
  title: string
  situation: string
  solution: string
}

export interface BenefitItem {
  title: string
  description: string
}

export interface LandingPageData {
  slug: string
  productName: string
  tagline: string
  heroTitle: string
  heroTitleHighlight: string
  heroSubtitle: string
  quoteUrl: string
  ctaText: string
  protectItemName: string
  isWhatsApp: boolean
  heroIconType:
    | 'car'
    | 'moto'
    | 'truck'
    | 'home'
    | 'building'
    | 'condo'
    | 'life'
    | 'travel'
    | 'phone'
    | 'rc'
    | 'health'
  coverages: CoverageItem[]
  benefits: BenefitItem[]
  practicalExamples: PracticalExample[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const LANDING_PAGES_DATA: Record<string, LandingPageData> = {
  '/seguro-auto-carro': {
    slug: '/seguro-auto-carro',
    productName: 'Seguro Auto Carro',
    tagline: 'Proteção Automotiva Completa',
    heroTitle: 'Seguro Auto sob medida para',
    heroTitleHighlight: 'o seu carro e seu bolso',
    heroSubtitle:
      'Análise consultiva nas principais seguradoras do Brasil. Cobertura para colisão, roubo, terceiros e assistência 24 horas com a indicação ideal para o seu perfil.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/auto',
    ctaText: 'Fazer Cotação do Seguro Auto',
    protectItemName: 'carro',
    isWhatsApp: false,
    heroIconType: 'car',
    coverages: [
      {
        title: 'Colisão e Danos ao Veículo',
        description:
          'Indenização total ou parcial para conserto do seu carro em oficinas credenciadas ou de sua escolha.',
        icon: 'car',
      },
      {
        title: 'Roubo, Furto e Incêndio',
        description:
          'Reposição integral pela tabela FIPE em caso de roubo, furto não localizado ou perda total por incêndio.',
        icon: 'shield',
      },
      {
        title: 'Danos a Terceiros (RCF-V)',
        description:
          'Cobertura financeira para danos materiais e corporais causados a outros veículos ou pedestres.',
        icon: 'users',
      },
      {
        title: 'Assistência 24 Horas Completa',
        description:
          'Guincho sem limite ou quilometragem ampliada, socorro mecânico, chaveiro, troca de pneu e pane seca.',
        icon: 'wrench',
      },
      {
        title: 'Vidros, Faróis, Lanternas e Retrovisores',
        description:
          'Troca ou reparo rápido de para-brisas, vidros laterais, traseiro, faróis e retrovisores com franquia reduzida.',
        icon: 'zap',
      },
      {
        title: 'Carro Reserva',
        description:
          'Veículo reserva por 7, 15 ou 30 dias enquanto o seu carro estiver na oficina realizando o conserto.',
        icon: 'check',
      },
    ],
    benefits: [
      {
        title: 'Análise Consultiva de Mercado',
        description:
          'Comparamos opções na Porto Seguro, Allianz, Tokio Marine, Azul, Bradesco e HDI, analisando as coberturas para indicar a melhor relação custo-benefício.',
      },
      {
        title: 'Assessoria em Caso de Sinistro',
        description:
          'Se acontecer um imprevisto, nossa corretora cuida da abertura do processo, liberação da oficina e carro reserva por você.',
      },
      {
        title: 'Parcelamento Facilitado',
        description:
          'Condições de pagamento sem juros no cartão de crédito da seguradora ou débito em conta corrente.',
      },
    ],
    practicalExamples: [
      {
        title: 'Colisão no trânsito diário',
        situation:
          'Um veículo colidiu na traseira do seu carro na avenida durante o horário de pico.',
        solution:
          'O guincho 24h rebocou o carro, a seguradora cobriu os reparos da oficina credenciada e liberou carro reserva imediato.',
      },
      {
        title: 'Furto em estacionamento na rua',
        situation:
          'Ao retornar de um compromisso, o veículo não estava mais onde havia sido estacionado.',
        solution:
          'Com a apólice ativa, a indenização de 100% da Tabela FIPE foi paga com rapidez, amortizando o prejuízo integralmente.',
      },
      {
        title: 'Vidro trincado por pedra na estrada',
        situation:
          'Em viagem no final de semana, uma pedra solta na pista trincou o para-brisa dianteiro.',
        solution:
          'Com a cobertura de vidros, o agendamento foi feito para troca na mesma semana pagando apenas a franquia de vidros.',
      },
    ],
    seo: {
      title: 'Seguro Auto Carro em São Paulo | Consultoria Especializada — 3S Corretora',
      description:
        'Cote seu Seguro Auto Carro com a 3S Corretora em São Paulo. Cobertura completa para roubo, colisão, terceiros e assistência 24h com as principais seguradoras.',
      keywords: [
        'seguro auto são paulo',
        'cotação seguro carro',
        'seguro automóvel belenzinho',
        '3S corretora seguro auto',
        'seguro carro porto seguro',
      ],
    },
  },

  '/seguro-auto-moto': {
    slug: '/seguro-auto-moto',
    productName: 'Seguro Auto Moto',
    tagline: 'Proteção para duas rodas',
    heroTitle: 'Pilote com tranquilidade:',
    heroTitleHighlight: 'seguro completo para sua moto',
    heroSubtitle:
      'Proteção especializada para motocicletas de uso pessoal, lazer ou trabalho. Roubo, furto, colisão e assistência 24h para você rodar sem medo.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/moto',
    ctaText: 'Fazer Cotação do Seguro Moto',
    protectItemName: 'moto',
    isWhatsApp: false,
    heroIconType: 'moto',
    coverages: [
      {
        title: 'Roubo e Furto Qualificado',
        description:
          'Indenização total pela FIPE caso sua moto seja roubada ou furtada e não seja localizada.',
        icon: 'shield',
      },
      {
        title: 'Colisão e Queda Acidental',
        description:
          'Cobertura para danos parciais ou perda total decorrentes de acidentes e colisões no trânsito.',
        icon: 'car',
      },
      {
        title: 'Assistência 24 Horas Especializada',
        description:
          'Reboque com plataforma apropriada para motos, chaveiro, socorro para pane seca e recarga de bateria.',
        icon: 'wrench',
      },
      {
        title: 'Danos a Terceiros (RCF)',
        description:
          'Tranquilidade contra despesas de danos materiais e corporais causados a outros veículos ou pedestres.',
        icon: 'users',
      },
      {
        title: 'Equipamentos e Acessórios',
        description:
          'Opção de cobertura complementar para jaquetas especiais, baús e capacetes de alto valor.',
        icon: 'check',
      },
      {
        title: 'Incêndio e Danos da Natureza',
        description:
          'Proteção contra incêndio, alagamento de via e queda de árvores sobre a motocicleta.',
        icon: 'alert-triangle',
      },
    ],
    benefits: [
      {
        title: 'Aceitação para Altas e Baixas Cilindradas',
        description:
          'Trabalhamos com seguradoras que aceitam desde scooters urbanas até superbikes e motos custom.',
      },
      {
        title: 'Rastreador sem Custo Adicional',
        description:
          'Muitas companhias oferecem rastreador com instalação gratuita reduzindo expressivamente o custo da apólice.',
      },
      {
        title: 'Atendimento Próximo e Humanizado',
        description:
          'Nossa equipe orienta a contratação com franquezas justas e suporte técnico ágil.',
      },
    ],
    practicalExamples: [
      {
        title: 'Abordagem armada e roubo da moto',
        situation:
          'O motociclista foi surpreendido por assaltantes ao parar no semáforo em retorno do trabalho.',
        solution:
          'Com a cobertura ativa, o processo de sinistro foi concluído e a indenização total permitiu a compra de uma nova moto.',
      },
      {
        title: 'Pneu furado à noite na rodovia',
        situation:
          'Durante uma viagem de final de semana, o pneu traseiro furou em trecho deserto.',
        solution:
          'A assistência 24h enviou um caminhão-plataforma específico para motocicletas e levou o piloto com segurança ao destino.',
      },
      {
        title: 'Queda com danos na carenagem e retrovisor',
        situation:
          'Em pista molhada, a moto derrapou em baixa velocidade danificando o escapamento e retrovisores.',
        solution:
          'A cobertura para conserto em oficina autorizada restaurou as peças originais sem complicações.',
      },
    ],
    seo: {
      title: 'Seguro Auto Moto em São Paulo | Consultoria Especializada — 3S Corretora',
      description:
        'Seguro para motos e scooters em São Paulo. Análise consultiva contra roubo, furto, colisão e guincho 24h especializado com a 3S Corretora.',
      keywords: [
        'seguro moto são paulo',
        'seguro motocicleta',
        'cotação seguro moto',
        'seguro moto roubo e furto',
        '3s corretora moto',
      ],
    },
  },

  '/seguro-auto-caminhao': {
    slug: '/seguro-auto-caminhao',
    productName: 'Seguro Auto Caminhão',
    tagline: 'Segurança para quem move o Brasil',
    heroTitle: 'Proteção pesada para o seu caminhão',
    heroTitleHighlight: 'ou frota de transporte',
    heroSubtitle:
      'Soluções robustas para caminhoneiros autônomos e transportadoras. Cobertura para cavalo mecânico, carreta, baú, terceiros e assistência pesada 24h.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/caminhao',
    ctaText: 'Fazer Cotação do Seguro Caminhão',
    protectItemName: 'caminhão',
    isWhatsApp: false,
    heroIconType: 'truck',
    coverages: [
      {
        title: 'Colisão, Tombamento e Capotagem',
        description:
          'Indenização para danos parciais ou integrais ao cavalo mecânico e implementos rodoviários.',
        icon: 'truck',
      },
      {
        title: 'Roubo, Furto e Desvio de Carga',
        description:
          'Proteção para o veículo de carga contra assaltos em rodovias e pátios logísticos.',
        icon: 'shield',
      },
      {
        title: 'Danos Materiais e Corporais a Terceiros',
        description:
          'Limites elevados de RCF para garantir tranquilidade jurídica e financeira em acidentes nas estradas.',
        icon: 'users',
      },
      {
        title: 'Socorro e Guincho Pesado 24h',
        description:
          'Guincho específico para caminhões carregados ou vazios, destombamento e socorro mecânico nas estradas.',
        icon: 'wrench',
      },
      {
        title: 'Cobertura de Carrocerias e Implementos',
        description: 'Proteção extensiva para baú isotérmico, caçamba, tanque, sider e reboques.',
        icon: 'check',
      },
      {
        title: 'Danos a Carga e Operação de Içamento',
        description:
          'Opções de apólices com integração de RCTR-C e responsabilidade civil em transporte de cargas.',
        icon: 'alert-triangle',
      },
    ],
    benefits: [
      {
        title: 'Condições Especiais para Autônomos e Frotas',
        description:
          'Planos flexíveis tanto para o proprietário de um único caminhão quanto para empresas de logística com frota própria.',
      },
      {
        title: 'Agilidade na Emissão e Regulação',
        description:
          'Compreendemos que caminhão parado é prejuízo: agilizamos vistorias e liquidação de sinistros.',
      },
      {
        title: 'Compatibilidade com Sistemas de Rastreamento',
        description:
          'Integração com Sascar, Autotrac, Omnilink e principais gerenciadoras de risco do Brasil.',
      },
    ],
    practicalExamples: [
      {
        title: 'Tombamento em curva de serra',
        situation:
          'Em trecho sinuoso e sob chuva forte, o veículo sofreu tombamento na margem da pista.',
        solution:
          'O serviço de destombamento pesado foi acionado prontamente e os danos ao caminhão foram reparados pela apólice.',
      },
      {
        title: 'Pane mecânica pesada em rodovia interestadual',
        situation: 'O motor travou a 400 km da base durante entrega com prazo contratual apertado.',
        solution:
          'O guincho pesado 24h transportou o caminhão para a concessionária mais próxima e forneceu hospedagem ao motorista.',
      },
      {
        title: 'Engavetamento com colisão em outros veículos',
        situation:
          'O caminhão envolveu-se em colisão múltipla na rodovia, afetando dois automóveis de passeio.',
        solution:
          'A cobertura de RCF a terceiros com limite ampliado indenizou os carros atingidos sem comprometer o patrimônio do transportador.',
      },
    ],
    seo: {
      title: 'Seguro Caminhão e Frota em São Paulo | Cotação — 3S Corretora',
      description:
        'Cotação de seguro para caminhão, cavalo mecânico e frotas de carga. Guincho pesado 24h, colisão, roubo e danos a terceiros com a 3S Corretora.',
      keywords: [
        'seguro caminhão são paulo',
        'seguro cavalo mecanico',
        'seguro frota caminhões',
        'cotação seguro transporte carga',
        '3s corretora caminhao',
      ],
    },
  },

  '/seguro-residencial': {
    slug: '/seguro-residencial',
    productName: 'Seguro Residencial',
    tagline: 'O porto seguro do seu lar',
    heroTitle: 'Proteja a sua casa ou apartamento',
    heroTitleHighlight: 'com custo menor que você imagina',
    heroSubtitle:
      'Tranquilidade para quem mora em casa ou apartamento, próprio ou alugado. Cobertura contra incêndio, roubo, danos elétricos e serviços emergenciais gratuitos.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/residencial',
    ctaText: 'Fazer Cotação do Seguro Residencial',
    protectItemName: 'casa',
    isWhatsApp: false,
    heroIconType: 'home',
    coverages: [
      {
        title: 'Incêndio, Raio e Explosão',
        description:
          'Garantia fundamental para reconstrução estrutural e reposição de todo o conteúdo da residência.',
        icon: 'home',
      },
      {
        title: 'Danos Elétricos e Queda de Raio',
        description:
          'Reposição ou conserto de eletrodomésticos, TVs e computadores queimados por picos de energia.',
        icon: 'zap',
      },
      {
        title: 'Roubo e Furto Qualificado de Bens',
        description:
          'Indenização para móveis, eletrônicos, jóias e pertences subtraídos com arrombamento do imóvel.',
        icon: 'shield',
      },
      {
        title: 'Responsabilidade Civil Familiar',
        description:
          'Indenização para danos causados involuntariamente a vizinhos (ex.: vazamentos) ou animais domésticos.',
        icon: 'users',
      },
      {
        title: 'Perda ou Pagamento de Aluguel',
        description:
          'Garante o pagamento das despesas de moradia temporária caso o imóvel fique inabitável por sinistro.',
        icon: 'file-text',
      },
      {
        title: 'Assistência Residencial 24h Gratuita',
        description:
          'Encanador, eletricista, chaveiro, conserto de geladeira e máquina de lavar, e desentupimento inclusos.',
        icon: 'wrench',
      },
    ],
    benefits: [
      {
        title: 'Excelente Custo-Benefício',
        description:
          'Geralmente custa menos de R$ 1 por dia — muito mais barato que um seguro auto com coberturas altíssimas.',
      },
      {
        title: 'Economia com Manutenção Doméstica',
        description:
          'Os serviços de chaveiro, encanador e eletricista da assistência 24h já amortizam o valor da apólice anual.',
      },
      {
        title: 'Válido para Imóveis Alugados',
        description:
          'Protege tanto o inquilino (conteúdo e RC) quanto o proprietário (estrutura e perda de aluguel).',
      },
    ],
    practicalExamples: [
      {
        title: 'Curto-circuito queima TV e geladeira',
        situation:
          'Uma oscilação violenta na rede elétrica do bairro queimou a televisão e a placa da geladeira nova.',
        solution:
          'A cobertura de danos elétricos indenizou o conserto e a compra de equipamentos novos sem burocracia.',
      },
      {
        title: 'Vazamento na tubulação atinge o vizinho de baixo',
        situation:
          'Um cano interno do banheiro estourou durante o trabalho e infiltrou o teto do apartamento vizinho.',
        solution:
          'A cobertura de Responsabilidade Civil Familiar indenizou a reforma completa do teto do vizinho.',
      },
      {
        title: 'Chave quebrada na fechadura à meia-noite',
        situation:
          'Ao chegar tarde em casa, a chave emperrou e quebrou dentro do tambor da porta principal.',
        solution:
          'O chaveiro 24h do seguro residencial atendeu o chamado rapidamente e trocou o miolo da fechadura sem custo.',
      },
    ],
    seo: {
      title: 'Seguro Residencial em São Paulo | Cotação — 3S Corretora',
      description:
        'Cote o Seguro Residencial para casa ou apartamento em São Paulo com a 3S Corretora. Proteção contra incêndio, roubo, danos elétricos e assistência 24h.',
      keywords: [
        'seguro residencial são paulo',
        'seguro casa belenzinho',
        'seguro apartamento sp',
        'cotação seguro residencial',
        '3s corretora residencial',
      ],
    },
  },

  '/seguro-empresarial': {
    slug: '/seguro-empresarial',
    productName: 'Seguro Empresarial',
    tagline: 'A blindagem do seu negócio',
    heroTitle: 'Proteja o patrimônio e a continuidade',
    heroTitleHighlight: 'da sua empresa ou comércio',
    heroSubtitle:
      'Soluções completas para escritórios, consultórios, comércios, indústrias e prestadores de serviços. Garanta as operações contra incêndio, roubo e processos civis.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/empresarial',
    ctaText: 'Fazer Cotação do Seguro Empresarial',
    protectItemName: 'negócio',
    isWhatsApp: false,
    heroIconType: 'building',
    coverages: [
      {
        title: 'Incêndio, Raio, Explosão e Fumaça',
        description:
          'Garantia total para o prédio e para todas as máquinas, estoque, mobiliário e equipamentos instalados.',
        icon: 'home',
      },
      {
        title: 'Danos Elétricos em Servidores e Maquinário',
        description:
          'Indenização para queima de computadores, nobreaks, ar-condicionado e máquinas industriais.',
        icon: 'zap',
      },
      {
        title: 'Subtração de Bens e Mercadorias',
        description:
          'Proteção contra assalto e furto qualificado de estoques, matérias-primas e ativos do estabelecimento.',
        icon: 'shield',
      },
      {
        title: 'Lucros Cessantes e Despesas Fixas',
        description:
          'Manutenção do fluxo de caixa e pagamento de salários e aluguel caso a empresa precise paralisar atividades após sinistro.',
        icon: 'file-text',
      },
      {
        title: 'Responsabilidade Civil Operações',
        description:
          'Amparo contra processos por acidentes envolvendo clientes, visitantes ou fornecedores dentro da empresa.',
        icon: 'users',
      },
      {
        title: 'Equipamentos Eletrônicos e Portáteis',
        description:
          'Proteção para notebooks e equipamentos levados por colaboradores em visitas externas e home office.',
        icon: 'check',
      },
    ],
    benefits: [
      {
        title: 'Planos Customizados por Segmento',
        description:
          'Apólices específicas para clínicas médicas, varejo, escritórios de tecnologia, restaurantes e indústrias.',
      },
      {
        title: 'Continuidade do Seu Fluxo de Caixa',
        description:
          'Evita que um acidente inesperado leve ao fechamento das portas ou à perda dos investimentos de anos.',
      },
      {
        title: 'Consultoria Especializada 3S',
        description:
          'Avaliamos os riscos do seu contrato de locação e as exigências do condomínio comercial para a apólice perfeita.',
      },
    ],
    practicalExamples: [
      {
        title: 'Incêndio atinge o estoque da loja',
        situation:
          'Um curto em tomada durante a madrugada gerou foco de incêndio destruindo 70% das mercadorias do estoque.',
        solution:
          'A apólice cobriu a reforma civil do imóvel e reembolsou o valor integral das mercadorias em estoque.',
      },
      {
        title: 'Cliente escorrega e se machuca na recepção',
        situation:
          'Piso molhado sem sinalização causou queda com fratura de cliente no ambiente comercial.',
        solution:
          'A cobertura de RC Operações arcou com todas as despesas médicas e hospitalares sem atrito judicial.',
      },
      {
        title: 'Roubo de notebooks no escritório',
        situation:
          'Durante o feriado, a porta de acesso foi arrombada e os computadores da equipe foram subtraídos.',
        solution:
          'A reposição dos computadores ocorreu em poucos dias, permitindo a retomada imediata do trabalho da equipe.',
      },
    ],
    seo: {
      title: 'Seguro Empresarial em São Paulo | Cotação — 3S Corretora',
      description:
        'Seguro empresarial sob medida para empresas e comércios em SP. Cobertura de incêndio, patrimônio, danos elétricos e RC operações com a 3S Corretora.',
      keywords: [
        'seguro empresarial são paulo',
        'seguro para empresas belenzinho',
        'seguro patrimonial comércio',
        'cotação seguro empresarial',
        '3s corretora empresarial',
      ],
    },
  },

  '/seguro-condominio': {
    slug: '/seguro-condominio',
    productName: 'Seguro Condomínio',
    tagline: 'Obrigatório por lei, essencial para a segurança',
    heroTitle: 'Seguro Condomínio completo para',
    heroTitleHighlight: 'prédios residenciais e comerciais',
    heroSubtitle:
      'Cumprimento rigoroso do Art. 1.346 do Código Civil. Proteção para áreas comuns, estrutura predial, portões, elevadores e responsabilidade civil do síndico.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/condominio',
    ctaText: 'Fazer Cotação do Seguro Condomínio',
    protectItemName: 'condomínio',
    isWhatsApp: false,
    heroIconType: 'condo',
    coverages: [
      {
        title: 'Cobertura Básica Simples ou Ampla',
        description:
          'Incêndio, queda de raio, explosão, queda de aeronaves e fumaça para toda a estrutura do edifício.',
        icon: 'home',
      },
      {
        title: 'Responsabilidade Civil do Condomínio',
        description:
          'Cobertura para danos involuntários causados a terceiros, moradores ou prestadores dentro das dependências comuns.',
        icon: 'users',
      },
      {
        title: 'Responsabilidade Civil do Síndico',
        description:
          'Protege o patrimônio pessoal do síndico por eventuais erros de gestão ou omissões involuntárias no exercício do cargo.',
        icon: 'briefcase',
      },
      {
        title: 'Danos Elétricos em Elevadores e Bombas',
        description:
          'Indenização para queima de motores de elevadores, bombas de recalque e portões automáticos.',
        icon: 'zap',
      },
      {
        title: 'Portões Automáticos e Impacto de Veículos',
        description:
          'Danos causados ao fechamento do portão da garagem e colisão de veículos na estrutura do prédio.',
        icon: 'wrench',
      },
      {
        title: 'Vidros de Fachada e Guarda-Corpo',
        description:
          'Reparo e reposição de vidros das áreas comuns, halls sociais, guaritas e guarda-corpos.',
        icon: 'check',
      },
    ],
    benefits: [
      {
        title: 'Conformidade Legal Garantida',
        description:
          'Apólice adequada a todas as exigências do Código Civil brasileiro e convenções condominiais.',
      },
      {
        title: 'Tranquilidade para o Síndico e Conselho',
        description:
          'Blindagem do conselho fiscal contra responsabilidades civis e custos imprevistos de manutenções estruturais.',
      },
      {
        title: 'Condições Flexíveis de Fracionamento',
        description:
          'Pagamento diluído nas despesas ordinárias do condomínio sem sobrecarregar a cota mensal dos condôminos.',
      },
    ],
    practicalExamples: [
      {
        title: 'Queima do motor do elevador social por temporal',
        situation:
          'Uma tempestade severa provocou sobrecarga elétrica que danificou o motor principal do elevador social.',
        solution:
          'A cobertura de danos elétricos indenizou o rebobinamento e substituição dos componentes do elevador.',
      },
      {
        title: 'Portão automático desce sobre carro de morador',
        situation:
          'Um erro de sensor fez o portão da garagem fechar sobre o teto do veículo de um morador.',
        solution:
          'A cobertura de portões e responsabilidade civil indenizou o conserto da lataria do carro sem despesas extras ao caixa.',
      },
      {
        title: 'Placa de revestimento da fachada cai e atinge pedestre',
        situation:
          'Em dia de vento forte, uma peça solta da fachada atingiu um transeunte na calçada pública.',
        solution:
          'A apólice acionou a assistência e cobriu as despesas médicas e indenizatórias decorrentes do incidente.',
      },
    ],
    seo: {
      title: 'Seguro Condomínio em São Paulo | Cotação — 3S Corretora',
      description:
        'Cotação de Seguro Condomínio residencial e comercial em SP. Cobertura completa, RC síndico, danos elétricos e assistência predial com a 3S Corretora.',
      keywords: [
        'seguro condomínio são paulo',
        'seguro predial sp',
        'seguro condomínio rc sindico',
        'cotação seguro condominio belenzinho',
        '3s corretora condominio',
      ],
    },
  },

  '/seguro-de-vida': {
    slug: '/seguro-de-vida',
    productName: 'Seguro de Vida',
    tagline: 'Amor e responsabilidade em forma de cuidado',
    heroTitle: 'O seguro de vida moderno protege',
    heroTitleHighlight: 'você em vida e a sua família no futuro',
    heroSubtitle:
      'Esqueça o conceito antigo de que seguro de vida só serve na falta. Conte com coberturas para doenças graves, invalidez, diárias de incapacidade e auxílio funeral.',
    quoteUrl: 'https://3s.seucorretor.digital/#/formularios/vida',
    ctaText: 'Fazer Cotação do Seguro de Vida',
    protectItemName: 'vida',
    isWhatsApp: false,
    heroIconType: 'life',
    coverages: [
      {
        title: 'Morte Acidental e Natural',
        description:
          'Indenização financeira isenta de imposto de renda e fora do inventário para seus beneficiários escolhidos.',
        icon: 'heart',
      },
      {
        title: 'Invalidez Permanente Total ou Parcial (IPA)',
        description:
          'Indenização paga diretamente a você caso sofra acidente que comprometa sua capacidade laborativa.',
        icon: 'shield',
      },
      {
        title: 'Diagnóstico de Doenças Graves',
        description:
          'Pagamento antecipado em caso de câncer, infarto, AVC e outras enfermidades graves para custear seu tratamento.',
        icon: 'activity',
      },
      {
        title: 'Diária por Incapacidade Temporária (DIT)',
        description:
          'Renda diária para profissionais liberais e autônomos que ficarem afastados do trabalho por doença ou acidente.',
        icon: 'file-text',
      },
      {
        title: 'Assistência Funeral Individual ou Familiar',
        description:
          'Cobertura de todos os trâmites burocráticos e custos de sepultamento ou cremação com acolhimento 24h.',
        icon: 'users',
      },
      {
        title: 'Segunda Opinião Médica Internacional',
        description:
          'Acesso a centros médicos de excelência no mundo para confirmação e direcionamento de diagnósticos complexos.',
        icon: 'check',
      },
    ],
    benefits: [
      {
        title: 'Proteção Financeira Fora de Inventário',
        description:
          'A indenização é liberada sem passar por burocracias judiciais de inventário, garantindo liquidez imediata aos seus herdeiros.',
      },
      {
        title: 'Isenção de Imposto de Renda',
        description:
          'Os valores recebidos por sinistro de vida são 100% isentos de imposto de renda pela legislação brasileira.',
      },
      {
        title: 'Personalizado para o Seu Momento de Vida',
        description:
          'Planos ajustados para solteiros, pais com filhos pequenos, profissionais liberais e sócios de empresas.',
      },
    ],
    practicalExamples: [
      {
        title: 'Diagnóstico precoce de doença grave em vida',
        situation:
          'Um cliente foi diagnosticado com neoplasia maligna e precisou interromper sua rotina para cirurgia e terapias.',
        solution:
          'A indenização em vida foi paga em conta corrente e custeou os remédios e a manutenção da casa durante o afastamento.',
      },
      {
        title: 'Fratura afasta profissional autônomo do consultório',
        situation:
          'Um dentista autônomo fraturou o punho e precisou ficar 45 dias sem realizar atendimentos.',
        solution:
          'A cobertura de DIT pagou diárias equivalentes ao seu rendimento habitual, garantindo suas contas em dia.',
      },
      {
        title: 'Falta inesperada do principal mantenedor da família',
        situation:
          'O provedor faleceu prematuramente deixando cônjuge e dois filhos pequenos em idade escolar.',
        solution:
          'A indenização integral permitiu a quitação das dívidas, garantia dos estudos dos filhos e estabilidade financeira familiar.',
      },
    ],
    seo: {
      title: 'Seguro de Vida em São Paulo | Consultoria Personalizada — 3S Corretora',
      description:
        'Cotação de Seguro de Vida individual e familiar em São Paulo. Cobertura para doenças graves, invalidez e amparo familiar com a 3S Corretora.',
      keywords: [
        'seguro de vida são paulo',
        'seguro de vida individual',
        'seguro de vida doenças graves',
        'cotação seguro de vida belenzinho',
        '3s corretora vida',
      ],
    },
  },

  '/seguro-viagem': {
    slug: '/seguro-viagem',
    productName: 'Seguro Viagem',
    tagline: 'Viaje pelo Brasil ou pelo mundo sem sustos',
    heroTitle: 'Embarque com a segurança do',
    heroTitleHighlight: 'Seguro Viagem Porto Seguro',
    heroSubtitle:
      'Assistência médica internacional, cobertura para extravio de bagagem, cancelamento de voos e suporte 24 horas em português onde você estiver.',
    quoteUrl: 'http://www.porto.vc/VIAGEM_52R04J_1d42503f554f4613952f7754d4da35ce',
    ctaText: 'Cotar Seguro Viagem Porto Seguro',
    protectItemName: 'viagem',
    isWhatsApp: false,
    heroIconType: 'travel',
    coverages: [
      {
        title: 'Despesas Médicas e Hospitalares (DMHO)',
        description:
          'Cobertura completa para consultas, exames, internações e cirurgias de urgência no exterior ou no Brasil.',
        icon: 'activity',
      },
      {
        title: 'Extravio e Danos a Bagagem',
        description:
          'Indenização suplementar para compras de primeira necessidade e reposição de bagagem perdida pela companhia aérea.',
        icon: 'plane',
      },
      {
        title: 'Cancelamento ou Atraso de Voo',
        description:
          'Reembolso de despesas não recuperáveis de passagens e hospedagem em caso de atrasos severos ou cancelamentos imprevistos.',
        icon: 'file-text',
      },
      {
        title: 'Assistência Odontológica e Farmacêutica',
        description:
          'Atendimento de emergência para dores de dente súbitas e reembolso de remédios receitados pelo médico da viagem.',
        icon: 'check',
      },
      {
        title: 'Repatriação Médica e Funerária',
        description:
          'Transporte de volta ao país de origem com equipe médica e UTI aérea se necessário para recuperação do paciente.',
        icon: 'shield',
      },
      {
        title: 'Atendimento 24h em Português',
        description:
          'Central de socorro disponível 24 horas todos os dias no mundo todo, falando a sua língua pelo WhatsApp ou telefone.',
        icon: 'users',
      },
    ],
    benefits: [
      {
        title: 'Atende às Exigências do Tratado de Schengen',
        description:
          'Apólices com cobertura médica mínima de 30 mil euros exigida para entrada em países da Europa.',
      },
      {
        title: 'Emissão Prática Online via Porto Seguro',
        description:
          'Contrate pelo link oficial e receba a apólice com o certificado de cobertura diretamente no seu e-mail antes do embarque.',
      },
      {
        title: 'Evite Contas Médicas Milionárias no Exterior',
        description:
          'Uma simples consulta nos EUA ou Europa pode custar milhares de dólares; com o seguro você viaja com custo fixo e zero dor de cabeça.',
      },
    ],
    practicalExamples: [
      {
        title: 'Febre alta e apendicite repentina no exterior',
        situation:
          'Durante férias na Europa, o viajante teve sintomas agudos de apendicite com indicação cirúrgica.',
        solution:
          'A central do seguro encaminhou para o hospital credenciado e cobriu a conta hospitalar de mais de 18 mil euros integralmente.',
      },
      {
        title: 'Mala não aparece na esteira de desembarque',
        situation:
          'Após conexão aérea, a mala com todas as roupas e pertences ficou retida em outro aeroporto.',
        solution:
          'A seguradora liberou verba imediata para compra de roupas e produtos de higiene enquanto localizava a bagagem.',
      },
      {
        title: 'Cancelamento de viagem por motivo de saúde familiar',
        situation:
          'Na véspera do embarque, um dos viajantes foi internado impossibilitando a viagem marcada.',
        solution:
          'A cobertura de cancelamento ressarciu as diárias de hotéis e passeios já pagos que não permitiam estorno.',
      },
    ],
    seo: {
      title: 'Seguro Viagem Porto Seguro | Cotação Online — 3S Corretora',
      description:
        'Cotação online de Seguro Viagem internacional e nacional da Porto Seguro com a 3S Corretora. Atendimento 24h em português, despesas médicas e bagagem.',
      keywords: [
        'seguro viagem são paulo',
        'seguro viagem porto seguro',
        'seguro tratado schengen',
        'cotação seguro viagem internacional',
        '3s corretora viagem',
      ],
    },
  },

  '/seguro-celular': {
    slug: '/seguro-celular',
    productName: 'Seguro Celular',
    tagline: 'Seu smartphone protegido em qualquer lugar',
    heroTitle: 'Proteção contra roubo, furto e quebra',
    heroTitleHighlight: 'para o seu celular ou iPhone',
    heroSubtitle:
      'Proteção completa e descomplicada via Porto Seguro. Fique tranquilo para usar seu smartphone na rua, transporte ou viagens sem medo de prejuízo.',
    quoteUrl: 'http://www.porto.vc/SEGUROCELULAR_52R04J_7ded94f85d5542d499a77898d8c8c23a',
    ctaText: 'Cotar Seguro Celular Porto Seguro',
    protectItemName: 'celular',
    isWhatsApp: false,
    heroIconType: 'phone',
    coverages: [
      {
        title: 'Roubo e Furto Qualificado',
        description:
          'Indenização ou reposição de aparelho em caso de assalto ou furto mediante rompimento de obstáculo.',
        icon: 'shield',
      },
      {
        title: 'Quebra Acidental e Queda',
        description:
          'Cobertura para danos físicos provocados por quedas acidentais no chão ou impactos que quebrem a tela e carcaça.',
        icon: 'wrench',
      },
      {
        title: 'Danos por Líquidos e Água',
        description:
          'Proteção em caso de queda acidental do aparelho em água, piscina ou derramamento de líquidos.',
        icon: 'zap',
      },
      {
        title: 'Garantia Internacional',
        description:
          'A cobertura de roubo e furto estende-se para suas viagens internacionais sem cobrança adicional.',
        icon: 'plane',
      },
      {
        title: 'Assistência Técnica Homologada',
        description:
          'Reparos realizados exclusivamente com peças originais e técnicos especializados das principais marcas.',
        icon: 'check',
      },
      {
        title: 'Furto Simples (Opcional)',
        description:
          'Planos com opção de extensão para furto simples sem vestígios de arrombamento.',
        icon: 'alert-triangle',
      },
    ],
    benefits: [
      {
        title: 'Parceria Oficial Porto Seguro',
        description:
          'A seguradora mais conceituada do Brasil no segmento de tecnologia e smartphones.',
      },
      {
        title: 'Contratação Prática 100% Online',
        description:
          'Basta informar os dados do aparelho e concluir a solicitação diretamente pelo link oficial da Porto Seguro com a 3S Corretora.',
      },
      {
        title: 'Válido para Aparelhos Novos e Usados',
        description:
          'Aceitação para smartphones com até 18 meses de nota fiscal com avaliação simples.',
      },
    ],
    practicalExamples: [
      {
        title: 'Smartphone furtado no transporte coletivo',
        situation:
          'Durante o trajeto de metrô na volta do trabalho, o passageiro teve o aparelho furtado da mochila.',
        solution:
          'Com o boletim de ocorrência e a apólice da Porto Seguro, um aparelho idêntico foi reposto rapidamente.',
      },
      {
        title: 'Tela estilhaçada após queda na calçada',
        situation:
          'Ao retirar o aparelho do bolso, ele escorregou no piso duro quebrando o visor e o sensor de toque.',
        solution:
          'A cobertura de danos acidentais trocou a tela inteira em assistência técnica autorizada preservando a garantia.',
      },
      {
        title: 'Celular cai na piscina durante confraternização',
        situation:
          'Um descuido derrubou o aparelho na água, paralisando a placa principal e o circuito.',
        solution:
          'A cobertura de danos por líquidos indenizou o conserto ou reposição do aparelho conforme a apólice.',
      },
    ],
    seo: {
      title: 'Seguro Celular e iPhone Porto Seguro | Cotação — 3S Corretora',
      description:
        'Cotação online de Seguro Celular da Porto Seguro com a 3S Corretora. Proteção contra roubo, furto qualificado, quebra acidental e danos por líquidos.',
      keywords: [
        'seguro celular porto seguro',
        'seguro iphone sp',
        'cotação seguro smartphone',
        'seguro celular roubo e quebra',
        '3s corretora celular',
      ],
    },
  },

  '/seguro-rc-profissional': {
    slug: '/seguro-rc-profissional',
    productName: 'Seguro RC Profissional',
    tagline: 'A segurança da sua reputação e do seu patrimônio',
    heroTitle: 'Proteja a sua carreira contra erros e omissões',
    heroTitleHighlight: 'no exercício profissional (E&O)',
    heroSubtitle:
      'Seguro de Responsabilidade Civil Profissional para médicos, advogados, engenheiros, contadores e corretores. Custas de defesa jurídica e indenizações a terceiros.',
    quoteUrl: 'https://api.whatsapp.com/send?phone=5511994635763',
    ctaText: 'Falar com Corretor Especialista no WhatsApp',
    protectItemName: 'reputação',
    isWhatsApp: true,
    heroIconType: 'rc',
    coverages: [
      {
        title: 'Erros e Omissões Involuntárias',
        description:
          'Cobertura para falhas profissionais acidentais cometidas na prestação do serviço que causem danos ao cliente.',
        icon: 'briefcase',
      },
      {
        title: 'Custas de Defesa Jurídica e Honorários',
        description:
          'Pagamento de advogados, perícias técnicas, despesas judiciais e recursos em qualquer instância civil.',
        icon: 'file-text',
      },
      {
        title: 'Danos Materiais e Corporais a Terceiros',
        description:
          'Ressarcimento de prejuízos econômicos e despesas médicas decorrentes do serviço técnico executado.',
        icon: 'users',
      },
      {
        title: 'Danos Morais e Reputacionais',
        description:
          'Indenizações decorrentes de alegações de abalo moral ou processos de perda de credibilidade.',
        icon: 'shield',
      },
      {
        title: 'Acordos Extrajudiciais Homologados',
        description:
          'Amparo da seguradora para negociar acordos amigáveis e evitar a exposição de um julgamento demorado.',
        icon: 'check',
      },
      {
        title: 'Gerenciamento de Crise de Imagem',
        description:
          'Verba dedicada para contratação de assessoria de imprensa especializada para resguardar sua reputação pública.',
        icon: 'alert-triangle',
      },
    ],
    benefits: [
      {
        title: 'Patrimônio Pessoal Blindado',
        description:
          'Evita que seus bens particulares e da sua família sejam penhorados para pagar indenizações processuais.',
      },
      {
        title: 'Especialistas por Categoria Profissional',
        description:
          'Apólices formuladas para médicos, dentistas, advogados, contadores, engenheiros, arquitetos e corretores.',
      },
      {
        title: 'Atendimento Consultivo Direto com a Corretora',
        description:
          'Análise técnica minuciosa da sua atuação com a responsável técnica da 3S Corretora para definir o limite ideal.',
      },
    ],
    practicalExamples: [
      {
        title: 'Erro de cálculo ou prazo em escritório contábil',
        situation:
          'Um atraso involuntário em declaração fiscal gerou multa tributária expressiva ao cliente do escritório.',
        solution:
          'O seguro de RC Profissional indenizou o valor da penalidade financeira sem desfalcar o caixa da contabilidade.',
      },
      {
        title: 'Processo contra médico por complicação cirúrgica',
        situation:
          'Um paciente acionou a Justiça alegando intercorrência pós-operatória após procedimento hospitalar.',
        solution:
          'A apólice cobriu a banca de advogados de renome, perícia médica assistente e o acordo civil homologado.',
      },
      {
        title: 'Falha em projeto estrutural de engenharia',
        situation:
          'Uma discrepância em planta técnica causou atraso na obra e necessidade de reforço de viga com custo extra.',
        solution:
          'A seguradora arcou com as despesas de remediação técnica, preservando a relação entre contratante e engenheiro.',
      },
    ],
    seo: {
      title: 'Seguro RC Profissional em São Paulo | 3S Corretora',
      description:
        'Seguro de Responsabilidade Civil Profissional para médicos, advogados, engenheiros e contadores em SP. Defesa jurídica e indenizações com a 3S Corretora.',
      keywords: [
        'seguro rc profissional sp',
        'responsabilidade civil erros e omissoes',
        'seguro médico erro profissional',
        'seguro rc advogado engenheiro contador',
        '3s corretora rc',
      ],
    },
  },

  '/planos-de-saude': {
    slug: '/planos-de-saude',
    productName: 'Planos de Saúde',
    tagline: 'O melhor cuidado médico para você, sua família ou empresa',
    heroTitle: 'Planos de Saúde sob medida com',
    heroTitleHighlight: 'as melhores operadoras do Brasil',
    heroSubtitle:
      'Individual, familiar ou empresarial (PJ a partir de 2 vidas). Comparamos Amil, Bradesco Saúde, SulAmérica, Notredame Intermédica e Porto Saúde com a melhor rede credenciada.',
    quoteUrl: 'https://api.whatsapp.com/send?phone=5511994635763',
    ctaText: 'Falar com Consultor de Saúde no WhatsApp',
    protectItemName: 'saúde',
    isWhatsApp: true,
    heroIconType: 'health',
    coverages: [
      {
        title: 'Consultas Médicas e Telemedicina 24h',
        description:
          'Acesso a ampla rede de consultórios presenciais e atendimento virtual imediato pelo aplicativo da operadora.',
        icon: 'activity',
      },
      {
        title: 'Exames Laboratoriais e Imagem Avançada',
        description:
          'Cobertura em laboratórios renomados como Fleury, Delboni, Lavoisier e Dasa para diagnósticos precisos.',
        icon: 'check',
      },
      {
        title: 'Internações Clínicas e Cirúrgicas',
        description:
          'Acomodação em enfermaria ou apartamento privativo em hospitais de excelência com UTI completa.',
        icon: 'shield',
      },
      {
        title: 'Pronto-Socorro e Emergências 24h',
        description:
          'Atendimento ágil para urgências sem restrição de horário nas unidades credenciadas de referência.',
        icon: 'wrench',
      },
      {
        title: 'Parto e Obstetrícia Completa',
        description:
          'Acompanhamento pré-natal detalhado, exames morfológicos e realização de parto com suporte neonatal.',
        icon: 'heart',
      },
      {
        title: 'Reembolso Médico (Conforme Plano)',
        description:
          'Opções de apólices com tabela de reembolso para consultas e procedimentos fora da rede credenciada.',
        icon: 'file-text',
      },
    ],
    benefits: [
      {
        title: 'Economia de até 40% com CNPJ (PJ e MEI)',
        description:
          'Planos corporativos a partir de 2 vidas (titular + dependente) com tabelas muito mais vantajosas que o plano individual.',
      },
      {
        title: 'Estudo Comparativo Completo e Gratuito',
        description:
          'Avaliamos seus hospitais e médicos favoritos em São Paulo para indicar o plano exato sem você pagar a mais.',
      },
      {
        title: 'Aproveitamento e Redução de Carências',
        description:
          'Auxiliamos na portabilidade ou migração do seu plano atual para reduzir ou zerar os prazos de carência.',
      },
    ],
    practicalExamples: [
      {
        title: 'Internação e cirurgia de urgência de membro da família',
        situation: 'Um familiar precisou de intervenção cirúrgica emergencial durante o feriado.',
        solution:
          'O atendimento foi liberado em hospital de excelência em São Paulo com cobertura total de UTI, equipe e medicamentos.',
      },
      {
        title: 'Empresa reduz custos de plano de saúde em 30%',
        situation:
          'Uma pequena empresa de TI pagava valores muito altos em reajuste anual de plano corporativo.',
        solution:
          'A 3S Corretora fez o estudo de migração com aproveitamento total de carências, mantendo a rede e reduzindo o custo.',
      },
      {
        title: 'Pré-natal e nascimento do bebê sem imprevistos',
        situation:
          'Um casal planejou a gravidez e contratou o plano de saúde com cobertura obstétrica com antecedência.',
        solution:
          'Todos os ultrassons, exames genéticos e o parto em maternidade de referência foram 100% cobertos.',
      },
    ],
    seo: {
      title: 'Planos de Saúde em São Paulo | Cotação PJ e PF — 3S Corretora',
      description:
        'Cotação de Planos de Saúde individual, familiar e empresarial em SP. Amil, Bradesco, SulAmérica e Porto Saúde com os melhores hospitais na 3S Corretora.',
      keywords: [
        'planos de saúde são paulo',
        'plano de saude empresarial sp',
        'plano de saude mei',
        'bradesco saude sulamerica amil',
        '3s corretora planos saude',
      ],
    },
  },
}
