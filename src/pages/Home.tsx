import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Ruler, Droplets, Users, Heart, CheckCircle, MapPin, Clock, Quote } from 'lucide-react'
import ParticlesCanvas from '@/components/ParticlesCanvas'
import WaveDivider from '@/components/WaveDivider'

gsap.registerPlugin(ScrollTrigger)

/* ──────────── Hero Section ──────────── */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [stat25, setStat25] = useState(0)
  const [stat6, setStat6] = useState(0)
  const statsAnimated = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.3,
      })
      gsap.from(subRef.current, {
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.5,
      })
      gsap.from(ctaRef.current, {
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.7,
      })
      gsap.from(imageRef.current, {
        scale: 1.05, duration: 1.2, ease: 'power2.out', delay: 0.2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useGSAP(() => {
    if (statsAnimated.current) return
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        statsAnimated.current = true
        const obj = { v25: 0, v6: 0 }
        gsap.to(obj, {
          v25: 25, v6: 6, duration: 1.5, delay: 1, ease: 'power2.out',
          onUpdate: () => {
            setStat25(Math.round(obj.v25))
            setStat6(Math.round(obj.v6))
          },
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col md:flex-row overflow-hidden"
    >
      {/* Particles behind left panel */}
      <ParticlesCanvas density={40} />

      {/* Left Panel */}
      <div
        className="relative z-10 flex w-full flex-col justify-center md:w-[50%] px-6 sm:px-10 lg:px-16 xl:px-20 py-24 md:py-0"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)',
        }}
      >
        <h1
          ref={headlineRef}
          className="font-montserrat text-[36px] sm:text-[48px] lg:text-[72px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white max-w-[600px]"
        >
          Плавайте с{' '}
          <span className="text-cyan-400">удовольствием</span>
          <br />
          каждый день
        </h1>

        <p
          ref={subRef}
          className="mt-6 max-w-[480px] font-inter text-[16px] sm:text-[18px] leading-[1.6] text-white/85"
        >
          Современный бассейн олимпийских размеров в сердце Хабаровска. Профессиональные тренеры, чистейшая вода и комфорт для всей семьи.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/contacts"
            className="inline-block rounded-button bg-coral px-8 py-4 font-montserrat text-[16px] font-bold tracking-[0.02em] text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] active:scale-[0.97]"
          >
            Записаться на занятие
          </Link>
          <Link
            to="/schedule"
            className="inline-block rounded-button border-2 border-white/40 bg-transparent px-7 py-[14px] font-montserrat text-[16px] font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-[0.98]"
          >
            Смотреть расписание
          </Link>
        </div>

        <div className="mt-4 flex items-center gap-2 text-cyan-400">
          <CheckCircle size={16} />
          <span className="font-inter text-[14px]">Первое занятие бесплатно</span>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 flex items-center gap-6 sm:gap-8">
          <div className="text-center">
            <div className="font-montserrat text-[40px] sm:text-[56px] font-extrabold leading-none tracking-[-0.02em] text-white">
              {stat25}
            </div>
            <div className="mt-1 font-inter text-[14px] text-white/60">метров</div>
          </div>
          <div style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.15)' }} />
          <div className="text-center">
            <div className="font-montserrat text-[40px] sm:text-[56px] font-extrabold leading-none tracking-[-0.02em] text-white">
              {stat6}
            </div>
            <div className="mt-1 font-inter text-[14px] text-white/60">дорожек</div>
          </div>
          <div style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.15)' }} />
          <div className="text-center">
            <div className="font-montserrat text-[28px] sm:text-[36px] font-extrabold leading-none tracking-[-0.02em] text-white">
              7:00–22:00
            </div>
            <div className="mt-1 font-inter text-[14px] text-white/60">ежедневно</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="relative w-full md:w-[55%] md:-ml-[5%]">
        <img
          ref={imageRef}
          src="/hero-bg.jpg"
          alt="Premium swimming pool interior"
          className="h-[50vh] md:h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(15,23,42,0.3))',
          }}
        />
      </div>
    </section>
  )
}

