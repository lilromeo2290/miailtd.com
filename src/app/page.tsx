'use client'

import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import HomeSection from '@/components/website/HomeSection'
import AboutSection from '@/components/website/AboutSection'
import ServicesSection from '@/components/website/ServicesSection'
import EquipmentSection from '@/components/website/EquipmentSection'
import ProjectsSection from '@/components/website/ProjectsSection'
import HSESection from '@/components/website/HSESection'
import NewsSection from '@/components/website/NewsSection'
import CareersSection from '@/components/website/CareersSection'
import QuoteSection from '@/components/website/QuoteSection'
import ContactSection from '@/components/website/ContactSection'
import { MessageCircle } from 'lucide-react'
import { useNavigation } from '@/lib/store'

export default function Home() {
  const { currentPage } = useNavigation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {currentPage === 'home' && <HomeSection />}
        {currentPage === 'about' && <AboutSection />}
        {currentPage === 'services' && <ServicesSection />}
        {currentPage === 'equipment' && <EquipmentSection />}
        {currentPage === 'projects' && <ProjectsSection />}
        {currentPage === 'hse' && <HSESection />}
        {currentPage === 'news' && <NewsSection />}
        {currentPage === 'careers' && <CareersSection />}
        {currentPage === 'quote' && <QuoteSection />}
        {currentPage === 'contact' && <ContactSection />}
      </main>
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  )
}