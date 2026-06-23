'use client'

import { Button } from '@/components/ui/button'
import { useNavigation } from '@/lib/store'
import { Phone, ArrowRight, Clock, CheckCircle } from 'lucide-react'

export default function HomeCTASection() {
  const { setPage } = useNavigation()

  const handleNav = (page: 'quote' | 'contact') => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-safety-orange via-safety-orange-dark to-orange-700" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,1) 40px,
              rgba(255,255,255,1) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,1) 40px,
              rgba(255,255,255,1) 41px
            )`,
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/20 rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-white/20 rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-white/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Start Your{' '}
              <span className="text-white/80">Next Project?</span>
            </h2>
            <p className="text-white/80 mt-4 text-lg leading-relaxed">
              Whether you need road construction, earthworks, or heavy equipment rental, our team is ready to deliver. Get in touch today for a free consultation and competitive quote.
            </p>

            {/* Quick highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Free Site Assessment</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Competitive Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 items-stretch shrink-0">
            {/* Request Quote Button */}
            <Button
              size="lg"
              onClick={() => handleNav('quote')}
              className="bg-white text-safety-orange-dark hover:bg-white/90 text-base px-8 py-6 font-semibold group w-full sm:w-auto lg:w-full"
            >
              Request a Free Quote
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Call Us Card */}
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-safety-orange-dark" />
                </div>
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wider">Call Us Now</p>
                  <a
                    href="tel:+15551234567"
                    className="text-white text-xl font-bold hover:text-white/90 transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Mon - Fri: 7:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