/* ──────────── Features Section ──────────── */
function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      icon: Ruler,
      title: 'Олимпийские размеры',
      desc: '25-метровый бассейн с 6 дорожками. Идеальные условия для тренировок любого уровня — от начинающих до профессионалов.',
      gradient: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
    },
    {
      icon: Droplets,
      title: 'Кристально чистая вода',
      desc: 'Многоступенчатая система очистки с ультрафиолетовой дезинфекцией. Температура воды 27°C — оптимальная для комфортного плавания.',
      gradient: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
    },
    {
      icon: Users,
      title: 'Профессиональные тренеры',
      desc: 'Команда сертифицированных инструкторов с опытом работы более 10 лет. Индивидуальный подход к каждому посетителю.',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A8A 100%)',
    },
    {
      icon: Heart,
      title: 'Для всей семьи',
      desc: 'Программы для детей от 3 лет, взрослых и пожилых людей. Специальные занятия для беременных и группы реабилитации.',
      gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      iconColor: '#22D3EE',
    },
  ]

  useGSAP(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.feature-card')
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  }, { scope: containerRef })

  return (
    <section className="bg-mist-white" style={{ padding: '120px 0' }}>
      <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-[32px] sm:text-[48px] font-bold leading-[1.15] tracking-[-0.01em] text-ocean-deep">
            Почему выбирают Дельфин
          </h2>
          <p className="mt-3 font-inter text-[16px] sm:text-[18px] text-slate-700">
            Более 10 лет мы создаем идеальные условия для плавания в Хабаровске
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card group relative overflow-hidden rounded-card p-8 sm:p-10 transition-shadow duration-500 hover:shadow-card-hover"
              style={{ background: f.gradient }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-[10deg]"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                <f.icon size={32} color="white" style={f.iconColor ? { color: f.iconColor } : undefined} />
              </div>
              <h3 className="font-montserrat text-[20px] sm:text-[24px] font-semibold leading-[1.3] text-white">
                {f.title}
              </h3>
              <p className="mt-3 font-inter text-[14px] sm:text-[16px] leading-[1.65] text-white/85">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────── Programs Section ──────────── */
function ProgramsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const programs = [
    {
      image: '/kids-swim.jpg',
      badge: 'от 3 лет',
      title: 'Детское плавание',
      subtitle: 'С 3 до 14 лет',
    },
    {
      image: '/pool-lanes.jpg',
      badge: 'все уровни',
      title: 'Взрослое плавание',
      subtitle: 'С нуля до мастерства',
    },
    {
      image: '/aqua-aerobics.jpg',
      badge: 'группы',
      title: 'Аквааэробика',
      subtitle: 'Здоровье и энергия',
    },
  ]

  useGSAP(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.program-card')
    const cta = containerRef.current.querySelector('.programs-cta')

    gsap.from(cards, {
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    })

    if (cta) {
      gsap.from(cta, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }
  }, { scope: containerRef })

  return (
    <section
      className="bg-ocean-deep relative"
      style={{ padding: '120px 0' }}
    >
      <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile" ref={containerRef}>
        <div className="mb-12">
          <h2 className="font-montserrat text-[32px] sm:text-[48px] font-bold leading-[1.15] tracking-[-0.01em] text-white">
            Наши программы
          </h2>
          <p className="mt-3 font-inter text-[16px] sm:text-[18px] text-white/70">
            Выберите направление, которое подходит именно вам
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((prog, i) => (
            <Link
              to="/services"
              key={i}
              className="program-card group relative block overflow-hidden rounded-card cursor-pointer"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={prog.image}
                alt={prog.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                loading="lazy"
              />
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.85))',
                }}
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.6))',
                }}
              />

              <span className="absolute top-4 left-4 rounded-pill bg-cyan-400 px-3 py-1 font-inter text-[14px] font-medium tracking-[0.04em] text-ocean-deep">
                {prog.badge}
              </span>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-montserrat text-[20px] sm:text-[24px] font-semibold leading-[1.3] text-white">
                  {prog.title}
                </h3>
                <p className="mt-1 font-inter text-[14px] text-white/70">
                  {prog.subtitle}
                </p>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-block rounded-button border-2 border-white/40 bg-transparent px-4 py-2 font-montserrat text-[13px] font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10">
                  Подробнее
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="programs-cta mt-12 flex flex-col items-center justify-between gap-6 rounded-panel sm:flex-row"
          style={{
            background: 'linear-gradient(135deg, #E6D5B8 0%, #FF6B6B 40%, #FFB088 100%)',
            padding: '48px 64px',
          }}
        >
          <div>
            <h3 className="font-montserrat text-[22px] sm:text-[28px] font-bold text-white">
              Хотите узнать больше?
            </h3>
            <p className="mt-2 font-inter text-[14px] sm:text-[16px] text-white/90">
              У нас есть программы для каждого — от малышей до спортсменов
            </p>
          </div>
          <Link
            to="/services"
            className="inline-block rounded-button bg-white px-8 py-4 font-montserrat text-[16px] font-bold tracking-[0.02em] text-coral transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-[0.97]"
          >
            Все услуги
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ──────────── Testimonials Section ──────────── */
function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      photo: '/testimonial-1.jpg',
      quote: 'Отдала дочку в группу по плаванию в 5 лет. Через полгода она уверенно плавает кролем! Тренеры — настоящие профессионалы, дети их обожают.',
      name: 'Анна Морозова',
      program: 'Детское плавание',
    },
    {
      photo: '/testimonial-2.jpg',
      quote: 'Хожу на утренние тренировки уже два года. Бассейн всегда чистый, вода комфортной температуры, народу не много. Идеальное место для поддержания формы.',
      name: 'Дмитрий Соколов',
      program: 'Взрослое плавание',
      offset: true,
    },
    {
      photo: '/testimonial-3.jpg',
      quote: 'Аквааэробика изменила мою жизнь! Занятия проходят весело и эффективно. За три месяца улучшилась осанка, прошли боли в спине.',
      name: 'Екатерина Волкова',
      program: 'Аквааэробика',
    },
  ]

  useGSAP(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.testimonial-card')
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  }, { scope: containerRef })

  return (
    <section className="bg-mist-white" style={{ padding: '120px 0' }}>
      <div className="mx-auto max-w-[1000px] px-content-pad mobile:px-content-pad-mobile">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-[32px] sm:text-[48px] font-bold leading-[1.15] tracking-[-0.01em] text-ocean-deep">
            Что говорят наши клиенты
          </h2>
          <div className="mx-auto mt-4 h-1 w-[60px] rounded-full bg-coral" />
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card relative rounded-card bg-white p-8 shadow-card"
              style={{ marginTop: t.offset ? '20px' : '0' }}
            >
              <Quote
                size={32}
                className="absolute top-6 right-6 text-warm-sand opacity-30"
              />

              <div className="flex items-start gap-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="h-20 w-20 flex-shrink-0 rounded-full object-cover"
                  style={{ border: '3px solid #22D3EE' }}
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="font-inter text-[15px] italic leading-[1.65] text-slate-700">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 font-montserrat text-[16px] font-semibold text-ocean-deep">
                    {t.name}
                  </p>
                  <span className="mt-2 inline-block rounded-pill bg-warm-sand px-3 py-1 font-inter text-[13px] font-medium tracking-[0.04em] text-slate-700">
                    {t.program}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────── CTA Section ──────────── */
function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-headline', {
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.cta-subtext', {
        y: 40, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.cta-button-wrap', {
        y: 40, opacity: 0, scale: 0.95, duration: 0.7, delay: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.cta-badge', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)',
        padding: '120px 0',
      }}
    >
      <ParticlesCanvas density={30} />

      <div className="relative z-10 mx-auto max-w-[800px] px-content-pad mobile:px-content-pad-mobile text-center">
        <h2 className="cta-headline font-montserrat text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
          Готовы{' '}
          <span className="text-cyan-400">нырнуть</span>?
        </h2>

        <p className="cta-subtext mt-4 font-inter text-[16px] sm:text-[18px] text-white/85">
          Приходите на бесплатное пробное занятие и почувствуйте разницу
        </p>

        <div className="cta-button-wrap mt-8">
          <Link
            to="/contacts"
            className="inline-block rounded-button bg-coral px-10 py-[18px] font-montserrat text-[16px] sm:text-[18px] font-bold tracking-[0.02em] text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] active:scale-[0.97]"
          >
            Записаться сейчас
          </Link>
        </div>

        <a
          href="tel:+74212000000"
          className="mt-4 block font-inter text-[16px] font-medium text-cyan-400 transition-colors duration-300 hover:text-cyan-300"
        >
          +7 (4212) 00-00-00
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-white/70">
          <span className="cta-badge flex items-center gap-1.5 font-inter text-[14px]">
            <CheckCircle size={16} className="text-cyan-400" />
            Первое занятие бесплатно
          </span>
          <span className="text-white/30">·</span>
          <span className="cta-badge flex items-center gap-1.5 font-inter text-[14px]">
            <MapPin size={16} className="text-cyan-400" />
            ул. Примерная, 25, Хабаровск
          </span>
          <span className="text-white/30">·</span>
          <span className="cta-badge flex items-center gap-1.5 font-inter text-[14px]">
            <Clock size={16} className="text-cyan-400" />
            Ежедневно 7:00 – 22:00
          </span>
        </div>
      </div>
    </section>
  )
}

/* ──────────── Home Page ──────────── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <WaveDivider fill="#F8FAFC" />
      <FeaturesSection />
      <WaveDivider fill="#0F172A" />
      <ProgramsSection />
      <WaveDivider fill="#F8FAFC" />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
