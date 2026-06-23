'use client'

import { Building2 } from 'lucide-react'

const brands = [
  { name: 'Continental Blue Investment Gh. Ltd (CBI)', note: 'Producers of Supacem Cement' },
  { name: 'Kanauf Gh. Ltd', note: '' },
  { name: 'Lesico Ghana Ltd', note: '' },
  { name: 'Golden Exotics Ltd', note: '' },
  { name: 'Other Individuals', note: '' },
]

export default function PartnersSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-steel-grey font-semibold text-sm uppercase tracking-wider">Our Network</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-3">
            Other Notable Brands
          </h2>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-light-grey border border-concrete/50 rounded-xl p-6 flex items-center gap-4 hover:border-safety-orange/30 hover:bg-safety-orange/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-steel-grey" />
              </div>
              <div className="min-w-0">
                <h4 className="text-navy font-semibold text-sm leading-tight">{brand.name}</h4>
                {brand.note && (
                  <p className="text-safety-orange text-xs mt-1 font-medium">{brand.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}