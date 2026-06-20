import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Check, Waves, Users, Dumbbell, Flame, Trophy, UserRound } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import WaveDivider from '../components/WaveDivider'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────── data ─────────────── */

const services = [
  {
    icon: Users,
    title: 'Плавание для детей',
    tag: 'от 3 лет',
    image: '/kids-swim.jpg',
    description: 'Обучение плаванию для детей от 3 до 14 лет в малых группах.',
    details: [
      'Группы по возрасту: 3-5 лет, 6-8 лет, 9-14 лет',
      'Продолжительность: 45 минут',
      'Занятия: 3 раза в неделю',
      'Стоимость: от 3 500 ₽/мес',
    ],
  },
  {
    icon: Waves,
    title: 'Плавание для взрослых',
    tag: 'все уровни',
    image: '/pool-lanes.jpg',
    description: 'Индивидуальные и групповые занятия для взрослых любого уровня подготовки.',
    details: [
      'Начинающие / Продолжающие / Спортсмены',
      'Продолжительность: 60 минут',
      'Группы до 6 человек',
      'Стоимость: от 4 000 ₽/мес',
    ],
  },
  {
    icon: Dumbbell,
    title: 'Аквааэробика',
    tag: 'группы',
    image: '/aqua-aerobics.jpg',
    description: 'Эффективные водные тренировки для укрепления здоровья и поддержания формы.',
    details: [
      'Утренние и вечерние группы',
      'Продолжительность: 45 минут',
      'Без специальной подготовки',
      'Стоимость: от 3 000 ₽/мес',
    ],
  },
  {
    icon: Flame,
    title: 'Сауна',
    tag: 'доступна всем',
    image: '/hero-bg.jpg',
    description: 'Классическая финская сауна с температурой 90°C и низкой влажностью.',
    details: [
      'Вместимость: до 8 человек',
      'Ароматерапия и веники',
      'Совмещается с посещением бассейна',
      'Стоимость: от 500 ₽/час',
    ],
  },
  {
    icon: Trophy,
    title: 'Водное поло',
    tag: 'командный вид',
    image: '/pool-lanes.jpg',
    description: 'Командная игра в воде для развития выносливости и командного духа.',
    details: [
      'Группы по уровню подготовки',
      'Продолжительность: 60 минут',
      'Все необходимое оборудование',
      'Стоимость: от 3 500 ₽/мес',
    ],
  },
  {
    icon: UserRound,
    title: 'Индивидуальные тренировки',
    tag: 'по записи',
    image: '/aqua-aerobics.jpg',
    description: 'Занятия один на один с профессиональным тренером по вашей программе.',
    details: [
      'Составление индивидуального плана',
      'Гибкий график',
      'Трекинг прогресса',
      'Стоимость: от 1 500 ₽/занятие',
    ],
  },
]

const plans = [
  {
    name: 'Базовый',
    price: '4 500',
    featured: false,
    features: [
      '8 посещений в месяц',
      'Доступ к основному бассейну',
      'Использование раздевалки',
    ],
  },
  {
    name: 'Стандарт',
    price: '7 500',
    featured: true,
    features: [
      'Безлимитные посещения',
      'Доступ к бассейну и сауне',
      '2 гостевых визита в месяц',
      'Скидка 10% на тренировки',
    ],
  },
  {
    name: 'Премиум',
    price: '12 000',
    featured: false,
    features: [
      'Безлимитные посещения',
      'Бассейн, сауна, джакузи',
      '4 гостевых визита',
      'Скидка 20% на тренировки',
      'Бесплатный пробный период',
    ],
  },
]

