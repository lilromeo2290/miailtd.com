import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // Seed Services
  const services = [
    {
      slug: 'road-construction',
      title: 'Road Construction',
      shortDesc: 'Full-scale road construction from sub-grade preparation to final surfacing, delivering durable infrastructure built to last.',
      description: 'Our road construction division delivers complete highway and arterial road projects from initial survey and design through to final surfacing. We employ modern construction methodologies including mechanized earthworks, proper drainage integration, and quality-controlled asphalt laying to ensure every road meets or exceeds design specifications and regulatory standards. Our teams have extensive experience working on both public infrastructure projects and private developments, consistently delivering on time and within budget.',
      scope: JSON.stringify(['Site survey and route planning', 'Sub-grade preparation and stabilization', 'Base and sub-base course laying', 'Asphalt/concrete surface laying', 'Road marking and signage', 'Shoulder construction', 'Drainage integration']),
      benefits: JSON.stringify(['Durable, long-lasting road surfaces', 'Compliance with national road standards', 'Minimal disruption to surrounding areas', 'Comprehensive quality assurance', 'On-time project delivery']),
      equipment: JSON.stringify(['Motor Graders', 'Asphalt Pavers', 'Rollers & Compactors', 'Dump Trucks', 'Water Bowsers']),
      icon: 'Route',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
      order: 1,
      faqs: JSON.stringify([
        { q: 'What types of roads do you construct?', a: 'We construct all road types including highways, urban roads, rural access roads, industrial roads, and estate roads.' },
        { q: 'Do you handle road design as well?', a: 'Yes, we offer full design-build services or can work from client-provided engineering designs.' },
        { q: 'What is the typical timeline for a road project?', a: 'Timelines vary based on scope. A 5km rural road typically takes 3-6 months, while major highway projects can take 12-24 months.' }
      ])
    },
    {
      slug: 'road-rehabilitation',
      title: 'Road Rehabilitation & Maintenance',
      shortDesc: 'Restore aging road infrastructure to optimal condition with our comprehensive rehabilitation and maintenance solutions.',
      description: 'Aging road networks require expert rehabilitation to restore safety and functionality. Our rehabilitation services cover everything from pothole patching and surface resealing to complete road reconstruction. We conduct thorough condition assessments using modern survey techniques, then develop targeted rehabilitation plans that maximize road life while optimizing budget allocation. Our preventive maintenance programs help extend road service life and reduce long-term costs.',
      scope: JSON.stringify(['Road condition assessment', 'Pothole repair and patching', 'Surface resealing and overlay', 'Full-depth reclamation', 'Pavement recycling', 'Shoulder repair and drainage maintenance']),
      benefits: JSON.stringify(['Extended road service life', 'Cost-effective compared to new construction', 'Minimized traffic disruption', 'Data-driven maintenance planning', 'Sustainable material recycling']),
      equipment: JSON.stringify(['Cold Milling Machines', 'Asphalt Pavers', 'Rollers', 'Patch Trucks', 'Sweepers']),
      icon: 'Wrench',
      image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=800&q=80',
      order: 2,
      faqs: JSON.stringify([
        { q: 'How do you assess which rehabilitation method is needed?', a: 'We conduct detailed pavement condition surveys including visual inspection, deflection testing, and core sampling to determine the most appropriate treatment.' },
        { q: 'Can you work on live traffic roads?', a: 'Yes, we have extensive experience with traffic management and can implement rehabilitation with minimal disruption using lane closures and off-peak scheduling.' }
      ])
    },
    {
      slug: 'earthworks',
      title: 'Earthworks',
      shortDesc: 'Precision earthworks for site development, road formation, and large-scale land modification projects.',
      description: 'Our earthworks division handles projects of all scales, from small residential site preparations to massive civil engineering earthworks. Using advanced GPS-guided machinery and experienced operators, we achieve precise cut-and-fill operations that meet exact design specifications. Our fleet of excavators, bulldozers, and motor graders enables us to move millions of cubic meters of material efficiently while maintaining strict environmental and safety standards.',
      scope: JSON.stringify(['Bulk excavation and filling', 'Cut and fill operations', 'Embankment construction', 'Borrow pit development', 'Soil stabilization', 'Erosion control']),
      benefits: JSON.stringify(['GPS-guided precision grading', 'Large-scale capacity', 'Experienced operators', 'Environmental compliance', 'Competitive rates per cubic meter']),
      equipment: JSON.stringify(['Excavators (20t-45t)', 'Bulldozers', 'Motor Graders', 'Dump Trucks (20t-40t)', 'Compactors']),
      icon: 'Mountain',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80',
      order: 3,
      faqs: JSON.stringify([
        { q: 'What is the maximum volume of earthworks you can handle?', a: 'We have the capacity to move over 50,000 cubic meters per month using our combined fleet.' },
        { q: 'Do you provide cut-and-fill balance analysis?', a: 'Yes, our engineering team provides detailed mass haul diagrams and optimization plans.' }
      ])
    },
    {
      slug: 'excavation',
      title: 'Excavation & Trenching',
      shortDesc: 'Expert excavation services for foundations, trenches, utility installations, and below-ground construction.',
      description: 'From building foundations to deep utility trenches, our excavation services cover all below-ground construction requirements. We operate a fleet of excavators ranging from compact 5-ton machines for tight urban spaces to 45-ton machines for major earthmoving operations. All our operators are trained in safe excavation practices, including shoring and trench safety, ensuring compliance with occupational health and safety regulations.',
      scope: JSON.stringify(['Foundation excavation', 'Trenching for utilities', 'Basement excavation', 'Swimming pool excavation', 'Pipeline trenching', 'Storm water drainage excavation']),
      benefits: JSON.stringify(['Wide range of machine sizes', 'Trained safety-conscious operators', 'Precise excavation to grade', 'Shoring and support systems', 'Quick mobilization']),
      equipment: JSON.stringify(['Excavators (5t-45t)', 'Backhoe Loaders', 'Dump Trucks', 'Trenchers', 'Dewatering Pumps']),
      icon: 'Pickaxe',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      order: 4,
      faqs: JSON.stringify([
        { q: 'What safety measures do you implement for deep excavations?', a: 'We implement comprehensive shoring systems, benching/sloping, daily trench inspections, and atmospheric monitoring as required by OSHA standards.' },
        { q: 'Can you handle rock excavation?', a: 'Yes, we have hydraulic breakers and ripping attachments for rock excavation, and can arrange controlled blasting when required.' }
      ])
    },
    {
      slug: 'site-clearing',
      title: 'Site Clearing & Preparation',
      shortDesc: 'Complete site clearing, vegetation removal, and ground preparation to get your project ready for construction.',
      description: 'Proper site preparation is the foundation of every successful construction project. Our site clearing services include vegetation removal, demolition of existing structures, topsoil stripping, and initial grading. We work efficiently to prepare sites of all sizes, from small residential plots to large commercial and industrial developments. Our team handles all environmental considerations including protected species assessments, erosion prevention, and proper disposal of cleared materials.',
      scope: JSON.stringify(['Vegetation and tree clearing', 'Demolition of existing structures', 'Topsoil stripping and stockpiling', 'Debris removal and disposal', 'Initial site grading', 'Erosion control measures', 'Site fencing and security']),
      benefits: JSON.stringify(['Fast site readiness', 'Environmental compliance', 'Proper waste management', 'Comprehensive preparation', 'Single-contractor convenience']),
      equipment: JSON.stringify(['Bulldozers', 'Excavators', 'Feller Bunchers', 'Grapple Skidders', 'Dump Trucks']),
      icon: 'Trees',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
      order: 5,
      faqs: JSON.stringify([])
    },
    {
      slug: 'drainage',
      title: 'Drainage & Culvert Installation',
      shortDesc: 'Design and install effective drainage systems and culverts to protect infrastructure and manage water flow.',
      description: 'Effective drainage is critical for infrastructure longevity. Our drainage team designs and constructs comprehensive surface and subsurface drainage systems, including culverts, stormwater channels, French drains, and detention basins. We ensure all drainage works integrate properly with road construction and site development projects, managing water flow to prevent erosion, flooding, and structural damage.',
      scope: JSON.stringify(['Stormwater drainage systems', 'Culvert installation (RCP, HDPE, corrugated steel)', 'French drains', 'Retention and detention basins', 'Channel construction and lining', 'Drop structures and energy dissipaters']),
      benefits: JSON.stringify(['Prevents infrastructure damage', 'Manages stormwater effectively', 'Complies with drainage regulations', 'Integrated with road design', 'Long-term durability']),
      equipment: JSON.stringify(['Excavators', 'Backhoe Loaders', 'Dump Trucks', 'Concrete Mixers', 'Compactors']),
      icon: 'Waves',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80',
      order: 6,
      faqs: JSON.stringify([])
    },
    {
      slug: 'grading',
      title: 'Land Grading & Compaction',
      shortDesc: 'Precision land grading and professional compaction to create stable, properly contoured surfaces.',
      description: 'Our land grading and compaction services ensure that every surface we prepare meets precise design specifications. Using GPS-guided motor graders and a range of compaction equipment, we achieve accurate levels and slopes for roads, building pads, parking areas, and landscapes. Proper compaction is essential for structural integrity, and our quality control processes include regular density testing to verify compaction meets project requirements.',
      scope: JSON.stringify(['Rough and fine grading', 'Building pad preparation', 'Parking area grading', 'Road formation grading', 'Landscape grading', 'Compaction quality control and testing']),
      benefits: JSON.stringify(['GPS-guided precision', 'Proper compaction for structural integrity', 'Quality verified by density testing', 'Suitable for all surface types', 'Efficient completion']),
      equipment: JSON.stringify(['Motor Graders (GPS-equipped)', 'Vibratory Rollers', 'Pneumatic Tire Rollers', 'Plate Compactors', 'Laser Levels']),
      icon: 'Layers',
      image: 'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&q=80',
      order: 7,
      faqs: JSON.stringify([])
    },
    {
      slug: 'asphalt-paving',
      title: 'Asphalt Paving',
      shortDesc: 'Quality asphalt paving for roads, parking lots, driveways, and industrial surfaces.',
      description: 'Our asphalt paving division delivers high-quality surfacing solutions for projects of all sizes. From highways and arterial roads to parking lots and private driveways, we use premium asphalt mixes and state-of-the-art paving equipment to achieve smooth, durable surfaces. Our quality control includes temperature monitoring, compaction testing, and surface tolerance verification to ensure every paved surface meets the required specifications.',
      scope: JSON.stringify(['Hot mix asphalt paving', 'Cold mix asphalt', 'Asphalt overlay and resurfacing', 'Parking lot construction', 'Driveway installation', 'Speed bump and traffic calming features']),
      benefits: JSON.stringify(['Smooth, durable surfaces', 'Temperature-controlled laying', 'Proper compaction guaranteed', 'Variety of mix designs available', 'Experienced paving crews']),
      equipment: JSON.stringify(['Asphalt Pavers', 'Rollers (tandem & pneumatic)', 'Asphalt Distributors', 'Screeds', 'Temperature Sensors']),
      icon: 'Road',
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80',
      order: 8,
      faqs: JSON.stringify([])
    },
    {
      slug: 'civil-engineering',
      title: 'Civil Engineering Services',
      shortDesc: 'Comprehensive civil engineering solutions from design consultation through project completion.',
      description: 'Beyond our specialized construction services, we offer full civil engineering capabilities. Our engineering team provides feasibility studies, detailed designs, project management, and construction supervision across all civil infrastructure domains. We work closely with government agencies, private developers, and industrial clients to deliver projects that meet technical requirements, regulatory standards, and budget constraints.',
      scope: JSON.stringify(['Feasibility studies and site investigations', 'Engineering design and drawings', 'Project management and supervision', 'Quality assurance and quality control', 'Contract administration', 'Environmental impact assessments']),
      benefits: JSON.stringify(['End-to-end project capability', 'Experienced engineering team', 'Regulatory compliance expertise', 'Integrated design-build approach', 'Value engineering for cost optimization']),
      equipment: JSON.stringify(['Survey Equipment', 'Testing Laboratory Equipment', 'All construction fleet available']),
      icon: 'Compass',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      order: 9,
      faqs: JSON.stringify([])
    },
    {
      slug: 'mining-support',
      title: 'Mining Support Services',
      shortDesc: 'Specialized earthworks and equipment support for mining operations and mine infrastructure.',
      description: 'We provide critical earthworks and equipment support services to mining operations. Our mining support includes haul road construction and maintenance, mine site preparation, tailings dam construction, and rehabilitation of mined areas. With our fleet of heavy equipment and experienced operators accustomed to the demanding conditions of mining environments, we help mining companies maintain efficient operations while meeting their environmental and safety obligations.',
      scope: JSON.stringify(['Haul road construction and maintenance', 'Mine site preparation', 'Bench and pit development', 'Tailings dam construction', 'Mine rehabilitation and closure', 'Overburden removal']),
      benefits: JSON.stringify(['Mining-experienced operators', 'Heavy-duty equipment fleet', 'Safety-first approach', 'Flexible mobilization', 'Production-focused operations']),
      equipment: JSON.stringify(['Large Excavators (35t-45t)', 'Bulldozers (D8-D11)', 'Articulated Dump Trucks', 'Graders', 'Compactors']),
      icon: 'HardHat',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      order: 10,
      faqs: JSON.stringify([])
    }
  ]

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    })
  }

  // Seed Equipment
  const equipmentList = [
    {
      slug: 'cat-320-excavator',
      name: 'CAT 320 Excavator',
      category: 'Excavators',
      model: 'CAT 320 GC',
      description: 'Versatile 20-ton hydraulic excavator ideal for general excavation, trenching, and material handling. Equipped with GPS grade control for precise operations.',
      specifications: JSON.stringify({ 'Operating Weight': '20,200 kg', 'Engine Power': '121 HP', 'Bucket Capacity': '0.95 m³', 'Max Dig Depth': '6,670 mm', 'Max Reach': '9,490 mm', 'Travel Speed': '5.5 km/h' }),
      operatingCap: '20,200 kg operating weight, 0.95 m³ bucket',
      availability: 'Available',
      dailyRate: 850,
      weeklyRate: 4500,
      monthlyRate: 15000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 1,
    },
    {
      slug: 'komatsu-pc200-excavator',
      name: 'Komatsu PC200-8 Excavator',
      category: 'Excavators',
      model: 'Komatsu PC200-8',
      description: 'Reliable 20-ton class excavator with excellent fuel efficiency and powerful digging performance. Perfect for road construction and earthworks.',
      specifications: JSON.stringify({ 'Operating Weight': '19,900 kg', 'Engine Power': '114 HP', 'Bucket Capacity': '0.91 m³', 'Max Dig Depth': '6,640 mm', 'Max Reach': '9,380 mm', 'Fuel Tank': '370 L' }),
      operatingCap: '19,900 kg, 0.91 m³ bucket',
      availability: 'Available',
      dailyRate: 800,
      weeklyRate: 4200,
      monthlyRate: 14000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 2,
    },
    {
      slug: 'cat-d8-bulldozer',
      name: 'CAT D8T Bulldozer',
      category: 'Bulldozers',
      model: 'CAT D8T',
      description: 'Powerful 38-ton track-type bulldozer designed for heavy earthmoving, land clearing, and push loading. Features advanced terrain tracking.',
      specifications: JSON.stringify({ 'Operating Weight': '38,000 kg', 'Engine Power': '310 HP', 'Blade Capacity': '8.7 m³ (SU)', 'Ground Pressure': '69 kPa', 'Width': '3,790 mm', 'Track Length': '3,710 mm' }),
      operatingCap: '38,000 kg, 8.7 m³ blade',
      availability: 'Rented',
      dailyRate: 1200,
      weeklyRate: 6500,
      monthlyRate: 22000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 3,
    },
    {
      slug: 'cat-140m-grader',
      name: 'CAT 140M Motor Grader',
      category: 'Motor Graders',
      model: 'CAT 140M AWD',
      description: 'All-wheel drive motor grader with GPS grade control for precision finishing. Ideal for road construction and maintenance grading.',
      specifications: JSON.stringify({ 'Operating Weight': '21,400 kg', 'Engine Power': '215 HP', 'Blade Length': '4,270 mm', 'Max Turning Radius': '7.8 m', 'Moldboard Lift': '560 mm', 'Moldboard Side Shift': '570 mm' }),
      operatingCap: '21,400 kg, 4.27m blade',
      availability: 'Available',
      dailyRate: 950,
      weeklyRate: 5000,
      monthlyRate: 17000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 4,
    },
    {
      slug: 'cat-950m-loader',
      name: 'CAT 950M Wheel Loader',
      category: 'Wheel Loaders',
      model: 'CAT 950M',
      description: 'High-performance wheel loader for material handling, loading trucks, and general construction tasks. Quick coupler for versatile attachment use.',
      specifications: JSON.stringify({ 'Operating Weight': '25,600 kg', 'Engine Power': '248 HP', 'Bucket Capacity': '3.8 m³', 'Breakout Force': '172 kN', 'Steering': 'Articulated', 'Max Speed': '38 km/h' }),
      operatingCap: '25,600 kg, 3.8 m³ bucket',
      availability: 'Available',
      dailyRate: 900,
      weeklyRate: 4800,
      monthlyRate: 16000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 5,
    },
    {
      slug: 'jcb-3cx-backhoe',
      name: 'JCB 3CX Backhoe Loader',
      category: 'Backhoe Loaders',
      model: 'JCB 3CX Eco',
      description: 'Versatile backhoe loader combining excavation and loading capabilities. Perfect for utility work, small excavations, and general site work.',
      specifications: JSON.stringify({ 'Operating Weight': '8,625 kg', 'Engine Power': '92 HP', 'Backhoe Dig Depth': '5,920 mm', 'Loader Bucket': '1.0 m³', 'Breakout Force (Backhoe)': '65 kN', 'Breakout Force (Loader)': '54 kN' }),
      operatingCap: '8,625 kg, 5.92m dig depth',
      availability: 'Available',
      dailyRate: 450,
      weeklyRate: 2400,
      monthlyRate: 8000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 6,
    },
    {
      slug: 'volvo-fh-dump-truck',
      name: 'Volvo FH 500 6x4 Dump Truck',
      category: 'Dump Trucks',
      model: 'Volvo FMX 500 6x4',
      description: 'Heavy-duty 6x4 dump truck for bulk material transport on construction sites and road projects. High payload capacity for efficient hauling.',
      specifications: JSON.stringify({ 'Gross Vehicle Weight': '40,000 kg', 'Payload': '26,000 kg', 'Engine Power': '500 HP', 'Body Volume': '20 m³', 'Tipping Type': 'Hydraulic Front', 'Axles': '6x4' }),
      operatingCap: '26,000 kg payload, 20 m³ body',
      availability: 'Available',
      dailyRate: 550,
      weeklyRate: 2900,
      monthlyRate: 9500,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 7,
    },
    {
      slug: 'bomag-bw213-roller',
      name: 'BOMAG BW 213 D-5 Vibratory Roller',
      category: 'Compactors and Rollers',
      model: 'BOMAG BW 213 D-5',
      description: 'High-performance vibratory roller for soil and asphalt compaction. Features EVIB measurement system for real-time compaction monitoring.',
      specifications: JSON.stringify({ 'Operating Weight': '13,200 kg', 'Drum Width': '2,130 mm', 'Centrifugal Force': '280 kN', 'Frequency': '31/38 Hz', 'Amplitude': '1.7/0.8 mm', 'Travel Speed': '0-12 km/h' }),
      operatingCap: '13,200 kg, 2,130mm drum',
      availability: 'Available',
      dailyRate: 650,
      weeklyRate: 3500,
      monthlyRate: 12000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 8,
    },
    {
      slug: 'water-bowser-10000l',
      name: 'Water Bowser 10,000L',
      category: 'Water Bowsers',
      model: 'Custom Built 10,000L',
      description: 'Large capacity water bowser for dust suppression, compaction moisture control, and general water supply on construction sites.',
      specifications: JSON.stringify({ 'Tank Capacity': '10,000 L', 'Chassis': '6x4 Truck', 'Pump': 'PTO-driven centrifugal', 'Spray System': 'Rear and side spray bars', 'Hose Reel': '30m with nozzle', 'Fill Time': '~15 minutes' }),
      operatingCap: '10,000L tank capacity',
      availability: 'Available',
      dailyRate: 350,
      weeklyRate: 1800,
      monthlyRate: 6000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 9,
    },
    {
      slug: 'vogele-2100-paver',
      name: 'VÖGELE SUPER 2100-3 Asphalt Paver',
      category: 'Asphalt Pavers',
      model: 'VÖGELE SUPER 2100-3',
      description: 'High-performance tracked asphalt paver for large-scale highway and road paving projects. Features Niveltronic Plus automated leveling system.',
      specifications: JSON.stringify({ 'Operating Weight': '22,000 kg', 'Paving Width': '2.55 - 10.0 m', 'Layer Thickness': '0 - 300 mm', 'Laying Speed': '0 - 20 m/min', 'Bunker Capacity': '14 t', 'Engine Power': '174 kW' }),
      operatingCap: 'Up to 10m paving width, 14t bunker',
      availability: 'Rented',
      dailyRate: 1500,
      weeklyRate: 8000,
      monthlyRate: 28000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 10,
    },
    {
      slug: 'liebherr-ltm1100-crane',
      name: 'Liebherr LTM 1100-4.2 Mobile Crane',
      category: 'Cranes',
      model: 'Liebherr LTM 1100-4.2',
      description: '100-ton 4-axle mobile crane for heavy lifting operations on construction sites, bridge works, and equipment installation.',
      specifications: JSON.stringify({ 'Max Lifting Capacity': '100 t', 'Max Boom Length': '52 m', 'Max Jib Length': '19 m', 'Axles': '4', 'Engine Power': '367 kW', 'Counterweight': '33.2 t' }),
      operatingCap: '100t max lift, 52m boom',
      availability: 'Available',
      dailyRate: 2500,
      weeklyRate: 14000,
      monthlyRate: 48000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 11,
    },
    {
      slug: 'lowbed-trailer-60t',
      name: 'Low-Bed Trailer 60T',
      category: 'Low-Bed Trailers',
      model: 'Goldhofer THP/SL 60T',
      description: 'Heavy-duty low-bed trailer for transporting construction equipment and oversized loads. Removable gooseneck for easy loading.',
      specifications: JSON.stringify({ 'Payload': '60,000 kg', 'Trailer Length': '14,500 mm', 'Loading Height': '950 mm', 'Axles': '3 + 2', 'Tires': '20', 'Deck Width': '3,000 mm' }),
      operatingCap: '60,000 kg payload',
      availability: 'Available',
      dailyRate: 700,
      weeklyRate: 3800,
      monthlyRate: 13000,
      operatorIncluded: true,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
      gallery: JSON.stringify([]),
      order: 12,
    },
  ]

  for (const e of equipmentList) {
    await prisma.equipment.upsert({
      where: { slug: e.slug },
      update: e,
      create: e,
    })
  }

  // Seed Projects
  const projects = [
    {
      slug: 'national-highway-lot5',
      title: 'National Highway Lot 5 Rehabilitation',
      category: 'Road Rehabilitation',
      client: 'Ministry of Transport & Infrastructure',
      location: 'Central Province, 45km stretch',
      description: 'Complete rehabilitation of a 45-kilometer highway section including base repair, resurfacing, drainage improvement, and road furniture installation. The project was completed in phases to maintain traffic flow, utilizing advanced asphalt recycling techniques to reduce costs and environmental impact.',
      scope: JSON.stringify(['Milling and overlay', 'Base stabilization', 'Drainage reconstruction', 'Road marking and signage', 'Bridge approach repairs']),
      duration: '18 months',
      equipment: JSON.stringify(['Milling Machine', 'Asphalt Paver', 'Rollers', 'Dump Trucks', 'Grader']),
      outcomes: JSON.stringify(['45km of rehabilitated highway', 'Zero lost-time injuries', 'Completed 2 weeks ahead of schedule', '30% cost savings through asphalt recycling']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80', 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=800&q=80']),
      testimonial: 'The project was delivered to exceptional standards. Their team demonstrated professionalism and technical expertise throughout the 18-month duration.',
      featured: true,
      status: 'Completed',
      order: 1,
    },
    {
      slug: 'mega-industrial-park',
      title: 'Mega Industrial Park Earthworks',
      category: 'Earthworks',
      client: 'Industrial Development Corporation',
      location: 'Special Economic Zone, 120 hectares',
      description: 'Massive earthworks operation for a 120-hectare industrial park development including site clearing, bulk excavation, filling, and grading. Over 2 million cubic meters of material was moved and compacted to design specifications, creating building platforms for manufacturing facilities.',
      scope: JSON.stringify(['Site clearing', '120ha bulk earthworks', 'Cut and fill balancing', 'Building platform preparation', 'Stormwater drainage', 'Access road construction']),
      duration: '24 months',
      equipment: JSON.stringify(['D8 Bulldozers', '320 Excavators', 'Motor Graders', 'Dump Trucks', 'Compactors', 'Water Bowsers']),
      outcomes: JSON.stringify(['2.1 million m³ of earthworks completed', '120 hectares of development-ready land', 'Zero environmental incidents', 'Created 200+ local jobs']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80']),
      testimonial: '',
      featured: true,
      status: 'Completed',
      order: 2,
    },
    {
      slug: 'urban-road-network',
      title: 'Urban Road Network Development',
      category: 'Road Construction',
      client: 'City Municipal Council',
      location: 'Metro District, 15 roads',
      description: 'Construction of 15 urban roads totaling 28 kilometers including full infrastructure such as stormwater drainage, street lighting, sidewalks, and traffic signals. The project transformed an underserved area into a well-connected urban neighborhood.',
      scope: JSON.stringify(['28km of urban roads', 'Stormwater drainage systems', 'Concrete sidewalks', 'Street lighting installation', 'Traffic signal systems', 'Landscaping and street furniture']),
      duration: '30 months',
      equipment: JSON.stringify(['Excavators', 'Pavers', 'Rollers', 'Graders', 'Dump Trucks', 'Cranes']),
      outcomes: JSON.stringify(['28km of new urban roads', 'Full drainage infrastructure', 'Connected 5 residential areas', 'Improved access for 50,000+ residents']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=800&q=80']),
      testimonial: 'Their work has transformed our community. The quality of the roads and drainage is outstanding, and the project created significant local employment.',
      featured: true,
      status: 'Completed',
      order: 3,
    },
    {
      slug: 'mining-haul-roads',
      title: 'Mining Operation Haul Road Network',
      category: 'Mining Support',
      client: 'Mineral Resources Ltd',
      location: 'Mining concession, Northern Region',
      description: 'Construction and ongoing maintenance of a 35-kilometer haul road network for a large-scale mining operation. Roads designed to handle 100-tonne payload trucks operating 24/7 in challenging terrain conditions.',
      scope: JSON.stringify(['35km haul road construction', 'Road maintenance program', 'Bench road development', 'Water management structures', 'Dust suppression systems']),
      duration: 'Ongoing (36 months to date)',
      equipment: JSON.stringify(['D10 Bulldozers', '400-class Excavators', 'Graders', 'Compactors', 'Water Bowsers']),
      outcomes: JSON.stringify(['35km of haul roads operational', '99.2% road availability', 'Supports 24/7 mining operations', 'Ongoing maintenance contract secured']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80']),
      testimonial: '',
      featured: false,
      status: 'Ongoing',
      order: 4,
    },
    {
      slug: 'commercial-complex-site',
      title: 'Commercial Complex Site Preparation',
      category: 'Site Clearing',
      client: 'Pinnacle Properties Development',
      location: 'Central Business District, 8 hectares',
      description: 'Complete site preparation for a major commercial complex including demolition of existing structures, soil remediation, excavation for 3-level basement, and ground improvement works. The project required careful coordination in a dense urban environment.',
      scope: JSON.stringify(['Demolition of 12 structures', 'Soil remediation', 'Basement excavation (3 levels)', 'Ground improvement', 'Retaining wall construction', 'Dewatering']),
      duration: '12 months',
      equipment: JSON.stringify(['Excavators', 'Breakers', 'Cranes', 'Dump Trucks', 'Pumps', 'Piling Equipment']),
      outcomes: JSON.stringify(['8 hectares prepared', '3-level basement excavated', 'Zero neighbor complaints', 'Completed on schedule for building works']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80']),
      testimonial: '',
      featured: false,
      status: 'Completed',
      order: 5,
    },
    {
      slug: 'regional-drainage-system',
      title: 'Regional Flood Control Drainage System',
      category: 'Drainage',
      client: 'Water Resources Authority',
      location: 'River Valley, 12km drainage network',
      description: 'Design and construction of a comprehensive 12-kilometer drainage network to address chronic flooding in the river valley region. The system includes reinforced concrete channels, culverts, detention basins, and outfall structures.',
      scope: JSON.stringify(['12km drainage channels', 'Culvert installations (RCP & HDPE)', '2 detention basins', 'Outfall structures', 'Channel lining', 'Erosion protection']),
      duration: '15 months',
      equipment: JSON.stringify(['Excavators', 'Backhoes', 'Dump Trucks', 'Concrete Mixers', 'Pumps', 'Compactors']),
      outcomes: JSON.stringify(['12km drainage network completed', 'Flood risk eliminated for 3,000+ households', '2 detention basins operational', '100-year flood event capacity']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80']),
      testimonial: 'The drainage system has completely transformed the area. Flooding that used to displace families annually is now a thing of the past.',
      featured: true,
      status: 'Completed',
      order: 6,
    },
  ]

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
  }

  // Seed Testimonials
  const testimonials = [
    {
      name: 'James Mwangi',
      company: 'Ministry of Transport',
      role: 'Project Director',
      content: 'Their expertise in road construction is unmatched. The highway rehabilitation project was delivered to the highest standards, on time and within budget. Their commitment to quality and safety is evident in every aspect of their work.',
      rating: 5,
      featured: true,
    },
    {
      name: 'Sarah Chen',
      company: 'Industrial Development Corp',
      role: 'Chief Engineer',
      content: 'The earthworks for our industrial park were massive in scale, but they handled it flawlessly. Their fleet management and operational efficiency saved us significant time and cost. A truly professional partner.',
      rating: 5,
      featured: true,
    },
    {
      name: 'David Okafor',
      company: 'Pinnacle Properties',
      role: 'Construction Manager',
      content: 'Working in a dense urban environment requires skill and consideration. Their team was respectful, well-organized, and delivered the site preparation work exactly as specified. Highly recommended.',
      rating: 5,
      featured: true,
    },
    {
      name: 'Amira Hassan',
      company: 'Water Resources Authority',
      content: 'The drainage system they built has fundamentally improved the lives of thousands of residents. Their engineering team was thorough, professional, and always available to address our concerns.',
      role: 'Senior Engineer',
      rating: 5,
      featured: false,
    },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id || `test-${t.name.toLowerCase().replace(/\s/g, '-')}` },
      update: t,
      create: { ...t, id: `test-${t.name.toLowerCase().replace(/\s/g, '-')}` },
    })
  }

  // Seed News Articles
  const news = [
    {
      slug: 'company-wins-major-highway-contract',
      title: 'Company Wins Major Highway Construction Contract',
      excerpt: 'We are proud to announce the award of a $45 million highway construction contract covering 60 kilometers of national highway.',
      content: 'We are proud to announce that our company has been awarded a significant $45 million contract for the construction of a 60-kilometer highway section. This project represents one of the largest infrastructure investments in the region and demonstrates the confidence that government agencies place in our capabilities. The project is expected to create over 300 direct jobs during the construction period and will significantly improve connectivity between major economic centers. Work is scheduled to commence in Q3 2026 with completion targeted for Q4 2028.',
      category: 'Announcement',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
      author: 'Communications Team',
      isPublished: true,
    },
    {
      slug: 'safety-milestone-500-days-lti-free',
      title: 'Safety Milestone: 500 Days Lost-Time Injury Free',
      excerpt: 'Our company has achieved a remarkable safety milestone of 500 consecutive days without a single lost-time injury across all operations.',
      content: 'We are thrilled to announce that our company has reached the significant milestone of 500 consecutive days without a lost-time injury (LTI) across all our construction sites and equipment operations. This achievement reflects our unwavering commitment to health, safety, and environmental management. The milestone was achieved through rigorous safety training programs, regular safety audits, proactive hazard identification, and a strong safety culture that empowers every team member to stop work if unsafe conditions are observed. We congratulate our entire team for this outstanding achievement.',
      category: 'Announcement',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80',
      author: 'HSE Department',
      isPublished: true,
    },
    {
      slug: 'new-asphalt-plant-commissioned',
      title: 'New State-of-the-Art Asphalt Plant Commissioned',
      excerpt: 'Our new asphalt production plant with a capacity of 240 tonnes per hour has been commissioned, enhancing our paving capabilities.',
      content: 'We have commissioned a new state-of-the-art asphalt production plant that significantly enhances our road construction and paving capabilities. The new plant has a production capacity of 240 tonnes per hour and can produce a wide range of asphalt mixes including hot mix, warm mix, and polymer-modified asphalt. The plant features modern emission control systems, recycled asphalt pavement (RAP) capabilities, and computerized mix design controls. This investment ensures a reliable supply of high-quality asphalt for our projects and opens new opportunities for supplying asphalt to other contractors.',
      category: 'Project Update',
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80',
      author: 'Operations Team',
      isPublished: true,
    },
    {
      slug: 'tips-for-road-maintenance',
      title: '5 Essential Tips for Road Maintenance',
      excerpt: 'Proper road maintenance can extend road life by up to 50%. Here are five essential tips from our engineering team.',
      content: 'Regular maintenance is the key to extending the service life of roads and reducing long-term rehabilitation costs. Our engineering team shares five essential tips: 1) Conduct regular visual inspections to identify early signs of distress such as cracking, rutting, or potholes. 2) Keep drainage systems clear and functional - water is the primary enemy of road surfaces. 3) Address small repairs promptly before they become major failures. 4) Implement a scheduled seal coat program every 3-5 years. 5) Monitor traffic loading and enforce weight restrictions where appropriate. Following these practices can extend road life by up to 50% and significantly reduce lifecycle costs.',
      category: 'Tips',
      image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=800&q=80',
      author: 'Engineering Team',
      isPublished: true,
    },
  ]

  for (const n of news) {
    await prisma.newsArticle.upsert({
      where: { slug: n.slug },
      update: n,
      create: n,
    })
  }

  // Seed Jobs
  const jobs = [
    {
      title: 'Senior Site Engineer - Road Construction',
      department: 'Engineering',
      location: 'Head Office / Project Sites',
      type: 'Full-time',
      description: 'We are seeking an experienced Senior Site Engineer to oversee road construction projects. The successful candidate will be responsible for technical supervision, quality control, and coordination of construction activities on major road projects.',
      requirements: JSON.stringify(['BSc in Civil Engineering', '8+ years road construction experience', 'Professional engineering registration', 'Strong knowledge of road design standards', 'Experience with GPS-guided equipment', 'Excellent leadership and communication skills']),
      benefits: JSON.stringify(['Competitive salary package', 'Health and life insurance', 'Provident fund contributions', 'Professional development support', 'Vehicle and housing allowance for site assignments']),
      isPublished: true,
    },
    {
      title: 'Heavy Equipment Operator - Excavators',
      department: 'Operations',
      location: 'Various Project Sites',
      type: 'Full-time',
      description: 'We are looking for skilled heavy equipment operators specializing in excavators (20-45 ton class) to join our growing fleet operations team.',
      requirements: JSON.stringify(['Valid operator certification', '5+ years excavator experience', 'Experience in road construction and earthworks', 'Safety training certificate', 'Ability to work on remote sites', 'Mechanical aptitude for basic maintenance']),
      benefits: JSON.stringify(['Competitive daily rates', 'Accommodation provided on remote sites', 'Health insurance', 'Safety equipment provided', 'Overtime and bonus opportunities']),
      isPublished: true,
    },
    {
      title: 'HSE Officer',
      department: 'Health, Safety & Environment',
      location: 'Head Office / Project Sites',
      type: 'Full-time',
      description: 'Join our HSE team to implement and monitor health, safety, and environmental programs across all construction operations.',
      requirements: JSON.stringify(['BSc in Environmental Health/Safety or related', 'NEBOSH IGC or equivalent', '5+ years construction HSE experience', 'Knowledge of OSHA standards', 'Incident investigation skills', 'First aid certification']),
      benefits: JSON.stringify(['Competitive salary', 'Health and life insurance', 'Professional development budget', 'Conference attendance support', 'Performance-based bonuses']),
      isPublished: true,
    },
    {
      title: 'Civil Engineering Intern',
      department: 'Engineering',
      location: 'Head Office',
      type: 'Internship',
      description: 'We offer internship opportunities for final-year civil engineering students to gain practical experience in road construction and earthworks projects.',
      requirements: JSON.stringify(['Enrolled in BSc Civil Engineering program', 'Strong academic record', 'Eagerness to learn', 'Computer literacy (CAD, MS Office)', 'Valid driver license preferred']),
      benefits: JSON.stringify(['Monthly stipend', 'Mentorship from senior engineers', 'Hands-on project experience', 'Potential for full-time employment', 'Training and development opportunities']),
      isPublished: true,
    },
  ]

  for (const j of jobs) {
    await prisma.jobListing.upsert({
      where: { id: j.id || `job-${j.title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}` },
      update: j,
      create: { ...j, id: `job-${j.title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}` },
    })
  }

  console.log('Database seeded successfully!')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })