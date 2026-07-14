import { Eye, Clock, ArrowRight } from 'lucide-react';
import { Saree } from '../types';
import { motion } from 'motion/react';

interface RecentlyViewedProps {
  list: Saree[];
  onQuickView: (saree: Saree) => void;
}

export default function RecentlyViewed({ list, onQuickView }: RecentlyViewedProps) {
  if (list.length === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-12 bg-brand-cream/60 border-t border-b border-brand-maroon/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 text-left">
          <Clock className="w-4 h-4 text-brand-gold" />
          <h3 className="font-serif text-sm font-normal tracking-wider text-brand-maroon uppercase">
            Your Recently Viewed Sarees ({list.length})
          </h3>
          <div className="h-px bg-brand-maroon/10 flex-grow ml-2" />
        </div>

        {/* Horizontal shelf layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {list.map((saree) => (
            <motion.div
              key={saree.id}
              whileHover={{ y: -3 }}
              onClick={() => onQuickView(saree)}
              className="bg-brand-cream border border-brand-maroon/10 p-2.5 rounded-sm cursor-pointer hover:border-brand-gold/30 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="aspect-[3/4] rounded-sm overflow-hidden bg-brand-ivory relative">
                  <img
                    src={saree.images[0]}
                    alt={saree.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-brand-cream" />
                  </div>
                </div>

                {/* Meta details */}
                <h4 className="font-serif font-normal text-brand-maroon text-[11px] line-clamp-1 mt-2 group-hover:text-brand-gold transition-colors">
                  {saree.name}
                </h4>
              </div>

              <div className="flex justify-between items-baseline mt-1.5 border-t border-brand-maroon/5 pt-1.5">
                <span className="text-[10px] text-neutral-400 font-mono uppercase">{saree.fabric.split(' ')[0]}</span>
                <span className="font-mono text-[10px] font-bold text-brand-gold">
                  {formatPrice(saree.price)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
