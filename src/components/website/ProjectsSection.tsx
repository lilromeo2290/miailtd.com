'use client'

import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  Wrench,
  ListChecks,
  Quote,
  FolderOpen,
  Loader2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { useNavigation } from '@/lib/store'

const categories = [
  'All',
  'Road Construction',
  'Road Rehabilitation',
  'Earthworks',
  'Site Clearing',
  'Drainage',
  'Mining Support',
  'Civil Engineering',
] as const

type ProjectItem = {
  id: string
  slug: string
  title: string
  category: string
  image: string
  location: string
  client: string
  status: 'Completed' | 'Ongoing'
  shortDescription: string
  description: string
  duration: string
  scopeOfWork: string[] | null
  equipmentUsed: string[] | null
  projectOutcomes: string[] | null
  testimonial?: {
    quote: string
    author: string
    role: string
  } | null
}

const statusStyles: Record<string, string> = {
  Completed: 'bg-green-100 text-green-800 border-green-200',
  Ongoing: 'bg-blue-100 text-blue-800 border-blue-200',
}

export default function ProjectsSection() {
  const { selectedProject, setProject } = useNavigation()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null)

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const query = activeCategory === 'All' ? '' : `?category=${encodeURIComponent(activeCategory)}`
        const res = await fetch(`/api/projects${query}`)
        if (res.ok) {
          const data = await res.json()
          setProjects(data)
        }
      } catch {
        setProjects(getMockProjects())
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [activeCategory])

  // Sync selectedProject from store
  useEffect(() => {
    if (selectedProject) {
      const found = projects.find((p) => p.slug === selectedProject || p.id === selectedProject)
      if (found) setSelectedItem(found)
    } else {
      setSelectedItem(null)
    }
  }, [selectedProject, projects])

  const handleBack = () => {
    setProject(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Detail view
  if (selectedItem) {
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
              Back to Projects
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-[420px] overflow-hidden">
          <img
            src={selectedItem.image || '/api/placeholder/1400/600?text=Project'}
            alt={selectedItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 backdrop-blur-sm"
                >
                  {selectedItem.category}
                </Badge>
                <Badge className={`border backdrop-blur-sm ${statusStyles[selectedItem.status]}`}>
                  {selectedItem.status === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {selectedItem.status === 'Ongoing' && <Clock className="w-3 h-3 mr-1" />}
                  {selectedItem.status}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                {selectedItem.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-light-grey rounded-lg p-4">
                  <Building2 className="w-5 h-5 text-safety-orange mb-2" />
                  <p className="text-xs text-steel-grey uppercase tracking-wider">Client</p>
                  <p className="text-sm font-semibold text-navy mt-1">{selectedItem.client}</p>
                </div>
                <div className="bg-light-grey rounded-lg p-4">
                  <MapPin className="w-5 h-5 text-safety-orange mb-2" />
                  <p className="text-xs text-steel-grey uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-navy mt-1">{selectedItem.location}</p>
                </div>
                <div className="bg-light-grey rounded-lg p-4">
                  <Calendar className="w-5 h-5 text-safety-orange mb-2" />
                  <p className="text-xs text-steel-grey uppercase tracking-wider">Duration</p>
                  <p className="text-sm font-semibold text-navy mt-1">{selectedItem.duration}</p>
                </div>
                <div className="bg-light-grey rounded-lg p-4">
                  <FolderOpen className="w-5 h-5 text-safety-orange mb-2" />
                  <p className="text-xs text-steel-grey uppercase tracking-wider">Category</p>
                  <p className="text-sm font-semibold text-navy mt-1">{selectedItem.category}</p>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h2 className="text-xl font-bold text-navy mb-4">Project Overview</h2>
                <p className="text-navy/70 leading-relaxed whitespace-pre-line">
                  {selectedItem.description}
                </p>
              </div>

              <Separator className="bg-concrete" />

              {/* Scope of Work */}
              {selectedItem.scopeOfWork && selectedItem.scopeOfWork.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                    <ListChecks className="w-5 h-5 text-safety-orange" />
                    Scope of Work
                  </h2>
                  <ul className="space-y-3">
                    {selectedItem.scopeOfWork.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-safety-orange mt-0.5 flex-shrink-0" />
                        <span className="text-navy/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Separator className="bg-concrete" />

              {/* Equipment Used */}
              {selectedItem.equipmentUsed && selectedItem.equipmentUsed.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-safety-orange" />
                    Equipment Used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.equipmentUsed.map((equip, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="px-3 py-1.5 text-sm border-concrete text-navy/80 bg-light-grey"
                      >
                        {equip}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator className="bg-concrete" />

              {/* Project Outcomes */}
              {selectedItem.projectOutcomes && selectedItem.projectOutcomes.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-safety-orange" />
                    Project Outcomes
                  </h2>
                  <ul className="space-y-3">
                    {selectedItem.projectOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-safety-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-safety-orange" />
                        </div>
                        <span className="text-navy/70">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Testimonial */}
              {selectedItem.testimonial && (
                <Card className="border-safety-orange/20 bg-navy">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-safety-orange mb-4 opacity-80" />
                    <blockquote className="text-white/90 italic leading-relaxed mb-4">
                      &ldquo;{selectedItem.testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="border-t border-white/20 pt-3">
                      <p className="text-white font-semibold text-sm">
                        {selectedItem.testimonial.author}
                      </p>
                      <p className="text-white/60 text-xs">{selectedItem.testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Info Card */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-navy">Project Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-steel-grey">Category</span>
                      <span className="font-medium text-navy">{selectedItem.category}</span>
                    </div>
                    <Separator className="bg-concrete" />
                    <div className="flex justify-between">
                      <span className="text-steel-grey">Status</span>
                      <Badge className={`text-xs border ${statusStyles[selectedItem.status]}`}>
                        {selectedItem.status}
                      </Badge>
                    </div>
                    <Separator className="bg-concrete" />
                    <div className="flex justify-between">
                      <span className="text-steel-grey">Client</span>
                      <span className="font-medium text-navy text-right max-w-[60%]">{selectedItem.client}</span>
                    </div>
                    <Separator className="bg-concrete" />
                    <div className="flex justify-between">
                      <span className="text-steel-grey">Location</span>
                      <span className="font-medium text-navy text-right max-w-[60%]">{selectedItem.location}</span>
                    </div>
                    <Separator className="bg-concrete" />
                    <div className="flex justify-between">
                      <span className="text-steel-grey">Duration</span>
                      <span className="font-medium text-navy">{selectedItem.duration}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-safety-orange hover:bg-safety-orange/90 text-white mt-4"
                    onClick={() => {
                      setProject(null)
                      // Navigate to quote page
                      const { setPage } = useNavigation.getState()
                      setPage('quote')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Request Similar Project
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Projects Portfolio
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Showcasing our completed and ongoing construction projects
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen className="w-5 h-5 text-steel-grey" />
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

        {/* Project Grid */}
        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="break-inside-avoid overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-28" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 text-concrete mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-navy mb-2">No Projects Found</h3>
            <p className="text-steel-grey">
              No projects available in the &quot;{activeCategory}&quot; category at this time.
            </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {projects.map((item) => (
              <Card
                key={item.id || item.slug}
                className="group break-inside-avoid overflow-hidden hover:shadow-lg transition-all duration-300 border-concrete hover:border-safety-orange/30 cursor-pointer"
                onClick={() => {
                  setProject(item.slug || item.id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || '/api/placeholder/600/400?text=Project'}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <Badge className="text-xs font-medium bg-navy text-white border-0">
                      {item.category}
                    </Badge>
                    <Badge className={`text-xs font-semibold border ${statusStyles[item.status]}`}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-navy group-hover:text-safety-orange transition-colors mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-steel-grey mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                    <span className="text-concrete">|</span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {item.client}
                    </span>
                  </div>
                  <p className="text-navy/60 text-sm leading-relaxed line-clamp-3 mb-4">
                    {item.shortDescription}
                  </p>
                  <Button
                    variant="outline"
                    className="border-safety-orange text-safety-orange hover:bg-safety-orange hover:text-white transition-colors"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Mock data fallback
function getMockProjects(): ProjectItem[] {
  return [
    {
      id: '1',
      slug: 'harare-mutare-highway',
      title: 'Harare-Mutare Highway Duplication',
      category: 'Road Construction',
      image: '/api/placeholder/600/400?text=Harare+Mutare+Highway',
      location: 'Harare to Mutare, Zimbabwe',
      client: 'Ministry of Transport & Infrastructure',
      status: 'Ongoing',
      shortDescription: 'Major highway duplication project spanning 280km, involving earthworks, drainage systems, and asphalt surfacing.',
      description: 'This landmark project involves the full duplication of the Harare-Mutare highway, one of Zimbabwe\'s most critical transport corridors. The project spans 280 kilometers and includes comprehensive earthworks, construction of new drainage systems, installation of culverts and bridges, and full asphalt surfacing.\n\nThe project is being executed in phases to minimize disruption to existing traffic while maintaining the highest construction standards. Our team deployed a fleet of over 30 pieces of heavy machinery and employed over 200 workers during peak construction periods.',
      duration: '24 months (Jan 2024 - Dec 2025)',
      scopeOfWork: [
        'Site clearing and grubbing of 280km corridor',
        'Bulk earthworks: 2.5 million cubic meters cut and fill',
        'Construction of 45 reinforced concrete culverts',
        'Installation of 8 bridge structures',
        'Base course and sub-base construction',
        'Prime coat and tack coat application',
        '50mm asphalt wearing course surfacing',
        'Road marking and signage installation',
        'Construction of 6 passing lanes at key locations',
        'Erosion control and environmental rehabilitation',
      ],
      equipmentUsed: [
        'CAT D8T Bulldozer (x4)',
        'CAT 336F L Excavator (x6)',
        'CAT 140M Motor Grader (x4)',
        'CAT AP1055F Asphalt Paver (x3)',
        'Volvo A30G Dump Truck (x12)',
        'Hamm HD+ 120i Compactor (x4)',
        'CAT 500B Water Bowser (x3)',
      ],
      projectOutcomes: [
        'Improved road safety with dual carriageway',
        'Reduced travel time by estimated 35%',
        'Increased cargo capacity for commercial vehicles',
        'Created 200+ direct employment opportunities',
        'Skills transfer to 50+ local trainees',
      ],
      testimonial: {
        quote: 'Miai Ltd Construction has demonstrated exceptional project management capabilities on this critical national infrastructure project. Their commitment to quality and safety is commendable.',
        author: 'Eng. James Moyo',
        role: 'Chief Engineer, Ministry of Transport',
      },
    },
    {
      id: '2',
      slug: 'bindura-gold-mine-earthworks',
      title: 'Bindura Gold Mine Access Roads',
      category: 'Mining Support',
      image: '/api/placeholder/600/400?text=Bindura+Gold+Mine',
      location: 'Bindura, Zimbabwe',
      client: 'Freda Rebecca Gold Mine',
      status: 'Completed',
      shortDescription: 'Construction of heavy-duty access roads and haul roads for one of Zimbabwe\'s largest gold mining operations.',
      description: 'Miai Ltd Construction was contracted to design and construct a comprehensive road network for the Freda Rebecca Gold Mine expansion project. This included main access roads capable of supporting 100-tonne mining trucks, as well as internal haul roads connecting the open pit to the processing plant.\n\nThe project required specialized compaction techniques to handle extreme axle loads, and innovative drainage solutions to manage water runoff in the mining environment. All work was completed ahead of schedule with zero lost-time injuries.',
      duration: '8 months (Mar 2023 - Oct 2023)',
      scopeOfWork: [
        'Construction of 12km main access road (double seal)',
        'Construction of 8km internal haul roads',
        'Installation of 15 cross-drainage culverts',
        'Construction of reinforced stream crossings (x3)',
        'Sub-grade preparation and compaction to 98% MDD',
        'Application of 150mm crushed stone base course',
        'Double seal surfacing with bituminous premix',
        'Installation of road safety barriers and signage',
        'Ongoing maintenance grading program (6 months)',
      ],
      equipmentUsed: [
        'CAT D8T Bulldozer (x3)',
        'CAT 336F L Excavator (x3)',
        'CAT 140M Motor Grader (x3)',
        'Hamm HD+ 120i Compactor (x5)',
        'Volvo A30G Dump Truck (x8)',
        'CAT 500B Water Bowser (x2)',
      ],
      projectOutcomes: [
        'Completed 2 weeks ahead of schedule',
        'Zero lost-time injuries over 8-month period',
        'Roads designed for 100-tonne axle loads',
        'Passed independent geotechnical audit with distinction',
        'Enabled 20% increase in mine haulage efficiency',
      ],
      testimonial: {
        quote: 'The quality of the haul roads constructed by Miai Ltd has significantly improved our operational efficiency. Their team\'s understanding of mining requirements was impressive.',
        author: 'Michael Ncube',
        role: 'Operations Director, Freda Rebecca Mine',
      },
    },
    {
      id: '3',
      slug: 'chitungwiza-drainage',
      title: 'Chitungwiza Stormwater Drainage System',
      category: 'Drainage',
      image: '/api/placeholder/600/400?text=Chitungwiza+Drainage',
      location: 'Chitungwiza, Zimbabwe',
      client: 'Chitungwiza Municipality',
      status: 'Completed',
      shortDescription: 'Design and construction of a comprehensive stormwater drainage system serving 50,000+ residents in Chitungwiza.',
      description: 'This critical municipal infrastructure project addressed chronic flooding issues in Chitungwiza, Zimbabwe\'s third-largest city. The project involved the design and construction of a complete stormwater drainage system including primary and secondary channels, retention basins, and inlet structures.\n\nThe system was designed using advanced hydrological modeling to handle 1-in-50-year flood events. Community engagement was a key component, with local residents participating in the planning process to ensure the system addressed their specific needs.',
      duration: '14 months (Jun 2022 - Aug 2023)',
      scopeOfWork: [
        'Hydrological assessment and drainage design',
        'Excavation of 18km primary drainage channels',
        'Construction of 12km secondary drainage network',
        'Installation of 3 concrete retention basins',
        'Construction of 85 reinforced concrete inlets',
        'Installation of precast concrete culverts (x22)',
        'Channel lining with concrete and rip-rap',
        'Construction of pedestrian bridges (x6)',
        'Landscaping and rehabilitation of disturbed areas',
      ],
      equipmentUsed: [
        'CAT 320F L Excavator (x5)',
        'CAT D8T Bulldozer (x2)',
        'CAT 950M Wheel Loader (x2)',
        'Volvo A30G Dump Truck (x6)',
        'Hamm HD+ 120i Compactor (x2)',
        'CAT 500B Water Bowser (x2)',
        'Liebherr LTM 1100 Crane (x1)',
      ],
      projectOutcomes: [
        'Eliminated chronic flooding in 3 wards',
        'Improved sanitation and public health outcomes',
        'System designed for 1-in-50-year flood capacity',
        'Created 150+ local jobs during construction',
        'Won Excellence in Civil Engineering Award 2023',
      ],
      testimonial: {
        quote: 'This drainage project has transformed our city. Areas that were constantly flooded during the rainy season are now completely safe. The community is deeply grateful.',
        author: 'Councillor Grace Dube',
        role: 'Chairperson, Chitungwiza Town Council',
      },
    },
    {
      id: '4',
      slug: 'bulawayo-nkayi-road-rehab',
      title: 'Bulawayo-Nkayi Road Rehabilitation',
      category: 'Road Rehabilitation',
      image: '/api/placeholder/600/400?text=Bulawayo+Nkayi+Road',
      location: 'Bulawayo to Nkayi, Zimbabwe',
      client: 'Zimbabwe National Roads Administration (ZINARA)',
      status: 'Completed',
      shortDescription: 'Rehabilitation of 120km deteriorated rural road including re-graveling, drainage improvements, and bridge repairs.',
      description: 'The Bulawayo-Nkayi road is a vital link connecting rural communities in Matabeleland North to Bulawayo, the region\'s largest city. Years of heavy use and insufficient maintenance had left the road in poor condition, significantly affecting access to markets, healthcare, and education.\n\nMiai Ltd was engaged to carry out comprehensive rehabilitation works, including reconstruction of failed sections, improved drainage, bridge repairs, and application of new gravel surfacing. The project included a community-based maintenance training program.',
      duration: '10 months (Apr 2023 - Feb 2024)',
      scopeOfWork: [
        'Road condition assessment and rehabilitation design',
        'Reconstruction of 28km of failed road sections',
        'Grading and reshaping of remaining 92km',
        'Re-graveling with 150mm quality gravel layer',
        'Improvement of 35 drainage structures',
        'Repair of 4 low-level river crossings',
        'Construction of 2 new drifts',
        'Installation of road furniture and signage',
        'Community maintenance training (3 workshops)',
      ],
      equipmentUsed: [
        'CAT 140M Motor Grader (x3)',
        'CAT D8T Bulldozer (x2)',
        'CAT 950M Wheel Loader (x2)',
        'CAT 420F2 Backhoe Loader (x2)',
        'Volvo A30G Dump Truck (x5)',
        'Hamm HD+ 120i Compactor (x2)',
      ],
      projectOutcomes: [
        'Reduced travel time by 45%',
        'Improved road safety for school buses and ambulances',
        'Connected 15,000+ rural residents to markets',
        'Trained 120 community members in road maintenance',
        'All-weather access achieved for the corridor',
      ],
      testimonial: null,
    },
    {
      id: '5',
      slug: 'hwy-industrial-site-prep',
      title: 'Highway Industrial Park Site Preparation',
      category: 'Site Clearing',
      image: '/api/placeholder/600/400?text=Industrial+Park+Site',
      location: 'Harare South, Zimbabwe',
      client: 'Highway Development Corporation',
      status: 'Completed',
      shortDescription: 'Complete site preparation for a 50-hectare industrial park including clearing, grading, and infrastructure installation.',
      description: 'Miai Ltd Construction was responsible for the complete site preparation of a 50-hectare industrial park development in Harare South. The project involved clearing indigenous vegetation, bulk earthworks to achieve design levels, installation of stormwater drainage, and construction of internal road networks.\n\nEnvironmental management was a priority, with comprehensive environmental impact assessments conducted and mitigation measures implemented throughout the project. Topsoil was preserved for later landscaping use.',
      duration: '6 months (Sep 2023 - Feb 2024)',
      scopeOfWork: [
        'Environmental impact assessment and management plan',
        'Clearing and grubbing of 50 hectares',
        'Topsoil stripping and stockpiling (120,000 m³)',
        'Bulk earthworks: 800,000 m³ cut to fill',
        'Fine grading to design levels (±25mm tolerance)',
        'Installation of 4.5km stormwater drainage pipes',
        'Construction of internal road network (3.2km)',
        'Installation of underground utilities ducting',
        'Final landscaping and reinstatement',
      ],
      equipmentUsed: [
        'CAT D8T Bulldozer (x3)',
        'CAT 336F L Excavator (x4)',
        'CAT 140M Motor Grader (x2)',
        'CAT 950M Wheel Loader (x2)',
        'Volvo A30G Dump Truck (x8)',
        'Hamm HD+ 120i Compactor (x3)',
        'CAT 420F2 Backhoe Loader (x2)',
      ],
      projectOutcomes: [
        'Site ready for construction 2 weeks early',
        'Zero environmental incidents',
        'Recycled 95% of cleared vegetation as mulch',
        'Achieved design levels across entire 50ha site',
        'Client praised quality of finished platform',
      ],
      testimonial: {
        quote: 'Miai Ltd delivered an exceptional site preparation package. The platform quality exceeded our expectations and the project was completed ahead of schedule.',
        author: 'David Chen',
        role: 'Project Director, Highway Development Corp',
      },
    },
    {
      id: '6',
      slug: 'mutirikwi-dam-access',
      title: 'Mutirikwi Dam Access Road & Civil Works',
      category: 'Civil Engineering',
      image: '/api/placeholder/600/400?text=Mutirikwi+Dam+Access',
      location: 'Masvingo, Zimbabwe',
      client: 'Zimbabwe National Water Authority (ZINWA)',
      status: 'Ongoing',
      shortDescription: 'Construction of all-weather access road and civil works for the Mutirikwi Dam rehabilitation project.',
      description: 'This multi-disciplinary project supports the major rehabilitation of the Mutirikwi Dam, Zimbabwe\'s second-largest inland water body. Miai Ltd\'s scope includes construction of a 15km all-weather access road, creation of contractor staging areas, and various civil engineering works to support the main dam rehabilitation contractor.\n\nThe project operates in an environmentally sensitive area adjacent to Lake Mutirikwi Recreational Park, requiring strict environmental controls and close coordination with wildlife authorities.',
      duration: '18 months (Nov 2023 - Apr 2025)',
      scopeOfWork: [
        'Construction of 15km all-weather access road',
        'Installation of 4 temporary river crossings',
        'Construction of 2 contractor staging areas (5ha each)',
        'Bulk earthworks for dam access platforms',
        'Construction of sediment control structures',
        'Installation of environmental protection measures',
        'Rehabilitation of existing damaged road sections',
        'Construction of 3 permanent reinforced concrete culverts',
      ],
      equipmentUsed: [
        'CAT D8T Bulldozer (x2)',
        'CAT 336F L Excavator (x3)',
        'CAT 140M Motor Grader (x2)',
        'CAT 950M Wheel Loader (x2)',
        'Volvo A30G Dump Truck (x6)',
        'Hamm HD+ 120i Compactor (x2)',
        'CAT 500B Water Bowser (x1)',
        'Liebherr LTM 1100 Crane (x1)',
      ],
      projectOutcomes: [
        'Provided critical access for dam rehabilitation works',
        'Environmental compliance maintained throughout',
        'Zero wildlife incidents during construction',
        'Created access for emergency services to dam area',
      ],
      testimonial: null,
    },
  ]
}