import React, { useEffect } from 'react'

/* Selo do canal de avaliações ReviewSeguro (código oficial fornecido pelo canal).
   Renderizado apenas na home, dentro do rodapé. O script externo é injetado
   programaticamente no mount e removido no unmount, sem duplicar. */

const REVIEWSEGURO_SCRIPT_SRC = 'https://www.reviewseguro.net/api/public/selo.js?v=10'

export const ReviewSeguroBadge: React.FC = () => {
  useEffect(() => {
    // Garante um único script: remove qualquer instância anterior antes de injetar,
    // para que o selo seja reprocessado ao voltar à home.
    document.querySelectorAll(`script[data-reviewseguro-badge="true"]`).forEach((el) => el.remove())

    const script = document.createElement('script')
    script.src = REVIEWSEGURO_SCRIPT_SRC
    script.async = true
    script.dataset.reviewseguroBadge = 'true'
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div
      data-segurocheck-slug="tres-esses-corretora-de-seguros-ltda-51f83fc9"
      data-segurocheck-mode="inline"
      data-segurocheck-variant="card"
      data-segurocheck-size="md"
      data-segurocheck-responsive="true"
      data-segurocheck-theme="light"
      data-segurocheck-name="TRES ESSES CORRETORA DE SEGUROS LTDA"
    >
      <a
        href="https://www.reviewseguro.net/perfil/tres-esses-corretora-de-seguros-ltda-51f83fc9"
        target="_blank"
        rel="noopener"
      >
        TRES ESSES CORRETORA DE SEGUROS LTDA no ReviewSeguro
      </a>
    </div>
  )
}
