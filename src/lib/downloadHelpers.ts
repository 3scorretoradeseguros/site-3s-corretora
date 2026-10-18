/**
 * Utilitários para download seguro e direto de SVG e renderização de PNG via Canvas 512x512
 * Sem dependências externas pesadas.
 */

/**
 * Dispara o download de um Blob no navegador com o nome de arquivo fornecido
 */
export function triggerFileDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * Baixa uma string SVG como arquivo .svg
 */
export function downloadSvgString(svgMarkup: string, filename: string): void {
  const cleanFilename = filename.endsWith('.svg') ? filename : `${filename}.svg`
  const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' })
  triggerFileDownload(blob, cleanFilename)
}

/**
 * Renderiza uma string SVG em um canvas HTML5 e baixa como arquivo .png
 * @param svgMarkup String XML do SVG (deve possuir xmlns)
 * @param filename Nome base do arquivo baixado
 * @param width Largura da imagem gerada (padrão 512)
 * @param height Altura da imagem gerada (padrão 512)
 */
export async function downloadSvgAsPng(
  svgMarkup: string,
  filename: string,
  width = 512,
  height = 512,
): Promise<void> {
  const cleanFilename = filename.endsWith('.png') ? filename : `${filename}.png`

  return new Promise<void>((resolve, reject) => {
    try {
      const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const img = new Image()

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            URL.revokeObjectURL(url)
            reject(new Error('Não foi possível obter o contexto 2D do Canvas.'))
            return
          }

          // Fundo transparente por padrão
          ctx.clearRect(0, 0, width, height)
          ctx.drawImage(img, 0, 0, width, height)

          canvas.toBlob((pngBlob) => {
            URL.revokeObjectURL(url)
            if (pngBlob) {
              triggerFileDownload(pngBlob, cleanFilename)
              resolve()
            } else {
              reject(new Error('Falha ao gerar o Blob PNG a partir do canvas.'))
            }
          }, 'image/png')
        } catch (canvasErr) {
          URL.revokeObjectURL(url)
          reject(canvasErr)
        }
      }

      img.onerror = (e) => {
        URL.revokeObjectURL(url)
        reject(new Error('Erro ao carregar o SVG no elemento Image para renderização.'))
      }

      img.src = url
    } catch (err) {
      reject(err)
    }
  })
}
