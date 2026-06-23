'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: string
  quote: string
  rating: number
  clientName: string
  company: string
  role: string
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'RoadBuild delivered our highway expansion project ahead of schedule and within budget. Their team\'s expertise in earthworks and asphalt paving is unmatched. The quality of their work has exceeded our expectations every time.',
    rating: 5,
    clientName: 'James Thompson',
    company: 'Ministry of Transport',
    role: 'Project Director',
  },
  {
    id: '2',
    quote: 'We\'ve relied on RoadBuild for our mining haul road construction for the past 8 years. Their equipment fleet is always in excellent condition, and their operators are some of the best in the industry. A truly reliable partner.',
    rating: 5,
    clientName: 'Sarah Mwangi',
    company: 'Mining Resources Ltd',
    role: 'Operations Manager',
  },
  {
    id: '3',
    quote: 'The drainage and land grading work completed by RoadBuild on our industrial complex was outstanding. Their attention to detail and commitment to safety standards set them apart from other contractors we\'ve worked with.',
    rating: 5,
    clientName: 'David Chen',
    company: 'Urban Development Corp',
    role: 'Chief Engineer',
  },
  {
    id: '4',
    quote: 'RoadBuild\'s equipment rental service has been a game-changer for our municipal road maintenance program. Fast delivery, well-maintained machines, and excellent technical support whenever we need it.',
    rating: 4,
    clientName: 'Maria Gonzalez',
    company: 'Municipal Council',
    role: 'Infrastructure Coordinator',
  },
  {
    id: '5',
    quote: 'Professional, efficient, and safety-conscious. RoadBuild completed our 45km rural road project through challenging terrain. Their problem-solving capabilities and project management are world-class.',
    rating: 5,
    clientName: 'Ahmed Hassan',
    company: 'National Roads Authority',
    role: 'Senior Engineer',
  },
  {
    id: '6',
    quote: 'We partnered with RoadBuild on a large-scale dam access road project. Their earthmoving capabilities and ability to handle complex logistics in remote areas made the difference. Highly recommended.',
    rating: 5,
    clientName: 'Robert Fischer',
    company: 'Water Authority',
    role: 'Technical Director',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'text-safety-orange fill-safety-orange'
              : 'text-white/20'
          }`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const mapped = data.map((d: Record<string, string>) => ({
            id: d.id,
            quote: d.content || d.quote || '',
            rating: d.rating || 5,
            clientName: d.name || d.clientName || '',
            company: d.company || '',
            role: d.role || '',
          }))
          setTestimonials(mapped)
        } else {
          setTestimonials(fallbackTestimonials)
        }
      })
      .catch(() => {
        setTestimonials(fallbackTestimonials)
      })
      .finally(() => setLoading(false))
  }, [])

  const goTo = useCallback((index: number) => {
    if (isTransitioning || testimonials.length <= 1) return
    setIsTransitioning(true)
    setActiveIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning, testimonials.length])

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % testimonials.length)
  }, [activeIndex, goTo, testimonials.length])

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length)
  }, [activeIndex, goTo, testimonials.length])

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (loading || testimonials.length <= 1) return
    const interval = setInterval(goNext, 5000)
    return () => clearInterval(interval)
  }, [loading, testimonials.length, goNext])

  // Determine visible testimonials for responsive display
  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return []
    const items: Testimonial[] = []
    for (let i = 0; i < Math.min(3, testimonials.length); i++) {
      items.push(testimonials[(activeIndex + i) % testimonials.length])
    }
    return items
  }

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
          <span className="text-safety-orange font-semibold text-sm uppercase tracking-wider">Client Feedback</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
            What Our Clients Say
          </h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">
            We take pride in building lasting relationships with our clients through consistent delivery and exceptional results.
          </p>
        </div>

        {/* Testimonials */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-navy-light border-white/10 p-6">
                <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                <Skeleton className="h-4 w-3/4 mb-4 bg-white/10" />
                <Skeleton className="h-4 w-1/3 bg-white/10" />
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisibleTestimonials().map((testimonial, i) => (
                <Card
                  key={`${testimonial.id}-${i}`}
                  className={`bg-navy-light border-white/10 p-6 lg:p-8 transition-all duration-500 ${
                    isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-safety-orange/30 mb-4" />

                  {/* Quote Text */}
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 pt-4">
                    {/* Client Info */}
                    <div className="flex items-center gap-3">
                      {/* Avatar placeholder */}
                      <div className="w-11 h-11 rounded-full bg-safety-orange/20 flex items-center justify-center text-safety-orange font-bold text-sm shrink-0">
                        {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">
                          {testimonial.clientName}
                        </h4>
                        <p className="text-white/50 text-xs">{testimonial.role}</p>
                        <p className="text-safety-orange/70 text-xs font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Navigation Dots & Arrows */}
            <div className="flex items-center justify-center gap-4 mt-10">
              {/* Prev Arrow */}
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'bg-safety-orange w-8'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next Arrow */}
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
