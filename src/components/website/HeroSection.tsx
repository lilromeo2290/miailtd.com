'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/lib/store'
import { ChevronRight, Play } from 'lucide-react'

export default function HeroSection() {
  const { setPage } = useNavigation()
  const [offset, setOffset] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Track mount status to trigger entrance animations
  useEffect(() => {
    const id = requestAnimationFrame(() => setIsMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollPercent = Math.max(0, -rect.top / 5)
        setOffset(scrollPercent)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (page: 'quote' | 'equipment' | 'contact') => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&q=80')`,
          transform: `translateY(${offset}px) scale(1.1)`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="hero-overlay absolute inset-0 z-[1]" />

      {/* Animated diagonal pattern overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,1) 35px,
            rgba(255,255,255,1) 36px
          )`,
          animation: 'patternScroll 20s linear infinite',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-safety-orange/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + i * 0.7}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <span className="inline-flex items-center gap-2 bg-safety-orange/20 border border-safety-orange/40 text-safety-orange px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Play className="w-3.5 h-3.5 fill-current" />
              Trusted Since 1998 — Building Infrastructure Excellence
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 transition-all duration-700 delay-100 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Building Tomorrow&apos;s{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety-orange to-amber-400">
              Infrastructure
            </span>{' '}
            Today
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg sm:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Expert road construction, earthworks, and heavy equipment rental services delivering excellence across the region. From highway projects to mining support — we build with precision.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Button
              size="lg"
              onClick={() => handleNav('quote')}
              className="cta-gradient text-white border-0 text-base px-8 py-6 group"
            >
              Request a Quote
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNav('equipment')}
              className="border-white/40 text-white hover:bg-white/15 hover:text-white text-base px-8 py-6 backdrop-blur-sm"
            >
              Rent Equipment
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNav('contact')}
              className="border-white/40 text-white hover:bg-white/15 hover:text-white text-base px-8 py-6 backdrop-blur-sm"
            >
              Contact Us
            </Button>
          </div>

          {/* Trust indicators */}
          <div
            className={`mt-12 flex flex-wrap items-center gap-6 text-white/50 text-sm transition-all duration-700 delay-500 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Licensed &amp; Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-safety-orange rounded-full" />
              <span>ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>24/7 Equipment Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[3]" />

      {/* Inline keyframes for animation */}
      <style jsx>{`
        @keyframes patternScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(36px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}
