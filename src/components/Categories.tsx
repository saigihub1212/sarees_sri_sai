import { motion } from 'motion/react';

interface CategoriesProps {
  onCategorySelect: (category: string, occasion?: string) => void;
}

export default function Categories({ onCategorySelect }: CategoriesProps) {
  
  const categoryItems = [
    {
      title: 'Banarasi Heritage',
      desc: 'Royal Katan silk with pure silver & gold zari.',
      img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      category: 'Banarasi',
      occasion: undefined,
      gridSpan: 'md:col-span-2'
    },
    {
      title: 'Kanchipuram & Silks',
      desc: 'Heavy temple-border handlooms direct from Southern weavers.',
      img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      category: 'Silk Sarees',
      occasion: undefined,
      gridSpan: 'md:col-span-1'
    },
    {
      title: 'Wedding Masterpieces',
      desc: 'Exquisite bridal brocades and heavy gold-embroidered heirlooms.',
      img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      category: 'ALL',
      occasion: 'Wedding',
      gridSpan: 'md:col-span-1'
    },
    {
      title: 'Linen & Slubs',
      desc: 'Organic Belgian flax yarns with delicate zari borders.',
      img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      category: 'Linen',
      occasion: undefined,
      gridSpan: 'md:col-span-2'
    },
    {
      title: 'Festive & Organza',
      desc: 'Weightless shimmering silk-tissue and hand-painted organzas.',
      img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      category: 'ALL',
      occasion: 'Festive Collection',
      gridSpan: 'md:col-span-1'
    },
    {
      title: 'Daily Wear Cotton',
      desc: 'Superfine Venkatagiri counts, crisp and airy for Hyderabad summer.',
      img: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&q=80',
      category: 'Cotton Sarees',
      occasion: 'Daily Wear',
      gridSpan: 'md:col-span-1 font-sans'
    }
  ];

  return (
    <section id="categories" className="py-16 lg:py-24 bg-brand-cream border-b border-brand-maroon/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 block">
              THE ARTISTRY OF HANDLOOM
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-maroon">
              Explore Curated Masterpieces
            </h2>
            <div className="w-20 h-[1px] bg-brand-gold mt-3 mb-1" />
          </div>
          <p className="text-neutral-500 text-xs sm:text-sm max-w-md font-sans leading-relaxed">
            Every collection represents a distinct geographical craft tradition. Select a category below to filter our real-time family home inventory.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categoryItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              onClick={() => onCategorySelect(item.category, item.occasion)}
              className={`group relative overflow-hidden rounded-sm border border-brand-maroon/10 shadow-sm cursor-pointer aspect-video md:aspect-auto md:h-[320px] ${item.gridSpan}`}
            >
              {/* Background Saree Image */}
              <img
                src={item.img}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gold/Maroon Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/95 via-brand-maroon/40 to-transparent group-hover:via-brand-maroon/50 transition-all duration-300" />
              
              {/* Gold Border Highlight on Hover */}
              <div className="absolute inset-4 border border-brand-gold/0 group-hover:border-brand-gold/30 rounded-sm transition-all duration-300 pointer-events-none" />

              {/* Text content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-brand-cream z-10">
                <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold mb-1">
                  {item.category === 'ALL' ? `${item.occasion}` : `${item.category}`}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-normal leading-tight group-hover:text-brand-gold transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-cream/80 mt-1 max-w-sm line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.desc}
                </p>
                <div className="text-[10px] font-semibold text-brand-gold font-mono tracking-wider mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span>VIEW ALL CODES</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
