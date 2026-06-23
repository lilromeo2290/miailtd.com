'use client'

import { Badge } from '@/components/ui/badge'
import { Building2, Briefcase, Calendar } from 'lucide-react'

interface ClientProject {
  client: string
  description: string
  year: string
}

const clientData: ClientProject[] = [
  {
    client: 'Rollider Co. Ltd',
    description: 'Construction of weighing bridge, maintenance garage, paving of internal roads and fencing entire compound (Kpone).',
    year: '2012 – 2013',
  },
  {
    client: 'MPS',
    description: 'Devanning Container Terminal (Earth works) at Kpone.',
    year: '2016 – 2019',
  },
  {
    client: 'Toyota Ghana Ltd / Battis Company Ltd',
    description: 'Clearing and excavation before the main building. Paving of the entire premises (Tema).',
    year: '2017 – 2019',
  },
  {
    client: 'Nutrifiod Ghana Ltd',
    description: 'Filling and construction of roads (Tema).',
    year: '2020',
  },
  {
    client: 'Chemi-Tech Company Ltd (Quantum Oil Depot)',
    description: 'Earth works and construction of roads and fuel loading Bay (Kpone).',
    year: '2019 – 2021',
  },
  {
    client: 'Continental Blue Investment Gh Ltd.',
    description: 'Earth works before the building of main structure within the factory yard. Construction of bridges, coverts and access roads (Tema Free Zone).',
    year: '2017 – 2022',
  },
  {
    client: 'Lesico Ghana Ltd',
    description: 'Rental of heavy duty equipments for the rehabilitation of water projects from Dabala to Anloga.',
    year: '2022 – Ongoing',
  },
  {
    client: 'Fabrimetal Ghana Ltd',
    description: 'All Earth works for factory expansion (Tsopoli).',
    year: '2022 – Ongoing',
  },
  {
    client: 'Golden Exotics Ltd',
    description: 'Construction of canal within the farmland (Asutsuare). Rehabilitation of farmland roads. Filling and compaction of Parkhouse, chemical and Canteen areas. Maintenance of all major roads within the farm area and surrounding town (Torgorme).',
    year: '2021 – Ongoing',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-navy relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,1) 20px,
              rgba(255,255,255,1) 21px
            )`,
          }}
        />
      </div>

      {/* Top divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-safety-orange font-semibold text-sm uppercase tracking-wider">Our Track Record</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
            Clients and Descriptions
          </h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">
            We take pride in building lasting relationships with our clients through consistent delivery and exceptional results.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-safety-orange/10">
                  <th className="text-left px-6 py-4 text-safety-orange font-semibold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Client
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-safety-orange font-semibold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Description of Work
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-safety-orange font-semibold text-sm uppercase tracking-wider w-40">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Year
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientData.map((item, i) => (
                  <tr
                    key={i}
                    className={`border-t border-white/5 hover:bg-white/5 transition-colors ${
                      i % 2 === 0 ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold text-sm">{item.client}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className="border-white/10 text-white/60 text-xs"
                      >
                        {item.year}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {clientData.map((item, i) => (
            <div
              key={i}
              className="bg-navy-light border border-white/10 rounded-xl p-5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="text-white font-semibold text-sm">{item.client}</h4>
                <Badge
                  variant="outline"
                  className="border-white/10 text-white/60 text-xs shrink-0"
                >
                  {item.year}
                </Badge>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}