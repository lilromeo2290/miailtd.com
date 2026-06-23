'use client'

import {
  Shield,
  Leaf,
  HeartPulse,
  AlertTriangle,
  Clock,
  HardHat,
  GraduationCap,
  Search,
  Award,
  CheckCircle2,
  TreePine,
  Fuel,
  Recycle,
  Wind,
  Volume2,
  ClipboardCheck,
  Users,
} from 'lucide-react'
import { useNavigation } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'

const policies = [
  {
    icon: Shield,
    title: 'Safety Management System',
    description:
      'Our comprehensive Safety Management System provides a structured framework for identifying, assessing, and controlling workplace hazards. We conduct regular risk assessments, implement safe work procedures, and maintain rigorous compliance with all applicable safety regulations. Every project begins with a detailed safety plan tailored to site-specific conditions.',
  },
  {
    icon: Leaf,
    title: 'Environmental Management',
    description:
      'We are committed to minimizing our environmental footprint across all operations. Our environmental management practices include systematic monitoring of emissions, waste reduction programs, and responsible resource utilization. We work closely with regulatory bodies to ensure full compliance with environmental legislation.',
  },
  {
    icon: HeartPulse,
    title: 'Occupational Health',
    description:
      'Protecting the long-term health of our workforce is paramount. We provide regular health screenings, exposure monitoring for hazardous substances, and ergonomic assessments. Our occupational health programs address both physical and mental wellbeing, ensuring our teams remain healthy and productive throughout their careers.',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Preparedness',
    description:
      'Every project site maintains a tailored emergency response plan with clearly defined protocols for various scenarios. We conduct regular emergency drills, maintain fully stocked first aid stations, and ensure all personnel are trained in evacuation procedures. Our rapid response capability has been refined through years of practical experience.',
  },
]

const stats = [
  { icon: Clock, value: '500+', label: 'Days LTI Free' },
  { icon: HardHat, value: '15,000+', label: 'Safe Work Hours Monthly' },
  { icon: GraduationCap, value: '100%', label: 'Staff Trained' },
  { icon: ClipboardCheck, value: '50+', label: 'Safety Audits/Year' },
]

const certifications = [
  {
    name: 'ISO 45001:2018',
    description: 'Occupational Health & Safety Management Systems',
  },
  {
    name: 'ISO 14001:2015',
    description: 'Environmental Management Systems',
  },
]

const trainingPrograms = [
  'New Employee Safety Induction',
  'Heavy Equipment Operation Safety',
  'Working at Heights',
  'Confined Space Entry',
  'First Aid & CPR',
  'Fire Safety & Emergency Response',
  'Environmental Awareness',
]

const preventionMeasures = [
  'Pre-start daily safety briefings and toolbox talks on every site',
  'Mandatory personal protective equipment (PPE) compliance monitoring',
  'Comprehensive hazard identification and risk assessment protocols',
  'Regular safety audits and inspections by certified HSE professionals',
  'Incident reporting and investigation with root cause analysis',
  'Stop Work Authority granted to every employee on any safety concern',
  'Behavioral-based safety observation programs',
  'Near-miss reporting and lessons learned sharing across all projects',
]

