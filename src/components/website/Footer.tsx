'use client'

import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Youtube, ArrowRight, HardHat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigation } from '@/lib/store'
import { useState } from 'react'

const quickLinks = [
  { label: 'Road Construction', page: 'services' as const },
  { label: 'Equipment Rental', page: 'equipment' as const },
  { label: 'Our Projects', page: 'projects' as const },
  { label: 'Request a Quote', page: 'quote' as const },
  { label: 'Career Opportunities', page: 'careers' as const },
  { label: 'Health & Safety', page: 'hse' as const },
]

const serviceLinks = [
  'Road Construction',
  'Earthworks & Excavation',
  'Asphalt Paving',
  'Drainage Systems',
  'Land Grading',
  'Mining Support',
]

export default function Footer() {
  const { setPage } = useNavigation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNav = (page: 'services' | 'equipment' | 'projects' | 'quote' | 'careers' | 'hse' | 'about' | 'contact') => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-navy text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-safety-orange rounded-lg flex items-center justify-center">
                <HardHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white leading-tight">Miai Ltd</div>
                <div className="text-[10px] text-white/50 tracking-wider uppercase">Company</div>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Leading roads and earthworks construction company delivering reliable infrastructure solutions and heavy equipment rental services with over 25 years of industry experience.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-safety-orange transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className="text-sm text-white/60 hover:text-safety-orange transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNav('services')}
                    className="text-sm text-white/60 hover:text-safety-orange transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-safety-orange mt-0.5 shrink-0" />
                <span>1234 Industrial Boulevard,<br />Suite 500, Construction District</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-safety-orange shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-safety-orange shrink-0" />
                <span>info@miailtd.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-safety-orange shrink-0" />
                <span>Mon - Fri: 7:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-semibold text-sm">Subscribe to our Newsletter</h3>
              <p className="text-white/50 text-xs mt-0.5">Get the latest project updates and industry insights</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 w-full md:w-64 h-9 text-sm"
              />
              <Button type="submit" size="sm" className="cta-gradient text-white border-0 whitespace-nowrap">
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>&copy; {new Date().getFullYear()} Miai Ltd Company. All rights reserved.</span>
          <div className="flex gap-4">
            <button onClick={() => handleNav('contact')} className="hover:text-safety-orange transition-colors">Privacy Policy</button>
            <button onClick={() => handleNav('contact')} className="hover:text-safety-orange transition-colors">Terms & Conditions</button>
            <button onClick={() => handleNav('contact')} className="hover:text-safety-orange transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  )
}