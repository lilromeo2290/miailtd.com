'use client'

import { useState, useRef, type FormEvent } from 'react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Upload,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  FileText,
} from 'lucide-react'

const SERVICE_OPTIONS = [
  'Road Construction',
  'Road Rehabilitation',
  'Earthworks',
  'Excavation',
  'Site Clearing',
  'Drainage',
  'Land Grading',
  'Asphalt Paving',
  'Civil Engineering',
  'Mining Support',
  'Equipment Rental',
  'Other',
]

const DURATION_OPTIONS = [
  'Less than 1 month',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'More than 12 months',
  'Not sure',
]

interface FormData {
  fullName: string
  company: string
  email: string
  phone: string
  service: string
  equipment: string
  location: string
  description: string
  duration: string
  startDate: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  location?: string
  description?: string
}

export default function QuoteSection() {
  const { currentPage } = useNavigation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState<FormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    equipment: '',
    location: '',
    description: '',
    duration: '',
    startDate: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  if (currentPage !== 'quote') return null

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
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!form.location.trim()) newErrors.location = 'Project location is required'
    if (!form.description.trim())
      newErrors.description = 'Project description is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      await fetch('/api/quote', {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) setFileName(file.name)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-light-grey">
        {/* Page Header */}
        <section className="bg-navy py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Request a Quote
            </h1>
            <p className="mt-3 text-lg text-white/70">
              Tell us about your project and we&apos;ll get back to you within
              24 hours
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
              Quote Request Submitted!
            </h2>
            <p className="mt-3 text-concrete/80">
              Thank you for your interest. Our team will review your project
              details and get back to you within 24 hours with a comprehensive
              quotation.
            </p>
            <Button
              className="mt-8 bg-safety-orange hover:bg-safety-orange/90"
              onClick={() => {
                setSubmitted(false)
                setForm({
                  fullName: '',
                  company: '',
                  email: '',
                  phone: '',
                  service: '',
                  equipment: '',
                  location: '',
                  description: '',
                  duration: '',
                  startDate: '',
                })
                setFileName('')
              }}
            >
              Submit Another Quote
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
            Request a Quote
          </h1>
          <p className="mt-3 text-lg text-white/70">
            Tell us about your project and we&apos;ll get back to you within 24
            hours
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Your Details */}
              <Card className="border-0 shadow-md">
                <CardHeader className="border-b border-concrete pb-4">
                  <CardTitle className="text-xl text-navy">
                    Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
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
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Your Company Ltd"
                        value={form.company}
                        onChange={(e) =>
                          updateField('company', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
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
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={form.phone}
                        onChange={(e) =>
                          updateField('phone', e.target.value)
                        }
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Project Details */}
              <Card className="border-0 shadow-md">
                <CardHeader className="border-b border-concrete pb-4">
                  <CardTitle className="text-xl text-navy">
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="service">Type of Service</Label>
                      <Select
                        value={form.service}
                        onValueChange={(v) => updateField('service', v)}
                      >
                        <SelectTrigger id="service" className="w-full">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="equipment">Equipment Needed</Label>
                      <Input
                        id="equipment"
                        placeholder="e.g. Excavators, Dump Trucks"
                        value={form.equipment}
                        onChange={(e) =>
                          updateField('equipment', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Project Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      placeholder="Address or area of the project"
                      value={form.location}
                      onChange={(e) =>
                        updateField('location', e.target.value)
                      }
                      className={
                        errors.location ? 'border-red-500' : ''
                      }
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500">
                        {errors.location}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Project Description{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project requirements, scope of work, and any special considerations..."
                      rows={4}
                      value={form.description}
                      onChange={(e) =>
                        updateField('description', e.target.value)
                      }
                      className={
                        errors.description ? 'border-red-500' : ''
                      }
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Estimated Duration</Label>
                      <Select
                        value={form.duration}
                        onValueChange={(v) => updateField('duration', v)}
                      >
                        <SelectTrigger id="duration" className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {DURATION_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Preferred Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={form.startDate}
                        onChange={(e) =>
                          updateField('startDate', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Attachments */}
              <Card className="border-0 shadow-md">
                <CardHeader className="border-b border-concrete pb-4">
                  <CardTitle className="text-xl text-navy">
                    Attachments
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-concrete bg-white/50 p-8 transition-colors hover:border-safety-orange/50 hover:bg-safety-orange/5"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-10 w-10 text-concrete" />
                    {fileName ? (
                      <div className="mt-3 text-center">
                        <p className="font-medium text-navy">{fileName}</p>
                        <p className="mt-1 text-sm text-concrete/70">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3 text-center">
                        <p className="font-medium text-navy">
                          Upload drawings or specifications
                        </p>
                        <p className="mt-1 text-sm text-concrete/70">
                          Drag & drop or click to browse
                        </p>
                        <p className="mt-1 text-xs text-concrete/50">
                          PDF, DWG, JPG, PNG (max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.dwg,.jpg,.png"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                className="h-12 w-full bg-safety-orange text-base font-semibold text-white hover:bg-safety-orange/90"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Quote Request'}
              </Button>
            </form>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Why Choose Us */}
            <Card className="border-0 shadow-md">
              <CardHeader className="border-b border-concrete pb-4">
                <CardTitle className="text-lg text-navy">
                  Why Choose Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                {[
                  'Over 20 years of industry experience',
                  'Competitive and transparent pricing',
                  'Fully licensed and insured operations',
                  'Dedicated project management team',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-safety-orange" />
                    <span className="text-sm text-navy/80">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="border-0 shadow-md">
              <CardHeader className="border-b border-concrete pb-4">
                <CardTitle className="text-lg text-navy">
                  Quick Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-safety-orange" />
                  <div>
                    <p className="text-sm font-medium text-navy">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-xs text-concrete/70">Main Office</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-safety-orange" />
                  <div>
                    <p className="text-sm font-medium text-navy">
                      quotes@roadsearthworks.com
                    </p>
                    <p className="text-xs text-concrete/70">
                      For quote inquiries
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-safety-orange" />
                  <div>
                    <p className="text-sm font-medium text-navy">
                      Mon - Fri: 7:00 AM - 6:00 PM
                    </p>
                    <p className="text-xs text-concrete/70">Office hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Our Process */}
            <Card className="border-0 shadow-md">
              <CardHeader className="border-b border-concrete pb-4">
                <CardTitle className="text-lg text-navy">
                  Our Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-5">
                {[
                  {
                    num: '1',
                    title: 'Submit Request',
                    desc: 'Fill out the form with your project details',
                  },
                  {
                    num: '2',
                    title: 'We Review',
                    desc: 'Our team assesses your requirements',
                  },
                  {
                    num: '3',
                    title: 'Receive Your Quote',
                    desc: 'Get a detailed quote within 24 hours',
                  },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-safety-orange text-sm font-bold text-white">
                      {step.num}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-xs text-concrete/70">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}