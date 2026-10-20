import React, { createContext, useContext, useEffect, useState } from 'react'

export type FontSizeLevel = 'normal' | 'large' | 'larger'

export interface AccessibilitySettings {
  highContrast: boolean
  fontSize: FontSizeLevel
  readingMode: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  toggleHighContrast: () => void
  setFontSize: (level: FontSizeLevel) => void
  cycleFontSize: () => void
  toggleReadingMode: () => void
  resetAccessibility: () => void
  isDefault: boolean
}

const STORAGE_KEY = 'tres_s_accessibility_settings'

const DEFAULT_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  fontSize: 'normal',
  readingMode: false,
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return {
          highContrast: Boolean(parsed.highContrast),
          fontSize:
            parsed.fontSize === 'larger' || parsed.fontSize === 'large'
              ? parsed.fontSize
              : 'normal',
          readingMode: Boolean(parsed.readingMode),
        }
      }
    } catch (e) {
      console.warn('Erro ao ler preferências de acessibilidade:', e)
    }
    return DEFAULT_SETTINGS
  })

  // Sincroniza classes no elemento <html> (ou <body>) e salva no localStorage
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Alto Contraste
    if (settings.highContrast) {
      root.classList.add('a11y-high-contrast')
    } else {
      root.classList.remove('a11y-high-contrast')
    }

    // Aumento de Fonte
    root.classList.remove('a11y-font-large', 'a11y-font-larger')
    if (settings.fontSize === 'large') {
      root.classList.add('a11y-font-large')
    } else if (settings.fontSize === 'larger') {
      root.classList.add('a11y-font-larger')
    }

    // Modo de Leitura
    if (settings.readingMode) {
      root.classList.add('a11y-reading-mode')
    } else {
      root.classList.remove('a11y-reading-mode')
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (e) {
      console.warn('Erro ao salvar preferências de acessibilidade:', e)
    }
  }, [settings])

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }))
  }

  const setFontSize = (level: FontSizeLevel) => {
    setSettings((prev) => ({ ...prev, fontSize: level }))
  }

  const cycleFontSize = () => {
    setSettings((prev) => {
      if (prev.fontSize === 'normal') return { ...prev, fontSize: 'large' }
      if (prev.fontSize === 'large') return { ...prev, fontSize: 'larger' }
      return { ...prev, fontSize: 'normal' }
    })
  }

  const toggleReadingMode = () => {
    setSettings((prev) => ({ ...prev, readingMode: !prev.readingMode }))
  }

  const resetAccessibility = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  const isDefault =
    !settings.highContrast && settings.fontSize === 'normal' && !settings.readingMode

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        toggleHighContrast,
        setFontSize,
        cycleFontSize,
        toggleReadingMode,
        resetAccessibility,
        isDefault,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility(): AccessibilityContextType {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) {
    throw new Error('useAccessibility deve ser usado dentro de um AccessibilityProvider')
  }
  return ctx
}
