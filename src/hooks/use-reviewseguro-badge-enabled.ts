import { useEffect, useState } from 'react'
import { getReviewSeguroBadgeEnabled } from '@/services/siteSettings'

/* Lê a preferência do selo ReviewSeguro. Só consulta quando `active` (ex.: home).
   Enquanto não carregar, ou em caso de erro, retorna false: o script não é injetado. */
export function useReviewSeguroBadgeEnabled(active: boolean): boolean {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!active) return
    let cancelled = false
    getReviewSeguroBadgeEnabled()
      .then((value) => {
        if (!cancelled) setEnabled(value)
      })
      .catch(() => {
        if (!cancelled) setEnabled(false)
      })
    return () => {
      cancelled = true
    }
  }, [active])

  return active && enabled
}
