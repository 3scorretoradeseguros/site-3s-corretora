import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Garante que a transição entre rotas (especialmente da Home para as LPs)
 * sempre inicialize o scroll no topo absoluto (top: 0), sem âncoras ou manutenção de scroll.
 */
export const ScrollToTop = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    })
  }, [pathname, search])

  return null
}

export default ScrollToTop
