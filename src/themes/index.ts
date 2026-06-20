export type ThemeId = 'ocean' | 'family' | 'sport' | 'youth' | 'vip' | 'wellness' | 'kids' | 'tech' | 'eco' | 'urban'

export interface Theme {
  id: ThemeId
  name: string
  description: string
  audience: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textMuted: string
    gradient: string
    cardBg: string
    heroBg: string
    footerBg: string
    navBg: string
    border: string
    button: string
    buttonHover: string
    wave: string
  }
  fonts: {
    heading: string
    body: string
    headingUrl?: string
    bodyUrl?: string
  }
  radius: {
    card: string
    button: string
    image: string
  }
  shadows: {
    card: string
    button: string
    nav: string
  }
  style: 'rounded' | 'sharp' | 'pill'
  density: 'compact' | 'normal' | 'spacious'
  animation: 'smooth' | 'bouncy' | 'minimal'
}

export const themes: Record<ThemeId, Theme> = {
  ocean: {
    id: 'ocean',
    name: 'Ocean Premium',
    description: 'Премиальный океанический стиль с глубокими синими оттенками и коралловыми акцентами',
    audience: 'Премиальные клиенты',
    colors: {
      primary: '#0F172A',
      secondary: '#0D9488',
      accent: '#22D3EE',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#334155',
      textMuted: '#94A3B8',
      gradient: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #22D3EE 100%)',
      cardBg: '#FFFFFF',
      heroBg: '#0F172A',
      footerBg: '#0F172A',
      navBg: 'rgba(15, 23, 42, 0.85)',
      border: '#E2E8F0',
      button: '#FF6B6B',
      buttonHover: '#FF8585',
      wave: '#F8FAFC',
    },
    fonts: {
      heading: "'Montserrat Variable', sans-serif",
      body: "'Inter Variable', sans-serif",
    },
    radius: { card: '24px', button: '14px', image: '16px' },
    shadows: {
      card: '0 8px 32px rgba(15, 23, 42, 0.12)',
      button: '0 4px 16px rgba(255, 107, 107, 0.35)',
      nav: '0 2px 20px rgba(15, 23, 42, 0.08)',
    },
    style: 'rounded',
    density: 'normal',
    animation: 'smooth',
  },

  family: {
    id: 'family',
    name: 'Family Warm',
    description: 'Теплый и дружелюбный стиль для семей с детьми — мягкие формы и солнечные цвета',
    audience: 'Семьи с детьми',
    colors: {
      primary: '#FF8C42',
      secondary: '#FFD93D',
      accent: '#FF8C42',
      background: '#FFF8F0',
      surface: '#FFFFFF',
      text: '#5C4033',
      textMuted: '#A08060',
      gradient: 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 50%, #FFB347 100%)',
      cardBg: '#FFFFFF',
      heroBg: '#FF8C42',
      footerBg: '#5C4033',
      navBg: 'rgba(255, 140, 66, 0.9)',
      border: '#FFE4C4',
      button: '#FF8C42',
      buttonHover: '#FFA060',
      wave: '#FFF8F0',
    },
    fonts: {
      heading: "'Nunito', sans-serif",
      body: "'Nunito', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap',
    },
    radius: { card: '32px', button: '9999px', image: '24px' },
    shadows: {
      card: '0 12px 40px rgba(255, 140, 66, 0.15)',
      button: '0 6px 20px rgba(255, 140, 66, 0.35)',
      nav: '0 2px 20px rgba(255, 140, 66, 0.12)',
    },
    style: 'pill',
    density: 'spacious',
    animation: 'bouncy',
  },

  sport: {
    id: 'sport',
    name: 'Sport Pro',
    description: 'Спортивный стиль для атлетов — чёткие линии, агрессивные цвета, минимализм',
    audience: 'Профессиональные атлеты',
    colors: {
      primary: '#111827',
      secondary: '#DC2626',
      accent: '#DC2626',
      background: '#F3F4F6',
      surface: '#FFFFFF',
      text: '#111827',
      textMuted: '#9CA3AF',
      gradient: 'linear-gradient(135deg, #111827 0%, #DC2626 50%, #374151 100%)',
      cardBg: '#FFFFFF',
      heroBg: '#111827',
      footerBg: '#111827',
      navBg: 'rgba(17, 24, 39, 0.95)',
      border: '#D1D5DB',
      button: '#DC2626',
      buttonHover: '#B91C1C',
      wave: '#F3F4F6',
    },
    fonts: {
      heading: "'Oswald', sans-serif",
      body: "'Roboto Condensed', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600;700&display=swap',
    },
    radius: { card: '4px', button: '2px', image: '0px' },
    shadows: {
      card: '0 2px 8px rgba(0, 0, 0, 0.15)',
      button: '0 2px 8px rgba(220, 38, 38, 0.4)',
      nav: '0 2px 10px rgba(0, 0, 0, 0.2)',
    },
    style: 'sharp',
    density: 'compact',
    animation: 'minimal',
  },

  youth: {
    id: 'youth',
    name: 'Youth Pop',
    description: 'Яркий стиль для молодёжи — неоновые градиенты, глассморфизм, смелая типографика',
    audience: 'Молодёжь 18-30',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#84CC16',
      background: '#0A0A0A',
      surface: 'rgba(255, 255, 255, 0.05)',
      text: '#FAFAFA',
      textMuted: '#A3A3A3',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #84CC16 100%)',
      cardBg: 'rgba(255, 255, 255, 0.07)',
      heroBg: '#0A0A0A',
      footerBg: '#0A0A0A',
      navBg: 'rgba(10, 10, 10, 0.8)',
      border: 'rgba(255, 255, 255, 0.1)',
      button: '#EC4899',
      buttonHover: '#F472B6',
      wave: '#0A0A0A',
    },
    fonts: {
      heading: "'Outfit', sans-serif",
      body: "'Space Grotesk', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
    },
    radius: { card: '20px', button: '9999px', image: '16px' },
    shadows: {
      card: '0 8px 32px rgba(139, 92, 246, 0.2), 0 0 60px rgba(236, 72, 153, 0.1)',
      button: '0 4px 20px rgba(236, 72, 153, 0.4), 0 0 20px rgba(236, 72, 153, 0.2)',
      nav: '0 2px 20px rgba(139, 92, 246, 0.15)',
    },
    style: 'pill',
    density: 'normal',
    animation: 'bouncy',
  },

  vip: {
    id: 'vip',
    name: 'VIP Luxury',
    description: 'Элитный стиль — чёрное золото, изысканные шрифты, тонкие линии',
    audience: 'VIP клиенты',
    colors: {
      primary: '#0A0A0A',
      secondary: '#064E3B',
      accent: '#D4AF37',
      background: '#0A0A0A',
      surface: '#141414',
      text: '#F5E6CC',
      textMuted: '#A08050',
      gradient: 'linear-gradient(135deg, #0A0A0A 0%, #064E3B 50%, #D4AF37 100%)',
      cardBg: '#141414',
      heroBg: '#0A0A0A',
      footerBg: '#050505',
      navBg: 'rgba(10, 10, 10, 0.9)',
      border: '#2A2A1A',
      button: '#D4AF37',
      buttonHover: '#E5C158',
      wave: '#0A0A0A',
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Lato', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600;700&display=swap',
    },
    radius: { card: '8px', button: '4px', image: '4px' },
    shadows: {
      card: '0 4px 24px rgba(212, 175, 55, 0.08)',
      button: '0 4px 16px rgba(212, 175, 55, 0.25)',
      nav: '0 2px 20px rgba(0, 0, 0, 0.3)',
    },
    style: 'sharp',
    density: 'spacious',
    animation: 'smooth',
  },

  wellness: {
    id: 'wellness',
    name: 'Wellness Spa',
    description: 'Умиротворяющий спа-стиль — природные оттенки, мягкие формы, дыхательные анимации',
    audience: 'Ценители здоровья',
    colors: {
      primary: '#86A697',
      secondary: '#C8B6DB',
      accent: '#E8B4B8',
      background: '#FAF7F2',
      surface: '#FFFFFF',
      text: '#4A4A48',
      textMuted: '#8B8B85',
      gradient: 'linear-gradient(135deg, #86A697 0%, #C8B6DB 50%, #E8B4B8 100%)',
      cardBg: '#FFFFFF',
      heroBg: '#86A697',
      footerBg: '#5A7A6A',
      navBg: 'rgba(134, 166, 151, 0.9)',
      border: '#E0DCD5',
      button: '#86A697',
      buttonHover: '#9ABAA8',
      wave: '#FAF7F2',
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Jost', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap',
    },
    radius: { card: '28px', button: '20px', image: '20px' },
    shadows: {
      card: '0 8px 32px rgba(134, 166, 151, 0.12)',
      button: '0 4px 16px rgba(134, 166, 151, 0.25)',
      nav: '0 2px 20px rgba(134, 166, 151, 0.1)',
    },
    style: 'rounded',
    density: 'spacious',
    animation: 'smooth',
  },

  kids: {
    id: 'kids',
    name: 'Kids Fun',
    description: 'Весёлый стиль для детей — радужные цвета, пузыри, игривые формы',
    audience: 'Дети 4-12 лет',
    colors: {
      primary: '#4ECDC4',
      secondary: '#FF6B6B',
      accent: '#FFE66D',
      background: '#F0F9FF',
      surface: '#FFFFFF',
      text: '#2D5016',
      textMuted: '#6B8E4E',
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #FF6B6B 33%, #FFE66D 66%, #95E1D3 100%)',
      cardBg: '#FFFFFF',
      heroBg: '#4ECDC4',
      footerBg: '#2D5A6B',
      navBg: 'rgba(78, 205, 196, 0.9)',
      border: '#C8F0EC',
      button: '#FF6B6B',
      buttonHover: '#FF8585',
      wave: '#F0F9FF',
    },
    fonts: {
      heading: "'Fredoka', sans-serif",
      body: "'Quicksand', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap',
    },
    radius: { card: '40px', button: '9999px', image: '32px' },
    shadows: {
      card: '0 12px 40px rgba(78, 205, 196, 0.15)',
      button: '0 6px 20px rgba(255, 107, 107, 0.3)',
      nav: '0 2px 20px rgba(78, 205, 196, 0.12)',
    },
    style: 'pill',
    density: 'spacious',
    animation: 'bouncy',
  },

  tech: {
    id: 'tech',
    name: 'Tech Future',
    description: 'Футуристичный технологичный стиль — неон, голографика, киберпанк',
    audience: 'Технологические энтузиасты',
    colors: {
      primary: '#0A0A1A',
      secondary: '#00F0FF',
      accent: '#B829F7',
      background: '#05050A',
      surface: '#0F0F1E',
      text: '#E0E0FF',
      textMuted: '#6B6B8D',
      gradient: 'linear-gradient(135deg, #0A0A1A 0%, #00F0FF 50%, #B829F7 100%)',
      cardBg: '#0F0F1E',
      heroBg: '#0A0A1A',
      footerBg: '#050510',
      navBg: 'rgba(10, 10, 26, 0.9)',
      border: 'rgba(0, 240, 255, 0.15)',
      button: '#00F0FF',
      buttonHover: '#33F3FF',
      wave: '#05050A',
    },
    fonts: {
      heading: "'Orbitron', sans-serif",
      body: "'Rajdhani', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap',
    },
    radius: { card: '12px', button: '6px', image: '8px' },
    shadows: {
      card: '0 0 40px rgba(0, 240, 255, 0.1), inset 0 0 20px rgba(0, 240, 255, 0.02)',
      button: '0 0 20px rgba(0, 240, 255, 0.4), 0 4px 12px rgba(0, 240, 255, 0.2)',
      nav: '0 0 30px rgba(0, 240, 255, 0.1)',
    },
    style: 'sharp',
    density: 'normal',
    animation: 'minimal',
  },

  eco: {
    id: 'eco',
    name: 'Eco Nature',
    description: 'Эко-стиль — природные текстуры, органичные формы, экологичность',
    audience: 'Экологически сознательные',
    colors: {
      primary: '#2D5016',
      secondary: '#7CB342',
      accent: '#87CEEB',
      background: '#F5F0E8',
      surface: '#FAFAF5',
      text: '#3E2723',
      textMuted: '#8B7355',
      gradient: 'linear-gradient(135deg, #2D5016 0%, #7CB342 50%, #87CEEB 100%)',
      cardBg: '#FAFAF5',
      heroBg: '#2D5016',
      footerBg: '#1E3A0F',
      navBg: 'rgba(45, 80, 22, 0.9)',
      border: '#D4CFC4',
      button: '#7CB342',
      buttonHover: '#8BC34A',
      wave: '#F5F0E8',
    },
    fonts: {
      heading: "'Merriweather', serif",
      body: "'Cabin', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap',
    },
    radius: { card: '24px', button: '16px', image: '20px' },
    shadows: {
      card: '0 8px 32px rgba(45, 80, 22, 0.08)',
      button: '0 4px 16px rgba(124, 179, 66, 0.25)',
      nav: '0 2px 20px rgba(45, 80, 22, 0.08)',
    },
    style: 'rounded',
    density: 'normal',
    animation: 'smooth',
  },

  urban: {
    id: 'urban',
    name: 'Urban Khabarovsk',
    description: 'Городской стиль Хабаровска — бетон, мосты, закаты на Амуре',
    audience: 'Горожане Хабаровска',
    colors: {
      primary: '#6B7280',
      secondary: '#3B82F6',
      accent: '#F97316',
      background: '#F9FAFB',
      surface: '#FFFFFF',
      text: '#1F2937',
      textMuted: '#9CA3AF',
      gradient: 'linear-gradient(135deg, #6B7280 0%, #3B82F6 50%, #F97316 100%)',
      cardBg: '#FFFFFF',
      heroBg: '#1F2937',
      footerBg: '#1F2937',
      navBg: 'rgba(31, 41, 55, 0.9)',
      border: '#E5E7EB',
      button: '#F97316',
      buttonHover: '#FB923C',
      wave: '#F9FAFB',
    },
    fonts: {
      heading: "'Raleway', sans-serif",
      body: "'Open Sans', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap',
    },
    radius: { card: '16px', button: '10px', image: '12px' },
    shadows: {
      card: '0 8px 32px rgba(0, 0, 0, 0.08)',
      button: '0 4px 16px rgba(249, 115, 22, 0.3)',
      nav: '0 2px 20px rgba(0, 0, 0, 0.06)',
    },
    style: 'rounded',
    density: 'normal',
    animation: 'smooth',
  },
}

export const themeList = Object.values(themes) as Theme[]

export const defaultThemeId: ThemeId = 'ocean'
