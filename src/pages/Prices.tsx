import { useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  Check,
  X,
  ChevronDown,
  Info,
  Ticket,
  Award,
  Crown,
  Users,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import WaveDivider from '../components/WaveDivider'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────── data ─────────────── */

const membershipPlans = [
  {
    name: 'Базовый',
    description: 'Для тех, кто плавает 1-2 раза в неделю',
    price: '4 500',
    period: '/месяц',
    featured: false,
    savings: null,
    icon: Ticket,
    iconColor: '#0D9488',
    iconBg: 'rgba(13,148,136,0.1)',
    features: [
      { text: '8 посещений в месяц', included: true },
      { text: 'Доступ к 25-метровому бассейну', included: true },
      { text: 'Использование раздевалки и душевых', included: true },
      { text: 'Сауна', included: false },
      { text: 'Гостевые визиты', included: false },
    ],
  },
  {
    name: 'Стандарт',
    description: 'Оптимальный выбор для регулярных занятий',
    price: '7 500',
    period: '/месяц',
    featured: true,
    savings: 'Экономия 2 000 ₽',
    icon: Award,
    iconColor: '#22D3EE',
    iconBg: 'rgba(34,211,238,0.1)',
    features: [
      { text: 'Безлимитные посещения', included: true },
      { text: 'Бассейн + Финская сауна', included: true },
      { text: '2 гостевых визита в месяц', included: true },
      { text: 'Скидка 10% на персональные тренировки', included: true },
      { text: 'Приоритетная запись на групповые занятия', included: true },
    ],
  },
  {
    name: 'Премиум',
    description: 'Максимум возможностей для всей семьи',
    price: '12 000',
    period: '/месяц',
    featured: false,
    savings: 'Экономия 4 500 ₽',
    icon: Crown,
    iconColor: '#FF6B6B',
    iconBg: 'rgba(255,107,107,0.1)',
    features: [
      { text: 'Безлимитные посещения', included: true },
      { text: 'Бассейн + Сауна + Джакузи', included: true },
      { text: '4 гостевых визита в месяц', included: true },
      { text: 'Скидка 20% на персональные тренировки', included: true },
      { text: 'Бесплатная заморозка на 14 дней', included: true },
      { text: 'Персональный консультант', included: true },
    ],
  },
]

const singleVisitPrices = [
  { category: 'Взрослый', visits: ['800 ₽', '2 800 ₽', '5 200 ₽', '7 200 ₽'], highlightIdx: 3 },
  { category: 'Студент / Пенсионер', visits: ['600 ₽', '2 000 ₽', '3 600 ₽', '4 800 ₽'], highlightIdx: 3 },
  { category: 'Ребенок (до 14 лет)', visits: ['500 ₽', '1 600 ₽', '2 800 ₽', '3 600 ₽'], highlightIdx: 3 },
  { category: 'Семейный (2+1)', visits: ['—', '—', '—', '10 000 ₽'], highlightIdx: 3 },
]

const additionalServices = [
  { name: 'Финская сауна', description: '1 час, до 8 человек', price: '500 ₽' },
  { name: 'Джакузи', description: '30 минут', price: '300 ₽' },
  { name: 'Персональная тренировка', description: '60 минут с тренером', price: '1 500 ₽' },
  { name: 'Пробное занятие', description: 'Первое посещение', price: 'Бесплатно' },
  { name: 'Аренда дорожки (соревнования)', description: '1 дорожка, 2 часа', price: '2 000 ₽' },
  { name: 'Полная аренда бассейна', description: 'До 3 часов', price: '15 000 ₽' },
]

const faqItems = [
  {
    q: 'Можно ли заморозить абонемент?',
    a: 'Да! Абонементы «Стандарт» и «Премиум» можно заморозить на срок до 14 дней в год. Просто сообщите нам заранее.',
  },
  {
    q: 'Есть ли скидки для семей?',
    a: 'Да, мы предлагаем семейный абонемент на 12 посещений для 2 взрослых и 1 ребенка до 14 лет по специальной цене 10 000 ₽. Также действует скидка 10% при одновременном оформлении двух абонементов.',
  },
  {
    q: 'Что включено в стоимость разового посещения?',
    a: 'Разовое посещение включает неограниченное время в бассейне в течение дня, использование раздевалки, душевых и шкафчика. Полотенце можно взять на прокат за 50 ₽.',
  },
  {
    q: 'Как оплатить абонемент?',
    a: 'Мы принимаем наличные, банковские карты, оплату через СБП и онлайн-оплату на сайте. Абонемент можно оформить в reception или по телефону.',
  },
  {
    q: 'Есть ли пробное занятие?',
    a: 'Да! Первое занятие в любом групповом курсе — абсолютно бесплатно. Приходите, попробуйте и решите, подходит ли вам программа.',
  },
  {
    q: 'Нужно ли уметь плавать для занятий аквааэробикой?',
    a: 'Нет, для занятий аквааэробикой умение плавать не требуется. Занятия проводятся в мелкой зоне бассейна, где ноги достают до дна.',
  },
]

/* ─────────────── component ─────────────── */

export default function Prices() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    /* Hero */
    gsap.from('.prices-hero-title', {
      opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
    })
    gsap.from('.prices-hero-subtitle', {
      opacity: 0, y: 30, duration: 0.7, delay: 0.2, ease: 'power3.out',
    })

    /* Section titles */
    gsap.utils.toArray<HTMLElement>('.prices-section-title').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
      })
    })

    /* Membership cards */
    gsap.from('.membership-card-side', {
      scrollTrigger: { trigger: '.membership-cards-row', start: 'top 80%', once: true },
      opacity: 0, y: 50, duration: 0.7, stagger: 0.2, ease: 'power3.out',
    })
    gsap.from('.membership-card-center', {
      scrollTrigger: { trigger: '.membership-cards-row', start: 'top 80%', once: true },
      opacity: 0, y: 80, scale: 0.93, duration: 0.8, ease: 'power3.out',
    })

    /* Price table */
    gsap.from('.price-table-container', {
      scrollTrigger: { trigger: '.price-table-container', start: 'top 80%', once: true },
      opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
    })
    gsap.from('.price-table-row', {
      scrollTrigger: { trigger: '.price-table', start: 'top 80%', once: true },
      opacity: 0, x: -20, duration: 0.5, stagger: 0.06, ease: 'power3.out',
    })

    /* Additional services */
    gsap.from('.add-service-item', {
      scrollTrigger: { trigger: '.add-services-list', start: 'top 80%', once: true },
      opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power3.out',
    })

    /* Family discount */
    gsap.from('.family-discount', {
      scrollTrigger: { trigger: '.family-discount', start: 'top 80%', once: true },
      opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
    })

    /* FAQ */
    gsap.from('.faq-item', {
      scrollTrigger: { trigger: '.faq-list', start: 'top 80%', once: true },
      opacity: 0, y: 15, duration: 0.5, stagger: 0.08, ease: 'power3.out',
    })

    /* CTA */
    gsap.from('.prices-cta-content', {
      scrollTrigger: { trigger: '.prices-cta', start: 'top 80%', once: true },
      opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      {/* ═══════ Hero ═══════ */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-[72px]">
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

        <div className="relative z-10 mx-auto w-full max-w-content px-content-pad py-20 mobile:px-content-pad-mobile">
          <nav className="mb-6 flex items-center gap-2 font-inter text-[14px] text-white/60">
            <Link to="/" className="transition-colors hover:text-white">Главная</Link>
            <span>/</span>
            <span className="text-white/80">Цены</span>
          </nav>
          <h1 className="prices-hero-title font-montserrat text-[64px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white mobile:text-[40px]">
            Цены
          </h1>
          <p className="prices-hero-subtitle mt-4 max-w-[520px] font-inter text-[18px] leading-[1.6] text-white/85">
            Прозрачные цены. Никаких скрытых платежей.
          </p>
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ═══════ Membership Plans ═══════ */}
      <section className="bg-mist-white py-section-desktop mobile:py-section-mobile">
        <div className="mx-auto max-w-[1100px] px-content-pad mobile:px-content-pad-mobile">
          <div className="prices-section-title text-center">
            <h2 className="font-montserrat text-[48px] font-bold tracking-[-0.01em] text-ocean-deep mobile:text-[32px]">
              Абонементы
            </h2>
            <p className="mx-auto mt-3 max-w-[580px] font-inter text-[18px] text-slate-700">
              Экономьте с абонементом — чем дольше срок, тем выгоднее
            </p>
          </div>

          <div className="membership-cards-row mt-16 grid grid-cols-3 items-start gap-6 mobile:grid-cols-1">
            {membershipPlans.map((plan) => {
              const Icon = plan.icon
              if (plan.featured) {
                return (
                  <div
                    key={plan.name}
                    className="membership-card-center relative rounded-card p-12 mobile:order-first mobile:mb-4"
                    style={{
                      background: '#0F172A',
                      transform: 'translateY(-24px)',
                      boxShadow: '0 24px 64px rgba(15,23,42,0.25)',
                    }}
                  >
                    <span
                      className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-pill px-6 py-2 font-montserrat text-[12px] font-bold tracking-[0.08em] text-white"
                      style={{ background: 'linear-gradient(135deg, #E6D5B8 0%, #FF6B6B 40%, #FFB088 100%)' }}
                    >
                      САМЫЙ ПОПУЛЯРНЫЙ
                    </span>

                    <div
                      className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
                      style={{ background: plan.iconBg }}
                    >
                      <Icon size={48} style={{ color: plan.iconColor }} />
                    </div>

                    <h3 className="mt-6 font-montserrat text-[28px] font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-2 font-inter text-[15px] text-white/75">
                      {plan.description}
                    </p>

                    <div className="my-6 h-px w-full bg-white/10" />

                    <div className="flex items-baseline gap-1">
                      <span className="font-montserrat text-[56px] font-extrabold text-white">
                        {plan.price}
                      </span>
                      <span className="font-inter text-[16px] text-slate-400">{plan.period}</span>
                    </div>

                    {plan.savings && (
                      <span
                        className="mt-3 inline-block rounded-pill px-4 py-1.5 font-inter text-[13px] font-medium tracking-[0.04em]"
                        style={{ background: 'rgba(34,211,238,0.2)', color: '#22D3EE' }}
                      >
                        {plan.savings}
                      </span>
                    )}

                    <ul className="mt-6 space-y-4">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-center gap-3 font-inter text-[15px] text-white">
                          <Check size={18} className="shrink-0 text-cyan-400" />
                          {f.text}
                        </li>
                      ))}
                    </ul>

                    <button className="mt-8 w-full rounded-button bg-coral py-4.5 font-montserrat text-[16px] font-bold text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] active:scale-[0.97]">
                      Оформить абонемент
                    </button>
                  </div>
                )
              }

              return (
                <div
                  key={plan.name}
                  className="membership-card-side rounded-card bg-white p-10 shadow-card"
                >
                  <div
                    className="flex h-[64px] w-[64px] items-center justify-center rounded-full"
                    style={{ background: plan.iconBg }}
                  >
                    <Icon size={40} style={{ color: plan.iconColor }} />
                  </div>

                  <h3 className="mt-6 font-montserrat text-[24px] font-bold text-ocean-deep">
                    {plan.name}
                  </h3>
                  <p className="mt-2 font-inter text-[15px] text-slate-700">
                    {plan.description}
                  </p>

                  <div className="my-6 h-px w-full" style={{ background: 'rgba(15,23,42,0.08)' }} />

                  <div className="flex items-baseline gap-1">
                    <span className="font-montserrat text-[48px] font-extrabold text-ocean-deep">
                      {plan.price}
                    </span>
                    <span className="font-inter text-[16px] text-slate-400">{plan.period}</span>
                  </div>

                  {plan.savings && (
                    <span
                      className="mt-3 inline-block rounded-pill px-4 py-1.5 font-inter text-[13px] font-medium tracking-[0.04em]"
                      style={{ background: 'rgba(255,107,107,0.15)', color: '#FF6B6B' }}
                    >
                      {plan.savings}
                    </span>
                  )}

                  <ul className="mt-6 space-y-4">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-3 font-inter text-[15px] text-slate-700">
                        {f.included ? (
                          <Check size={18} className="shrink-0 text-teal-600" />
                        ) : (
                          <X size={18} className="shrink-0 text-slate-400" />
                        )}
                        <span className={!f.included ? 'text-slate-400 line-through' : ''}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="mt-8 w-full rounded-button py-3.5 font-montserrat text-[16px] font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: plan.name === 'Базовый' ? '#0D9488' : '#0D9488',
                      color: 'white',
                    }}
                    onMouseEnter={(e) => {
                      if (plan.name === 'Премиум') e.currentTarget.style.background = '#0F766E'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#0D9488'
                    }}
                  >
                    Оформить абонемент
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <WaveDivider fill="#0F172A" />

      {/* ═══════ Single Visit Prices ═══════ */}
      <section className="bg-ocean-deep py-section-desktop mobile:py-section-mobile">
        <div className="mx-auto max-w-[800px] px-content-pad mobile:px-content-pad-mobile">
          <div className="prices-section-title text-center">
            <h2 className="font-montserrat text-[48px] font-bold tracking-[-0.01em] text-white mobile:text-[32px]">
              Разовое посещение
            </h2>
            <p className="mx-auto mt-3 max-w-[500px] font-inter text-[18px] text-white/70">
              Оплатите одно посещение или приобретите пакет
            </p>
          </div>

          <div
            className="price-table-container mt-12 overflow-hidden rounded-card"
            style={{
              background: 'rgba(15, 23, 42, 0.35)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <table className="price-table w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-6 py-4 text-left font-montserrat text-[14px] font-semibold uppercase tracking-[0.04em] text-white">
                    Категория
                  </th>
                  <th className="px-6 py-4 text-right font-montserrat text-[14px] font-semibold uppercase tracking-[0.04em] text-white">
                    1 посещение
                  </th>
                  <th className="px-6 py-4 text-right font-montserrat text-[14px] font-semibold uppercase tracking-[0.04em] text-white">
                    4 посещения
                  </th>
                  <th className="px-6 py-4 text-right font-montserrat text-[14px] font-semibold uppercase tracking-[0.04em] text-white">
                    8 посещений
                  </th>
                  <th className="px-6 py-4 text-right font-montserrat text-[14px] font-semibold uppercase tracking-[0.04em] text-white">
                    12 посещений
                  </th>
                </tr>
              </thead>
              <tbody>
                {singleVisitPrices.map((row, ri) => (
                  <tr
                    key={row.category}
                    className="price-table-row transition-colors hover:bg-white/5"
                    style={{ background: ri % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                  >
                    <td className="px-6 py-4 font-inter text-[15px] font-medium text-white">
                      {row.category}
                    </td>
                    {row.visits.map((v, ci) => (
                      <td
                        key={ci}
                        className="px-6 py-4 text-right font-inter text-[15px]"
                        style={{
                          color: ci === row.highlightIdx ? '#22D3EE' : 'rgba(255,255,255,0.8)',
                          fontWeight: ci === row.highlightIdx ? 600 : 400,
                        }}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-start gap-2">
            <Info size={16} className="mt-0.5 shrink-0 text-cyan-400" />
            <p className="font-inter text-[13px] leading-relaxed text-white/60">
              Студентам и пенсионерам необходимо предъявить соответствующий документ. Семейный абонемент действует на 2 взрослых и 1 ребенка до 14 лет.
            </p>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ═══════ Additional Services ═══════ */}
      <section className="bg-mist-white pt-section-desktop mobile:pt-section-mobile">
        <div className="mx-auto max-w-[800px] px-content-pad mobile:px-content-pad-mobile">
          <div className="prices-section-title text-center">
            <h2 className="font-montserrat text-[40px] font-bold text-ocean-deep mobile:text-[28px]">
              Дополнительные услуги
            </h2>
          </div>

          <div className="add-services-list mt-10">
            {additionalServices.map((s) => (
              <div
                key={s.name}
                className="add-service-item flex items-center justify-between border-b py-6"
                style={{ borderColor: 'rgba(15,23,42,0.08)' }}
              >
                <div>
                  <h4 className="font-montserrat text-[18px] font-semibold text-ocean-deep">
                    {s.name}
                  </h4>
                  <p className="mt-1 font-inter text-[14px] text-slate-400">
                    {s.description}
                  </p>
                </div>
                <span className="shrink-0 pl-6 font-montserrat text-[20px] font-bold text-teal-600">
                  {s.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Family Discount Banner ═══════ */}
      <section className="bg-mist-white py-12">
        <div className="mx-auto max-w-[800px] px-content-pad mobile:px-content-pad-mobile">
          <div
            className="family-discount flex items-center gap-6 rounded-card p-8 mobile:flex-col mobile:text-center"
            style={{ background: 'linear-gradient(135deg, #E6D5B8 0%, #FF6B6B 40%, #FFB088 100%)' }}
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Users size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-montserrat text-[24px] font-bold text-white mobile:text-[20px]">
                Семейная скидка
              </h3>
              <p className="mt-2 font-inter text-[16px] text-white/90 leading-relaxed">
                При одновременном оформлении двух и более абонементов — скидка <strong>10%</strong> на каждый.
                Семейный абонемент на 12 посещений для 2 взрослых и 1 ребенка до 14 лет — всего <strong>10 000 ₽</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ Accordion ═══════ */}
      <section className="bg-mist-white pb-section-desktop mobile:pb-section-mobile">
        <div className="mx-auto max-w-[800px] px-content-pad mobile:px-content-pad-mobile">
          <div className="prices-section-title text-center">
            <h2 className="font-montserrat text-[40px] font-bold text-ocean-deep mobile:text-[28px]">
              Частые вопросы
            </h2>
          </div>

          <div className="faq-list mt-10">
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className="faq-item border-b"
                  style={{ borderColor: 'rgba(15,23,42,0.08)' }}
                >
                  <button
                    className="flex w-full items-center justify-between py-5 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span className="font-montserrat text-[17px] font-semibold text-ocean-deep pr-4">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className="shrink-0 text-teal-600 transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? '300px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="pb-5 font-inter text-[15px] leading-relaxed text-slate-700">
                      {item.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <WaveDivider fill="#0F172A" />

      {/* ═══════ CTA ═══════ */}
      <section
        className="prices-cta relative py-section-desktop mobile:py-section-mobile"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)' }}
      >
        <div className="prices-cta-content relative z-10 mx-auto max-w-content px-content-pad text-center mobile:px-content-pad-mobile">
          <h2 className="font-montserrat text-[48px] font-bold text-white mobile:text-[32px]">
            Остались вопросы?
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] font-inter text-[18px] text-white/85">
            Наши администраторы помогут выбрать оптимальный тариф
          </p>
          <Link
            to="/contacts"
            className="mt-8 inline-block rounded-button bg-coral px-8 py-4 font-montserrat text-[16px] font-bold text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] active:scale-[0.97]"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  )
}
