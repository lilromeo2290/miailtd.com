'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useNavigation } from '@/lib/store'
import {
  ArrowRight,
  Route,
  Mountain,
  Layers,
  Droplets,
  Minus,
  Pickaxe,
} from 'lucide-react'

interface Service {
  id: string
  title: string
  slug: string
  shortDescription: string
  icon?: string
}

const fallbackServices: Service[] = [
  { id: '1', title: 'Road Construction', slug: 'road-construction', shortDescription: 'Full-service road building from planning to paving, delivering durable highways and local roads that stand the test of time.' },
  { id: '2', title: 'Earthworks & Excavation', slug: 'earthworks-excavation', shortDescription: 'Precision excavation and earthmoving services for site preparation, foundations, and large-scale terrain modification.' },
  { id: '3', title: 'Asphalt Paving', slug: 'asphalt-paving', shortDescription: 'High-quality asphalt laying and surfacing for roads, parking lots, and industrial areas using advanced paving technology.' },
  { id: '4', title: 'Drainage Systems', slug: 'drainage-systems', shortDescription: 'Comprehensive stormwater management and drainage infrastructure design and installation for all project types.' },
  { id: '5', title: 'Land Grading', slug: 'land-grading', shortDescription: 'Professional land leveling and grading services ensuring proper elevation, slope, and water flow for any development.' },
  { id: '6', title: 'Mining Support', slug: 'mining-support', shortDescription: 'Specialized earthworks and haul road construction services for mining operations across diverse terrains.' },
]

const iconMap: Record<string, React.ElementType> = {
  'road-construction': Route,
  'earthworks-excavation': Mountain,
  'asphalt-paving': Layers,
  'drainage-systems': Droplets,
  'land-grading': Minus,
  'mining-support': Pickaxe,
}

export default function ServicesPreview() {
  const { setPage } = useNavigation()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.slice(0, 6) || fallbackServices)
      })
      .catch(() => {
        setServices(fallbackServices)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleNav = (page: 'services') => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="py-16 lg:py-24 bg-white construction-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="bg-safety-orange/10 text-safety-orange hover:bg-safety-orange/15 mb-4">
            What We Do
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy">
            Our Construction Services
          </h2>
          <p className="text-steel-grey mt-3 max-w-2xl mx-auto text-lg">
            We offer comprehensive construction capabilities backed by modern equipment, skilled teams, and decades of experience delivering projects on time and within budget.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-0 shadow-sm p-6">
                <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.slug] || Route
              return (
                <Card
                  key={service.id}
                  className="card-hover border border-concrete/60 bg-white p-6 lg:p-8 group cursor-pointer"
                  onClick={() => handleNav('services')}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center mb-5 group-hover:bg-safety-orange transition-colors duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-safety-orange transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-steel-grey text-sm leading-relaxed mb-5">
                    {service.shortDescription}
                  </p>

                  {/* Learn More */}
                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-safety-orange hover:text-safety-orange-dark transition-colors group/link">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </Card>
              )
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleNav('services')}
            className="border-navy text-navy hover:bg-navy hover:text-white px-8 group"
          >
            View All Services
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
