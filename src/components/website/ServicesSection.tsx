'use client'

import { useEffect, useState } from 'react'
import {
  Route,
  Wrench,
  Mountain,
  Pickaxe,
  Trees,
  Waves,
  Layers,
  Flag,
  Compass,
  HardHat,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  WrenchIcon,
  ArrowUpRight,
  Loader2,
  HelpCircle,
  CircleDot,
  Tractor,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useNavigation } from '@/lib/store'
import type { LucideIcon } from 'lucide-react'

/* ─────────────── types ─────────────── */

interface Service {
  id: string
  slug: string
  title: string
  shortDesc: string
  description: string
  scope: string
  benefits: string
  equipment: string
  icon: string
  image: string
  faqs: string
}

interface FAQ {
  question: string
  answer: string
}

/* ─────────────── icon map ─────────────── */

const iconMap: Record<string, LucideIcon> = {
  'road-construction': Route,
  'road-rehabilitation': Wrench,
  earthworks: Mountain,
  excavation: Pickaxe,
  'site-clearing': Trees,
  drainage: Waves,
  grading: Layers,
  'asphalt-paving': Flag,
  'civil-engineering': Compass,
  'mining-support': HardHat,
}

function getServiceIcon(iconName: string): LucideIcon {
  return iconMap[iconName] ?? Wrench
}

/* ─────────────── safe JSON parsers ─────────────── */

function parseStringList(json: string): string[] {
  try {
    const parsed = JSON.parse(json)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function parseFAQs(json: string): FAQ[] {
  try {
    const parsed = JSON.parse(json)
    return Array.isArray(parsed)
      ? parsed.filter(
          (f: Record<string, unknown>) => typeof f.question === 'string' && typeof f.answer === 'string'
        )
      : []
  } catch {
    return []
  }
}

/* ─────────────── component ─────────────── */

export default function ServicesSection() {
  const { selectedService, setService, setPage } = useNavigation()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services')
        if (res.ok) {
          const data = await res.json()
          setServices(Array.isArray(data) ? data : data.services ?? [])
        }
      } catch {
        // silently fail – grid will show empty
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const activeService = selectedService
    ? services.find((s) => s.slug === selectedService) ?? null
    : null

  /* ── Detail View ── */
  if (activeService) {
    const Icon = getServiceIcon(activeService.icon)
    const scopeItems = parseStringList(activeService.scope)
    const benefitItems = parseStringList(activeService.benefits)
    const equipmentItems = parseStringList(activeService.equipment)
    const faqItems = parseFAQs(activeService.faqs)

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-navy relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute top-0 right-0 w-72 h-72 bg-safety-orange rounded-full translate-x-1/3 -translate-y-1/3" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li>
                  <button onClick={() => setPage('home')} className="hover:text-safety-orange transition-colors">
                    Home
                  </button>
                </li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li>
                  <button
                    onClick={() => setService(null)}
                    className="hover:text-safety-orange transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li className="text-safety-orange font-medium">{activeService.title}</li>
              </ol>
            </nav>

            {/* Back button */}
            <button
              onClick={() => setService(null)}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Services
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-safety-orange flex items-center justify-center shrink-0">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-white">{activeService.title}</h1>
                <p className="text-white/60 mt-1 max-w-2xl">{activeService.shortDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Full description */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-navy mb-4">Overview</h2>
              <div className="text-steel-grey leading-relaxed whitespace-pre-line">
                {activeService.description}
              </div>
            </div>

            <Separator className="mb-12 bg-concrete" />

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left column: Scope & Benefits */}
              <div className="space-y-10">
                {/* Scope of Work */}
                {scopeItems.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                      <CircleDot className="w-5 h-5 text-safety-orange" />
                      Scope of Work
                    </h2>
                    <ul className="space-y-3">
                      {scopeItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
                          <span className="text-steel-grey leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {benefitItems.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                      <WrenchIcon className="w-5 h-5 text-safety-orange" />
                      Benefits
                    </h2>
                    <ul className="space-y-3">
                      {benefitItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
                          <span className="text-steel-grey leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right column: Equipment & FAQ */}
              <div className="space-y-10">
                {/* Equipment Used */}
                {equipmentItems.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                      <Tractor className="w-5 h-5 text-safety-orange" />
                      Equipment Used
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {equipmentItems.map((item, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-navy/20 text-navy bg-navy/5 py-1.5 px-3 text-sm"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQ Accordion */}
                {faqItems.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-safety-orange" />
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((faq, idx) => (
                        <AccordionItem key={idx} value={`faq-${idx}`}>
                          <AccordionTrigger className="text-navy text-sm font-medium hover:text-safety-orange hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-steel-grey leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-12 bg-concrete" />

            {/* CTA */}
            <div className="bg-navy rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Request a Quote for This Service
                </h3>
                <p className="text-white/60 text-sm max-w-lg">
                  Tell us about your project and we&apos;ll get back to you within 24 hours with a detailed, no-obligation quote.
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => setPage('quote')}
                className="bg-safety-orange hover:bg-safety-orange/90 text-white shrink-0"
              >
                Request a Quote
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  /* ── Grid View ── */
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-safety-orange rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <button onClick={() => setPage('home')} className="hover:text-safety-orange transition-colors">
                  Home
                </button>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-safety-orange font-medium">Services</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Construction Services</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Comprehensive solutions for every stage of your construction project
          </p>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-safety-orange animate-spin" />
              <span className="ml-3 text-steel-grey">Loading services...</span>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <HardHat className="w-12 h-12 text-concrete mx-auto mb-4" />
              <p className="text-steel-grey">No services available at the moment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = getServiceIcon(service.icon)
                return (
                  <Card
                    key={service.id}
                    className="border-0 shadow-md hover:shadow-xl transition-all group cursor-pointer"
                    onClick={() => {
                      setService(service.slug)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-safety-orange/10 flex items-center justify-center mb-4 group-hover:bg-safety-orange transition-colors">
                        <Icon className="w-7 h-7 text-safety-orange group-hover:text-white transition-colors" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-navy mb-2">{service.title}</h3>

                      {/* Short description */}
                      <p className="text-steel-grey text-sm leading-relaxed flex-1 mb-6">
                        {service.shortDesc}
                      </p>

                      {/* CTA */}
                      <Button
                        variant="ghost"
                        className="text-safety-orange hover:text-safety-orange/80 hover:bg-safety-orange/5 p-0 h-auto justify-start"
                      >
                        View Details
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-steel-grey mb-8 max-w-xl mx-auto">
            Our team will assess your project requirements and recommend the best solution. Get in touch for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setPage('contact')}
              className="bg-safety-orange hover:bg-safety-orange/90 text-white"
            >
              Contact Us
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setPage('quote')}
              className="border-navy text-navy hover:bg-navy hover:text-white"
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}