migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('contacts')

    // 1. Tornar contact opcional se for modificar
    const contactField = col.fields.getByName('contact')
    if (contactField) {
      contactField.required = false
    }

    // 2. Adicionar novos campos whatsapp e email
    if (!col.fields.getByName('whatsapp')) {
      col.fields.add(
        new TextField({
          name: 'whatsapp',
          required: false,
          max: 30,
        }),
      )
    }

    if (!col.fields.getByName('email')) {
      col.fields.add(
        new EmailField({
          name: 'email',
          required: false,
        }),
      )
    }

    app.save(col)

    // 3. Migrar dados existentes em contacts para os novos campos
    // Se contact tiver '@', preenche email; se contiver dígitos, preenche whatsapp
    app
      .db()
      .newQuery(`
      UPDATE contacts
      SET email = contact
      WHERE (email IS NULL OR email = '') AND contact LIKE '%@%'
    `)
      .execute()

    app
      .db()
      .newQuery(`
      UPDATE contacts
      SET whatsapp = contact
      WHERE (whatsapp IS NULL OR whatsapp = '') AND (contact NOT LIKE '%@%' AND contact IS NOT NULL AND contact != '')
    `)
      .execute()
  },
  (app) => {
    const col = app.findCollectionByNameOrId('contacts')
    if (col.fields.getByName('whatsapp')) {
      col.fields.removeByName('whatsapp')
    }
    if (col.fields.getByName('email')) {
      col.fields.removeByName('email')
    }
    app.save(col)
  },
)
