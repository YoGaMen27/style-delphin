import { useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

/**
 * ThemeInjector applies theme CSS variables to :root and injects
 * Google Fonts for the current theme. This runs as a singleton
 * inside the ThemeProvider.
 */
export default function ThemeInjector() {
  const { currentTheme } = useTheme()
  const linkRefs = useRef<HTMLLinkElement[]>([])

  useEffect(() => {
    const root = document.documentElement
    const c = currentTheme.colors

    // Apply CSS custom properties
    root.style.setProperty('--theme-primary', c.primary)
    root.style.setProperty('--theme-secondary', c.secondary)
    root.style.setProperty('--theme-accent', c.accent)
    root.style.setProperty('--theme-background', c.background)
    root.style.setProperty('--theme-surface', c.surface)
    root.style.setProperty('--theme-text', c.text)
    root.style.setProperty('--theme-text-muted', c.textMuted)
    root.style.setProperty('--theme-gradient', c.gradient)
    root.style.setProperty('--theme-card-bg', c.cardBg)
    root.style.setProperty('--theme-hero-bg', c.heroBg)
    root.style.setProperty('--theme-footer-bg', c.footerBg)
    root.style.setProperty('--theme-nav-bg', c.navBg)
    root.style.setProperty('--theme-border', c.border)
    root.style.setProperty('--theme-button', c.button)
    root.style.setProperty('--theme-button-hover', c.buttonHover)
    root.style.setProperty('--theme-wave', c.wave)

    root.style.setProperty('--theme-font-heading', currentTheme.fonts.heading)
    root.style.setProperty('--theme-font-body', currentTheme.fonts.body)

    root.style.setProperty('--theme-radius-card', currentTheme.radius.card)
    root.style.setProperty('--theme-radius-button', currentTheme.radius.button)
    root.style.setProperty('--theme-radius-image', currentTheme.radius.image)

    root.style.setProperty('--theme-shadow-card', currentTheme.shadows.card)
    root.style.setProperty('--theme-shadow-button', currentTheme.shadows.button)
    root.style.setProperty('--theme-shadow-nav', currentTheme.shadows.nav)

    // Apply theme-specific style classes
    root.classList.remove('theme-style-rounded', 'theme-style-sharp', 'theme-style-pill')
    root.classList.add(`theme-style-${currentTheme.style}`)

    root.classList.remove('theme-density-compact', 'theme-density-normal', 'theme-density-spacious')
    root.classList.add(`theme-density-${currentTheme.density}`)

    root.classList.remove('theme-anim-smooth', 'theme-anim-bouncy', 'theme-anim-minimal')
    root.classList.add(`theme-anim-${currentTheme.animation}`)

    // Inject Google Fonts if theme specifies them
    const fontUrls: string[] = []
    if (currentTheme.fonts.headingUrl) fontUrls.push(currentTheme.fonts.headingUrl)
    if (currentTheme.fonts.bodyUrl && currentTheme.fonts.bodyUrl !== currentTheme.fonts.headingUrl) {
      fontUrls.push(currentTheme.fonts.bodyUrl)
    }

    // Remove old font links
    linkRefs.current.forEach((link) => link.remove())
    linkRefs.current = []

    const newLinks: HTMLLinkElement[] = []
    fontUrls.forEach((url) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      document.head.appendChild(link)
      newLinks.push(link)
    })
    linkRefs.current = newLinks

    return () => {
      linkRefs.current.forEach((link) => link.remove())
    }
  }, [currentTheme])

  return null
}
