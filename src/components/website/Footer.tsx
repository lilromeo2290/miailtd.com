'use client'

import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react'
import { useNavigation } from '@/lib/store'

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
  const handleNav = (page: 'services' | 'equipment' | 'projects' | 'quote' | 'careers' | 'hse' | 'about' | 'contact') => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }


  return (
    <footer className="bg-navy text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.jpg"
                alt="Miai Ltd"
                className="w-10 h-10 object-contain rounded-lg brightness-0 invert"
              />
              <div>
                <div className="text-lg font-bold text-white leading-tight">Miai Ltd</div>
                <div className="text-[10px] text-white/50 tracking-wider uppercase">Company</div>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Committed to providing new standards in construction, equipment rentals, and farming services within our catchment areas and beyond.
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
                <span>P.O. Box KIA 9709 Airport, Accra<br />Dawhenya off Accra to Aflao Rd</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-safety-orange shrink-0" />
                <span>024 479 2082 / 024 107 9080</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-safety-orange shrink-0" />
                <span>miailtd21@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-safety-orange shrink-0" />
                <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
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