export default function HSESection() {
  const { currentPage } = useNavigation()

  if (currentPage !== 'hse') return null

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-safety-orange/20 text-safety-orange px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            HSE Commitment
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Health, Safety & Environment
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Our commitment to zero harm and environmental stewardship
          </p>
        </div>
      </section>

      {/* Safety Philosophy */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="border-2 border-safety-orange/20 bg-safety-orange/5">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-start gap-5">
                <div className="hidden sm:flex w-14 h-14 rounded-xl bg-safety-orange/10 items-center justify-center shrink-0">
                  <Shield className="w-7 h-7 text-safety-orange" />
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-navy mb-4">
                    Our Safety Philosophy
                  </h2>
                  <p className="text-navy/80 text-lg leading-relaxed">
                    At RoadBuild, safety is not just a policy — it is a core value embedded in
                    everything we do. We believe every incident is preventable, and every person has
                    the right to go home safely every day.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HSE Policies */}
      <section className="py-16 lg:py-20 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-3">
              HSE Policies
            </h2>
            <p className="text-steel-grey max-w-2xl mx-auto">
              Our comprehensive policies form the foundation of our commitment to health, safety,
              and environmental excellence.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {policies.map((policy) => {
              const Icon = policy.icon
              return (
                <Card
                  key={policy.title}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 lg:p-8">
                    <div className="w-12 h-12 rounded-lg bg-safety-orange/10 flex items-center justify-center mb-4 group-hover:bg-safety-orange/20 transition-colors">
                      <Icon className="w-6 h-6 text-safety-orange" />
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-3">{policy.title}</h3>
                    <p className="text-steel-grey text-sm leading-relaxed">
                      {policy.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Safety Statistics */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-3">
              Safety Performance
            </h2>
            <p className="text-steel-grey max-w-2xl mx-auto">
              Our track record speaks for itself — consistent, measurable results in workplace safety.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card
                  key={stat.label}
                  className="text-center group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6 lg:p-8">
                    <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-safety-orange/10 transition-colors">
                      <Icon className="w-7 h-7 text-safety-orange" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-navy mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-steel-grey">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 lg:py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Certifications
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Internationally recognized standards that validate our commitment to excellence.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-8 py-6 text-center min-w-[260px] hover:bg-white/15 transition-colors"
              >
                <Award className="w-10 h-10 text-safety-orange mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">{cert.name}</h3>
                <p className="text-white/60 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16 lg:py-20 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-safety-orange/10 text-safety-orange px-3 py-1 rounded-full text-sm font-medium mb-4">
                <GraduationCap className="w-4 h-4" />
                Training
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-3">
                Training Programs
              </h2>
              <p className="text-steel-grey leading-relaxed">
                Continuous learning is at the heart of our safety culture. Every team member
                participates in regular training to maintain the highest standards of workplace
                safety and operational excellence.
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 gap-3">
                {trainingPrograms.map((program) => (
                  <div
                    key={program}
                    className="flex items-center gap-3 bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <CheckCircle2 className="w-5 h-5 text-safety-orange shrink-0" />
                    <span className="text-sm font-medium text-navy">{program}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Sustainability */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Leaf className="w-4 h-4" />
              Sustainability
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-3">
              Environmental Sustainability
            </h2>
            <p className="text-steel-grey max-w-2xl mx-auto">
              We recognize our responsibility to protect the environment and integrate sustainable
              practices into every phase of our operations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Fuel,
                title: 'Fuel-Efficient Equipment',
                desc: 'We invest in modern, fuel-efficient machinery to reduce carbon emissions and minimize fuel consumption across all project sites.',
              },
              {
                icon: Recycle,
                title: 'Material Recycling',
                desc: 'Construction waste is sorted and recycled wherever possible. We partner with certified recycling facilities to divert materials from landfill.',
              },
              {
                icon: TreePine,
                title: 'Erosion Control',
                desc: 'Comprehensive erosion and sediment control measures are implemented to protect surrounding ecosystems and waterways during construction.',
              },
              {
                icon: Volume2,
                title: 'Noise & Dust Management',
                desc: 'We employ advanced noise barriers, water suppression systems, and monitoring to minimize the impact of our operations on surrounding communities.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-steel-grey text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Incident Prevention */}
      <section className="py-16 lg:py-20 bg-navy-light">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="w-16 h-16 rounded-2xl bg-safety-orange/20 flex items-center justify-center mx-auto lg:mx-0 mb-5">
                <Shield className="w-8 h-8 text-safety-orange" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Incident Prevention
              </h2>
              <p className="text-white/60 leading-relaxed">
                Proactive measures that form the backbone of our zero-harm strategy, ensuring every
                workday ends safely.
              </p>
            </div>
            <div className="lg:col-span-3">
              <ul className="space-y-4">
                {preventionMeasures.map((measure) => (
                  <li key={measure} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm leading-relaxed">{measure}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}