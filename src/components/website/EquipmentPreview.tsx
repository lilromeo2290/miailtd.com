'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useNavigation } from '@/lib/store'
import { ArrowRight, Phone, Eye } from 'lucide-react'

interface EquipmentItem {
  id: string
  name: string
  model: string
  category: string
  image?: string
  availability: 'available' | 'rented' | 'maintenance'
  dailyRate: number
}

const fallbackEquipment: EquipmentItem[] = [
  {
    id: '1',
    name: 'Caterpillar Excavator',
    model: 'CAT 320F L',
    category: 'Excavators',
    image: 'https://images.unsplash.com/photo-1599812810817-53b5c9c8fc0d?w=600&q=80',
    availability: 'available',
    dailyRate: 850,
  },
  {
    id: '2',
    name: 'Komatsu Bulldozer',
    model: 'D65EX-18',
    category: 'Bulldozers',
    image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&q=80',
    availability: 'available',
    dailyRate: 920,
  },
  {
    id: '3',
    name: 'Volvo Articulated Hauler',
    model: 'A30G',
    category: 'Haulers',
    image: 'https://images.unsplash.com/photo-1605612322229-541f5898b618?w=600&q=80',
    availability: 'rented',
    dailyRate: 780,
  },
  {
    id: '4',
    name: 'John Deere Motor Grader',
    model: '672G',
    category: 'Graders',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
    availability: 'available',
    dailyRate: 690,
  },
]

function getAvailabilityBadge(availability: string) {
  switch (availability) {
    case 'available':
      return <Badge className="badge-available text-xs font-medium">Available</Badge>
    case 'rented':
      return <Badge className="badge-rented text-xs font-medium">Rented</Badge>
    case 'maintenance':
      return <Badge className="badge-maintenance text-xs font-medium">Maintenance</Badge>
    default:
      return <Badge variant="secondary" className="text-xs">Unknown</Badge>
  }
}

export default function EquipmentPreview() {
  const { setPage } = useNavigation()
  const [equipment, setEquipment] = useState<EquipmentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/equipment')
      .then((res) => res.json())
      .then((data) => {
        setEquipment(data.slice(0, 4) || fallbackEquipment)
      })
      .catch(() => {
        setEquipment(fallbackEquipment)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleNav = (page: 'equipment') => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="py-16 lg:py-24 bg-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="bg-navy/10 text-navy hover:bg-navy/15 mb-4">
            Heavy Machinery
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy">
            Equipment Rental Fleet
          </h2>
          <p className="text-steel-grey mt-3 max-w-2xl mx-auto text-lg">
            Modern, well-maintained heavy equipment available for short and long-term rental. All machines are inspected regularly and operated by certified professionals.
          </p>
        </div>

        {/* Equipment Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-0 shadow-sm overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-5">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item) => (
              <Card
                key={item.id}
                className="card-hover border border-concrete/60 bg-white overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-concrete">
                  <img
                    src={item.image || '/placeholder-equipment.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-navy text-white text-xs font-medium backdrop-blur-sm">
                      {item.category}
                    </Badge>
                  </div>
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base font-bold text-navy leading-tight">
                      {item.name}
                    </h3>
                    {getAvailabilityBadge(item.availability)}
                  </div>

                  <p className="text-sm text-steel-grey mb-4">{item.model}</p>

                  {/* Rate */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-xs text-steel-grey">From</span>
                    <span className="text-2xl font-bold text-safety-orange">
                      ${item.dailyRate}
                    </span>
                    <span className="text-sm text-steel-grey">/day</span>
                  </div>

                  {/* Inquire Button */}
                  <Button
                    className="w-full bg-navy hover:bg-navy-light text-white text-sm"
                    onClick={() => handleNav('equipment')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Inquire
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => handleNav('equipment')}
            className="cta-gradient text-white border-0 px-8 group"
          >
            View All Equipment
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
