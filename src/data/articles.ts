export interface Article {
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
  };
  summary: string;
  content: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'demystifying-magnesium-bisglycinate',
    title: 'Demystifying Magnesium Bisglycinate: Why Form Matters For Menstrual Comfort',
    category: 'INGREDIENT EDUCATION',
    categoryColor: 'bg-shirley-blush text-shirley-berry-vibrant',
    readTime: '4 min read',
    publishDate: 'Nov 2024',
    author: {
      name: 'SHIRLEY Formulation Desk',
      role: 'Nutritional Research Team',
    },
    summary:
      'Not all magnesium is created equal. Learn why chelated magnesium bisglycinate offers superior stomach tolerability and neuromuscular support during menstrual shifts.',
    content: [
      'If you have ever picked up a generic drugstore magnesium supplement, you might have noticed digestive upset or laxative effects shortly after taking it. That is because the vast majority of cheap supplements use Magnesium Oxide — an inorganic salt with poor bioavailability of less than 4%.',
      'At SHIRLEY, our formulation team specifically explores Magnesium Bisglycinate. In this form, elemental magnesium is organically chelated (bonded) to two molecules of glycine, an amino acid known for its calming properties.',
      'Because glycine uses distinct dipeptide intestinal transport channels, Magnesium Bisglycinate bypasses standard mineral competition in the gut, ensuring rapid cellular uptake and virtually zero gastric distress.',
      'For women navigating menstrual cramps and luteal muscle tension, magnesium acts as a natural physiological smooth muscle relaxant and calcium-channel regulator, making it an essential foundation of modern cycle nutrition.',
    ],
  },
  {
    slug: 'understanding-inositol-pcos',
    title: 'Understanding The Inositol Ratio: Myo-Inositol & D-Chiro-Inositol in PCOS Rhythms',
    category: 'PCOS & PCOD',
    categoryColor: 'bg-shirley-lavender text-shirley-plum-rich',
    readTime: '5 min read',
    publishDate: 'Nov 2024',
    author: {
      name: 'SHIRLEY Wellness Editorial',
      role: 'Educational Research',
    },
    summary:
      'Exploring how cellular second-messengers support insulin signaling and ovarian physiology for women navigating polycystic ovary patterns.',
    content: [
      'Polycystic Ovary Syndrome (PCOS) is one of the most widespread endocrine concerns among young women in India, affecting approximately 1 in 5 women of reproductive age.',
      'At its cellular root, PCOS often involves impaired intracellular insulin signaling. In healthy tissues, inositol compounds serve as cellular second messengers: Myo-Inositol mediates cellular glucose uptake and FSH (follicle-stimulating hormone) signaling, while D-Chiro-Inositol helps manage glycogen synthesis.',
      'Physiological research has demonstrated that a 40:1 ratio of Myo-Inositol to D-Chiro-Inositol mirrors the natural physiological balance found in human plasma.',
      'When supplemented thoughtfully alongside bioavailable methylated folate and lifestyle modifications, this ratio helps support regular ovulatory cycles and metabolic harmony without harsh side effects.',
    ],
  },
  {
    slug: 'luteal-phase-energy-rituals',
    title: 'The Luteal Phase Energy Guide: Supporting Your Body Before Your Period Starts',
    category: 'HORMONAL WELLNESS',
    categoryColor: 'bg-shirley-peach text-shirley-plum-dark',
    readTime: '4 min read',
    publishDate: 'Oct 2024',
    author: {
      name: 'SHIRLEY Wellness Editorial',
      role: 'Lifestyle & Routines',
    },
    summary:
      'Why you feel hungrier, more exhausted, and emotionally sensitive in the 10 days before your period — and how targeted nutrition can help.',
    content: [
      'Have you ever wondered why your energy dips and sugar cravings spike around day 21 of your cycle? You are not imagining it — your basal metabolic rate actually increases during the luteal phase as progesterone levels climb.',
      'Progesterone is thermogenic, meaning your body literally burns more calories at rest to maintain a slightly elevated temperature while preparing the endometrial lining.',
      'Simultaneously, serotonin levels can drop in response to estrogen decline, leading to heightened anxiety, brain fog, and intense cravings for simple carbohydrates.',
      'Supporting this phase requires prioritizing complex carbohydrates, bioavailable vitamin B6, hydration, and minerals that replenish electrolytes without overwhelming digestion.',
    ],
  },
  {
    slug: 'why-powder-sachets-beat-chalky-tablets',
    title: 'Why Powder Sachets Are Replacing Bulky Chalky Tablets in Daily Routines',
    category: 'EVERYDAY NUTRITION',
    categoryColor: 'bg-shirley-blue-sky text-shirley-plum-rich',
    readTime: '3 min read',
    publishDate: 'Oct 2024',
    author: {
      name: 'SHIRLEY Design & Usability',
      role: 'Form Factor Innovation',
    },
    summary:
      'From pill fatigue to absorption kinetics: why single-serve powder sachets represent the future of convenient women’s wellness rituals.',
    content: [
      'Pill fatigue is real. Swallowing three oversized tablets every morning with breakfast often feels more like a punishment than self-care.',
      'Furthermore, standard compressed tablets require heavy binding agents, stearates, artificial glazing, and plastic coatings that slow disintegration in the stomach.',
      'SHIRLEY is formulated as a single-serve, pre-portioned 5g powder sachet. Dissolved in cold water, active minerals and water-soluble vitamins are already pre-solubilized, accelerating gastric emptying and absorption.',
      'Tear, stir, drink — whether at your desk, after yoga, or between college classes, a tasty strawberry or blueberry lemonade makes wellness a moment you actually look forward to.',
    ],
  },
];

