import { Saree, FAQItem } from './types';

export const SAREES_DATA: Saree[] = [
  {
    id: 'saree-01',
    name: 'Rajmata Vintage Banarasi Silk Saree',
    category: 'Banarasi',
    fabric: 'Pure Katan Silk',
    price: 34500,
    originalPrice: 42000,
    color: 'Deep Maroon',
    occasion: 'Wedding',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A masterpiece woven by seventh-generation master craftsmen. This exquisite Banarasi saree is crafted in pure Katan silk with a hand-woven antique gold zari (Kari) border, featuring timeless royalty motifs inspired by royal Mughal courts.',
    fabricDetails: '100% Pure Katan Mulberry Silk. Tested and certified. Handwoven on a traditional pit loom over 34 days.',
    blouseIncluded: true,
    blouseDescription: 'Matching deep maroon silk blouse piece (80cm) with running gold border included.',
    dimensions: '5.5 meters + 0.8 meters unstitched blouse piece',
    careInstructions: 'Dry clean only. Store wrapped in a soft muslin cloth to protect the gold zari work. Avoid hanging on metal hangers.',
    stockStatus: 'Low Stock',
    rating: 4.9,
    borderType: 'Thick Shikargah Antique Gold Zari Border',
    palluDetails: 'Intricately woven heavy brocade pallu with grand paisleys and floral jaal work.',
    featured: true,
    isNewArrival: false,
    isBestSeller: true,
    reviews: [
      {
        author: 'Sujatha Reddy',
        rating: 5,
        date: '2026-06-15',
        comment: 'We purchased this saree for my daughter’s wedding reception. We were hesitant to buy online but the owner, Smt. Radha garu, showed us the saree on WhatsApp video call. Seeing the weight and softness of the Katan silk, we booked immediately. It is even more majestic in person.',
        verified: true,
        location: 'Banjara Hills, Hyderabad'
      },
      {
        author: 'Meenakshi Iyer',
        rating: 5,
        date: '2026-05-10',
        comment: 'Pure elegance. The weight of the silk and the quality of the gold zari work is outstanding. Reminds me of the sarees my grandmother owned. Deep gratitude for the outstanding customer care.',
        verified: true,
        location: 'Secunderabad'
      }
    ]
  },
  {
    id: 'saree-02',
    name: 'Kanakavalli Emerald Kanchipuram Silk Saree',
    category: 'Silk Sarees',
    fabric: 'Pure Mulberry Silk',
    price: 42000,
    originalPrice: 48500,
    color: 'Emerald Green',
    occasion: 'Wedding',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An authentic heavy-ply Kanchipuram silk saree with a traditional double-warp weave. Features a contrast crimson red border and pallu, loaded with intricate gold zari detailing of temple structures, peacocks, and Kamalam motifs.',
    fabricDetails: 'Pure three-ply mulberry silk, hand-twisted with pure silver thread electroplated with 22k gold for the zari.',
    blouseIncluded: true,
    blouseDescription: 'Contrast Crimson Red silk blouse piece (80cm) with grand golden zari sleeve borders.',
    dimensions: '5.5 meters + 0.8 meters unstitched blouse piece',
    careInstructions: 'Dry clean only. Store folded flat inside-out. Air out in shade once every 3 months.',
    stockStatus: 'In Stock',
    rating: 5.0,
    borderType: 'Grand Temple (Korvai) Gold Zari Border',
    palluDetails: 'Magnificent heavy-gold zari contrast crimson pallu featuring the traditional tree of life motif.',
    featured: true,
    isNewArrival: true,
    isBestSeller: false,
    reviews: [
      {
        author: 'Anitha Rao',
        rating: 5,
        date: '2026-07-02',
        comment: 'Stunning emerald color! The Korvai border is perfectly integrated. I visited their home boutique in Gachibowli to inspect it physically after looking at it on the website. Seeing their amazing hospitality and pure collection, we ended up buying three sarees for the family!',
        verified: true,
        location: 'Gachibowli, Hyderabad'
      }
    ]
  },
  {
    id: 'saree-03',
    name: 'Pratibha Pochampally Ikat Silk Saree',
    category: 'Silk Sarees',
    fabric: 'Pure Ikat Silk',
    price: 18500,
    originalPrice: 22000,
    color: 'Royal Purple',
    occasion: 'Festive Collection',
    images: [
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A masterpiece from the local Pochampally weaver clusters near Hyderabad. Features the iconic double ikat tie-dye geometric patterns on a rich magenta-purple body, paired with a sleek gold-lined borders.',
    fabricDetails: '100% pure Pochampally handloom silk. Certified with the Handloom Mark.',
    blouseIncluded: true,
    blouseDescription: 'Contrast mustard yellow ikat silk blouse piece with border.',
    dimensions: '5.5 meters + 0.75 meters unstitched blouse piece',
    careInstructions: 'Dry clean first time. Gentle shampoo wash in cold water or dry clean for longevity.',
    stockStatus: 'In Stock',
    rating: 4.8,
    borderType: 'Sleek Silk Border with Fine Zari Striping',
    palluDetails: 'Contrast heavy ikat weave pallu with colorful tie-dye geometric bands.',
    featured: false,
    isNewArrival: true,
    isBestSeller: true,
    reviews: [
      {
        author: 'Kalyani G.',
        rating: 4.8,
        date: '2026-06-29',
        comment: 'Being a Telugu woman, I love authentic Pochampally sarees. This boutique has the best hand-curated patterns. Excellent fabric, 100% genuine silk, and they even stitched the blouse and falls for me perfectly. Wonderful service!',
        verified: true,
        location: 'Kukatpally, Hyderabad'
      }
    ]
  },
  {
    id: 'saree-04',
    name: 'Shravani Pure Gold Linen Handloom Saree',
    category: 'Linen',
    fabric: 'Organic Handloom Linen',
    price: 7800,
    originalPrice: 9500,
    color: 'Cream',
    occasion: 'Daily Wear',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A refreshing, ultra-breathable linen saree woven with organic Belgian flax linen yarn. The off-white body is highlight-striped with real gold-coated linen borders, offering a sophisticated look for formal events, offices, or summer morning festivals.',
    fabricDetails: '100 count pure handloom linen. Sourced directly from cooperative weavers.',
    blouseIncluded: true,
    blouseDescription: 'Woven self-linen running cream blouse piece (85cm).',
    dimensions: '5.5 meters + 0.85 meters unstitched blouse piece',
    careInstructions: 'Gentle hand wash with mild detergent. Steam iron on high setting while slightly damp.',
    stockStatus: 'In Stock',
    rating: 4.7,
    borderType: 'Zari Border with Fine Gold Slub Stripes',
    palluDetails: 'Simple, elegant stripes of antique gold zari on a raw cream linen base with hand-knotted tassels.',
    featured: false,
    isNewArrival: false,
    isBestSeller: false,
    reviews: [
      {
        author: 'Dr. Vasudha Sharma',
        rating: 5,
        date: '2026-07-05',
        comment: 'Perfect for professional wear. Being a doctor, I need elegant, crisp sarees that stay fresh for 8 hours. The linen quality is premium and extremely breathable. Highly recommend.',
        verified: true,
        location: 'Madhapur, Hyderabad'
      }
    ]
  },
  {
    id: 'saree-05',
    name: 'Mandakini Ivory & Gold Tissue Organza Saree',
    category: 'Festive Collection',
    fabric: 'Premium Silk Organza',
    price: 16200,
    originalPrice: 19500,
    color: 'Off White',
    occasion: 'Festive Collection',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Experience absolute weightlessness. This ethereal silk organza saree features a glass-like sheen, hand-painted soft pastel floral creepers, and delicate hand-embroidered scalloped zari borders (Zardozi work).',
    fabricDetails: 'Premium silk-blend organza fabric with silver metallic tissue threads. Semi-transparent, stiff yet beautifully drapable texture.',
    blouseIncluded: true,
    blouseDescription: 'Ivory raw silk blouse piece with matching scalloped hand-embroidery (80cm).',
    dimensions: '5.5 meters + 0.8 meters unstitched blouse piece',
    careInstructions: 'Dry clean only. Store wrapped in tissue paper. Do not press direct hot iron, use low heat on a protective cloth overlay.',
    stockStatus: 'In Stock',
    rating: 4.9,
    borderType: 'Hand-cut Scalloped Zardozi Border with Pearls and Zari',
    palluDetails: 'Delicate light pallu featuring hand-embroidered floral buttis and fine scalloped margins.',
    featured: true,
    isNewArrival: true,
    isBestSeller: false,
    reviews: [
      {
        author: 'Divya Teja',
        rating: 5,
        date: '2026-07-11',
        comment: 'This saree got me so many compliments at a recent festive party! The fabric has a gorgeous subtle shine under the lights. It looks extremely modern and elite, yet traditional. Thank you for the quick shipping within Hyderabad!',
        verified: true,
        location: 'Jubilee Hills, Hyderabad'
      }
    ]
  },
  {
    id: 'saree-06',
    name: 'Ganga Jamuna Pure Venkatagiri Cotton Saree',
    category: 'Cotton Sarees',
    fabric: 'Pure Fine Cotton',
    price: 5400,
    originalPrice: 6800,
    color: 'Emerald Green',
    occasion: 'Daily Wear',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An authentic masterwork from Andhra weavers, utilizing the finest count of pure combed cotton. Features a unique contrast border design—one side dark crimson, the other gold—perfectly embodying the traditional Ganga-Jamuna aesthetic.',
    fabricDetails: '120s Superfine count handloom cotton. Breathable, sturdy, and dyed using certified organic plant-based colors.',
    blouseIncluded: true,
    blouseDescription: 'Running green cotton blouse piece (80cm) with gold border.',
    dimensions: '5.5 meters + 0.8 meters unstitched blouse piece',
    careInstructions: 'First wash in saltwater. Cold gentle hand wash separately. Mild starching recommended to preserve structural folds.',
    stockStatus: 'In Stock',
    rating: 4.6,
    borderType: 'Contrast Ganga Jamuna Zari Border',
    palluDetails: 'Traditional Jamdani motif pallu with gold zari horizontal stripes.',
    featured: false,
    isNewArrival: false,
    isBestSeller: false,
    reviews: [
      {
        author: 'Saraswathi S.',
        rating: 4,
        date: '2026-06-20',
        comment: 'A very reliable, lightweight saree for daily Pujas and summer outings. The cotton is extremely premium and has a beautiful starched structure. Very friendly customer service, will buy again.',
        verified: true,
        location: 'Ameerpet, Hyderabad'
      }
    ]
  },
  {
    id: 'saree-07',
    name: 'Chandrika Royal Banarasi Georgette Saree',
    category: 'Banarasi',
    fabric: 'Khaddi Georgette Silk',
    price: 28500,
    originalPrice: 35000,
    color: 'Deep Maroon',
    occasion: 'Party Wear',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A gorgeous Khaddi Georgette saree hand-dyed in deep crimson maroon and woven with heavy golden zari jaal. It combines the airy, modern fluid drape of Georgette with the historical opulence of Banarasi borders.',
    fabricDetails: 'Pure Khaddi Silk Georgette. Heavy fluid drape, certified silk purity mark.',
    blouseIncluded: true,
    blouseDescription: 'Satin silk matching crimson red unstitched blouse piece (80cm).',
    dimensions: '5.5 meters + 0.8 meters unstitched blouse piece',
    careInstructions: 'Dry clean only. Hang on plastic or wooden hangers, do not fold tightly for long periods to avoid creasing.',
    stockStatus: 'In Stock',
    rating: 5.0,
    borderType: 'Intricate Antique Floral Gold Border',
    palluDetails: 'Grand floral border with fully hand-woven jaal and diamond patterns.',
    featured: false,
    isNewArrival: true,
    isBestSeller: true,
    reviews: [
      {
        author: 'Priya Deshmukh',
        rating: 5,
        date: '2026-06-11',
        comment: 'Absolutely spectacular drape! Georgette is so easy to pleat and stays in place perfectly. The Banarasi zari work is highly polished. The family-owned touch really shows in their secure packing and custom notes. Fully satisfied!',
        verified: true,
        location: 'Begumpet, Hyderabad'
      }
    ]
  },
  {
    id: 'saree-08',
    name: 'Maharani Crimson Gold Wedding Saree',
    category: 'Wedding Collection',
    fabric: 'Pure Kanchipuram Brocade Silk',
    price: 58000,
    originalPrice: 65000,
    color: 'Deep Maroon',
    occasion: 'Wedding',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The ultimate bridal choice. This heavy Kanchipuram silk saree is fully woven with authentic 1g gold-plated zari. Features a gorgeous all-over intricate floral brocade and magnificent royal border patterns representing ancient Southern temple dynasties.',
    fabricDetails: 'Triple-ply heavy Kanchipuram Mulberry Silk. Over 45 days of precision manual weaving. Comes with official Silk Mark Card.',
    blouseIncluded: true,
    blouseDescription: 'Stunning heavy-brocade crimson blouse piece with fully loaded golden zari sleeves.',
    dimensions: '5.5 meters + 0.8 meters unstitched blouse piece',
    careInstructions: 'Dry clean only. Keep wrapped in cotton tissue or muslin. Refold occasionally to prevent creases.',
    stockStatus: 'Low Stock',
    rating: 5.0,
    borderType: 'Double-side Mega Temple Gold Zari Border',
    palluDetails: 'Exquisite bridal heavy zari pallu featuring royal chariot and swan motifs.',
    featured: true,
    isNewArrival: false,
    isBestSeller: false,
    reviews: [
      {
        author: 'Smt. Shailaja Garu',
        rating: 5,
        date: '2026-07-01',
        comment: 'Bought this for my daughter’s wedding. Truly a family heirloom. Smt. Radha and her son spent over 1 hour showing us multiple options over video call and answered every fabric detail with absolute patience. We trust them completely!',
        verified: true,
        location: 'Gachibowli, Hyderabad'
      }
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'Trust & Authenticity',
    question: 'How do I know your sarees are 100% genuine silk?',
    answer: 'Every pure silk saree in our collection comes certified with the official "Silk Mark India" or "Handloom Mark" tag. Additionally, we are a trusted family-owned business in Hyderabad for over 25 years. We source directly from weaver cooperative societies in Pochampally, Kanchipuram, and Banaras, cutting out middlemen entirely.'
  },
  {
    category: 'Shopping Assistance',
    question: 'Can I see the saree on a video call before buying?',
    answer: 'Absolutely! This is how we bring our physical home-boutique experience to you online. Once you find a saree you like, click the "Inquire on WhatsApp" button. We will schedule a live high-definition video call where we can drape it, show you closeups of the border, pallu, and check the drape and thickness of the fabric in real-time.'
  },
  {
    category: 'Local Visit',
    question: 'Can I visit your physical home-boutique in Hyderabad?',
    answer: 'We warmly welcome you and your family! We operate as an exclusive, cozy home-boutique located in Banjara Hills, Hyderabad. Visiting us allows you to touch and feel hundreds of handpicked sarees in a comfortable, pressure-free family environment. Please click the "Contact Us" section to schedule an appointment or message us on WhatsApp.'
  },
  {
    category: 'Custom Stitching',
    question: 'Do you provide blouse stitching and saree fall stitching?',
    answer: 'Yes, we provide personalized tailoring support. We can stitch standard/custom designer blouses, mount the saree fall, and do hand-tasseling for the pallu. When checking out or ordering over WhatsApp, simply mention your tailoring needs and we will coordinate measurements.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you offer Cash on Delivery (COD) and what is your return policy?',
    answer: 'Yes! We offer Cash on Delivery (COD) across India to make your purchase worry-free. For local customers in Hyderabad, we can even arrange same-day delivery via local courier. We offer an easy 7-day return policy on all unstitched sarees if you are not fully satisfied with the fabric or color.'
  }
];

export const BOUTIQUE_STORY = {
  title: 'Our Family Legacy',
  subtitle: 'Woven with love, preserved with integrity',
  foundingYear: '1998',
  founders: 'Shri Venkat Rao & Smt. Radha Rao',
  location: 'Banjara Hills, Hyderabad',
  narrative1: 'In 1998, Radha Rao started selecting beautiful sarees directly from master weavers in Pochampally and Kanchipuram for our close circle of friends and neighbors in Hyderabad. Operating from our family living room, her vision was simple: eliminate the massive corporate retail markups and bring genuine, heirloom-quality handlooms directly to local families with absolute honesty.',
  narrative2: 'Today, twenty-eight years later, Zari Heritage remains a strictly family-run home-boutique. We do not have fancy mall showrooms, expensive marketing campaigns, or high markups. Instead, we have a curated collection of handpicked sarees, decades of weaver friendships, and a reputation of pure trust. Every single saree is personally inspected by Smt. Radha and her daughter-in-law for fabric quality, weave alignment, and gold zari authenticity.',
  narrative3: 'When you purchase from us, you are not buying from a nameless warehouse. You are becoming a part of our family story, supporting local handloom weaver families, and receiving a handpicked treasure designed to last generations.',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', // Radha Rao avatar photo
  stats: [
    { label: 'Years of Trust', value: '28+' },
    { label: 'Happy Families Served', value: '5,000+' },
    { label: 'Master Weavers Sourced', value: '120+' },
    { label: 'Certified Handlooms', value: '100%' }
  ]
};
