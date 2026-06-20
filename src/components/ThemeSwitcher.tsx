import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, X } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import type { ThemeId } from '@/themes'

const themeGradients: Record<ThemeId, string> = {
  ocean: 'linear-gradient(135deg, #0F172A, #0D9488, #22D3EE)',
  family: 'linear-gradient(135deg, #FF8C42, #FFD93D, #FFB347)',
  sport: 'linear-gradient(135deg, #111827, #DC2626, #374151)',
  youth: 'linear-gradient(135deg, #8B5CF6, #EC4899, #84CC16)',
  vip: 'linear-gradient(135deg, #0A0A0A, #064E3B, #D4AF37)',
  wellness: 'linear-gradient(135deg, #86A697, #C8B6DB, #E8B4B8)',
  kids: 'linear-gradient(135deg, #4ECDC4, #FF6B6B, #FFE66D)',
  tech: 'linear-gradient(135deg, #0A0A1A, #00F0FF, #B829F7)',
  eco: 'linear-gradient(135deg, #2D5016, #7CB342, #87CEEB)',
  urban: 'linear-gradient(135deg, #6B7280, #3B82F6, #F97316)',
}

export default function ThemeSwitcher() {
  const { currentThemeId, setTheme, themeList } = useTheme()
  const [open, setOpen] = useState(false)

  const handleSelect = (id: ThemeId) => {
    setTheme(id)
    setOpen(false)
  }

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[200] flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
        style={{
          background: themeGradients[currentThemeId],
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Сменить тему"
        title="Сменить тему"
      >
        <Palette size={24} color="white" />
      </motion.button>

      {/* Overlay + Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.div
              className="relative z-10 w-full max-w-[600px] rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
              style={{
                backgroundColor: 'var(--theme-surface)',
                color: 'var(--theme-text)',
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3
                    className="text-[22px] font-bold"
                    style={{ fontFamily: 'var(--theme-font-heading)' }}
                  >
                    Выберите стиль
                  </h3>
                  <p
                    className="text-[14px] mt-1"
                    style={{ color: 'var(--theme-text-muted)' }}
                  >
                    Каждая тема — уникальный дизайн для разной аудитории
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: 'var(--theme-background)',
                    color: 'var(--theme-text)',
                  }}
                  aria-label="Закрыть"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
                {themeList.map((theme) => {
                  const isActive = theme.id === currentThemeId
                  return (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleSelect(theme.id)}
                      className="relative flex flex-col items-center gap-3 rounded-2xl border-2 p-4 transition-all duration-200"
                      style={{
                        borderColor: isActive ? theme.colors.button : 'var(--theme-border)',
                        backgroundColor: isActive
                          ? `${theme.colors.button}10`
                          : 'var(--theme-background)',
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full"
                          style={{ backgroundColor: theme.colors.button }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2.5 6L5 8.5L9.5 3.5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      )}

                      {/* Preview circle */}
                      <div
                        className="h-14 w-14 rounded-full border-2 flex-shrink-0"
                        style={{
                          background: themeGradients[theme.id],
                          borderColor: 'rgba(255,255,255,0.3)',
                          boxShadow: `0 4px 12px ${theme.colors.primary}30`,
                        }}
                      />

                      <div className="text-center">
                        <p
                          className="text-[14px] font-bold leading-tight"
                          style={{
                            fontFamily: 'var(--theme-font-heading)',
                            color: 'var(--theme-text)',
                          }}
                        >
                          {theme.name}
                        </p>
                        <p
                          className="text-[11px] mt-1 leading-tight"
                          style={{ color: 'var(--theme-text-muted)' }}
                        >
                          {theme.audience}
                        </p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Footer hint */}
              <p
                className="text-center text-[12px] mt-5"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                Ваш выбор сохранится при следующем посещении
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
