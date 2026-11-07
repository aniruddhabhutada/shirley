export interface Product {
  id: string;
  name: string;
  badgeName: string;
  category: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  format: string;
  sachetCount: string;
  netWeight: string;
  flavour: string;
  status: 'IN DEVELOPMENT' | 'CONCEPT RESEARCH';
  image: string;
  imageAlt: string;
  videoUrl?: string;
  videoPoster?: string;
  accentColor: string;
  tagColor: string;
  bgPastel: string;
  proposedIngredients: {
    name: string;
    role: string;
    description: string;
  }[];
  keyHighlights: string[];
  disclaimer: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'cycora',
    name: 'SHIRLEY PERIOD SUPPORT',
    badgeName: 'Period Support Drink',
    category: 'MENSTRUAL WELLNESS DRINK',
    headline: 'A kinder approach to everyday hormonal and menstrual wellness.',
    shortDescription:
      'A convenient powder-based drink concept being developed around everyday menstrual wellness routines and cycle comfort.',
    fullDescription:
      'SHIRLEY PERIOD SUPPORT is thoughtfully formulated to support women during their menstrual and luteal phases. Built around bioavailable magnesium bisglycinate, vitamin B6, and targeted gut-supportive probiotics, this daily ritual turns cycle care into a refreshing strawberry lemonade experience.',
    format: 'Individual Powder Sachets',
    sachetCount: '15 Sachets Per Box',
    netWeight: '5 g per sachet (75 g box)',
    flavour: 'Strawberry Lemonade',
    status: 'IN DEVELOPMENT',
    image: '/images/product-cycora.webp',
    imageAlt: 'SHIRLEY PERIOD SUPPORT Formulation box and sachet with strawberry lemonade drink',
    videoUrl: '/videos/shirley-period-support.mp4',
    videoPoster: '/videos/shirley-period-support-poster.webp',
    accentColor: '#C84B83',
    tagColor: 'text-shirley-berry-vibrant bg-shirley-blush',
    bgPastel: 'bg-shirley-blush-light',
    proposedIngredients: [
      {
        name: 'Magnesium Bisglycinate',
        role: 'Muscle & Nervous Relaxation',
        description:
          'A highly bioavailable chelated form of magnesium known to be gentle on the stomach and supportive of normal muscular relaxation.',
      },
      {
        name: 'Vitamin B6',
        role: 'Neurotransmitter & Hormonal Synthesis',
        description:
          'Plays an essential biological cofactor role in serotonin and dopamine pathways, helping support mood stability.',
      },
      {
        name: 'Targeted Probiotics',
        role: 'Estrobolome & Gut Harmony',
        description:
          'Specific beneficial gut strains that assist with healthy digestive comfort and gut-mediated hormone metabolism.',
      },
      {
        name: 'Ashwagandha & L-Theanine',
        role: 'Calm Focus & Stress Balance',
        description:
          'Adaptogenic and amino acid support to encourage a centered nervous system throughout luteal shifts.',
      },
    ],
    keyHighlights: [
      'Gentle on sensitive stomachs with chelated magnesium',
      'Effortless 15-second sachet ritual with water',
      'Natural berry and citrus notes with zero chalky residue',
      'Formulated without synthetic colours or excess sugars',
    ],
    disclaimer:
      'SHIRLEY PERIOD SUPPORT is an investigational nutraceutical concept currently in formulation development. It does not treat, diagnose, cure, or prevent any menstrual disorder, dysmenorrhea, or medical condition.',
  },
  {
    id: 'inosia',
    name: 'SHIRLEY PCOS SUPPORT',
    badgeName: 'PCOS Nutritional Support',
    category: 'PCOS NUTRITIONAL WELLNESS',
    headline: 'Nutritional balance designed for women navigating PCOS rhythms.',
    shortDescription:
      'A nutritional wellness supplement concept being developed for women interested in supporting their broader PCOS wellness routines.',
    fullDescription:
      'SHIRLEY PCOS SUPPORT explores the synergy between Myo-Inositol, D-Chiro-Inositol, active folate, and metabolic micronutrients. Delivered in a crisp blueberry lemonade powder, it is designed to support metabolic harmony, skin clarity, and balanced ovarian physiology as part of a healthy lifestyle.',
    format: 'Individual Powder Sachets',
    sachetCount: '15 Sachets Per Box',
    netWeight: '5 g per sachet (75 g box)',
    flavour: 'Blueberry Lemonade',
    status: 'IN DEVELOPMENT',
    image: '/images/product-inosia.webp',
    imageAlt: 'SHIRLEY PCOS SUPPORT Formulation box and sachet with blueberries',
    videoUrl: '/videos/shirley-pcos-support.mp4',
    videoPoster: '/videos/shirley-pcos-support-poster.webp',
    accentColor: '#65344F',
    tagColor: 'text-shirley-plum-rich bg-shirley-lavender',
    bgPastel: 'bg-shirley-lavender-light',
    proposedIngredients: [
      {
        name: 'Myo-Inositol & D-Chiro Inositol',
        role: 'Metabolic & Ovarian Cell Signaling',
        description:
          'Studied globally in female reproductive physiology to help mediate intracellular glucose handling and ovarian signal cascades.',
      },
      {
        name: 'L-Methylfolate (Quatrefolic®)',
        role: 'Active Folate Metabolism',
        description:
          'The fully bioactive form of folate that bypasses MTHFR enzyme conversion variations common in many individuals.',
      },
      {
        name: 'Vitamin D3 & Chromium',
        role: 'Insulin Sensitivity & Endocrine Co-factors',
        description:
          'Essential micronutrients that contribute to normal endocrine function and carbohydrate macronutrient utilization.',
      },
      {
        name: 'Probiotics',
        role: 'Microbiome & Metabolic Gut Barrier',
        description:
          'Lactobacillus strains to help support the bidirectional gut-hormone axis.',
      },
    ],
    keyHighlights: [
      'Clinically guided 40:1 inositol ratio under scientific review',
      'Bioavailable methylated folate instead of standard synthetic folic acid',
      'Refreshing blueberry infusion that dissolves smoothly',
      'Created to complement medical guidance and nutritional care',
    ],
    disclaimer:
      'SHIRLEY PCOS SUPPORT is an investigational nutritional supplement concept in active R&D. It does not cure, reverse, or treat Polycystic Ovary Syndrome (PCOS/PCOD) and is not a drug or prescription medication.',
  },
  {
    id: 'anemia-support',
    name: 'SHIRLEY ANEMIA SUPPORT',
    badgeName: 'Liposomal Iron & Energy',
    category: 'RED BLOOD CELL & IRON WELLNESS',
    headline: 'Gentle liposomal iron formulated without nausea or constipation.',
    shortDescription:
      'An advanced gentle iron drink concept combining micronized liposomal iron with active folate, vitamin B12, and vitamin C for optimal absorption.',
    fullDescription:
      'Iron deficiency affects over 50% of young Indian women, yet standard iron tablets often trigger nausea and gastrointestinal distress. SHIRLEY Anemia Support uses gentle liposomal and chelated iron designed for comfortable absorption without stomach upset.',
    format: 'Individual Powder Sachets',
    sachetCount: '15 Sachets Per Box',
    netWeight: '5 g per sachet (75 g box)',
    flavour: 'Orange Berry',
    status: 'IN DEVELOPMENT',
    image: '/images/product-anemia.webp',
    imageAlt: 'SHIRLEY Anemia Support box and sachet with orange berry drink',
    videoUrl: '/videos/shirley-anemia-support.mp4',
    videoPoster: '/videos/shirley-anemia-support-poster.webp',
    accentColor: '#C84B83',
    tagColor: 'text-shirley-plum-rich bg-shirley-peach',
    bgPastel: 'bg-shirley-peach-light',
    proposedIngredients: [
      {
        name: 'Liposomal & Ferrous Bisglycinate Iron',
        role: 'Gentle Elemental Iron Absorption',
        description:
          'Advanced encapsulation that protects the gut lining while facilitating cellular uptake.',
      },
      {
        name: 'Vitamin C (Ascorbic Acid)',
        role: 'Iron Chelation Enhancer',
        description:
          'Maintains iron in its absorbable ferrous state across the intestinal wall.',
      },
      {
        name: 'Folate (Quatrefolic®) & B12',
        role: 'Erythrocyte Maturation',
        description:
          'Coenzymes crucial for normal red blood cell synthesis and cellular oxygenation.',
      },
    ],
    keyHighlights: [
      'Non-constipating, stomach-friendly formula',
      'Vitamin C co-factored for enhanced biological uptake',
      'Tangy orange berry flavour with zero metallic aftertaste',
    ],
    disclaimer:
      'Anemia Support is an investigational dietary supplement and does not replace medical supervision or prescription therapies for severe clinical anemia.',
  },
  {
    id: 'uti-support',
    name: 'SHIRLEY UTI SUPPORT',
    badgeName: 'Urinary Tract Comfort',
    category: 'URINARY TRACT HEALTH RITUAL',
    headline: 'Proactive daily protection and comfort for the urinary microbiome.',
    shortDescription:
      'A targeted nutraceutical drink concept blending D-Mannose, PAC-standardized cranberry extract, hibiscus, and urogenital probiotics.',
    fullDescription:
      'Frequent urinary discomfort disrupts daily life and mental peace. SHIRLEY UTI Support combines concentrated D-Mannose with cranberry and hibiscus polyphenols to help maintain bladder comfort and support natural defense barriers.',
    format: 'Individual Powder Sachets',
    sachetCount: '15 Sachets Per Box',
    netWeight: '5 g per sachet (75 g box)',
    flavour: 'Cranberry',
    status: 'IN DEVELOPMENT',
    image: '/images/product-uti.webp',
    imageAlt: 'SHIRLEY UTI Support box with cranberry extract drink',
    videoUrl: '/videos/shirley-uti-support.mp4',
    videoPoster: '/videos/shirley-uti-support-poster.webp',
    accentColor: '#452039',
    tagColor: 'text-shirley-plum-dark bg-shirley-blush',
    bgPastel: 'bg-shirley-blush-light',
    proposedIngredients: [
      {
        name: 'D-Mannose',
        role: 'Anti-Adherence Action',
        description:
          'A naturally occurring monosaccharide that binds to bacterial fimbriae so they are gently washed away.',
      },
      {
        name: 'Cranberry Extract (PACs)',
        role: 'Polyphenol Defense',
        description:
          'Standardized Proanthocyanidins to support bladder mucosal integrity and antioxidant protection.',
      },
      {
        name: 'Hibiscus Extract',
        role: 'Natural Antimicrobial Botanicals',
        description:
          'Traditional botanical rich in anthocyanins that supports healthy urinary tract clearance.',
      },
    ],
    keyHighlights: [
      'Non-antibiotic daily wellness support',
      'Standardized botanical extracts',
      'Fast-acting soluble drink format',
    ],
    disclaimer:
      'This product concept is for nutritional maintenance only and does not diagnose or treat acute urinary tract infections (UTIs) or bacterial kidney conditions.',
  },
];
