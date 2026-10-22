migrate(
  (app) => {
    // 1. Criar coleção 'testimonials' de forma idempotente
    let testimonialsCol
    try {
      testimonialsCol = app.findCollectionByNameOrId('testimonials')
    } catch (_) {
      const collection = new Collection({
        name: 'testimonials',
        type: 'base',
        listRule: '', // Leitura pública para a home ler
        viewRule: '', // Leitura pública
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
        fields: [
          {
            name: 'name',
            type: 'text',
            required: true,
            max: 120,
          },
          {
            name: 'text',
            type: 'text',
            required: true,
            max: 2000,
          },
          {
            name: 'rating',
            type: 'number',
            required: false,
            min: 1,
            max: 5,
            onlyInt: true,
          },
          {
            name: 'source',
            type: 'select',
            required: true,
            maxSelect: 1,
            values: ['site', 'google'],
          },
          {
            name: 'active',
            type: 'bool',
            required: false, // PocketBase bool não deve ser required
          },
          {
            name: 'sort_order',
            type: 'number',
            required: false,
            onlyInt: true,
          },
          {
            name: 'created',
            type: 'autodate',
            onCreate: true,
            onUpdate: false,
          },
          {
            name: 'updated',
            type: 'autodate',
            onCreate: true,
            onUpdate: true,
          },
        ],
        indexes: [
          'CREATE INDEX idx_testimonials_active_sort ON testimonials (active, sort_order ASC)',
          'CREATE INDEX idx_testimonials_sort ON testimonials (sort_order ASC)',
        ],
      })

      app.save(collection)
      testimonialsCol = app.findCollectionByNameOrId('testimonials')
    }

    // 2. Inserir os 3 depoimentos que estavam na home de forma idempotente
    const initialTestimonials = [
      {
        name: 'Marcelo Santoro',
        text: 'Renovei o seguro do meu carro com a 3S e foi a melhor experiência. Atendimento super ágil, encontraram um valor menor do que eu pagava e com assistência ainda melhor.',
        rating: 5,
        source: 'google',
        active: true,
        sort_order: 1,
      },
      {
        name: 'Cláudia Regina',
        text: 'A Ana Paula e sua equipe cuidaram de todo o seguro patrimonial da nossa empresa no Belenzinho. Explicaram cada detalhe da apólice sem complicação. Recomendo fortemente.',
        rating: 5,
        source: 'google',
        active: true,
        sort_order: 2,
      },
      {
        name: 'Gustavo Figueiredo',
        text: 'Estávamos perdidos com tantas opções de plano de saúde para nossa família. A corretora comparou as redes credenciadas e achou a opção com o melhor custo-benefício.',
        rating: 5,
        source: 'site',
        active: true,
        sort_order: 3,
      },
    ]

    for (const item of initialTestimonials) {
      try {
        app.findFirstRecordByData('testimonials', 'name', item.name)
      } catch (_) {
        const record = new Record(testimonialsCol)
        record.set('name', item.name)
        record.set('text', item.text)
        record.set('rating', item.rating)
        record.set('source', item.source)
        record.set('active', item.active)
        record.set('sort_order', item.sort_order)
        app.save(record)
      }
    }
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('testimonials')
      app.delete(collection)
    } catch (_) {}
  },
)
