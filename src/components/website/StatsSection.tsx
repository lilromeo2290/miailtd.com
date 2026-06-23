'use client'

import { useEffect, useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Award, FolderCheck, Truck, MapPin } from 'lucide-react'

interface StatItem {
  icon: React.ElementType
  value: string
  suffix: string
  label: string
  description: string
}

const stats: StatItem[] = [
  {
    icon: Award,
    value: '25',
    suffix: '+',
    label: 'Years Experience',
    description: 'Delivering quality infrastructure since 1998',
  },
  {
    icon: FolderCheck,
    value: '500',
    suffix: '+',
    label: 'Projects Completed',
    description: 'Roads, highways, earthworks & more',
  },
  {
    icon: Truck,
    value: '150',
    suffix: '+',
    label: 'Equipment Fleet',
    description: 'Modern machinery available for rental',
  },
  {
    icon: MapPin,
    value: '15',
    suffix: '+',
    label: 'Regions Served',
    description: 'Expanding presence across the nation',
  },
]

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const target = parseInt(stat.value)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const Icon = stat.icon

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const duration = 1500
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target])

  return (
    <Card
      ref={ref}
      className={`card-hover bg-white border-0 shadow-sm p-6 lg:p-8 text-center`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-14 h-14 bg-safety-orange/10 rounded-2xl mb-4">
        <Icon className="w-7 h-7 text-safety-orange" />
      </div>

      {/* Number */}
      <div className="stat-animate">
        <span className="text-3xl lg:text-4xl font-bold text-navy">
          {count}
          <span className="text-safety-orange">{stat.suffix}</span>
        </span>
      </div>

      {/* Label */}
      <h3 className="text-base lg:text-lg font-semibold text-navy mt-2">
        {stat.label}
      </h3>

      {/* Description */}
      <p className="text-sm text-steel-grey mt-1">
        {stat.description}
      </p>

      {/* Bottom accent */}
      <div className="mt-4 mx-auto w-10 h-1 bg-safety-orange/20 rounded-full" />
    </Card>
  )
}

export default function StatsSection() {
  return (
    <section className="relative bg-light-grey py-16 lg:py-20">
      {/* Top divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-3">
            Numbers That Speak for Themselves
          </h2>
          <p className="text-steel-grey mt-3 max-w-xl mx-auto">
            Over two decades of excellence in construction, building the infrastructure that connects communities and drives progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
