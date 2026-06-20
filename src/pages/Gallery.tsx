import { useState, useRef, useEffect, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Instagram,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'
import WaveDivider from '@/components/WaveDivider'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Category = 'Все' | 'Бассейн' | 'Тренировки' | 'Сауна' | 'Детям' | 'Интерьер'

const categories: Category[] = ['Все', 'Бассейн', 'Тренировки', 'Сауна', 'Детям', 'Интерьер']

interface GalleryImage {
  src: string
  category: Category
  alt: string
  aspect: 'tall' | 'wide' | 'square'
}

const galleryImages: GalleryImage[] = [
  { src: '/pool-detail-5.jpg', category: 'Бассейн', alt: 'Бассейн в золотой час', aspect: 'tall' },
  { src: '/pool-lanes.jpg', category: 'Тренировки', alt: 'Дорожки бассейна', aspect: 'wide' },
  { src: '/kids-swim.jpg', category: 'Детям', alt: 'Детские занятия', aspect: 'square' },
  { src: '/pool-detail-3.jpg', category: 'Тренировки', alt: 'Ныряющий спортсмен', aspect: 'square' },
  { src: '/facility-interior.jpg', category: 'Интерьер', alt: 'Интерьер комплекса', aspect: 'tall' },
  { src: '/aqua-aerobics.jpg', category: 'Тренировки', alt: 'Аквааэробика', aspect: 'square' },
  { src: '/pool-detail-9.jpg', category: 'Интерьер', alt: 'Фасад здания', aspect: 'wide' },
  { src: '/pool-detail-10.jpg', category: 'Бассейн', alt: 'Подводная съёмка', aspect: 'square' },
  { src: '/sauna.jpg', category: 'Сауна', alt: 'Сауна', aspect: 'square' },
  { src: '/pool-detail-6.jpg', category: 'Детям', alt: 'Дети в бассейне', aspect: 'wide' },
  { src: '/pool-detail-7.jpg', category: 'Тренировки', alt: 'Стартовые тумбочки', aspect: 'tall' },
  { src: '/pool-detail-8.jpg', category: 'Сауна', alt: 'Джакузи', aspect: 'square' },
]

/* ------------------------------------------------------------------ */
/*  Lightbox Component (isolated, no GSAP — CSS transitions only)      */
/* ------------------------------------------------------------------ */

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }: LightboxProps) {
  const [, setAnimDir] = useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePrev = useCallback(() => {
    if (isAnimating || images.length <= 1) return
    setAnimDir('left')
    setIsAnimating(true)
    onPrev()
    setTimeout(() => setIsAnimating(false), 350)
  }, [isAnimating, images.length, onPrev])

  const handleNext = useCallback(() => {
    if (isAnimating || images.length <= 1) return
    setAnimDir('right')
    setIsAnimating(true)
    onNext()
    setTimeout(() => setIsAnimating(false), 350)
  }, [isAnimating, images.length, onNext])

  /* Keyboard support */
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, handlePrev, handleNext])

  if (!isOpen) return null

  const current = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20"
        style={{ background: 'rgba(255,255,255,0.1)' }}
        onClick={onClose}
        aria-label="Закрыть"
      >
        <X size={24} />
      </button>

      {/* Prev button */}
      {images.length > 1 && currentIndex > 0 && (
        <button
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          onClick={(e) => { e.stopPropagation(); handlePrev() }}
          aria-label="Предыдущее"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && currentIndex < images.length - 1 && (
        <button
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          onClick={(e) => { e.stopPropagation(); handleNext() }}
          aria-label="Следующее"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative flex items-center justify-center px-16 md:px-24"
        style={{ maxWidth: '90vw', maxHeight: '85vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={currentIndex}
          src={current.src}
          alt={current.alt}
          className="max-h-[85vh] max-w-[85vw] rounded-image object-contain"
          style={{
            animation: `lightboxIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        />
      </div>

      {/* Counter */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-inter text-[14px]"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* Lightbox animation keyframes — injected inline */}
      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Gallery Page                                                  */
/* ------------------------------------------------------------------ */

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('Все')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const instaRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const filteredImages =
    activeCategory === 'Все'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i > 0 ? i - 1 : filteredImages.length - 1))
  }, [filteredImages.length])

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i < filteredImages.length - 1 ? i + 1 : 0))
  }, [filteredImages.length])

  /* GSAP scroll animations */
  useGSAP(() => {
    /* Hero */
    gsap.from('.gal-hero-title', {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
    })
    gsap.from('.gal-hero-sub', {
      y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.4,
    })
    gsap.from('.gal-hero-pill', {
      y: 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.5,
    })
    gsap.from('.gal-hero-bg', {
      scale: 1.05, duration: 2, ease: 'power2.out',
    })

    /* Grid stagger */
    if (gridRef.current) {
      gsap.from(gridRef.current.querySelectorAll('.gal-item'), {
        opacity: 0, scale: 0.97, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
      })
    }

    /* Video */
    if (videoRef.current) {
      gsap.from(videoRef.current.querySelectorAll('.gal-fade-up'), {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: videoRef.current, start: 'top 80%', once: true },
      })
    }

    /* Instagram */
    if (instaRef.current) {
      gsap.from(instaRef.current.querySelectorAll('.gal-fade-up'), {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: instaRef.current, start: 'top 80%', once: true },
      })
    }

    /* CTA */
    if (ctaRef.current) {
      gsap.from(ctaRef.current.querySelectorAll('.gal-fade-up'), {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', once: true },
      })
    }
  }, { scope: heroRef })

  return (
    <div ref={heroRef}>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <img
          src="/hero-bg.jpg"
          alt="Pool background"
          className="gal-hero-bg absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(15, 23, 42, 0.6)' }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center py-24">
          <h1 className="gal-hero-title font-montserrat text-[48px] md:text-[72px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
            Галерея
          </h1>
          <p className="gal-hero-sub mt-4 font-inter text-[18px] md:text-[20px] leading-[1.6] text-white/85">
            Загляните внутрь — убедитесь сами
          </p>

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="gal-hero-pill rounded-pill px-5 py-2.5 font-montserrat text-[14px] font-medium transition-all duration-200"
                style={{
                  background: cat === activeCategory ? '#fff' : 'rgba(255,255,255,0.15)',
                  color: cat === activeCategory ? '#0F172A' : '#fff',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#0F172A" />

      {/* ========== MASONRY GRID ========== */}
      <section
        ref={gridRef}
        className="bg-ocean-deep py-12 pb-section-desktop mobile:pb-section-mobile"
      >
        <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile">
          <div
            className="columns-1 gap-5 sm:columns-2 lg:columns-3"
            style={{ columnFill: 'balance' }}
          >
            {filteredImages.map((img, i) => (
              <div
                key={`${img.src}-${activeCategory}`}
                className="gal-item group relative mb-5 break-inside-avoid overflow-hidden rounded-image cursor-pointer"
                style={{
                  aspectRatio:
                    img.aspect === 'tall' ? '3/4' : img.aspect === 'wide' ? '16/9' : '1/1',
                }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'rgba(15,23,42,0.4)' }}
                >
                  <ZoomIn size={32} className="text-white mb-2" />
                  <span
                    className="rounded-pill px-3 py-1 font-inter text-[12px] font-medium text-white"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-inter text-[16px] text-slate-400">
                В этой категории пока нет фотографий
              </p>
            </div>
          )}
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ========== VIDEO TEASER ========== */}
      <section
        ref={videoRef}
        className="bg-mist-white py-section-desktop mobile:py-section-mobile"
      >
        <div className="mx-auto max-w-[900px] px-content-pad mobile:px-content-pad-mobile">
          <div className="text-center mb-10">
            <h2 className="gal-fade-up font-montserrat text-[32px] md:text-[40px] font-bold leading-[1.15] tracking-[-0.01em] text-ocean-deep">
              Дельфин в движении
            </h2>
            <p className="gal-fade-up mt-3 font-inter text-[16px] text-slate-700">
              Посмотрите, как проходят наши занятия
            </p>
          </div>

          <div
            className="gal-fade-up group relative overflow-hidden rounded-card shadow-card cursor-pointer"
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src="/pool-detail-3.jpg"
              alt="Видео превью"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:bg-black/20">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  animation: 'pulsePlay 2s ease-in-out infinite',
                }}
              >
                <Play size={32} className="text-ocean-deep ml-1" fill="#0F172A" />
              </div>
            </div>
          </div>
        </div>

        {/* Pulse animation */}
        <style>{`
          @keyframes pulsePlay {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
            50%      { transform: scale(1.08); box-shadow: 0 0 0 20px rgba(255,255,255,0); }
          }
        `}</style>
      </section>

      <WaveDivider fill="#0F172A" />

      {/* ========== INSTAGRAM CTA ========== */}
      <section
        ref={instaRef}
        className="py-20 md:py-24"
        style={{ background: 'linear-gradient(135deg, #E6D5B8 0%, #FF6B6B 40%, #FFB088 100%)' }}
      >
        <div className="mx-auto max-w-[600px] px-content-pad text-center mobile:px-content-pad-mobile">
          <div className="gal-fade-up flex justify-center">
            <Instagram size={48} className="text-white" />
          </div>
          <h2 className="gal-fade-up mt-4 font-montserrat text-[24px] md:text-[32px] font-bold text-white leading-[1.2]">
            Больше фото в нашем Instagram
          </h2>
          <p className="gal-fade-up mt-3 font-inter text-[16px] text-white/90 leading-[1.6]">
            Подписывайтесь, чтобы быть в курсе событий, акций и новых программ
          </p>
          <div className="gal-fade-up mt-6">
            <a
              href="https://instagram.com/delfin_khv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-button border-2 border-white px-8 py-3.5 font-montserrat text-[16px] font-semibold text-white transition-all duration-300 hover:bg-white hover:text-coral"
            >
              @delfin_khv
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ========== CTA ========== */}
      <section className="bg-mist-white py-section-desktop mobile:py-section-mobile" ref={ctaRef}>
        <div className="mx-auto max-w-[700px] px-content-pad text-center mobile:px-content-pad-mobile">
          <h2 className="gal-fade-up font-montserrat text-[36px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.01em] text-ocean-deep">
            Убедились? Приходите!
          </h2>
          <p className="gal-fade-up mt-4 font-inter text-[18px] leading-[1.6] text-slate-700">
            Бесплатное пробное занятие ждет вас
          </p>
          <div className="gal-fade-up mt-8">
            <a
              href="/contacts"
              className="inline-flex items-center gap-2 rounded-button bg-coral px-8 py-4 font-montserrat text-[16px] font-bold tracking-[0.02em] text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] hover:shadow-[0_6px_24px_rgba(255,107,107,0.45)] active:scale-[0.97]"
            >
              Записаться
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ========== LIGHTBOX ========== */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  )
}
