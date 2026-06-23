'use client'

import {
  ShieldCheck,
  Award,
  Handshake,
  Lightbulb,
  ChevronRight,
  Target,
  Eye,
  CheckCircle2,
  Building2,
  ArrowUpRight,
  Users,
  FileCheck2,
  Leaf,
  HardHat,
  Star,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useNavigation } from '@/lib/store'

/* ─────────────── data ─────────────── */

const coreValues = [
  {
    icon: ShieldCheck,
    title: 'Safety First',
    description:
      'Every project begins and ends with safety. Our zero-incident culture is backed by rigorous training, daily safety briefings, and state-of-the-art PPE for every team member on site.',
  },
  {
    icon: Award,
    title: 'Quality Excellence',
    description:
      'We hold ourselves to the highest construction standards. From material selection to final inspection, every phase is guided by ISO-certified quality management processes.',
  },
  {
    icon: Handshake,
    title: 'Integrity',
    description:
      'Transparent pricing, honest timelines, and open communication form the bedrock of every client relationship. We do what we say we will do—no surprises.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We invest in modern equipment, advanced surveying technology, and sustainable construction methods to deliver better results faster and with less environmental impact.',
  },
]

const leadership = [
  {
    initials: 'RD',
    color: 'bg-safety-orange',
    name: 'Mr. Raphael Dzisenu',
    title: 'Founder & Chief Executive Officer',
    bio: 'Over two decades of experience in the construction industry. Mr. Dzisenu\'s determination to achieve the best results propelled him to establish Deralph Engineering Services — which has delivered outstanding projects for more than fifteen years — and subsequently founded Miai Ltd Company to expand the company\'s reach into construction, mining, equipment rentals, and farming services.',
  },
]

const certifications = [
  { label: 'ISO 9001:2015', sub: 'Quality Management', icon: FileCheck2 },
  { label: 'ISO 14001:2015', sub: 'Environmental Management', icon: Leaf },
  { label: 'ISO 45001:2018', sub: 'Occupational Health & Safety', icon: ShieldCheck },
  { label: 'Contractor Registration', sub: 'Licensed & Bonded', icon: Building2 },
  { label: 'Environmental Compliance', sub: 'Full Certification', icon: Award },
]

const milestones = [
  { year: '~2005', text: 'Mr. Raphael Dzisenu established Deralph Engineering Services, laying the foundation for over fifteen years of successful construction and engineering projects.' },
  { year: 'Sep 2021', text: 'Miai Ltd Company was officially incorporated to complement Deralph Engineering Services, expanding into construction, mining, equipment rentals, and farming services.' },
  { year: '2022', text: 'Delivered our first major projects under the Miai Ltd banner, quickly building a reputation for quality and reliability across multiple sectors.' },
  { year: '2023', text: 'Grew our equipment fleet and expanded service offerings, strengthening our position as a topnotch construction and mining solutions provider.' },
  { year: '2024', text: 'Continued to scale operations and deliver exceptional results, reinforcing our commitment to excellence and client satisfaction.' },
]

/* ─────────────── component ─────────────── */

