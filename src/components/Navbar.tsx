import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Главная', path: '/' },
  { label: 'О нас', path: '/about' },
  { label: 'Услуги', path: '/services' },
  { label: 'Расписание', path: '/schedule' },
  { label: 'Цены', path: '/prices' },
  { label: 'Галерея', path: '/gallery' },
  { label: 'Контакты', path: '/contacts' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(15, 23, 42, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(15, 23, 42, 0.08)' : 'none',
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-content items-center justify-between px-content-pad mobile:px-content-pad-mobile">
          <Link
            to="/"
            className="font-montserrat text-[20px] font-bold tracking-wide text-white"
          >
            ДЕЛЬФИН
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group relative font-montserrat text-[15px] font-medium tracking-[0.02em] text-white transition-opacity duration-300 hover:opacity-100"
                style={{ opacity: location.pathname === link.path ? 1 : 0.5 }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-coral transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
                  style={{
                    transformOrigin: 'left',
                    transform: location.pathname === link.path ? 'scaleX(1)' : undefined,
                  }}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              to="/contacts"
              className="inline-block rounded-button bg-coral px-6 py-3 font-montserrat text-[16px] font-bold tracking-[0.02em] text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] hover:shadow-[0_6px_24px_rgba(255,107,107,0.45)] active:scale-[0.97]"
            >
              Записаться
            </Link>
          </div>

          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: 'rgba(15, 23, 42, 0.97)' }}
          >
            <button
              className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <Link
                  to={link.path}
                  className="block py-3 font-montserrat text-[22px] font-medium text-white transition-opacity duration-300 hover:opacity-100"
                  style={{ opacity: location.pathname === link.path ? 1 : 0.7 }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
