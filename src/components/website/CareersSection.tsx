'use client'

import { useState, useEffect, type FormEvent } from 'react'
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Shield,
  Users,
  MapPin,
  Clock,
  ListChecks,
  Upload,
  Send,
  Building2,
} from 'lucide-react'
import { useNavigation } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type Job = {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirementsCount: number
}

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Compensation',
    desc: 'We offer industry-leading salaries, comprehensive benefits packages, performance bonuses, and retirement plans that reward your hard work and dedication.',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    desc: 'Clear advancement pathways, mentorship programs, professional development funding, and leadership training to help you reach your full potential.',
  },
  {
    icon: Shield,
    title: 'Safety First Culture',
    desc: 'Work in an environment where your safety and wellbeing are the top priority. We invest heavily in training, equipment, and safety protocols.',
  },
  {
    icon: Users,
    title: 'Team Environment',
    desc: 'Join a supportive, collaborative team of professionals who share knowledge, celebrate wins together, and push each other to excel.',
  },
]

const typeColor: Record<string, string> = {
  'Full-time': 'bg-green-100 text-green-700',
  'Part-time': 'bg-blue-100 text-blue-700',
  Contract: 'bg-amber-100 text-amber-700',
  Internship: 'bg-purple-100 text-purple-700',
}

export default function CareersSection() {
  const { currentPage } = useNavigation()
  const [applyDialogOpen, setApplyDialogOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  // Form state
  const [formJobTitle, setFormJobTitle] = useState('')
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formCover, setFormCover] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentPage !== 'careers') return
    setLoading(true)
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        const list = data.jobs ?? (Array.isArray(data) ? data : [])
        setJobs(list)
      })
      .catch(() => setJobs([]))
      .finally(() => setLoading(false))
  }, [currentPage])

  const openApply = (job: Job) => {
    setSelectedJob(job)
    setFormJobTitle(job.title)
    setFormName('')
    setFormEmail('')
    setFormPhone('')
    setFormCover('')
    setSubmitted(false)
    setApplyDialogOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Application submitted:', {
      jobTitle: formJobTitle,
      name: formName,
      email: formEmail,
      phone: formPhone,
      coverLetter: formCover,
    })
    setSubmitted(true)
  }

  if (currentPage !== 'careers') return null

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-safety-orange/20 text-safety-orange px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            Careers
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Join Our Team
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Build your career with a leading construction company
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-3">
              Why Work With Us
            </h2>
            <p className="text-steel-grey max-w-2xl mx-auto">
              We invest in our people because they are the foundation of our success.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon
              return (
                <Card
                  key={b.title}
                  className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 lg:p-8">
                    <div className="w-14 h-14 rounded-full bg-safety-orange/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-safety-orange/20 transition-colors">
                      <Icon className="w-7 h-7 text-safety-orange" />
                    </div>
                    <h3 className="font-bold text-navy mb-2">{b.title}</h3>
                    <p className="text-steel-grey text-sm leading-relaxed">{b.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 lg:py-20 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-3">
              Current Openings
            </h2>
            <p className="text-steel-grey max-w-2xl mx-auto">
              Explore available positions and find the right opportunity for you.
            </p>
          </div>

          {loading ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-9 w-28 ml-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="w-12 h-12 text-concrete mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-navy mb-2">No open positions right now</h3>
              <p className="text-steel-grey text-sm">
                Check back soon — new opportunities are posted regularly.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      {/* Top Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-navy mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="border-navy/20 text-navy/70 text-xs">
                              <Building2 className="w-3 h-3 mr-1" />
                              {job.department}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-steel-grey">
                              <MapPin className="w-3.5 h-3.5" />
                              {job.location}
                            </span>
                            <Badge
                              className={`text-xs border-0 ${typeColor[job.type] ?? 'bg-concrete text-steel-grey'}`}
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {job.type}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => openApply(job)}
                          className="bg-safety-orange hover:bg-safety-orange/90 text-white shrink-0"
                        >
                          Apply Now
                        </Button>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-steel-grey line-clamp-2">{job.description}</p>

                      {/* Requirements Count */}
                      <div className="flex items-center gap-1.5 text-xs text-steel-grey">
                        <ListChecks className="w-3.5 h-3.5" />
                        {job.requirementsCount} requirement{job.requirementsCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for Position</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your application.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Application Submitted!</h3>
              <p className="text-steel-grey text-sm mb-6">
                Thank you for your interest. Our HR team will review your application and get back
                to you shortly.
              </p>
              <Button
                onClick={() => setApplyDialogOpen(false)}
                className="bg-safety-orange hover:bg-safety-orange/90 text-white"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Job Title (pre-filled) */}
              <div className="space-y-2">
                <Label htmlFor="job-title">Position</Label>
                <Input
                  id="job-title"
                  value={formJobTitle}
                  readOnly
                  className="bg-light-grey cursor-not-allowed"
                />
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name *</Label>
                <Input
                  id="full-name"
                  placeholder="John Doe"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  required
                />
              </div>

              {/* Cover Letter */}
              <div className="space-y-2">
                <Label htmlFor="cover-letter">Cover Letter</Label>
                <Textarea
                  id="cover-letter"
                  placeholder="Tell us why you're a great fit for this role..."
                  rows={4}
                  value={formCover}
                  onChange={(e) => setFormCover(e.target.value)}
                  className="resize-none"
                />
              </div>

              {/* CV Upload */}
              <div className="space-y-2">
                <Label>Upload CV / Resume</Label>
                <div className="relative border-2 border-dashed border-concrete rounded-lg p-6 text-center hover:border-safety-orange/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-steel-grey mx-auto mb-2" />
                  <p className="text-sm text-steel-grey">
                    <span className="text-safety-orange font-medium">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs text-steel-grey/60 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    tabIndex={-1}
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-safety-orange hover:bg-safety-orange/90 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}