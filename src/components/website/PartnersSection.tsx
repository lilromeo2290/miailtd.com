'use client'

import { Building2, Landmark, Gem, Droplets, Factory, Route, Building, Wallet } from 'lucide-react'

interface Partner {
  name: string
  icon: React.ElementType
}

const partners: Partner[] = [
  { name: 'Ministry of Transport', icon: Landmark },
  { name: 'Urban Development Corp', icon: Building2 },
  { name: 'Mining Resources Ltd', icon: Gem },
  { name: 'Water Authority', icon: Droplets },
  { name: 'Industrial Corp', icon: Factory },
  { name: 'National Roads Authority', icon: Route },
  { name: 'Municipal Council', icon: Building },
  { name: 'Development Bank', icon: Wallet },
]

export default function PartnersSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-steel-grey font-semibold text-sm uppercase tracking-wider">Our Partners</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-3">
            Trusted by Leading Organizations
          </h2>
          <p className="text-steel-grey mt-3 max-w-xl mx-auto">
            We work with government agencies, private corporations, and international organizations to deliver world-class infrastructure projects.
          </p>
        </div>

        {/* Partners Grid - Horizontal scrollable on mobile, grid on desktop */}
        <div className="flex overflow-x-auto gap-4 lg:grid lg:grid-cols-4 lg:gap-6 pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide">
          {partners.map((partner) => {
            const Icon = partner.icon
            return (
              <div
                key={partner.name}
                className="flex-shrink-0 snap-start w-[200px] lg:w-auto"
              >
                <div className="bg-light-grey border border-concrete/50 rounded-xl p-6 flex flex-col items-center justify-center gap-3 h-full min-h-[140px] group hover:border-safety-orange/30 hover:bg-safety-orange/5 transition-all duration-300 cursor-default">
                  {/* Icon placeholder for logo */}
                  <div className="w-14 h-14 rounded-full bg-concrete/70 flex items-center justify-center group-hover:bg-safety-orange/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-steel-grey group-hover:text-safety-orange transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-medium text-navy/70 group-hover:text-navy text-center transition-colors duration-300 leading-tight">
                    {partner.name}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hide scrollbar utility */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
