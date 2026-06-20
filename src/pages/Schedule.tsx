import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import {
  Info,
  Phone,
  MessageCircle,
  CalendarDays,
  ArrowRight,
  Download,
} from 'lucide-react'
import WaveDivider from '@/components/WaveDivider'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const
type Day = (typeof days)[number]

interface ScheduleItem {
  day: Day
  time: string
  program: string
  instructor: string
  level: string
  lane: string
  type: 'swimming' | 'aqua' | 'kids' | 'polo' | 'personal' | 'closed'
}

const scheduleData: ScheduleItem[] = [
  /* Monday */
  { day: 'Пн', time: '7:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Пн', time: '8:00', program: 'Взрослая группа', instructor: 'А. Петров', level: 'Средний', lane: '1–3', type: 'polo' },
  { day: 'Пн', time: '10:00', program: 'Аквааэробика', instructor: 'И. Смирнова', level: 'Все', lane: '4–6', type: 'aqua' },
  { day: 'Пн', time: '12:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Пн', time: '14:00', program: 'Дети 6–8 лет', instructor: 'М. Кузнецова', level: 'Начальный', lane: '1–2', type: 'kids' },
  { day: 'Пн', time: '16:00', program: 'Дети 9–12 лет', instructor: 'М. Кузнецова', level: 'Средний', lane: '3–4', type: 'kids' },
  { day: 'Пн', time: '18:00', program: 'Взрослая группа', instructor: 'А. Петров', level: 'Продвинутый', lane: '1–3', type: 'polo' },
  { day: 'Пн', time: '20:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  /* Tuesday */
  { day: 'Вт', time: '7:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Вт', time: '9:00', program: 'Аквааэробика', instructor: 'И. Смирнова', level: 'Все', lane: '4–6', type: 'aqua' },
  { day: 'Вт', time: '11:00', program: 'Перс. тренинг', instructor: 'По записи', level: 'Все', lane: '1', type: 'personal' },
  { day: 'Вт', time: '13:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Вт', time: '15:00', program: 'Дети 6–8 лет', instructor: 'М. Кузнецова', level: 'Начальный', lane: '1–2', type: 'kids' },
  { day: 'Вт', time: '17:00', program: 'Дети 13–16 лет', instructor: 'А. Петров', level: 'Средний', lane: '3–4', type: 'kids' },
  { day: 'Вт', time: '19:00', program: 'Водное поло', instructor: 'С. Иванов', level: 'Все', lane: '1–6', type: 'polo' },
  { day: 'Вт', time: '21:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  /* Wednesday */
  { day: 'Ср', time: '7:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Ср', time: '8:30', program: 'Взрослая группа', instructor: 'А. Петров', level: 'Средний', lane: '1–3', type: 'polo' },
  { day: 'Ср', time: '10:00', program: 'Аквааэробика', instructor: 'И. Смирнова', level: 'Все', lane: '4–6', type: 'aqua' },
  { day: 'Ср', time: '12:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Ср', time: '14:00', program: 'Чистка бассейна', instructor: '—', level: '—', lane: '—', type: 'closed' },
  { day: 'Ср', time: '16:00', program: 'Дети 6–8 лет', instructor: 'М. Кузнецова', level: 'Начальный', lane: '1–2', type: 'kids' },
  { day: 'Ср', time: '18:00', program: 'Взрослая группа', instructor: 'А. Петров', level: 'Продвинутый', lane: '1–3', type: 'polo' },
  { day: 'Ср', time: '20:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  /* Thursday */
  { day: 'Чт', time: '7:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Чт', time: '9:00', program: 'Аквааэробика', instructor: 'И. Смирнова', level: 'Все', lane: '4–6', type: 'aqua' },
  { day: 'Чт', time: '11:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Чт', time: '13:00', program: 'Дети 9–12 лет', instructor: 'М. Кузнецова', level: 'Средний', lane: '1–2', type: 'kids' },
  { day: 'Чт', time: '15:00', program: 'Перс. тренинг', instructor: 'По записи', level: 'Все', lane: '1', type: 'personal' },
  { day: 'Чт', time: '17:00', program: 'Дети 13–16 лет', instructor: 'А. Петров', level: 'Средний', lane: '3–4', type: 'kids' },
  { day: 'Чт', time: '19:00', program: 'Водное поло', instructor: 'С. Иванов', level: 'Все', lane: '1–6', type: 'polo' },
  { day: 'Чт', time: '21:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  /* Friday */
  { day: 'Пт', time: '7:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Пт', time: '8:00', program: 'Взрослая группа', instructor: 'А. Петров', level: 'Средний', lane: '1–3', type: 'polo' },
  { day: 'Пт', time: '10:00', program: 'Аквааэробика', instructor: 'И. Смирнова', level: 'Все', lane: '4–6', type: 'aqua' },
  { day: 'Пт', time: '12:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Пт', time: '14:00', program: 'Дети 6–8 лет', instructor: 'М. Кузнецова', level: 'Начальный', lane: '1–2', type: 'kids' },
  { day: 'Пт', time: '16:00', program: 'Дети 9–12 лет', instructor: 'М. Кузнецова', level: 'Средний', lane: '3–4', type: 'kids' },
  { day: 'Пт', time: '18:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Пт', time: '20:00', program: 'Водное поло', instructor: 'С. Иванов', level: 'Все', lane: '1–6', type: 'polo' },
  /* Saturday */
  { day: 'Сб', time: '8:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Сб', time: '9:00', program: 'Дети 6–8 лет', instructor: 'М. Кузнецова', level: 'Начальный', lane: '1–2', type: 'kids' },
  { day: 'Сб', time: '10:00', program: 'Дети 9–12 лет', instructor: 'М. Кузнецова', level: 'Средний', lane: '3–4', type: 'kids' },
  { day: 'Сб', time: '11:00', program: 'Аквааэробика', instructor: 'И. Смирнова', level: 'Все', lane: '4–6', type: 'aqua' },
  { day: 'Сб', time: '13:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Сб', time: '15:00', program: 'Водное поло', instructor: 'С. Иванов', level: 'Все', lane: '1–6', type: 'polo' },
  { day: 'Сб', time: '17:00', program: 'Взрослая группа', instructor: 'А. Петров', level: 'Средний', lane: '1–3', type: 'polo' },
  { day: 'Сб', time: '19:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  /* Sunday */
  { day: 'Вс', time: '8:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Вс', time: '9:00', program: 'Дети 6–8 лет', instructor: 'М. Кузнецова', level: 'Начальный', lane: '1–2', type: 'kids' },
  { day: 'Вс', time: '10:00', program: 'Аквааэробика', instructor: 'И. Смирнова', level: 'Все', lane: '4–6', type: 'aqua' },
  { day: 'Вс', time: '12:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Вс', time: '14:00', program: 'Дети 9–12 лет', instructor: 'М. Кузнецова', level: 'Средний', lane: '3–4', type: 'kids' },
  { day: 'Вс', time: '16:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
  { day: 'Вс', time: '18:00', program: 'Взрослая группа', instructor: 'А. Петров', level: 'Все', lane: '1–3', type: 'polo' },
  { day: 'Вс', time: '20:00', program: 'Свободное плавание', instructor: '—', level: 'Все', lane: '1–6', type: 'swimming' },
]

const typeStyles: Record<string, { bg: string; border: string; label: string }> = {
  swimming: { bg: 'rgba(34,211,238,0.15)', border: '#22D3EE', label: 'Свободное плавание' },
  aqua:     { bg: 'rgba(230,213,184,0.4)', border: '#D4A574', label: 'Аквааэробика' },
  kids:     { bg: 'rgba(255,107,107,0.15)', border: '#FF6B6B', label: 'Детские группы' },
  polo:     { bg: 'rgba(13,148,136,0.15)', border: '#0D9488', label: 'Взрослые группы' },
  personal: { bg: 'rgba(15,23,42,0.1)', border: '#0F172A', label: 'Перс. тренинг' },
  closed:   { bg: 'rgba(148,163,184,0.15)', border: '#94A3B8', label: 'Закрыто' },
}

const legendItems = [
  { color: '#22D3EE', label: 'Свободное плавание' },
  { color: '#FF6B6B', label: 'Детские группы' },
  { color: '#0D9488', label: 'Взрослые группы' },
  { color: '#D4A574', label: 'Аквааэробика' },
  { color: '#94A3B8', label: 'Закрыто' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<Day>('Пн')
  const heroRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const legendRef = useRef<HTMLDivElement>(null)
  const bookingRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const filtered = scheduleData.filter((s) => s.day === activeDay)

  /* GSAP animations */
  useGSAP(() => {
    /* Hero entrance */
    gsap.from('.sch-hero-title', {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
    })
    gsap.from('.sch-hero-sub', {
      y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.4,
    })
    gsap.from('.sch-hero-breadcrumb', {
      y: 20, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.1,
    })

    /* Filter bar */
    gsap.from(filterRef.current, {
      y: -20, opacity: 0, duration: 0.4, ease: 'power2.out', delay: 0.6,
    })

    /* Scroll-triggered sections */
    const scrollSections = [
      { el: tableRef.current, cls: '.sch-fade-up' },
      { el: legendRef.current, cls: '.sch-fade-up' },
      { el: bookingRef.current, cls: '.sch-step' },
      { el: ctaRef.current, cls: '.sch-fade-up' },
    ]

    scrollSections.forEach(({ el, cls }) => {
      if (!el) return
      gsap.from(el.querySelectorAll(cls), {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })
    })

    /* Booking steps special animation */
    if (bookingRef.current) {
      gsap.from('.sch-step-circle', {
        scale: 0.5, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: bookingRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.sch-step-line', {
        scaleX: 0, duration: 0.4, stagger: 0.2, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: bookingRef.current, start: 'top 80%', once: true },
      })
    }
  }, { scope: heroRef })

  return (
    <div className="flex flex-col" ref={heroRef}>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[50vh] flex flex-col md:flex-row">
        {/* Left gradient panel */}
        <div
          className="relative flex flex-1 items-center justify-center md:justify-end"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)' }}
        >
          <div className="relative z-10 max-w-[600px] px-6 py-16 md:px-12 md:py-0">
            <div className="sch-hero-breadcrumb font-inter text-[14px] tracking-[0.04em] text-white/60 mb-4">
              Главная / Расписание
            </div>
            <h1 className="sch-hero-title font-montserrat text-[48px] md:text-[64px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
              Расписание
            </h1>
            <p className="sch-hero-sub mt-4 font-inter text-[18px] leading-[1.6] text-white/85 max-w-[480px]">
              Спланируйте свое посещение заранее
            </p>
          </div>
        </div>

        {/* Right image panel */}
        <div className="relative hidden md:block flex-1">
          <img
            src="/pool-detail-5.jpg"
            alt="Pool at golden hour"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ========== STICKY FILTER BAR ========== */}
      <div
        ref={filterRef}
        className="sticky top-[72px] z-40 bg-white border-b"
        style={{ borderColor: 'rgba(15,23,42,0.08)' }}
      >
        <div className="mx-auto flex max-w-content flex-col gap-3 px-content-pad py-5 md:flex-row md:items-center md:justify-between mobile:px-content-pad-mobile">
          {/* Day pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className="shrink-0 rounded-pill px-5 py-2.5 font-montserrat text-[14px] font-medium transition-all duration-200"
                style={{
                  background: d === activeDay ? '#0D9488' : 'rgba(15,23,42,0.05)',
                  color: d === activeDay ? '#fff' : '#334155',
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Download PDF */}
          <button
            className="hidden md:flex items-center gap-2 rounded-button border border-ocean-deep/10 px-5 py-2.5 font-montserrat text-[14px] font-medium text-slate-700 transition-all duration-200 hover:bg-ocean-deep/5"
          >
            <Download size={16} />
            Скачать PDF
          </button>
        </div>
      </div>

      {/* ========== SCHEDULE TABLE ========== */}
      <section className="bg-mist-white py-12 pb-section-desktop mobile:pb-section-mobile" ref={tableRef}>
        <div className="mx-auto max-w-content px-content-pad mobile:px-content-pad-mobile">
          {/* Desktop table */}
          <div className="hidden md:block sch-fade-up">
            <div className="overflow-hidden rounded-card shadow-card">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-ocean-deep">
                    <th className="px-6 py-4 text-left font-montserrat text-[14px] font-semibold text-white w-[100px]">
                      Время
                    </th>
                    <th className="px-6 py-4 text-left font-montserrat text-[14px] font-semibold text-white">
                      Программа
                    </th>
                    <th className="px-6 py-4 text-left font-montserrat text-[14px] font-semibold text-white">
                      Инструктор
                    </th>
                    <th className="px-6 py-4 text-left font-montserrat text-[14px] font-semibold text-white">
                      Уровень
                    </th>
                    <th className="px-6 py-4 text-left font-montserrat text-[14px] font-semibold text-white">
                      Дорожка
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => {
                    const style = typeStyles[item.type]
                    return (
                      <tr
                        key={`${item.day}-${item.time}-${i}`}
                        className="transition-all duration-200 hover:brightness-95"
                        style={{ background: i % 2 === 0 ? '#fff' : 'rgba(248,250,252,0.7)' }}
                      >
                        <td className="px-6 py-4">
                          <div
                            className="inline-block rounded px-3 py-1 font-inter text-[13px] font-medium"
                            style={{
                              background: `${style.border}20`,
                              color: style.border,
                            }}
                          >
                            {item.time}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className="inline-block rounded-lg px-4 py-2 font-inter text-[13px] font-medium"
                            style={{
                              background: style.bg,
                              borderLeft: `3px solid ${style.border}`,
                              color: item.type === 'closed' ? '#94A3B8' : '#0F172A',
                              textDecoration: item.type === 'closed' ? 'line-through' : 'none',
                            }}
                          >
                            {item.program}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-inter text-[14px] text-slate-700">
                          {item.instructor}
                        </td>
                        <td className="px-6 py-4 font-inter text-[14px] text-slate-700">
                          {item.level}
                        </td>
                        <td className="px-6 py-4 font-inter text-[14px] text-slate-700">
                          {item.lane}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-3 sch-fade-up">
            {filtered.map((item, i) => {
              const style = typeStyles[item.type]
              return (
                <div
                  key={`mob-${item.day}-${item.time}-${i}`}
                  className="rounded-card p-5 shadow-card"
                  style={{ background: '#fff', borderLeft: `4px solid ${style.border}` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="rounded px-3 py-1 font-inter text-[13px] font-medium"
                      style={{ background: `${style.border}20`, color: style.border }}
                    >
                      {item.time}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 font-inter text-[12px] font-medium"
                      style={{ background: style.bg, color: style.border }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <h4
                    className="font-inter text-[15px] font-medium"
                    style={{
                      color: item.type === 'closed' ? '#94A3B8' : '#0F172A',
                      textDecoration: item.type === 'closed' ? 'line-through' : 'none',
                    }}
                  >
                    {item.program}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2 font-inter text-[13px] text-slate-500">
                    {item.instructor !== '—' && (
                      <span>Тренер: {item.instructor}</span>
                    )}
                    {item.level !== '—' && (
                      <span>Уровень: {item.level}</span>
                    )}
                    {item.lane !== '—' && (
                      <span>Дорожки: {item.lane}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ========== LEGEND & INFO ========== */}
      <section className="bg-mist-white pb-section-desktop mobile:pb-section-mobile" ref={legendRef}>
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-content-pad md:grid-cols-2 mobile:px-content-pad-mobile">
          {/* Color legend */}
          <div className="sch-fade-up">
            <h3 className="font-montserrat text-[32px] font-semibold leading-[1.2] text-ocean-deep">
              Обозначения
            </h3>
            <div className="mt-6 flex flex-wrap gap-4">
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: item.color }}
                  />
                  <span className="font-inter text-[14px] text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div
            className="sch-fade-up rounded-card p-6"
            style={{ background: 'rgba(13,148,136,0.08)' }}
          >
            <Info size={24} className="text-teal-600 mb-3" />
            <p className="font-inter text-[15px] leading-[1.65] text-slate-700">
              Расписание может изменяться. Рекомендуем уточнять актуальное расписание по телефону{' '}
              <a href="tel:+74212000000" className="text-teal-600 font-medium hover:underline">
                +7 (4212) 00-00-00
              </a>{' '}
              или в reception бассейна.
            </p>
          </div>
        </div>
      </section>

      <WaveDivider fill="#0F172A" />

      {/* ========== BOOKING GUIDE ========== */}
      <section
        ref={bookingRef}
        className="bg-ocean-deep py-section-desktop mobile:py-section-mobile"
      >
        <div className="mx-auto max-w-[1000px] px-content-pad mobile:px-content-pad-mobile">
          <h2 className="sch-fade-up font-montserrat text-[36px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.01em] text-white text-center mb-16">
            Как записаться
          </h2>

          {/* 3 steps */}
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {/* Connecting lines - desktop */}
            <div className="hidden md:block absolute top-7 left-[20%] right-[20%] h-px">
              <div
                className="sch-step-line h-full w-full"
                style={{ background: 'rgba(255,255,255,0.15)', transformOrigin: 'left' }}
              />
            </div>

            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center sch-step">
              <div
                className="sch-step-circle flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg, #E6D5B8 0%, #FF6B6B 40%, #FFB088 100%)' }}
              >
                <span className="font-montserrat text-[24px] font-extrabold text-white">1</span>
              </div>
              <h4 className="mt-5 font-montserrat text-[20px] font-semibold text-white">
                Выберите занятие
              </h4>
              <p className="mt-2 font-inter text-[16px] leading-[1.65] text-white/75 max-w-[280px]">
                Ознакомьтесь с расписанием и выберите подходящее время и программу.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center sch-step">
              <div
                className="sch-step-circle flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg, #E6D5B8 0%, #FF6B6B 40%, #FFB088 100%)' }}
              >
                <span className="font-montserrat text-[24px] font-extrabold text-white">2</span>
              </div>
              <h4 className="mt-5 font-montserrat text-[20px] font-semibold text-white">
                Позвоните или напишите
              </h4>
              <p className="mt-2 font-inter text-[16px] leading-[1.65] text-white/75 max-w-[280px]">
                Свяжитесь с нами по телефону, через WhatsApp или заполните форму на сайте.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center sch-step">
              <div
                className="sch-step-circle flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg, #E6D5B8 0%, #FF6B6B 40%, #FFB088 100%)' }}
              >
                <span className="font-montserrat text-[24px] font-extrabold text-white">3</span>
              </div>
              <h4 className="mt-5 font-montserrat text-[20px] font-semibold text-white">
                Приходите на занятие
              </h4>
              <p className="mt-2 font-inter text-[16px] leading-[1.65] text-white/75 max-w-[280px]">
                Получите подтверждение записи. Приходите за 15 минут до начала занятия.
              </p>
            </div>
          </div>

          {/* Contact buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sch-fade-up">
            <a
              href="tel:+74212000000"
              className="inline-flex items-center gap-2 rounded-button bg-coral px-8 py-3.5 font-montserrat text-[16px] font-bold tracking-[0.02em] text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] hover:shadow-[0_6px_24px_rgba(255,107,107,0.45)] active:scale-[0.97]"
            >
              <Phone size={18} />
              Позвонить
            </a>
            <a
              href="https://wa.me/74212000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-button bg-teal-600 px-8 py-3.5 font-montserrat text-[16px] font-bold tracking-[0.02em] text-white transition-all duration-300 hover:bg-teal-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-button border-2 border-white/40 px-8 py-3 font-montserrat text-[16px] font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-[0.98]"
            >
              <CalendarDays size={18} />
              Онлайн-запись
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F8FAFC" />

      {/* ========== CTA ========== */}
      <section className="bg-mist-white py-section-desktop mobile:py-section-mobile" ref={ctaRef}>
        <div className="mx-auto max-w-[700px] px-content-pad text-center mobile:px-content-pad-mobile">
          <h2 className="sch-fade-up font-montserrat text-[36px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.01em] text-ocean-deep">
            Увидимся в бассейне!
          </h2>
          <p className="sch-fade-up mt-4 font-inter text-[18px] leading-[1.6] text-slate-700">
            Ежедневно с 7:00 до 22:00. Без выходных.
          </p>
          <div className="sch-fade-up mt-8">
            <Link
              to="/prices"
              className="inline-flex items-center gap-2 rounded-button bg-coral px-8 py-4 font-montserrat text-[16px] font-bold tracking-[0.02em] text-white shadow-button transition-all duration-300 hover:bg-coral-light hover:scale-[1.03] hover:shadow-[0_6px_24px_rgba(255,107,107,0.45)] active:scale-[0.97]"
            >
              Посмотреть цены
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
