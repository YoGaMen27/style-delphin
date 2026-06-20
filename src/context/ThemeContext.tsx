import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { themes, themeList, defaultThemeId, type ThemeId, type Theme } from '@/themes'

interface ThemeContextValue {
  currentThemeId: ThemeId
  currentTheme: Theme
  setTheme: (id: ThemeId) => void
  themeList: Theme[]
  isReady: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'delfin-theme'

function getStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored in themes) {
      return stored as ThemeId
    }
  } catch {
    // ignore
  }
  return defaultThemeId
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(defaultThemeId)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = getStoredTheme()
    setCurrentThemeId(stored)
    setIsReady(true)
  }, [])

  const setTheme = useCallback((id: ThemeId) => {
    setCurrentThemeId(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // ignore
    }
  }, [])

  const currentTheme = themes[currentThemeId]

  return (
    <ThemeContext.Provider
      value={{
        currentThemeId,
        currentTheme,
        setTheme,
        themeList,
        isReady,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
