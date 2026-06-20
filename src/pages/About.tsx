import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  ShieldCheck,
  Sofa,
  Shield,
} from 'lucide-react'
import WaveDivider from '../components/WaveDivider'

gsap.registerPlugin(ScrollTrigger)

/* ─── Stats Counter Component (GSAP isolated) ─── */
interface StatItemProps {
  value: string
  label: string
  delay: number
}

function StatItem({ value, label, delay }: StatItemProps) {
  const numRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const numEl = numRef.current
    const labelEl = labelRef.current
    if (!numEl || !labelEl) return

    // Extract numeric part
    const numericMatch = value.match(/^([\d.,]+)(.*)$/)
    const numericPart = numericMatch ? parseFloat(numericMatch[1]) : 0
    void numericMatch

    const obj = { val: 0 }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: numEl,
        start: 'top 80%',
        once: true,
      },
    })

    tl.to(obj, {
      val: numericPart,
      duration: 2,
      ease: 'power2.out',
      delay,
      onUpdate: () => {
        const isDecimal = value.includes('.')
        const isYear = label.includes('открытия')
        if (isYear) {
          numEl.textContent = Math.round(obj.val).toString()
        } else if (isDecimal) {
          numEl.textContent = obj.val.toFixed(1)
        } else {
          numEl.textContent = Math.round(obj.val).toString()
        }
      },
    })

    tl.from(
      labelEl,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.5'
    )

    // Set final value
    tl.eventCallback('onComplete', () => {
      numEl.textContent = value
    })
  }, [])

  return (
    <div className="text-center">
      <div
        ref={numRef}
        className="font-montserrat text-[56px] font-extrabold leading-none tracking-[-0.02em] text-white"
      >
        0
      </div>
      <div
        ref={labelRef}
        className="mt-2 font-inter text-[16px] text-white/75"
      >
        {label}
      </div>
    </div>
  )
}

/* ─── Coach Card ─── */
interface CoachData {
  initial: string
  name: string
  role: string
  bio: string
  cert: string
}

const coaches: CoachData[] = [
  {
    initial: 'А',
    name: 'Алексей Петров',
    role: 'Главный тренер',
    bio: 'Мастер спорта по плаванию, стаж работы 15 лет. Специализация — подготовка спортсменов и обучение взрослых.',
    cert: 'МС',
  },
  {
    initial: 'М',
    name: 'Мария Кузнецова',
    role: 'Тренер по детскому плаванию',
    bio: 'Педагог по плаванию с 12-летним стажем. Создает атмосферу доверия и радости — дети буквально влюбляются в воду.',
    cert: 'КМС',
  },
  {
    initial: 'И',
    name: 'Ирина Смирнова',
    role: 'Инструктор аквааэробики',
    bio: 'Сертифицированный фитнес-тренер и реабилитолог. Автор собственной программы аквафитнеса для восстановления после травм.',
    cert: 'FISAF',
  },
  {
    initial: 'Д',
    name: 'Дмитрий Волков',
    role: 'Тренер-спасатель',
    bio: 'Сертифицированный спасатель с 8-летним стажем. Ответственный подход к безопасности каждого занятия.',
    cert: 'РС',
  },
  {
    initial: 'О',
    name: 'Ольга Морозова',
    role: 'Инструктор по акватерапии',
    bio: 'Физиотерапевт с медицинским образованием. Проводит реабилитационные занятия в воде для взрослых и детей.',
    cert: 'ВАЕ',
  },
  {
    initial: 'С',
    name: 'Сергей Новиков',
    role: 'Тренер по спортивному плаванию',
    bio: 'Кандидат в мастера спорта, специализируется на подготовке к соревнованиям. Воспитал более 20 призеров областных этапов.',
    cert: 'КМС',
  },
]

/* ─── Facility Highlight ─── */
interface HighlightData {
  label: string
  title: string
  body: string
  icon: React.ReactNode
  image: string
  imageLeft: boolean
}

const highlights: HighlightData[] = [
  {
    label: 'ТЕХНОЛОГИИ',
    title: 'Многоступенчатая очистка воды',
    body: 'Наша система включает песочную фильтрацию, угольную очистку и ультрафиолетовую дезинфекцию. Вода проходит полный цикл очистки каждые 4 часа. Результат — кристально прозрачная вода без запаха хлора.',
    icon: <ShieldCheck size={24} className="text-cyan-400" />,
    image: '/hero-bg.jpg',
    imageLeft: true,
  },
  {
    label: 'КОМФОРТ',
    title: 'Всё для вашего удобства',
    body: 'Температура воды 27°C, воздуха — 28°C. Просторные раздевалки с индивидуальными шкафчиками, душевые с прессованной водой, финская сауна и зона отдыха. Бесплатный Wi-Fi и уютное кафе с полезными закусками.',
    icon: <Sofa size={24} className="text-cyan-400" />,
    image: '/aqua-aerobics.jpg',
    imageLeft: false,
  },
  {
    label: 'БЕЗОПАСНОСТЬ',
    title: 'Безопасность на первом месте',
    body: 'Квалифицированные спасатели на каждой смене. Антискользящее покрытие по всему периметру бассейна. Аварийная сигнализация и аптечка первой помощи. Все тренеры имеют сертификаты оказания первой помощи.',
    icon: <Shield size={24} className="text-cyan-400" />,
    image: '/pool-lanes.jpg',
    imageLeft: true,
  },
]