/* ─────────────── component ─────────────── */

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    /* Hero */
    gsap.from('.services-hero-title', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    })
    gsap.from('.services-hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: 0.2,
      ease: 'power3.out',
    })

    /* Section titles */
    gsap.utils.toArray<HTMLElement>('.services-section-title').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
      })
    })

    /* Service cards */
    gsap.from('.service-card', {
      scrollTrigger: { trigger: '.services-grid', start: 'top 80%', once: true },
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    })

    /* Pricing cards */
    gsap.from('.pricing-card-side', {
      scrollTrigger: { trigger: '.pricing-cards-row', start: 'top 80%', once: true },
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
    })
    gsap.from('.pricing-card-center', {
      scrollTrigger: { trigger: '.pricing-cards-row', start: 'top 80%', once: true },
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 0.7,
      ease: 'power3.out',
    })

    /* CTA */
    gsap.from('.services-cta-content', {
      scrollTrigger: { trigger: '.services-cta', start: 'top 80%', once: true },
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      {/* ═══════ Hero ═══════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-[72px]">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full h-full" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)' }} />
          <div
            className="absolute right-0 top-0 h-full w-1/2 hidden md:block"
            style={{
              backgroundImage: 'url(/pool-lanes.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute inset-0 md:left-[47%]"
            style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)', opacity: 0.97 }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-content px-content-pad py-20 mobile:px-content-pad-mobile">
          <nav className="mb-6 flex items-center gap-2 font-inter text-[14px] text-white/60">
            <Link to="/" className="transition-colors hover:text-white">Главная</Link>
            <span>/</span>
            <span className="text-white/80">Услуги</span>
          </nav>
          <h1 className="services-hero-title font-montserrat text-[64px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white mobile:text-[40px]">
            Услуги
          </h1>
          <p className="services-hero-subtitle mt-4 max-w-[520px] font-inter text-[18px] leading-[1.6] text-white/85">
            Программы для всех возрастов и уровней подготовки
          </p>
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ═══════ Service Categories ═══════ */}
      <section className="bg-mist-white py-section-desktop mobile:py-section-mobile">
        <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile">
          <div className="services-section-title text-center">
            <h2 className="font-montserrat text-[48px] font-bold tracking-[-0.01em] text-ocean-deep mobile:text-[32px]">
              Что мы предлагаем
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] font-inter text-[18px] text-slate-700">
              Выберите программу, которая соответствует вашим целям
            </p>
          </div>

          <div className="services-grid mt-16 grid grid-cols-3 gap-7 lg:grid-cols-3 md:grid-cols-2 mobile:grid-cols-1">
            {services.map((s, i) => {
              const Icon = s.icon
              const isHovered = hoveredCard === i
              return (
                <div
                  key={s.title}
                  className="service-card group cursor-pointer overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute left-4 top-4 rounded-pill px-3 py-1 font-inter text-[12px] font-medium"
                      style={{ background: '#22D3EE', color: '#0F172A' }}
                    >
                      {s.tag}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(13,148,136,0.1)' }}>
                        <Icon size={20} className="text-teal-600" />
                      </div>
                      <h3 className="font-montserrat text-[24px] font-semibold text-ocean-deep">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 font-inter text-[16px] leading-relaxed text-slate-700">
                      {s.description}
                    </p>

                    {/* Expandable details */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{
                        maxHeight: isHovered ? '200px' : '0px',
                        opacity: isHovered ? 1 : 0,
                      }}
                    >
                      <ul className="mt-4 space-y-2">
                        {s.details.map((d) => (
                          <li key={d} className="flex items-start gap-2 font-inter text-[14px] text-slate-700">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex items-center gap-1 font-inter text-[15px] font-medium text-teal-600 transition-colors hover:text-teal-700">
                      <span>Подробнее</span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <WaveDivider fill="#0F172A" />

      {/* ═══════ Pricing Tiers ═══════ */}
      <section className="bg-ocean-deep py-section-desktop mobile:py-section-mobile">
        <div className="mx-auto max-w-[1000px] px-content-pad mobile:px-content-pad-mobile">
          <div className="services-section-title text-center">
            <h2 className="font-montserrat text-[48px] font-bold tracking-[-0.01em] text-white mobile:text-[32px]">
              Популярные абонементы
            </h2>
            <p className="mx-auto mt-3 max-w-[500px] font-inter text-[18px] text-white/70">
              Выберите подходящий вариант и начните заниматься
            </p>
          </div>

          <div className="pricing-cards-row mt-16 grid grid-cols-3 items-start gap-6 mobile:grid-cols-1">
            {plans.map((plan) => {
              if (plan.featured) {
                return (
                  <div
                    key={plan.name}
                    className="pricing-card-center relative rounded-card p-10 mobile:order-first mobile:mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #E6D5B8 0%, #FF6B6B 40%, #FFB088 100%)',
                      transform: 'translateY(-16px)',
                      boxShadow: '0 16px 48px rgba(15, 23, 42, 0.18)',
                    }}
                  >
                    <span
                      className="absolute -right-2 -top-3 rounded-pill px-4 py-1.5 font-inter text-[12px] font-medium tracking-[0.04em]"
                      style={{ background: 'white', color: '#FF6B6B' }}
                    >
                      ПОПУЛЯРНЫЙ
                    </span>
                    <h3 className="font-montserrat text-[22px] font-semibold text-white">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-montserrat text-[48px] font-extrabold text-white">
                        {plan.price}
                      </span>
                      <span className="font-inter text-[16px] text-white/70">₽/мес</span>
                    </div>
                    <div className="my-5 h-px w-full bg-white/20" />
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 font-inter text-[15px] text-white">
                          <Check size={18} className="shrink-0 text-white" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="mt-8 w-full rounded-button bg-white py-3.5 font-montserrat text-[16px] font-bold transition-colors duration-200 hover:bg-white/90"
                      style={{ color: '#FF6B6B' }}
                    >
                      Оформить
                    </button>
                  </div>
                )
              }

              return (
                <div
                  key={plan.name}
                  className="pricing-card-side rounded-card p-9"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <h3 className="font-montserrat text-[20px] font-semibold text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-montserrat text-[40px] font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="font-inter text-[16px] text-slate-400">₽/мес</span>
                  </div>
                  <div className="my-5 h-px w-full bg-white/10" />
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 font-inter text-[15px] text-white/90">
                        <Check size={18} className="shrink-0 text-cyan-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-8 w-full rounded-button border-2 border-white/40 bg-transparent py-3 font-montserrat text-[16px] font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10">
                    Оформить
                  </button>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/prices"
              className="inline-flex items-center gap-2 font-inter text-[16px] font-medium text-cyan-400 transition-colors hover:text-cyan-500"
            >
              <span>Посмотреть все тарифы</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider fill="#0F172A" />

      {/* ═══════ CTA ═══════ */}
      <section
        className="services-cta relative py-section-desktop mobile:py-section-mobile"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)' }}
      >
        <div className="services-cta-content relative z-10 mx-auto max-w-content px-content-pad text-center mobile:px-content-pad-mobile">
          <h2 className="font-montserrat text-[48px] font-bold text-white mobile:text-[32px]">
            Не нашли подходящее?
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] font-inter text-[18px] text-white/85">
            Позвоните нам — мы подберем программу специально для вас
          </p>
          <a
            href="tel:+74212000000"
            className="mt-8 inline-block rounded-button bg-coral px-8 py-4 font-montserrat text-[16px] font-bold text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] active:scale-[0.97]"
          >
            Позвонить
          </a>
          <p className="mt-4 font-inter text-[16px] text-white/70">+7 (4212) 00-00-00</p>
        </div>
      </section>
    </div>
  )
}
