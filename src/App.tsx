import { Routes, Route } from 'react-router'
import { ThemeProvider } from './context/ThemeContext'
import ThemeInjector from './components/ThemeInjector'
import ThemeWrapper from './components/ThemeWrapper'
import ThemeSwitcher from './components/ThemeSwitcher'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Schedule from './pages/Schedule'
import Prices from './pages/Prices'
import Gallery from './pages/Gallery'
import Contacts from './pages/Contacts'

export default function App() {
  return (
    <ThemeProvider>
      <ThemeInjector />
      <ThemeWrapper>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contacts" element={<Contacts />} />
          </Route>
        </Routes>
      </ThemeWrapper>
      <ThemeSwitcher />
    </ThemeProvider>
  )
}
