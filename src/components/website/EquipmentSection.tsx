'use client'

import { useState, useEffect, FormEvent } from 'react'
import {
  ArrowLeft,
  Search,
  Loader2,
  UserCheck,
  CheckCircle2,
  Clock,
  Wrench,
  MapPin,
  Calendar,
  DollarSign,
  Type,
  MessageSquare,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { useNavigation } from '@/lib/store'
import { toast } from 'sonner'

const categories = [
  'All',
  'Excavators',
  'Bulldozers',
  'Motor Graders',
  'Wheel Loaders',
  'Backhoe Loaders',
  'Dump Trucks',
  'Compactors and Rollers',
  'Water Bowsers',
  'Asphalt Pavers',
  'Cranes',
  'Low-Bed Trailers',
] as const

type EquipmentItem = {
  id: string
  slug: string
  name: string
  model: string
  category: string
  image: string
  availability: 'Available' | 'Rented' | 'Maintenance'
  operatingCapacity: string
  dailyRate: number | null
  weeklyRate: number | null
  monthlyRate: number | null
  operatorIncluded: boolean
  specifications: Record<string, string> | null
  description?: string
}

const availabilityStyles: Record<string, string> = {
  Available: 'bg-green-100 text-green-800 border-green-200',
  Rented: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Maintenance: 'bg-red-100 text-red-800 border-red-200',
}

export default function EquipmentSection() {
  const { selectedEquipment, setEquipment, setPage } = useNavigation()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [equipment, setEquipmentList] = useState<EquipmentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null)

  // Inquiry form state
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    rentalPeriod: '',
    projectLocation: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)

  // Fetch equipment
  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true)
      try {
        const query = activeCategory === 'All' ? '' : `?category=${encodeURIComponent(activeCategory)}`
        const res = await fetch(`/api/equipment${query}`)
        if (res.ok) {
          const data = await res.json()
          setEquipmentList(data)
        }
      } catch {
        // Fallback mock data if API not ready
        setEquipmentList(getMockEquipment())
      } finally {
        setLoading(false)
      }
    }
    fetchEquipment()
  }, [activeCategory])

  // Sync selectedEquipment from store
  useEffect(() => {
    if (selectedEquipment) {
      const found = equipment.find((e) => e.slug === selectedEquipment || e.id === selectedEquipment)
      if (found) setSelectedItem(found)
    } else {
      setSelectedItem(null)
    }
  }, [selectedEquipment, equipment])

  const handleBack = () => {
    setEquipment(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmitInquiry = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulated submission
    console.log('Equipment Inquiry Submitted:', {
      equipment: selectedItem?.name,
      equipmentModel: selectedItem?.model,
      ...formData,
    })
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    toast.success('Inquiry submitted successfully!', {
      description: `We'll get back to you about the ${selectedItem?.name} shortly.`,
    })
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      rentalPeriod: '',
      projectLocation: '',
      notes: '',
    })
  }

  // Detail view
  if (selectedItem) {
    const specs = selectedItem.specifications || {}
    return (
      <div className="min-h-screen bg-white">
        {/* Header Bar */}
        <div className="bg-navy text-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:bg-white/10 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Equipment
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image + Specs */}
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden bg-light-grey aspect-[4/3]">
                <img
                  src={selectedItem.image || '/api/placeholder/800/600?text=Equipment'}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-4 right-4 text-sm font-semibold border ${availabilityStyles[selectedItem.availability]}`}
                >
                  {selectedItem.availability}
                </Badge>
              </div>

              {/* Specifications Table */}
              {Object.keys(specs).length > 0 && (
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-navy text-white px-6 py-4 rounded-t-xl">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-safety-orange" />
                        Technical Specifications
                      </h3>
                    </div>
                    <Table>
                      <TableBody>
                        {Object.entries(specs).map(([key, value]) => (
                          <TableRow key={key} className="border-b border-concrete last:border-0">
                            <TableCell className="font-medium text-navy/80 py-3 px-6 bg-light-grey/50 w-2/5">
                              {key}
                            </TableCell>
                            <TableCell className="py-3 px-6 text-navy">{value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right: Info + Form */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-3 text-navy border-concrete">
                  {selectedItem.category}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-navy">
                  {selectedItem.name}
                </h1>
                <p className="text-steel-grey mt-1 text-lg">{selectedItem.model}</p>
                {selectedItem.description && (
                  <p className="text-navy/70 mt-3 leading-relaxed">{selectedItem.description}</p>
                )}
              </div>

              {/* Key Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-light-grey rounded-lg p-4 text-center">
                  <ShieldCheck className="w-5 h-5 text-safety-orange mx-auto mb-1" />
                  <p className="text-xs text-steel-grey uppercase tracking-wider">Capacity</p>
                  <p className="text-sm font-semibold text-navy mt-1">{selectedItem.operatingCapacity}</p>
                </div>
                <div className="bg-light-grey rounded-lg p-4 text-center">
                  <CheckCircle2 className="w-5 h-5 text-safety-orange mx-auto mb-1" />
                  <p className="text-xs text-steel-grey uppercase tracking-wider">Status</p>
                  <p className="text-sm font-semibold text-navy mt-1">{selectedItem.availability}</p>
                </div>
              </div>

              {selectedItem.operatorIncluded && (
                <div className="flex items-center gap-2 bg-safety-orange/10 border border-safety-orange/30 rounded-lg px-4 py-3">
                  <UserCheck className="w-5 h-5 text-safety-orange" />
                  <span className="text-sm font-medium text-navy">Operator Included</span>
                </div>
              )}

              {/* Rates */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-safety-orange" />
                    Rental Rates
                  </h3>
                  <div className="space-y-3">
                    {selectedItem.dailyRate !== null && (
                      <div className="flex justify-between items-center py-2 border-b border-concrete last:border-0">
                        <span className="text-steel-grey">Daily Rate</span>
                        <span className="font-semibold text-navy">${selectedItem.dailyRate?.toLocaleString()}/day</span>
                      </div>
                    )}
                    {selectedItem.weeklyRate !== null && (
                      <div className="flex justify-between items-center py-2 border-b border-concrete last:border-0">
                        <span className="text-steel-grey">Weekly Rate</span>
                        <span className="font-semibold text-navy">${selectedItem.weeklyRate?.toLocaleString()}/week</span>
                      </div>
                    )}
                    {selectedItem.monthlyRate !== null && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-steel-grey">Monthly Rate</span>
                        <span className="font-semibold text-navy">${selectedItem.monthlyRate?.toLocaleString()}/month</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Inquiry Form */}
              <Card className="border-safety-orange/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-safety-orange" />
                    Inquire About This Equipment
                  </h3>
                  <form onSubmit={handleSubmitInquiry} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="eq-fullname" className="text-navy/80">
                          <Type className="w-3.5 h-3.5 inline mr-1.5 text-steel-grey" />
                          Full Name *
                        </Label>
                        <Input
                          id="eq-fullname"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="John Doe"
                          className="border-concrete focus:border-safety-orange"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eq-company" className="text-navy/80">
                          <Building2 className="w-3.5 h-3.5 inline mr-1.5 text-steel-grey" />
                          Company
                        </Label>
                        <Input
                          id="eq-company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Company name"
                          className="border-concrete focus:border-safety-orange"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eq-email" className="text-navy/80">
                          <Mail className="w-3.5 h-3.5 inline mr-1.5 text-steel-grey" />
                          Email *
                        </Label>
                        <Input
                          id="eq-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="border-concrete focus:border-safety-orange"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eq-phone" className="text-navy/80">
                          <Phone className="w-3.5 h-3.5 inline mr-1.5 text-steel-grey" />
                          Phone *
                        </Label>
                        <Input
                          id="eq-phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="border-concrete focus:border-safety-orange"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eq-period" className="text-navy/80">
                        <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-steel-grey" />
                        Rental Period *
                      </Label>
                      <Select
                        value={formData.rentalPeriod}
                        onValueChange={(val) => setFormData({ ...formData, rentalPeriod: val })}
                        required
                      >
                        <SelectTrigger className="border-concrete focus:border-safety-orange">
                          <SelectValue placeholder="Select rental period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eq-location" className="text-navy/80">
                        <MapPin className="w-3.5 h-3.5 inline mr-1.5 text-steel-grey" />
                        Project Location *
                      </Label>
                      <Input
                        id="eq-location"
                        required
                        value={formData.projectLocation}
                        onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                        placeholder="Project site address"
                        className="border-concrete focus:border-safety-orange"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eq-notes" className="text-navy/80">
                        <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 text-steel-grey" />
                        Notes
                      </Label>
                      <Textarea
                        id="eq-notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Any specific requirements or questions..."
                        rows={3}
                        className="border-concrete focus:border-safety-orange resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-safety-orange hover:bg-safety-orange/90 text-white"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Inquiry'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // List/Grid view
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Equipment Rental Fleet
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Rent quality heavy equipment maintained to the highest standards. From excavators to
            dump trucks, we have the right machinery for your construction project.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-steel-grey" />
            <span className="text-sm font-medium text-steel-grey uppercase tracking-wider">
              Filter by Category
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                onClick={() => setActiveCategory(cat)}
                className={
                  activeCategory === cat
                    ? 'bg-safety-orange hover:bg-safety-orange/90 text-white border-safety-orange'
                    : 'border-concrete text-navy/70 hover:border-safety-orange hover:text-safety-orange'
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Equipment Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : equipment.length === 0 ? (
          <div className="text-center py-20">
            <Wrench className="w-16 h-16 text-concrete mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-navy mb-2">No Equipment Found</h3>
            <p className="text-steel-grey">
              No equipment available in the &quot;{activeCategory}&quot; category at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <Card
                key={item.id || item.slug}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-concrete hover:border-safety-orange/30"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || '/api/placeholder/600/400?text=Equipment'}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge
                    className={`absolute top-3 right-3 text-xs font-semibold border ${availabilityStyles[item.availability]}`}
                  >
                    {item.availability === 'Available' && (
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                    )}
                    {item.availability === 'Rented' && (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {item.availability === 'Maintenance' && (
                      <Wrench className="w-3 h-3 mr-1" />
                    )}
                    {item.availability}
                  </Badge>
                  {item.operatorIncluded && (
                    <Badge className="absolute top-3 left-3 bg-navy text-white text-xs border-0">
                      <UserCheck className="w-3 h-3 mr-1" />
                      Operator Included
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5">
                  <Badge
                    variant="outline"
                    className="mb-3 text-xs border-concrete text-steel-grey"
                  >
                    {item.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-navy group-hover:text-safety-orange transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-steel-grey text-sm mt-1">{item.model}</p>
                  <p className="text-navy/60 text-sm mt-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-safety-orange" />
                    {item.operatingCapacity}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {item.dailyRate !== null && (
                      <span className="bg-light-grey text-navy/70 px-2.5 py-1 rounded-md font-medium">
                        ${item.dailyRate?.toLocaleString()}/day
                      </span>
                    )}
                    {item.weeklyRate !== null && (
                      <span className="bg-light-grey text-navy/70 px-2.5 py-1 rounded-md font-medium">
                        ${item.weeklyRate?.toLocaleString()}/wk
                      </span>
                    )}
                    {item.monthlyRate !== null && (
                      <span className="bg-light-grey text-navy/70 px-2.5 py-1 rounded-md font-medium">
                        ${item.monthlyRate?.toLocaleString()}/mo
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="px-5 pb-5 pt-0">
                  <Button
                    className="w-full bg-safety-orange hover:bg-safety-orange/90 text-white"
                    onClick={() => {
                      setEquipment(item.slug || item.id)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Inquire Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Mock data fallback
function getMockEquipment(): EquipmentItem[] {
  return [
    {
      id: '1',
      slug: 'cat-320-excavator',
      name: 'CAT 320 Excavator',
      model: 'CAT 320F L',
      category: 'Excavators',
      image: '/api/placeholder/600/400?text=CAT+320+Excavator',
      availability: 'Available',
      operatingCapacity: '20-ton operating weight, 1.19 m³ bucket',
      dailyRate: 850,
      weeklyRate: 4500,
      monthlyRate: 15000,
      operatorIncluded: true,
      specifications: {
        'Operating Weight': '20,900 kg',
        'Engine Power': '121 HP',
        'Max Digging Depth': '6,660 mm',
        'Bucket Capacity': '1.19 m³',
        'Max Reach': '9,850 mm',
        'Tail Swing Radius': '1,750 mm',
      },
      description: 'The CAT 320F L is a versatile excavator ideal for general construction, trenching, and material handling.',
    },
    {
      id: '2',
      slug: 'cat-d8t-bulldozer',
      name: 'CAT D8T Bulldozer',
      model: 'CAT D8T',
      category: 'Bulldozers',
      image: '/api/placeholder/600/400?text=CAT+D8T+Bulldozer',
      availability: 'Available',
      operatingCapacity: '38-ton operating weight, SU blade',
      dailyRate: 1200,
      weeklyRate: 6500,
      monthlyRate: 22000,
      operatorIncluded: true,
      specifications: {
        'Operating Weight': '38,000 kg',
        'Engine Power': '310 HP',
        'Blade Capacity': '7.8 m³',
        'Ground Pressure': '69 kPa',
        'Track Length': '3,840 mm',
        'Max Speed': '11.3 km/h',
      },
      description: 'The CAT D8T is designed for heavy dozing, fine grading, and land clearing operations.',
    },
    {
      id: '3',
      slug: 'cat-140m-grader',
      name: 'CAT 140M Motor Grader',
      model: 'CAT 140M AWD',
      category: 'Motor Graders',
      image: '/api/placeholder/600/400?text=CAT+140M+Grader',
      availability: 'Rented',
      operatingCapacity: '14M blade, AWD configuration',
      dailyRate: 950,
      weeklyRate: 5200,
      monthlyRate: 18000,
      operatorIncluded: true,
      specifications: {
        'Operating Weight': '23,600 kg',
        'Engine Power': '215 HP',
        'Blade Length': '4,270 mm',
        'Moldboard Width': '4,270 mm',
        'Max Speed': '44.7 km/h',
        'Turning Radius': '7.8 m',
      },
    },
    {
      id: '4',
      slug: 'cat-950m-wheel-loader',
      name: 'CAT 950M Wheel Loader',
      model: 'CAT 950M',
      category: 'Wheel Loaders',
      image: '/api/placeholder/600/400?text=CAT+950M+Loader',
      availability: 'Available',
      operatingCapacity: '4.3 m³ bucket capacity',
      dailyRate: 780,
      weeklyRate: 4200,
      monthlyRate: 14000,
      operatorIncluded: false,
      specifications: {
        'Operating Weight': '28,500 kg',
        'Engine Power': '260 HP',
        'Bucket Capacity': '4.3 m³',
        'Breakout Force': '174 kN',
        'Max Speed': '39.6 km/h',
        'Dump Height': '3,050 mm',
      },
    },
    {
      id: '5',
      slug: 'cat-420f2-backhoe',
      name: 'CAT 420F2 Backhoe Loader',
      model: 'CAT 420F2',
      category: 'Backhoe Loaders',
      image: '/api/placeholder/600/400?text=CAT+420F2+Backhoe',
      availability: 'Maintenance',
      operatingCapacity: '1.0 m³ backhoe bucket',
      dailyRate: 450,
      weeklyRate: 2500,
      monthlyRate: 8500,
      operatorIncluded: false,
      specifications: {
        'Operating Weight': '8,600 kg',
        'Engine Power': '97 HP',
        'Backhoe Dig Depth': '5,820 mm',
        'Loader Bucket': '1.0 m³',
        'Loader Breakout': '59 kN',
        'Max Speed': '36 km/h',
      },
    },
    {
      id: '6',
      slug: 'volvo-a30g-dump-truck',
      name: 'Volvo A30G Dump Truck',
      model: 'Volvo A30G Articulated',
      category: 'Dump Trucks',
      image: '/api/placeholder/600/400?text=Volvo+A30G+Dump+Truck',
      availability: 'Available',
      operatingCapacity: '28-ton payload capacity',
      dailyRate: 1100,
      weeklyRate: 6000,
      monthlyRate: 20000,
      operatorIncluded: true,
      specifications: {
        'Operating Weight': '54,800 kg',
        'Payload Capacity': '28,000 kg',
        'Engine Power': '346 HP',
        'Heaped Capacity': '17.7 m³',
        'Max Speed': '53 km/h',
        'Turning Radius': '8.1 m',
      },
    },
    {
      id: '7',
      slug: 'hamm-hd-120-compactor',
      name: 'Hamm HD+ 120i Compactor',
      model: 'Hamm HD+ 120i VO',
      category: 'Compactors and Rollers',
      image: '/api/placeholder/600/400?text=Hamm+HD+120i+Compactor',
      availability: 'Available',
      operatingCapacity: '12-ton drum weight, 2.13m drum width',
      dailyRate: 520,
      weeklyRate: 2800,
      monthlyRate: 9500,
      operatorIncluded: false,
      specifications: {
        'Operating Weight': '12,300 kg',
        'Drum Width': '2,130 mm',
        'Drum Diameter': '1,500 mm',
        'Centrifugal Force': '270 kN',
        'Frequency': '30/38 Hz',
        'Amplitude': '1.8/0.9 mm',
      },
    },
    {
      id: '8',
      slug: 'cat-500b-water-bowser',
      name: 'CAT 500B Water Bowser',
      model: 'CAT 500B (15,000L)',
      category: 'Water Bowsers',
      image: '/api/placeholder/600/400?text=CAT+500B+Water+Bowser',
      availability: 'Rented',
      operatingCapacity: '15,000L water tank',
      dailyRate: 380,
      weeklyRate: 2000,
      monthlyRate: 7000,
      operatorIncluded: true,
      specifications: {
        'Tank Capacity': '15,000 Liters',
        'Pump Capacity': '1,500 L/min',
        'Spray Bar Width': '6,000 mm',
        'Chassis': 'CAT 500B',
        'Engine Power': '75 HP',
        'Max Speed': '40 km/h',
      },
    },
    {
      id: '9',
      slug: 'cat-ap1055f-paver',
      name: 'CAT AP1055F Asphalt Paver',
      model: 'CAT AP1055F',
      category: 'Asphalt Pavers',
      image: '/api/placeholder/600/400?text=CAT+AP1055F+Paver',
      availability: 'Available',
      operatingCapacity: '10m paving width, 300 tph capacity',
      dailyRate: 1300,
      weeklyRate: 7000,
      monthlyRate: 24000,
      operatorIncluded: true,
      specifications: {
        'Operating Weight': '19,300 kg',
        'Engine Power': '174 HP',
        'Paving Width': '2.5 - 10.0 m',
        'Paving Speed': '0 - 20 m/min',
        'Layer Thickness': '15 - 300 mm',
        'Hopper Capacity': '14.5 tonnes',
      },
    },
    {
      id: '10',
      slug: 'liebherr-ltm1100-crane',
      name: 'Liebherr LTM 1100-4.2 Crane',
      model: 'Liebherr LTM 1100-4.2',
      category: 'Cranes',
      image: '/api/placeholder/600/400?text=Liebherr+LTM+1100+Crane',
      availability: 'Available',
      operatingCapacity: '100-ton maximum lifting capacity',
      dailyRate: 2500,
      weeklyRate: 14000,
      monthlyRate: 48000,
      operatorIncluded: true,
      specifications: {
        'Max Lifting Capacity': '100 tonnes',
        'Max Boom Length': '52 m',
        'Max Jib Length': '19 m',
        'Axle Load': '12 t',
        'Engine Power': '367 HP',
        'Counterweight': '34.4 tonnes',
      },
    },
    {
      id: '11',
      slug: 'man-lowbed-trailer',
      name: 'MAN TGS 41.480 Low-Bed',
      model: 'MAN TGS 41.480 + 60T Trailer',
      category: 'Low-Bed Trailers',
      image: '/api/placeholder/600/400?text=MAN+LowBed+Trailer',
      availability: 'Available',
      operatingCapacity: '60-ton payload, multi-axle trailer',
      dailyRate: 680,
      weeklyRate: 3800,
      monthlyRate: 13000,
      operatorIncluded: true,
      specifications: {
        'Payload Capacity': '60,000 kg',
        'Trailer Axles': '5 axles',
        'Engine Power': '480 HP',
        'Platform Length': '12,500 mm',
        'Platform Width': '3,000 mm',
        'Max Speed': '80 km/h',
      },
    },
    {
      id: '12',
      slug: 'cat-336-excavator',
      name: 'CAT 336 Excavator',
      model: 'CAT 336F L',
      category: 'Excavators',
      image: '/api/placeholder/600/400?text=CAT+336+Excavator',
      availability: 'Available',
      operatingCapacity: '36-ton operating weight, 1.92 m³ bucket',
      dailyRate: 1100,
      weeklyRate: 5800,
      monthlyRate: 19500,
      operatorIncluded: true,
      specifications: {
        'Operating Weight': '36,400 kg',
        'Engine Power': '202 HP',
        'Max Digging Depth': '7,380 mm',
        'Bucket Capacity': '1.92 m³',
        'Max Reach': '11,060 mm',
        'Tail Swing Radius': '2,060 mm',
      },
    },
  ]
}