export default function AboutSection() {
  const { setPage } = useNavigation()

  return (
    <div className="min-h-screen bg-white">
      {/* ── Page Header ── */}
      <section className="bg-navy relative overflow-hidden">
        {/* decorative pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 left-0 w-72 h-72 bg-safety-orange rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-safety-orange rounded-full translate-x-1/3 translate-y-1/3" />
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
              <li className="text-safety-orange font-medium">About Us</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-safety-orange">Miai Ltd</span> Construction
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Creating solutions to your construction, mining, equipment rental, and farming needs.
          </p>
        </div>
      </section>

      {/* ── Company Introduction ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <Badge className="bg-safety-orange/10 text-safety-orange border-safety-orange/20 mb-4">
                Our Story
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">
                Building Solutions for Your Construction Needs
              </h2>
              <div className="space-y-4 text-steel-grey leading-relaxed">
                <p>
                  Miai Ltd Company was founded in September 2021 and has accomplished so much over the years.
                  We are in business to create solutions to your construction needs. Before the incorporation of
                  Miai Ltd Company, our C.E.O. had already established a company called Deralph Engineering
                  Services which has done several works for more than fifteen years before the birth of Miai
                  Ltd Company.
                </p>
                <p>
                  Even though Deralph Engineering Services is still in existence, Miai Ltd Company was
                  established to be topnotch in construction, mining, equipment rentals, and farming services
                  to complement Deralph Engineering Services. This strategic expansion allows us to offer a
                  broader range of solutions to our clients, drawing on decades of accumulated expertise and
                  industry knowledge.
                </p>
                <p>
                  Our founder and C.E.O., Mr. Raphael Dzisenu, has been in the construction industry for the
                  past two decades. His determination to achieve the best results propelled him to establish
                  the Miai Ltd Company, building on the solid foundation laid by Deralph Engineering Services
                  to create a truly comprehensive construction and engineering enterprise.
                </p>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-navy-light overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <img src="/logo.jpg" alt="Miai Ltd" className="w-24 h-24 object-contain mx-auto mb-4 brightness-0 invert" />
                  <p className="text-white/60 text-sm">Creating solutions since 2021</p>
                </div>
              </div>
              {/* floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-safety-orange/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-safety-orange" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy">500+</div>
                  <div className="text-xs text-steel-grey">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy">Mission & Vision</h2>
            <p className="text-steel-grey mt-2 max-w-xl mx-auto">The principles that guide every decision we make.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mission */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-safety-orange" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Our Mission</h3>
                <p className="text-steel-grey leading-relaxed">
                  We are committed to providing new standards in the construction, equipment rentals, and farming
                  services within our catchment areas and beyond.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-0 shadow-lg bg-navy text-white">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-safety-orange flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-white/70 leading-relaxed">
                  To be the most trusted and capable roads and earthworks contractor in the region, recognized
                  for innovation, safety, and sustainable practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-safety-orange/10 text-safety-orange border-safety-orange/20 mb-4">
              What We Stand For
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-navy">Core Values</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v) => (
              <Card key={v.title} className="border-0 shadow-md hover:shadow-xl transition-shadow group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-safety-orange/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-safety-orange transition-colors">
                    <v.icon className="w-7 h-7 text-safety-orange group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{v.title}</h3>
                  <p className="text-steel-grey text-sm leading-relaxed">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-safety-orange/10 text-safety-orange border-safety-orange/20 mb-4">
              <Users className="w-3.5 h-3.5 mr-1" />
              Our People
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-navy">Leadership Team</h2>
            <p className="text-steel-grey mt-2 max-w-xl mx-auto">
              Experienced professionals committed to excellence in every project.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 max-w-sm mx-auto">
            {leadership.map((person) => (
              <Card key={person.name} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  {/* Avatar */}
                  <div
                    className={`w-20 h-20 rounded-full ${person.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-white text-xl font-bold">{person.initials}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy">{person.name}</h3>
                  <p className="text-safety-orange text-sm font-medium mb-3">{person.title}</p>
                  <p className="text-steel-grey text-sm leading-relaxed">{person.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications & Licenses ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-safety-orange/10 text-safety-orange border-safety-orange/20 mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Certified & Compliant
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-navy">Certifications & Licenses</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {certifications.map((cert) => (
              <Card key={cert.label} className="border-0 shadow-md hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-3">
                    <cert.icon className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="text-sm font-bold text-navy mb-1">{cert.label}</h3>
                  <p className="text-xs text-steel-grey">{cert.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline / Milestones ── */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-safety-orange/20 text-safety-orange border-safety-orange/30 mb-4">
              Our Journey
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Key Milestones</h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-white/10" />

            <div className="space-y-10">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div
                    key={m.year}
                    className={`relative flex items-start gap-6 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-safety-orange border-4 border-navy z-10" />

                    {/* content card */}
                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                      <span className="inline-block text-safety-orange font-bold text-lg mb-1">{m.year}</span>
                      <p className="text-white/70 text-sm leading-relaxed">{m.text}</p>
                    </div>

                    {/* spacer for the other side */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Ready to Work With Us?</h2>
          <p className="text-steel-grey mb-8 max-w-xl mx-auto">
            Let&apos;s discuss how Miai Ltd can bring your next project to life — safely, efficiently, and to the highest standard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setPage('contact')}
              className="bg-safety-orange hover:bg-safety-orange/90 text-white"
            >
              Get In Touch
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