/* ─── Main About Page ─── */
export default function About() {
  const pageRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  // Parallax on hero image
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.15}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useGSAP(
    () => {
      // ── Story section animations ──
      if (storyRef.current) {
        gsap.from(storyRef.current.querySelectorAll('.story-anim'), {
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        })
        gsap.from(storyRef.current.querySelector('.story-image'), {
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 80%',
            once: true,
          },
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
      }

      // ── Stats section ──
      if (statsRef.current) {
        gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }

      // ── Facility highlights ──
      if (highlightsRef.current) {
        const cards = highlightsRef.current.querySelectorAll('.highlight-card')
        cards.forEach((card) => {
          const img = card.querySelector('.highlight-img')
          const text = card.querySelector('.highlight-text')
          gsap.from(img, {
            scrollTrigger: { trigger: card, start: 'top 80%', once: true },
            x: card.classList.contains('img-left') ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          })
          gsap.from(text, {
            scrollTrigger: { trigger: card, start: 'top 80%', once: true },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out',
          })
        })
      }

      // ── Team section ──
      if (teamRef.current) {
        gsap.from(teamRef.current.querySelector('.team-photo'), {
          scrollTrigger: {
            trigger: teamRef.current.querySelector('.team-photo'),
            start: 'top 80%',
            once: true,
          },
          scale: 1.03,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })

        gsap.from(teamRef.current.querySelectorAll('.coach-card'), {
          scrollTrigger: {
            trigger: teamRef.current.querySelector('.coach-grid'),
            start: 'top 85%',
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }

      // ── CTA section ──
      if (ctaRef.current) {
        gsap.from(ctaRef.current.querySelectorAll('.cta-anim'), {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
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
      <section className="relative min-h-[60dvh] mobile:min-h-auto flex mobile:flex-col overflow-hidden">
        {/* Left panel */}
        <div
          className="relative z-10 flex w-1/2 mobile:w-full mobile:h-[40vh] flex-col justify-center pl-content-pad mobile:px-content-pad-mobile pr-[6%] mobile:pr-0"
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)',
          }}
        >
          <div className="max-w-[520px]">
            <p className="font-inter text-[14px] text-white/50">
              Главная / О нас
            </p>
            <h1
              className="mt-3 font-montserrat text-[64px] mobile:text-[36px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white"
            >
              О нас
            </h1>
            <p className="mt-5 max-w-[420px] font-inter text-[18px] leading-[1.6] text-white/85">
              Дельфин — это не просто бассейн. Это место, где рождается любовь к воде.
            </p>
          </div>
        </div>

        {/* Right panel (image) */}
        <div className="relative w-1/2 mobile:w-full mobile:h-[35vh] overflow-hidden">
          <div ref={parallaxRef} className="absolute inset-[-15%] w-[130%] h-[130%]">
            <img
              src="/hero-bg.jpg"
              alt="Интерьер бассейна Дельфин"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile overlay */}
        <div className="hidden mobile:block absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ════════════════════════════════════
          OUR STORY
      ════════════════════════════════════ */}
      <section
        ref={storyRef}
        className="bg-mist-white py-section-desktop mobile:py-section-mobile"
      >
        <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile">
          <div className="flex mobile:flex-col gap-12 items-start">
            {/* Text column */}
            <div className="w-[55%] mobile:w-full">
              <p className="story-anim font-inter text-[14px] font-medium tracking-[0.04em] uppercase text-teal-600">
                НАША ИСТОРИЯ
              </p>
              <h2 className="story-anim mt-3 font-montserrat text-[40px] mobile:text-[28px] font-bold leading-[1.15] tracking-[-0.01em] text-ocean-deep">
                Более десяти лет мы открываем мир плавания
              </h2>
              <div className="story-anim mt-6 font-inter text-[16px] leading-[1.7] text-slate-700 space-y-5">
                <p>
                  Бассейн «Дельфин» открыл свои двери в 2014 году с одной целью — сделать плавание доступным, комфортным и безопасным для жителей Хабаровска.
                </p>
                <p>
                  Мы построили современный 25-метровый бассейн с шестью дорожками, оснащенный передовой системой очистки воды. Каждый элемент нашего комплекса продуман для вашего комфорта — от температуры воздуха в зале до мягкости полотенец в раздевалке.
                </p>
                <p>
                  Сегодня «Дельфин» — это команда из 15 профессиональных тренеров, более 2000 постоянных клиентов и бесчисленное количество историй успеха — от первых уверенных гребков малышей до спортивных достижений наших воспитанников.
                </p>
              </div>
            </div>

            {/* Image column */}
            <div className="story-image w-[45%] mobile:w-full">
              <img
                src="/hero-bg.jpg"
                alt="Интерьер бассейна"
                className="w-full rounded-card shadow-card object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          STATS COUNTER
      ════════════════════════════════════ */}
      <section ref={statsRef} className="bg-teal-600 py-20 mobile:py-14">
        <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile">
          <div className="grid grid-cols-4 mobile:grid-cols-2 gap-8 mobile:gap-6">
            <div className="stat-item">
              <StatItem value="2014" label="год открытия" delay={0} />
            </div>
            <div className="stat-item">
              <StatItem value="2500+" label="постоянных клиентов" delay={0.15} />
            </div>
            <div className="stat-item">
              <StatItem value="15" label="профессиональных тренеров" delay={0.3} />
            </div>
            <div className="stat-item">
              <StatItem value="25м" label="длина бассейна" delay={0.45} />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ════════════════════════════════════
          FACILITY HIGHLIGHTS
      ════════════════════════════════════ */}
      <section
        ref={highlightsRef}
        className="bg-mist-white py-section-desktop mobile:py-section-mobile"
      >
        <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile space-y-12">
          {highlights.map((h, i) => (
            <div
              key={i}
              className={`highlight-card flex mobile:flex-col gap-8 items-center ${h.imageLeft ? 'img-left' : 'img-right'}`}
              style={{ flexDirection: h.imageLeft ? 'row' : 'row-reverse' }}
            >
              <div className="highlight-img w-1/2 mobile:w-full">
                <img
                  src={h.image}
                  alt={h.title}
                  className="w-full h-[320px] mobile:h-[240px] object-cover rounded-card shadow-card"
                />
              </div>
              <div className="highlight-text w-1/2 mobile:w-full">
                <div className="flex items-center gap-2">
                  {h.icon}
                  <span className="font-inter text-[14px] font-medium tracking-[0.04em] uppercase text-teal-600">
                    {h.label}
                  </span>
                </div>
                <h3 className="mt-3 font-montserrat text-[32px] mobile:text-[24px] font-semibold leading-[1.2] text-ocean-deep">
                  {h.title}
                </h3>
                <p className="mt-4 font-inter text-[16px] leading-[1.65] text-slate-700">
                  {h.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider fill="#0F172A" />

      {/* ════════════════════════════════════
          OUR TEAM
      ════════════════════════════════════ */}
      <section
        ref={teamRef}
        className="bg-ocean-deep py-section-desktop mobile:py-section-mobile"
      >
        <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile">
          {/* Title */}
          <div className="text-center">
            <h2 className="font-montserrat text-[48px] mobile:text-[32px] font-bold leading-[1.15] tracking-[-0.01em] text-white">
              Наша команда
            </h2>
            <p className="mt-3 font-inter text-[18px] text-white/70">
              Профессионалы, влюбленные в свое дело
            </p>
          </div>

          {/* Team photo banner */}
          <div className="team-photo mt-8 relative rounded-card overflow-hidden h-[400px] mobile:h-[250px]">
            <img
              src="/pool-lanes.jpg"
              alt="Команда тренеров Дельфин"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(15,23,42,0.5), transparent)',
              }}
            />
          </div>

          {/* Coach cards */}
          <div className="coach-grid mt-10 grid grid-cols-3 mobile:grid-cols-1 gap-6">
            {coaches.map((coach, i) => (
              <div
                key={i}
                className="coach-card rounded-card p-8 border border-white/[0.08] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-card-hover"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-warm-sand flex items-center justify-center">
                    <span className="font-montserrat text-[32px] font-bold text-ocean-deep">
                      {coach.initial}
                    </span>
                  </div>
                  <div>
                    <span
                      className="inline-block px-3 py-1 rounded-pill font-inter text-[12px] font-medium text-white"
                      style={{ background: '#0D9488' }}
                    >
                      {coach.cert}
                    </span>
                  </div>
                </div>
                <h4 className="mt-5 font-montserrat text-[20px] font-semibold text-white">
                  {coach.name}
                </h4>
                <p className="mt-1 font-inter text-[14px] tracking-[0.04em] uppercase text-cyan-400">
                  {coach.role}
                </p>
                <p className="mt-3 font-inter text-[15px] leading-[1.6] text-white/75">
                  {coach.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA
      ════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="relative py-section-desktop mobile:py-section-mobile overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)',
        }}
      >
        <div className="relative z-10 mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile text-center">
          <h2 className="cta-anim font-montserrat text-[48px] mobile:text-[28px] font-bold leading-[1.15] tracking-[-0.01em] text-white">
            Приходите знакомиться!
          </h2>
          <p className="cta-anim mt-4 max-w-[600px] mx-auto font-inter text-[18px] leading-[1.6] text-white/85">
            Бесплатное пробное занятие для всех новых клиентов. Мы уверены — вам понравится.
          </p>
          <a
            href="#/contacts"
            className="cta-anim mt-8 inline-block rounded-button bg-coral px-8 py-4 font-montserrat text-[16px] font-bold tracking-[0.02em] text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] hover:shadow-[0_6px_24px_rgba(255,107,107,0.45)] active:scale-[0.97]"
          >
            Записаться на пробное занятие
          </a>
        </div>
      </section>

      {/* Bottom wave to footer */}
      <WaveDivider fill="#0F172A" />
    </div>
  )
}
