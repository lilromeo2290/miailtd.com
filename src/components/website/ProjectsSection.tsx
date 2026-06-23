'use client'

import { Badge } from '@/components/ui/badge'
import { Building2, Briefcase, Calendar, MapPin, CheckCircle2, Clock } from 'lucide-react'

interface ProjectItem {
  client: string
  description: string
  year: string
  status: 'Completed' | 'Ongoing'
  location: string
}

const projectData: ProjectItem[] = [
  {
    client: 'Rollider Co. Ltd',
    description: 'Construction of weighing bridge, maintenance garage, paving of internal roads and fencing entire compound.',
    year: '2012 – 2013',
    status: 'Completed',
    location: 'Kpone',
  },
  {
    client: 'MPS',
    description: 'Devanning Container Terminal (Earth works).',
    year: '2016 – 2019',
    status: 'Completed',
    location: 'Kpone',
  },
  {
    client: 'Toyota Ghana Ltd / Battis Company Ltd',
    description: 'Clearing and excavation before the main building. Paving of the entire premises.',
    year: '2017 – 2019',
    status: 'Completed',
    location: 'Tema',
  },
  {
    client: 'Nutrifiod Ghana Ltd',
    description: 'Filling and construction of roads.',
    year: '2020',
    status: 'Completed',
    location: 'Tema',
  },
  {
    client: 'Chemi-Tech Company Ltd (Quantum Oil Depot)',
    description: 'Earth works and construction of roads and fuel loading Bay.',
    year: '2019 – 2021',
    status: 'Completed',
    location: 'Kpone',
  },
  {
    client: 'Continental Blue Investment Gh Ltd.',
    description: 'Earth works before the building of main structure within the factory yard. Construction of bridges, coverts and access roads.',
    year: '2017 – 2022',
    status: 'Completed',
    location: 'Tema Free Zone',
  },
  {
    client: 'Lesico Ghana Ltd',
    description: 'Rental of heavy duty equipments for the rehabilitation of water projects from Dabala to Anloga.',
    year: '2022 – Ongoing',
    status: 'Ongoing',
    location: 'Dabala to Anloga',
  },
  {
    client: 'Fabrimetal Ghana Ltd',
    description: 'All Earth works for factory expansion.',
    year: '2022 – Ongoing',
    status: 'Ongoing',
    location: 'Tsopoli',
  },
  {
    client: 'Golden Exotics Ltd',
    description: 'Construction of canal within the farmland. Rehabilitation of farmland roads. Filling and compaction of Parkhouse, chemical and Canteen areas. Maintenance of all major roads within the farm area and surrounding town.',
    year: '2021 – Ongoing',
    status: 'Ongoing',
    location: 'Asutsuare / Torgorme',
  },
]

const statusStyles: Record<string, string> = {
  Completed: 'bg-green-100 text-green-800 border-green-200',
  Ongoing: 'bg-blue-100 text-blue-800 border-blue-200',
}

export default function ProjectsSection() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Projects Portfolio
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            A showcase of our completed and ongoing construction, earthworks, and equipment rental projects
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className="rounded-xl border border-navy/10 overflow-hidden">
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
                  <th className="text-left px-6 py-4 text-safety-orange font-semibold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-safety-orange font-semibold text-sm uppercase tracking-wider w-36">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Year
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-safety-orange font-semibold text-sm uppercase tracking-wider w-28">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectData.map((item, i) => (
                  <tr
                    key={i}
                    className={`border-t border-navy/5 hover:bg-safety-orange/5 transition-colors ${
                      i % 2 === 0 ? 'bg-white' : 'bg-light-grey/50'
                    }`}
                  >
                    <td className="px-6 py-5">
                      <span className="text-navy font-semibold text-sm">{item.client}</span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-navy/70 text-sm leading-relaxed">{item.description}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-navy/70 text-sm">{item.location}</span>
                    </td>
                    <td className="px-6 py-5">
                      <Badge
                        variant="outline"
                        className="border-navy/10 text-navy/70 text-xs"
                      >
                        {item.year}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <Badge className={`text-xs border ${statusStyles[item.status]}`}>
                        {item.status === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {item.status === 'Ongoing' && <Clock className="w-3 h-3 mr-1" />}
                        {item.status}
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
          {projectData.map((item, i) => (
            <div
              key={i}
              className="border border-navy/10 rounded-xl p-5 bg-white hover:bg-safety-orange/5 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-navy font-semibold text-sm">{item.client}</h4>
                <Badge className={`text-xs border shrink-0 ${statusStyles[item.status]}`}>
                  {item.status === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {item.status === 'Ongoing' && <Clock className="w-3 h-3 mr-1" />}
                  {item.status}
                </Badge>
              </div>
              <p className="text-navy/70 text-sm leading-relaxed mb-3">{item.description}</p>
              <div className="flex items-center gap-4 text-xs text-steel-grey">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}