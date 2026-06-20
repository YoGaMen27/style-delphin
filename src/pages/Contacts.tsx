import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  ChevronDown,
  Send,
  CheckCircle,
  Navigation,
  CalendarCheck,
} from 'lucide-react'
import WaveDivider from '../components/WaveDivider'

gsap.registerPlugin(ScrollTrigger)

/* ─── Social Icons ─── */
function VKIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.136.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.88 2.542 2.354 4.772 2.964 4.772.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .373.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.51-2.354 4.51-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.475-.085.72-.576.72z" />
    </svg>
  )
}

function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.441 1.441 0 0 1 2.88 0z" />
    </svg>
  )
}

/* ─── Form input styling helpers ─── */
const inputBase =
  'w-full h-[52px] rounded-input border border-white/20 bg-white/[0.08] px-4 font-inter text-[16px] text-white placeholder-white/35 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-white/[0.12] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]'

/* ─── Contact Card Data ─── */
const contactCards = [
  {
    icon: <Phone size={36} className="text-white" />,
    iconBg: 'rgba(255,255,255,0.15)',
    label: 'Телефон',
    labelColor: 'rgba(255,255,255,0.7)' as const,
    primary: '+7 (4212) 00-00-00',
    primaryType: 'tel' as const,
    secondary: '+7 (924) 000-00-00',
    note: 'Звоните ежедневно с 7:00 до 22:00',
    gradient: 'linear-gradient(135deg, #0D9488, #0F766E)',
    textPrimaryColor: 'white' as const,
  },
  {
    icon: <MapPin size={36} className="text-white" />,
    iconBg: 'rgba(255,255,255,0.15)',
    label: 'Адрес',
    labelColor: 'rgba(255,255,255,0.7)' as const,
    primary: 'г. Хабаровск, ул. Примерная, 25',
    primaryType: 'text' as const,
    note: 'Ориентир: Дом быта «Центральный»',
    link: { text: 'Открыть в 2GIS', href: 'https://2gis.ru/khabarovsk' },
    gradient: 'linear-gradient(135deg, #22D3EE, #06B6D4)',
    textPrimaryColor: 'white' as const,
  },
  {
    icon: <Mail size={36} className="text-cyan-400" />,
    iconBg: 'rgba(255,255,255,0.1)',
    label: 'Email и соцсети',
    labelColor: 'rgba(255,255,255,0.7)' as const,
    email: 'info@delfin-khv.ru',
    gradient: 'linear-gradient(135deg, #0F172A, #1E293B)',
    textPrimaryColor: 'white' as const,
  },
  {
    icon: <Clock size={36} className="text-ocean-deep" />,
    iconBg: 'rgba(15,23,42,0.08)',
    label: 'Режим работы',
    labelColor: 'rgba(15,23,42,0.6)' as const,
    hoursTitle: 'Ежедневно',
    hoursTime: '7:00 \u2013 22:00',
    note: 'Без выходных и праздников',
    note2: 'Чистка бассейна: Пн и Чт 8:00-10:00',
    gradient: 'linear-gradient(135deg, #E6D5B8, #D4A574)',
    textPrimaryColor: 'ocean-deep' as const,
  },
]

