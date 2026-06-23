'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, Clock, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigation, type PageSection } from '@/lib/store'

const navItems: { label: string; page: PageSection; hasSubmenu?: boolean }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Services', page: 'services', hasSubmenu: true },
  { label: 'Equipment', page: 'equipment', hasSubmenu: true },
  { label: 'Projects', page: 'projects' },
  { label: 'HSE', page: 'hse' },
  { label: 'News', page: 'news' },
  { label: 'Careers', page: 'careers' },
]

export default function Header() {
  const { currentPage, setPage, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavigation()
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (page: PageSection) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    closeMobileMenu()
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy-dark text-white/80 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-safety-orange" />
              +1 (555) 123-4567
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-safety-orange" />
              info@miailtd.com
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-safety-orange" />
              Mon - Fri: 7:00 AM - 6:00 PM
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => handleNav('quote')} className="hover:text-safety-orange transition-colors">Request a Quote</button>
            <span className="text-white/30">|</span>
            <button onClick={() => handleNav('careers')} className="hover:text-safety-orange transition-colors">Careers</button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button onClick={() => handleNav('home')} className="flex items-center gap-3 group">
              <img
                src="/logo.jpg"
                alt="Miai Ltd"
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain rounded-lg"
              />
              <div className="hidden sm:block">
                <div className="text-lg lg:text-xl font-bold text-navy leading-tight">Miai Ltd</div>
                <div className="text-[10px] lg:text-xs text-steel-grey tracking-wider uppercase">Company</div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-light-grey ${
                    currentPage === item.page ? 'text-safety-orange' : 'text-navy/80 hover:text-navy'
                  }`}
                >
                  {item.label}
                  {item.hasSubmenu && <ChevronDown className="w-3.5 h-3.5 inline ml-0.5" />}
                  {currentPage === item.page && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-safety-orange rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => handleNav('contact')}
                className="border-navy text-navy hover:bg-navy hover:text-white"
              >
                Contact Us
              </Button>
              <Button
                onClick={() => handleNav('quote')}
                className="cta-gradient text-white border-0"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-navy hover:bg-light-grey rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-concrete shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? 'bg-safety-orange/10 text-safety-orange'
                      : 'text-navy/80 hover:bg-light-grey'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 space-y-2 border-t border-concrete">
                <Button
                  variant="outline"
                  onClick={() => handleNav('contact')}
                  className="w-full border-navy text-navy hover:bg-navy hover:text-white"
                >
                  Contact Us
                </Button>
                <Button
                  onClick={() => handleNav('quote')}
                  className="w-full cta-gradient text-white border-0"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}