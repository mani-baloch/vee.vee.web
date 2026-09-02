export interface VetDoctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  education: string;
  rating: number;
  reviewsCount: number;
  availableDays: string[];
  bio: string;
  image: string;
  badges: string[];
}

export interface VetService {
  id: string;
  title: string;
  category: 'general' | 'emergency' | 'specialist' | 'wellness';
  description: string;
  price: string;
  duration: string;
  iconName: string;
  features: string[];
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  petName: string;
  petType: string;
  petBreed: string;
  ownerName: string;
  rating: number;
  date: string;
  comment: string;
  serviceUsed: string;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  targetPet: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  popular?: boolean;
  features: string[];
  excludedFeatures?: string[];
}

export const VET_DOCTORS: VetDoctor[] = [
  {
    id: 'dr-sarah-mitchell',
    name: 'Dr. Sarah Mitchell, DVM',
    role: 'Chief Medical Officer & Lead Surgeon',
    specialty: 'Soft Tissue Surgery & Critical Care',
    experience: '14+ Years',
    education: 'Cornell University College of Veterinary Medicine',
    rating: 4.98,
    reviewsCount: 342,
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
    bio: 'Dedicated to compassionate, minimally-invasive surgical treatments and emergency resuscitation for companion animals.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    badges: ['Board Certified', 'Fear Free Certified', 'Emergency Lead']
  },
  {
    id: 'dr-james-chen',
    name: 'Dr. James Chen, DVM, MS',
    role: 'Senior Exotic & Avian Specialist',
    specialty: 'Birds, Reptiles & Small Mammals',
    experience: '10+ Years',
    education: 'UC Davis School of Veterinary Medicine',
    rating: 4.95,
    reviewsCount: 218,
    availableDays: ['Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    bio: 'Pioneering specialized medical care, nutritional planning, and delicate endoscopy for exotic companions and birds.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    badges: ['Exotics Specialist', 'Avian Certified', 'Ultrasound Expert']
  },
  {
    id: 'dr-elena-rostova',
    name: 'Dr. Elena Rostova, DVM',
    role: 'Feline & Canine Medicine Lead',
    specialty: 'Internal Medicine & Dermatology',
    experience: '8+ Years',
    education: 'University of Pennsylvania Vet Medicine',
    rating: 4.96,
    reviewsCount: 285,
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat', 'Sun'],
    bio: 'Passionate about preventive wellness, allergy diagnostics, dermatology treatments, and feline low-stress handling.',
    image: 'https://images.unsplash.com/photo-1594824813681-30046522c079?auto=format&fit=crop&q=80&w=600',
    badges: ['Cat Friendly Gold', 'Dermatology Focus', 'Telehealth Star']
  },
  {
    id: 'dr-marcus-brody',
    name: 'Dr. Marcus Brody, DVM',
    role: 'Emergency & Urgent Triage Director',
    specialty: 'Trauma Care & Cardiopulmonary Medicine',
    experience: '12+ Years',
    education: 'Royal Veterinary College, London',
    rating: 4.99,
    reviewsCount: 410,
    availableDays: ['24/7 On-Call Rotations'],
    bio: 'Specialized in rapid emergency response, ICU trauma management, toxin reversal, and advanced veterinary radiology.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    badges: ['24/7 Urgent Lead', 'ICU Specialist', 'Cardiology Fellow']
  }
];

export const VET_SERVICES: VetService[] = [
  {
    id: 'urgent-emergency',
    title: '24/7 Emergency & Critical Care',
    category: 'emergency',
    description: 'Round-the-clock intensive trauma response, toxin management, oxygen therapy, and emergency surgery.',
    price: 'From $95',
    duration: 'Immediate Priority',
    iconName: 'AlertCircle',
    features: ['Zero wait time for critical triage', 'In-house blood lab & digital X-rays', 'Oxygen intensive care suites', 'ICU monitoring'],
    popular: true
  },
  {
    id: 'wellness-vaccines',
    title: 'Comprehensive Wellness & Vaccines',
    category: 'general',
    description: 'Nose-to-tail physical examination, customized vaccination schedules, microchipping, and parasite prevention.',
    price: 'From $49',
    duration: '30 - 45 min',
    iconName: 'HeartPulse',
    features: ['Full body vitals check', 'Core & lifestyle vaccines', 'Dental & ear inspection', 'Weight & dietary guidance'],
    popular: true
  },
  {
    id: 'telehealth-video',
    title: 'Telehealth Video Consultation',
    category: 'general',
    description: 'Connect with certified veterinarians from home via HD video for quick advice, triage, and prescription refills.',
    price: 'From $35',
    duration: '20 min call',
    iconName: 'Video',
    features: ['Instant video room connection', 'Digital prescription delivered', 'Follow-up chat support', 'Stress-free for shy pets'],
    popular: true
  },
  {
    id: 'dental-care',
    title: 'Advanced Dental Surgery & Cleaning',
    category: 'specialist',
    description: 'Ultrasonic scaling, subgingival polishing, digital dental radiographs, and tooth extractions.',
    price: 'From $180',
    duration: '1 - 2 hours',
    iconName: 'Smile',
    features: ['Ultrasonic tartar removal', 'Safe inhalation anesthesia', 'High-res dental X-rays', 'Post-op pain management']
  },
  {
    id: 'surgery-laparoscopy',
    title: 'General & Minimally Invasive Surgery',
    category: 'emergency',
    description: 'Spay/neuter, soft tissue surgeries, foreign body removal, and orthopedic stabilization with modern monitoring.',
    price: 'Custom Quote',
    duration: 'Day Procedure',
    iconName: 'Activity',
    features: ['Advanced continuous vitals monitor', 'Laser surgical precision', 'Warm air recovery suites', 'Dedicated anesthesia tech']
  },
  {
    id: 'lab-diagnostics',
    title: 'In-House Diagnostics & Imaging',
    category: 'specialist',
    description: 'Rapid 15-minute bloodwork, ultrasound imaging, digital radiography, cytology, and urinalysis.',
    price: 'From $65',
    duration: '15 - 30 min',
    iconName: 'Microscope',
    features: ['Results in 15 minutes', 'High-definition color Doppler ultrasound', 'Direct specialist radiologist review', 'Secure digital pet portal upload']
  },
  {
    id: 'exotic-pet-care',
    title: 'Exotic Pets & Avian Medicine',
    category: 'specialist',
    description: 'Specialized healthcare, beak/wing trims, habitat consultations for birds, reptiles, rabbits, and small mammals.',
    price: 'From $60',
    duration: '40 min',
    iconName: 'Feather',
    features: ['Exotic incubation chambers', 'Avian blood chemistry panel', 'Species-specific anesthesia', 'Behavioral & dietary advice']
  },
  {
    id: 'spa-grooming',
    title: 'Therapeutic Grooming & Spa',
    category: 'wellness',
    description: 'Medicated dermatological baths, gentle deshedding, nail clipping, ear cleansing, and skin therapy.',
    price: 'From $40',
    duration: '45 - 60 min',
    iconName: 'Sparkles',
    features: ['Hypoallergenic organic shampoos', 'Low-stress quiet handling', 'Skin & coat condition assessment', 'Warm blow dry & blueberry facial']
  }
];

export const SYMPTOMS_LIST = [
  {
    id: 'sym-1',
    name: 'Severe Bleeding or Trauma',
    category: 'critical',
    severity: 'Immediate Emergency (Go to ER Now)',
    recommendation: 'Apply gentle clean pressure. Transport your pet to our 24/7 ER hospital immediately without delay.',
    level: 'emergency'
  },
  {
    id: 'sym-2',
    name: 'Difficulty Breathing / Choking',
    category: 'critical',
    severity: 'Immediate Emergency (Go to ER Now)',
    recommendation: 'Keep your pet cool and calm. Avoid throat pressure and bring them to our ICU immediately.',
    level: 'emergency'
  },
  {
    id: 'sym-3',
    name: 'Suspected Toxin / Poison Ingestion (Chocolate, Lilies, Grapes, Rat Poison)',
    category: 'critical',
    severity: 'Immediate Emergency',
    recommendation: 'Bring the packaging or photo of what was ingested. Do not induce vomiting without vet instruction.',
    level: 'emergency'
  },
  {
    id: 'sym-4',
    name: 'Repeated Vomiting (>3 times in 12h) or Extreme Lethargy',
    category: 'urgent',
    severity: 'Urgent Same-Day Visit',
    recommendation: 'Withhold food for 2 hours, monitor hydration. Schedule a same-day urgent visit.',
    level: 'urgent'
  },
  {
    id: 'sym-5',
    name: 'Straining or Inability to Urinate (Especially Male Cats)',
    category: 'critical',
    severity: 'Immediate Emergency',
    recommendation: 'Urinary blockages are life-threatening medical emergencies. Bring your pet in right away.',
    level: 'emergency'
  },
  {
    id: 'sym-6',
    name: 'Eye Squinting, Redness, or Thick Discharge',
    category: 'urgent',
    severity: 'Urgent Appointment (Within 24 Hours)',
    recommendation: 'Eye issues can deteriorate quickly into corneal ulcers. Prevent pet from scratching eye.',
    level: 'urgent'
  },
  {
    id: 'sym-7',
    name: 'Skin Itching, Ear Scratching, Minor Hair Loss',
    category: 'routine',
    severity: 'Routine In-Clinic or Telehealth Call',
    recommendation: 'Likely allergies, ear mites, or dermatological issue. Perfect for a Telehealth video consultation.',
    level: 'routine'
  },
  {
    id: 'sym-8',
    name: 'Mild Limping or Stiffness After Exercise',
    category: 'routine',
    severity: 'Routine Examination',
    recommendation: 'Rest the pet. If limping persists for more than 24 hours, book an orthopedic checkup.',
    level: 'routine'
  }
];

export const WELLNESS_PLANS: PricingPlan[] = [
  {
    id: 'plan-basic',
    name: 'Essential Wellness',
    targetPet: 'Adult Dogs & Cats (Ages 1-7)',
    monthlyPrice: 34,
    yearlyPrice: 360,
    description: 'Complete annual preventive healthcare foundation with unlimited routine checkups.',
    features: [
      'Unlimited routine vet physical examinations',
      'All annual core & lifestyle vaccines',
      '1x Complete annual blood chemistry panel',
      '1x Annual intestinal parasite screen & fecal test',
      '10% Discount on all surgical & dental procedures',
      '24/7 Telehealth chat access'
    ],
    excludedFeatures: [
      'Comprehensive dental scaling & polishing',
      'Free emergency examination fee'
    ]
  },
  {
    id: 'plan-prime',
    name: 'Complete Care Plus',
    targetPet: 'Best for Total Peace of Mind',
    monthlyPrice: 65,
    yearlyPrice: 690,
    popular: true,
    description: 'Our most popular comprehensive wellness package with full dental hygiene & diagnostics included.',
    features: [
      'Everything in Essential Wellness',
      '1x Complete Dental Scaling, Polishing & X-Rays',
      'Unlimited free Telehealth Video Consultations',
      'Free microchip registration & replacement',
      '2x Bloodwork panels (Bi-annual checks)',
      '15% Discount on prescription foods & medications',
      'Zero ER exam surcharge during emergency visits'
    ]
  },
  {
    id: 'plan-senior',
    name: 'Senior & Chronic Care Club',
    targetPet: 'Senior Pets (Ages 7+) & Chronic Care',
    monthlyPrice: 89,
    yearlyPrice: 950,
    description: 'Tailored specifically for older pets needing joint mobility, cardiac tracking, and frequent bloodwork.',
    features: [
      'Everything in Complete Care Plus',
      'Bi-annual comprehensive senior wellness profiles',
      'Quarterly arthritis & joint mobility evaluations',
      'Full abdominal & cardiac ultrasound screen',
      'Urinalysis and blood pressure monitoring',
      '20% Discount on chronic medications & laser therapy',
      'Dedicated senior care concierge line'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    petName: 'Milo',
    petType: 'Dog',
    petBreed: 'Golden Retriever',
    ownerName: 'Sarah Jenkins',
    rating: 5,
    date: '2 days ago',
    comment: 'Dr. Mitchell saved Milo when he swallowed a squeaky toy at 11 PM on a Sunday. The emergency surgical team was prepared before we even arrived. Milo was back wagging his tail in 48 hours!',
    serviceUsed: 'Emergency Surgery',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-2',
    petName: 'Luna & Oliver',
    petType: 'Cat',
    petBreed: 'British Shorthairs',
    ownerName: 'Michael Vance',
    rating: 5,
    date: '1 week ago',
    comment: 'The Fear Free approach really works. Usually, Luna screams the entire car ride and hides at the vet. At vee.vet, the low-stress cat rooms and calming pheromones made the checkup effortless!',
    serviceUsed: 'Routine Wellness & Vaccines',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-3',
    petName: 'Pip',
    petType: 'Bird',
    petBreed: 'Cockatiel',
    ownerName: 'Amina Tariq',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Finding a true avian vet specialist is tough. Dr. James Chen diagnosed Pip’s respiratory allergy in minutes and set up a customized nebulizer routine. Truly extraordinary care.',
    serviceUsed: 'Exotic & Avian Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-4',
    petName: 'Rocky',
    petType: 'Dog',
    petBreed: 'French Bulldog',
    ownerName: 'David Gomez',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The Telehealth video consultation was a lifesaver when Rocky had sudden skin hives during a holiday weekend. Got a prescription sent to our pharmacy in under 20 minutes.',
    serviceUsed: 'Telehealth Video Consult',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export const CLINIC_INFO = {
  name: 'vee.vet Animal Hospital & Emergency Center',
  tagline: 'Modern, Fear-Free Veterinary Medicine for Happy, Healthy Pets',
  phoneEmergency: '+1 (800) 555-8386',
  phoneGeneral: '+1 (555) 342-9988',
  email: 'care@vee.vet',
  address: '742 Evergreen Animal Parkway, Suite 100, West District, CA 90210',
  hours: {
    emergency: '24 Hours / 7 Days a Week / 365 Days',
    generalClinic: 'Mon - Sat: 7:30 AM – 8:30 PM | Sun: 9:00 AM – 6:00 PM',
    telehealth: 'Daily 7:00 AM – 11:00 PM'
  },
  stats: [
    { label: 'Pets Cared For', value: '18,500+' },
    { label: 'Emergency Ready', value: '24/7/365' },
    { label: 'Client Satisfaction', value: '99.4%' },
    { label: 'Specialist Doctors', value: '12+ Staff' }
  ]
};

export const FAQ_LIST = [
  {
    question: 'How do I know if my pet needs Emergency Care vs a Regular Appointment?',
    answer: 'If your pet is struggling to breathe, suffering from severe bleeding, collapsed, consumed toxins (chocolate, lilies, rat bait), or if a male cat is unable to urinate, please come to our 24/7 Emergency hospital immediately. For non-life-threatening concerns like mild itching, routine shots, or minor limping, use our Symptom Checker or book a standard appointment / Telehealth consult.'
  },
  {
    question: 'How does the vee.vet Telehealth Video Consultation work?',
    answer: 'Booking a telehealth call is quick: choose Telehealth during booking, pick a time slot, and you will receive a secure video link. During the 20-minute consultation, our certified vet evaluates your pet, provides advice, and can electronically send prescriptions directly to your nearest pet pharmacy.'
  },
  {
    question: 'What does "Fear Free Certified" mean for my pet?',
    answer: 'Fear Free is a specialized veterinary protocol designed to eliminate fear, anxiety, and stress in animals. We use separate feline and canine waiting zones, pheromone-diffused exam rooms, non-slip surfaces, gentle handling methods, and tasty medical treats to make vet visits positive and stress-free.'
  },
  {
    question: 'Do you accept pet insurance?',
    answer: 'Yes! We work with all major pet insurance providers (Trupanion, Nationwide, Healthy Paws, Lemonade, MetLife, Petplan, ASPCA). We provide direct itemized invoices and direct-claim submission support so you get reimbursed without delay.'
  },
  {
    question: 'What is included in the vee.vet Wellness Club memberships?',
    answer: 'Our wellness club is an affordable monthly plan that covers 100% of routine preventive healthcare (exams, vaccines, fecal/blood tests, dental cleaning) plus exclusive member discounts on medications and zero emergency exam surcharges.'
  }
];
