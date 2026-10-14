migrate(
  (app) => {
    const collection = new Collection({
      name: 'contacts',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: '',
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
          name: 'contact',
          type: 'text',
          required: true,
          max: 180,
        },
        {
          name: 'need',
          type: 'select',
          required: true,
          maxSelect: 1,
          values: [
            'seguro_auto_carro',
            'seguro_auto_moto',
            'seguro_auto_caminhao',
            'seguro_residencial',
            'seguro_empresarial',
            'seguro_condominio',
            'seguro_vida',
            'seguro_viagem',
            'seguro_celular',
            'planos_saude',
            'responsabilidade_civil',
            'outros',
          ],
        },
        {
          name: 'message',
          type: 'text',
          required: false,
          max: 1000,
        },
        {
          name: 'status',
          type: 'select',
          required: false,
          maxSelect: 1,
          values: ['novo', 'respondido'],
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
        'CREATE INDEX idx_contacts_status ON contacts (status)',
        'CREATE INDEX idx_contacts_created ON contacts (created DESC)',
      ],
    })

    app.save(collection)
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('contacts')
      app.delete(collection)
    } catch (_) {}
  },
)
