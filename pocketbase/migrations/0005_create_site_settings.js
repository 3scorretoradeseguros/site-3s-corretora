migrate(
  (app) => {
    const collection = new Collection({
      name: 'site_settings',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'setting_key', type: 'text', required: true, max: 100 },
        { name: 'value', type: 'text', max: 500 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_site_settings_setting_key ON site_settings (setting_key)'],
    })
    app.save(collection)

    // Preferência inicial: selo ReviewSeguro DESATIVADO (sem avaliações ainda)
    const record = new Record(collection)
    record.set('setting_key', 'reviewseguro_badge_enabled')
    record.set('value', 'false')
    app.save(record)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('site_settings')
    app.delete(collection)
  },
)
