'use client'

import { useState, type FormEvent } from 'react'
import { useNavigation } from '@/lib/store'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from 'lucide-react'

interface FormData {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  fullName?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactSection() {
  const { currentPage } = useNavigation()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  if (currentPage !== 'contact') return null

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Please enter a valid email'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      // Handle error silently
    } finally {
      setSubmitting(false)
    }
  }

  const contactCards = [
    {
      icon: MapPin,
      title: 'Office Address',
      lines: ['1234 Industrial Boulevard, Suite 500', 'Construction District'],
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      lines: [
        '+1 (555) 123-4567 (Main)',
        '+1 (555) 123-4568 (Equipment Rental)',
      ],
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      lines: [
        'info@roadsearthworks.com',
        'rentals@roadsearthworks.com',
        'careers@roadsearthworks.com',
      ],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      lines: [
        'Monday - Friday: 7:00 AM - 6:00 PM',
        'Saturday: 8:00 AM - 1:00 PM',
        'Sunday & Holidays: Closed',
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Youtube, label: 'YouTube' },
    { icon: Instagram, label: 'Instagram' },
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-light-grey">
        {/* Page Header */}
        <section className="bg-navy py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Contact Us
            </h1>
            <p className="mt-3 text-lg text-white/70">
              We&apos;re ready to discuss your next project
            </p>
          </div>
        </section>

        {/* Success Message */}
        <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 text-center shadow-lg md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-navy">
              Message Sent Successfully!
            </h2>
            <p className="mt-3 text-concrete/80">
              Thank you for reaching out. Our team will review your message and
              respond within 1-2 business days.
            </p>
            <Button
              className="mt-8 bg-safety-orange hover:bg-safety-orange/90"
              onClick={() => {
                setSubmitted(false)
                setForm({
                  fullName: '',
                  email: '',
                  phone: '',
                  subject: '',
                  message: '',
                })
              }}
            >
              Send Another Message
            </Button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-grey">
      {/* Page Header */}
      <section className="bg-navy py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-white/70">
            We&apos;re ready to discuss your next project
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-md">
              <CardHeader className="border-b border-concrete pb-4">
                <CardTitle className="text-xl text-navy">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactName"
                        placeholder="John Doe"
                        value={form.fullName}
                        onChange={(e) =>
                          updateField('fullName', e.target.value)
                        }
                        className={
                          errors.fullName ? 'border-red-500' : ''
                        }
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={(e) =>
                          updateField('email', e.target.value)
                        }
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={form.phone}
                        onChange={(e) =>
                          updateField('phone', e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactSubject">
                        Subject <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactSubject"
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={(e) =>
                          updateField('subject', e.target.value)
                        }
                        className={
                          errors.subject ? 'border-red-500' : ''
                        }
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactMessage">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="contactMessage"
                      placeholder="Tell us about your project or inquiry..."
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        updateField('message', e.target.value)
                      }
                      className={
                        errors.message ? 'border-red-500' : ''
                      }
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="h-11 w-full bg-safety-orange text-base font-semibold text-white hover:bg-safety-orange/90 sm:w-auto sm:px-10"
                    disabled={submitting}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-6 lg:col-span-2">
            {contactCards.map((card) => {
              const IconComponent = card.icon
              return (
                <Card key={card.title} className="border-0 shadow-md">
                  <CardHeader className="border-b border-concrete pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-navy">
                      <IconComponent className="h-5 w-5 text-safety-orange" />
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {card.lines.map((line) => (
                      <p
                        key={line}
                        className="text-sm text-navy/80 leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              )
            })}

            {/* Emergency Contact */}
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-700">
                🚨 Emergency Contact
              </p>
              <p className="mt-1 text-sm text-red-600">
                For emergencies: <strong>+1 (555) 911-0000</strong> (24/7)
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 overflow-hidden rounded-xl border border-concrete bg-concrete/30">
          <div className="flex h-64 flex-col items-center justify-center md:h-80">
            <MapPin className="h-12 w-12 text-concrete" />
            <p className="mt-3 text-sm font-medium text-navy/50">
              Interactive map would be embedded here
            </p>
            <p className="mt-1 text-xs text-navy/30">
              1234 Industrial Boulevard, Suite 500, Construction District
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-navy/60">Follow Us</p>
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-safety-orange"
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}