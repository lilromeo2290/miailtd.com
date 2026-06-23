'use client'

import { useNavigation } from '@/lib/store'
import HeroSection from './HeroSection'
import ServicesPreview from './ServicesPreview'
import EquipmentPreview from './EquipmentPreview'
import PartnersSection from './PartnersSection'
import HomeCTASection from './HomeCTASection'

export default function HomeSection() {
  const { currentPage } = useNavigation()

  if (currentPage !== 'home') return null

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesPreview />
      <EquipmentPreview />
      <PartnersSection />
      <HomeCTASection />
    </main>
  )
}
