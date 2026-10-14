migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // 1. Seed inicial da usuária corretora (idempotente)
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'seguros3scorretora@gmail.com')
    } catch (_) {
      const brokerUser = new Record(users)
      brokerUser.setEmail('seguros3scorretora@gmail.com')
      brokerUser.setPassword('Skip@Pass')
      brokerUser.setVerified(true)
      brokerUser.set('name', 'Ana Paula Marques Torres de Souza')
      app.save(brokerUser)
    }

    // 2. Seed idempotente de contatos de demonstração
    const contactsCol = app.findCollectionByNameOrId('contacts')

    const sampleContacts = [
      {
        name: 'Rodrigo Almeida Siqueira',
        contact: '(11) 98765-4321',
        need: 'seguro_auto_carro',
        message:
          'Gostaria de uma cotação para Corolla Cross XRE 2023. Perfil de uso misto (trabalho e lazer).',
        status: 'novo',
      },
      {
        name: 'Mariana Vasconcelos de Castro',
        contact: 'mariana.castro@gmail.com',
        need: 'planos_saude',
        message:
          'Preciso de um plano de saúde familiar com 3 vidas (casal + filha de 4 anos). Preferência por hospitais na Zona Leste.',
        status: 'novo',
      },
      {
        name: 'Carlos Eduardo Mendes',
        contact: '(11) 97123-8899',
        need: 'seguro_empresarial',
        message:
          'Cotação para seguro patrimonial de gráfica rápida no Belenzinho, maquinário e estoque.',
        status: 'respondido',
      },
      {
        name: 'Fernanda Duarte Lima',
        contact: 'fernanda.duarte@empresa.com.br',
        need: 'seguro_vida',
        message:
          'Gostaria de simular um seguro de vida com cobertura para doenças graves e invalidez.',
        status: 'respondido',
      },
      {
        name: 'Lucas Ferreira Pires',
        contact: '(11) 99555-1234',
        need: 'seguro_residencial',
        message:
          'Cotação para apartamento próprio de 85m² no Belenzinho contra incêndio e danos elétricos.',
        status: 'novo',
      },
    ]

    for (const sample of sampleContacts) {
      try {
        app.findFirstRecordByData('contacts', 'name', sample.name)
      } catch (_) {
        const record = new Record(contactsCol)
        record.set('name', sample.name)
        record.set('contact', sample.contact)
        record.set('need', sample.need)
        record.set('message', sample.message)
        record.set('status', sample.status)
        app.save(record)
      }
    }
  },
  (app) => {
    // down: opcional limpeza de dados de teste
    try {
      const broker = app.findAuthRecordByEmail('_pb_users_auth_', 'seguros3scorretora@gmail.com')
      app.delete(broker)
    } catch (_) {}
  },
)
