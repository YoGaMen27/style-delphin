import { type ReactNode } from 'react'
import { useTheme } from '@/context/ThemeContext'

/**
 * ThemeWrapper wraps the entire app and applies theme-specific
 * CSS classes that map to Tailwind customizations.
 */
export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { currentThemeId, currentTheme } = useTheme()

  return (
    <div
      key={currentThemeId}
      className="theme-wrapper min-h-[100dvh] transition-colors duration-500"
      style={{
        fontFamily: currentTheme.fonts.body,
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
      }}
      data-theme={currentThemeId}
    >
      {children}
    </div>
  )
}
