/**
 * PocketBase server-side hook:
 * Dispara automaticamente um e-mail para seguros3scorretora@gmail.com
 * sempre que um novo contato for criado na coleção 'contacts'.
 *
 * O envio é seguro e em bloco try/catch: se falhar, o contato continua salvo
 * normalmente no banco de dados.
 */

const NEED_LABELS = {
  seguro_auto_carro: 'Seguro Auto (Carro)',
  seguro_auto_moto: 'Seguro Auto (Moto)',
  seguro_auto_caminhao: 'Seguro Caminhão / Frota',
  seguro_residencial: 'Seguro Residencial',
  seguro_empresarial: 'Seguro Empresarial',
  seguro_condominio: 'Seguro Condomínio',
  seguro_vida: 'Seguro de Vida',
  seguro_viagem: 'Seguro Viagem',
  seguro_celular: 'Seguro Celular e Portáteis',
  planos_saude: 'Planos de Saúde e Odonto',
  responsabilidade_civil: 'Responsabilidade Civil Profissional',
  outros: 'Outras Consultorias e Seguros',
}

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatBrazilianDateTime(isoString) {
  try {
    const d = isoString ? new Date(isoString) : new Date()
    return d.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short',
      timeStyle: 'medium',
    })
  } catch (_) {
    return new Date().toISOString()
  }
}

onRecordCreate((e) => {
  // Garante a execução da persistência do registro
  e.next()

  try {
    const record = e.record
    if (!record) return

    const name = record.getString('name') || 'Não informado'
    const whatsapp = record.getString('whatsapp') || record.getString('contact') || 'Não informado'
    const email = record.getString('email') || 'Não informado'
    const needRaw = record.getString('need') || 'outros'
    const needLabel = NEED_LABELS[needRaw] || needRaw
    const message = record.getString('message') || '(Nenhuma mensagem adicional)'
    const createdStr = record.getString('created')
    const formattedDate = formatBrazilianDateTime(createdStr)

    const recipient = 'seguros3scorretora@gmail.com'
    const subject = `Novo contato pelo site — 3S Corretora (${name})`

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 12px; color: #1e293b;">
        <div style="background: linear-gradient(135deg, #004173 0%, #0979B0 100%); padding: 24px; border-radius: 8px 8px 0 0; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">3S Corretora de Seguros</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #bae6fd; text-transform: uppercase; letter-spacing: 1px;">Novo Contato Recebido pelo Site</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
          <p style="margin-top: 0; font-size: 15px; line-height: 1.5; color: #334155;">
            Um novo lead preencheu o formulário de atendimento no site da <strong>3S Corretora</strong>:
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tbody>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: 600; color: #004173; width: 140px;">Nome:</td>
                <td style="padding: 10px 0; color: #0f172a;"><strong>${escapeHtml(name)}</strong></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: 600; color: #004173;">WhatsApp:</td>
                <td style="padding: 10px 0; color: #0f172a;">
                  <a href="https://wa.me/55${escapeHtml(whatsapp.replace(/\D/g, ''))}" style="color: #0284c7; text-decoration: none; font-weight: 600;">
                    ${escapeHtml(whatsapp)}
                  </a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: 600; color: #004173;">E-mail:</td>
                <td style="padding: 10px 0; color: #0f172a;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #0284c7; text-decoration: none;">
                    ${escapeHtml(email)}
                  </a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: 600; color: #004173;">Necessidade/Assunto:</td>
                <td style="padding: 10px 0; color: #0f172a;">
                  <span style="display: inline-block; background-color: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: 600;">
                    ${escapeHtml(needLabel)}
                  </span>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: 600; color: #004173;">Data / Hora:</td>
                <td style="padding: 10px 0; color: #64748b;">${escapeHtml(formattedDate)}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="margin-top: 16px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #0CB7F2; border-radius: 4px;">
            <div style="font-size: 12px; font-weight: 700; color: #004173; text-transform: uppercase; margin-bottom: 6px;">Mensagem enviada pelo lead:</div>
            <div style="font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
          
          <div style="margin-top: 24px; text-align: center;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">
              Este e-mail foi gerado automaticamente pelo formulário do site 3S Corretora de Seguros.
            </p>
          </div>
        </div>
      </div>
    `

    const senderAddress = e.app.settings().meta.senderAddress || 'no-reply@goskip.app'
    const senderName = e.app.settings().meta.senderName || '3S Corretora'

    const mailMessage = new MailerMessage({
      from: {
        address: senderAddress,
        name: senderName,
      },
      to: [{ address: recipient }],
      subject: subject,
      html: htmlBody,
    })

    e.app.newMailClient().send(mailMessage)
    console.log(
      `[3S Corretora] E-mail de novo contato enviado com sucesso para ${recipient} (Lead: ${name})`,
    )
  } catch (err) {
    // Não quebrar nem bloquear o salvamento do contato
    console.error('[3S Corretora] Erro ao disparar e-mail de novo contato:', err)
  }
}, 'contacts')