/* ─── Main Contacts Page ─── */
export default function Contacts() {
  const pageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const quickRef = useRef<HTMLDivElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim()) return
    setSubmitted(true)
  }

  useGSAP(
    () => {
      // ── Contact cards ──
      if (cardsRef.current) {
        gsap.from(cardsRef.current.querySelectorAll('.contact-card'), {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        })
      }

      // ── Map ──
      if (mapRef.current) {
        gsap.from(mapRef.current.querySelector('.map-container'), {
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 80%',
            once: true,
          },
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
        gsap.from(mapRef.current.querySelector('.map-overlay'), {
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
        })
      }

      // ── Form ──
      if (formRef.current) {
        gsap.from(formRef.current.querySelector('.form-container'), {
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        gsap.from(formRef.current.querySelectorAll('.form-field'), {
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 15,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
        })
      }

      // ── Quick actions ──
      if (quickRef.current) {
        gsap.from(quickRef.current.querySelectorAll('.quick-card'), {
          scrollTrigger: {
            trigger: quickRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
        })
      }
    },
    { scope: pageRef }
  )

  return (
    <div ref={pageRef}>
      {/* ════════════════════════════════════
          PAGE HEADER
      ════════════════════════════════════ */}
      <section className="relative min-h-[50dvh] mobile:min-h-auto flex mobile:flex-col overflow-hidden">
        {/* Left panel */}
        <div
          className="relative z-10 flex w-1/2 mobile:w-full mobile:h-[40vh] flex-col justify-center pl-content-pad mobile:px-content-pad-mobile pr-[6%] mobile:pr-0"
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)',
          }}
        >
          <div className="max-w-[520px]">
            <p className="font-inter text-[14px] text-white/50">
              Главная / Контакты
            </p>
            <h1 className="mt-3 font-montserrat text-[64px] mobile:text-[36px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
              Контакты
            </h1>
            <p className="mt-5 max-w-[420px] font-inter text-[18px] leading-[1.6] text-white/85">
              Мы всегда рады вам — свяжитесь с нами любым удобным способом
            </p>
          </div>
        </div>

        {/* Right panel (image) */}
        <div className="relative w-1/2 mobile:w-full mobile:h-[35vh] overflow-hidden">
          <img
            src="/hero-bg.jpg"
            alt="Бассейн Дельфин"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ════════════════════════════════════
          CONTACT CARDS
      ════════════════════════════════════ */}
      <section
        ref={cardsRef}
        className="bg-mist-white py-section-desktop mobile:py-section-mobile"
      >
        <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile">
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-6">
            {/* Card 1 — Phone */}
            <div
              className="contact-card rounded-card p-9 transition-all duration-300 hover:shadow-card-hover"
              style={{ background: contactCards[0].gradient }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: contactCards[0].iconBg }}
              >
                {contactCards[0].icon}
              </div>
              <p
                className="mt-5 font-inter text-[14px] font-medium tracking-[0.04em] uppercase"
                style={{ color: contactCards[0].labelColor }}
              >
                {contactCards[0].label}
              </p>
              <a
                href={`tel:${(contactCards[0] as typeof contactCards[0] & { primary: string }).primary.replace(/\D/g, '')}`}
                className="mt-2 block font-montserrat text-[24px] font-bold text-white transition-all hover:underline"
              >
                {(contactCards[0] as typeof contactCards[0] & { primary: string }).primary}
              </a>
              <p className="mt-1 font-inter text-[16px] text-white/80">
                {contactCards[0].secondary}
              </p>
              <p className="mt-3 font-inter text-[14px] text-white/60">
                {contactCards[0].note}
              </p>
            </div>

            {/* Card 2 — Address */}
            <div
              className="contact-card rounded-card p-9 transition-all duration-300 hover:shadow-card-hover"
              style={{ background: contactCards[1].gradient }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: contactCards[1].iconBg }}
              >
                {contactCards[1].icon}
              </div>
              <p
                className="mt-5 font-inter text-[14px] font-medium tracking-[0.04em] uppercase"
                style={{ color: contactCards[1].labelColor }}
              >
                {contactCards[1].label}
              </p>
              <p className="mt-2 font-montserrat text-[22px] font-bold text-white">
                {contactCards[1].primary}
              </p>
              <p className="mt-3 font-inter text-[14px] text-white/70">
                {contactCards[1].note}
              </p>
              {contactCards[1].link && (
                <a
                  href={contactCards[1].link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-inter text-[14px] font-medium text-white underline transition-opacity hover:opacity-80"
                >
                  {contactCards[1].link.text}
                </a>
              )}
            </div>

            {/* Card 3 — Email & Socials */}
            <div
              className="contact-card rounded-card p-9 transition-all duration-300 hover:shadow-card-hover"
              style={{ background: contactCards[2].gradient }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: contactCards[2].iconBg }}
              >
                {contactCards[2].icon}
              </div>
              <p
                className="mt-5 font-inter text-[14px] font-medium tracking-[0.04em] uppercase"
                style={{ color: contactCards[2].labelColor }}
              >
                {contactCards[2].label}
              </p>
              <a
                href={`mailto:${contactCards[2].email}`}
                className="mt-2 block font-montserrat text-[20px] font-semibold text-white transition-all hover:underline"
              >
                {contactCards[2].email}
              </a>
              <div className="mt-4 flex gap-3">
                {[
                  { Icon: VKIcon, label: 'VK' },
                  { Icon: TelegramIcon, label: 'Telegram' },
                  { Icon: InstagramIcon, label: 'Instagram' },
                ].map(({ Icon, label }, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.08]"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Card 4 — Hours */}
            <div
              className="contact-card rounded-card p-9 transition-all duration-300 hover:shadow-card-hover"
              style={{ background: contactCards[3].gradient }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: contactCards[3].iconBg }}
              >
                {contactCards[3].icon}
              </div>
              <p
                className="mt-5 font-inter text-[14px] font-medium tracking-[0.04em] uppercase"
                style={{ color: contactCards[3].labelColor }}
              >
                {contactCards[3].label}
              </p>
              <p className="mt-2 font-montserrat text-[24px] font-bold text-ocean-deep">
                {contactCards[3].hoursTitle}
              </p>
              <p className="mt-1 font-montserrat text-[32px] font-extrabold text-ocean-deep">
                {contactCards[3].hoursTime}
              </p>
              <p className="mt-3 font-inter text-[14px] text-ocean-deep/60">
                {contactCards[3].note}
              </p>
              {contactCards[3].note2 && (
                <p className="mt-1 font-inter text-[13px] text-ocean-deep/50">
                  {contactCards[3].note2}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ════════════════════════════════════
          MAP SECTION
      ════════════════════════════════════ */}
      <section ref={mapRef} className="relative h-[500px] mobile:h-[400px] w-full">
        <div className="map-container w-full h-full relative">
          {/* Map placeholder — styled div */}
          <div
            className="w-full h-full flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #e8f4f8 0%, #d0e8f0 40%, #b8dce8 70%, #a0d0e0 100%)',
            }}
          >
            {/* Decorative water pattern */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="water-pattern" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0,20 Q25,5 50,20 T100,20" fill="none" stroke="#0D9488" strokeWidth="0.5" opacity="0.4" />
                    <path d="M0,30 Q25,15 50,30 T100,30" fill="none" stroke="#22D3EE" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#water-pattern)" />
              </svg>
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F172A" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Map label */}
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-panel" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)' }}>
                <MapPin size={24} className="text-coral" />
                <div className="text-left">
                  <p className="font-montserrat text-[16px] font-semibold text-ocean-deep">
                    Карта Хабаровска
                  </p>
                  <p className="font-inter text-[13px] text-slate-700">
                    ул. Примерная, 25
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative river */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[30%] opacity-40"
              style={{
                background: 'linear-gradient(to top, rgba(13,148,136,0.3), transparent)',
              }}
            />
          </div>
        </div>

        {/* Glass-morphic overlay card */}
        <div
          className="map-overlay absolute bottom-6 left-6 max-w-[320px] mobile:relative mobile:bottom-auto mobile:left-auto mobile:mx-auto mobile:mt-4 mobile:max-w-full rounded-[20px] p-7"
          style={{
            background: 'rgba(15, 23, 42, 0.35)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-coral flex-shrink-0" />
            <span className="font-montserrat text-[18px] font-bold text-white">
              Бассейн Дельфин
            </span>
          </div>
          <p className="mt-2 font-inter text-[14px] text-white/80">
            ул. Примерная, 25, Хабаровск
          </p>
          <p className="mt-1 font-inter text-[14px] text-cyan-400">
            Ежедневно 7:00 – 22:00
          </p>
          <a
            href="https://2gis.ru/khabarovsk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full text-center rounded-button border-2 border-white/40 py-3 font-montserrat text-[14px] font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Построить маршрут
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════
          CONTACT FORM
      ════════════════════════════════════ */}
      <section
        ref={formRef}
        className="relative py-section-desktop mobile:py-section-mobile overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)',
        }}
      >
        <div className="relative z-10 mx-auto max-w-[700px] px-content-pad mobile:px-content-pad-mobile">
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="font-montserrat text-[36px] mobile:text-[28px] font-bold leading-[1.15] text-white">
              Напишите нам
            </h2>
            <p className="mt-2 font-inter text-[16px] text-white/80">
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </p>
          </div>

          {/* Form container */}
          <div
            className="form-container rounded-panel p-12 mobile:p-6"
            style={{
              background: 'rgba(15, 23, 42, 0.35)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {/* Row: Name + Phone */}
                <div className="grid grid-cols-2 mobile:grid-cols-1 gap-4">
                  <div className="form-field">
                    <label className="block mb-2 font-inter text-[14px] font-medium text-white/70">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={inputBase}
                    />
                  </div>
                  <div className="form-field">
                    <label className="block mb-2 font-inter text-[14px] font-medium text-white/70">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-field mt-4">
                  <label className="block mb-2 font-inter text-[14px] font-medium text-white/70">
                    Email (необязательно)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputBase}
                  />
                </div>

                {/* Interest select */}
                <div className="form-field mt-4 relative">
                  <label className="block mb-2 font-inter text-[14px] font-medium text-white/70">
                    Что вас интересует?
                  </label>
                  <div className="relative">
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className={`${inputBase} appearance-none cursor-pointer pr-10`}
                    >
                      <option value="" className="bg-ocean-deep">Выберите...</option>
                      <option value="kids" className="bg-ocean-deep">Детское плавание</option>
                      <option value="adults" className="bg-ocean-deep">Взрослое плавание</option>
                      <option value="aqua" className="bg-ocean-deep">Аквааэробика</option>
                      <option value="sauna" className="bg-ocean-deep">Сауна</option>
                      <option value="membership" className="bg-ocean-deep">Абонемент</option>
                      <option value="other" className="bg-ocean-deep">Другое</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Message textarea */}
                <div className="form-field mt-4">
                  <label className="block mb-2 font-inter text-[14px] font-medium text-white/70">
                    Сообщение
                  </label>
                  <textarea
                    name="message"
                    placeholder="Расскажите подробнее о том, что вас интересует..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`${inputBase} h-[120px] resize-y py-4`}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="form-field mt-6 w-full h-[56px] rounded-button bg-coral font-montserrat text-[16px] font-bold tracking-[0.02em] text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:shadow-[0_6px_24px_rgba(255,107,107,0.45)] active:scale-[0.97] flex items-center justify-center gap-2 group"
                >
                  <Send
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                  Отправить сообщение
                </button>
              </form>
            ) : (
              /* Success state */
              <div className="py-8 text-center">
                <CheckCircle size={56} className="mx-auto text-cyan-400" />
                <h3 className="mt-5 font-montserrat text-[28px] font-bold text-white">
                  Спасибо!
                </h3>
                <p className="mt-3 font-inter text-[16px] text-white/80 leading-relaxed">
                  Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ════════════════════════════════════
          QUICK ACTIONS
      ════════════════════════════════════ */}
      <section
        ref={quickRef}
        className="bg-mist-white py-16 mobile:py-10"
      >
        <div className="mx-auto max-w-[900px] px-content-pad mobile:px-content-pad-mobile">
          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-6">
            {/* Call */}
            <div className="quick-card rounded-card bg-white p-8 shadow-card text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(13,148,136,0.1)' }}>
                <Phone size={32} className="text-teal-600" />
              </div>
              <h4 className="mt-4 font-montserrat text-[20px] font-semibold text-ocean-deep">
                Позвонить
              </h4>
              <p className="mt-1 font-inter text-[15px] text-slate-700">
                +7 (4212) 00-00-00
              </p>
              <a
                href="tel:+74212000000"
                className="mt-5 block w-full rounded-button bg-teal-600 py-3 font-montserrat text-[16px] font-bold text-white transition-all duration-300 hover:bg-teal-700 hover:scale-[1.02] active:scale-[0.98]"
              >
                Позвонить
              </a>
            </div>

            {/* Directions */}
            <div className="quick-card rounded-card bg-white p-8 shadow-card text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(34,211,238,0.1)' }}>
                <Navigation size={32} className="text-cyan-500" />
              </div>
              <h4 className="mt-4 font-montserrat text-[20px] font-semibold text-ocean-deep">
                Проложить маршрут
              </h4>
              <p className="mt-1 font-inter text-[15px] text-slate-700">
                ул. Примерная, 25, Хабаровск
              </p>
              <a
                href="https://2gis.ru/khabarovsk"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block w-full rounded-button bg-teal-600 py-3 font-montserrat text-[16px] font-bold text-white transition-all duration-300 hover:bg-teal-700 hover:scale-[1.02] active:scale-[0.98]"
              >
                Открыть карту
              </a>
            </div>

            {/* Book */}
            <div className="quick-card rounded-card bg-white p-8 shadow-card text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(255,107,107,0.1)' }}>
                <CalendarCheck size={32} className="text-coral" />
              </div>
              <h4 className="mt-4 font-montserrat text-[20px] font-semibold text-ocean-deep">
                Записаться онлайн
              </h4>
              <p className="mt-1 font-inter text-[15px] text-slate-700">
                Выберите удобное время
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('contact-form')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-5 w-full rounded-button bg-coral py-3 font-montserrat text-[16px] font-bold text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.02] active:scale-[0.98]"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom wave to footer */}
      <WaveDivider fill="#0F172A" />
    </div>
  )
}
