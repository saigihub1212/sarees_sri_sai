import React, { MouseEvent } from 'react';
import { Heart, RefreshCw, MessageSquare, ZoomIn, Eye, Sparkles } from 'lucide-react';
import { Saree } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string;
  saree: Saree;
  onQuickView: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCompare: () => void;
  isComparing: boolean;
}

export default function ProductCard({
  saree,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  onAddToCompare,
  isComparing
}: ProductCardProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const openWhatsApp = (e: MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Namaste Smt. Radha garu, I am interested in inquiring about the "${saree.name}" (Fabric: ${saree.fabric}, Color: ${saree.color}, Price: ${formatPrice(saree.price)}). Can we schedule a video call to inspect it?`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-brand-cream border border-brand-maroon/10 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative group flex flex-col h-full"
      id={`saree-card-${saree.id}`}
    >
      {/* Absolute Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {saree.isBestSeller && (
          <span className="bg-brand-maroon text-brand-cream text-[9px] font-mono tracking-wider uppercase font-bold px-2.5 py-1 rounded-sm border border-brand-gold/30 flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-brand-gold fill-brand-gold" />
            <span>Best Seller</span>
          </span>
        )}
        {saree.isNewArrival && (
          <span className="bg-brand-gold text-brand-maroon text-[9px] font-mono tracking-wider uppercase font-bold px-2.5 py-1 rounded-sm border border-brand-cream/20 flex items-center gap-1 shadow-sm">
            <span>New Arrival</span>
          </span>
        )}
        {saree.stockStatus === 'Low Stock' && (
          <span className="bg-amber-100 text-amber-900 text-[9px] font-mono tracking-wider uppercase font-bold px-2.5 py-1 rounded-sm border border-amber-200 shadow-sm">
            <span>Only 1 Left</span>
          </span>
        )}
      </div>

      {/* Floating Action Utility Bar (Wishlist, Compare) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`p-2 rounded-sm border shadow-sm transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-brand-maroon text-brand-cream border-brand-maroon'
              : 'bg-brand-cream hover:bg-brand-maroon hover:text-brand-cream text-neutral-600 border-neutral-200'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          id={`wishlist-btn-${saree.id}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-gold text-brand-gold' : ''}`} />
        </button>

        {/* Compare Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCompare();
          }}
          className={`p-2 rounded-sm border shadow-sm transition-all cursor-pointer ${
            isComparing
              ? 'bg-brand-emerald text-white border-brand-emerald'
              : 'bg-brand-cream hover:bg-brand-emerald hover:text-white text-neutral-600 border-neutral-200'
          }`}
          title={isComparing ? "In Comparison" : "Compare Fabric Details"}
          id={`compare-btn-${saree.id}`}
        >
          <RefreshCw className="w-4 h-4 animate-spin-hover" />
        </button>
      </div>

      {/* Main Image Container */}
      <div 
        onClick={onQuickView}
        className="relative aspect-[3/4] overflow-hidden bg-brand-ivory cursor-pointer border-b border-brand-maroon/10 group-hover:opacity-95"
      >
        <img
          src={saree.images[0]}
          alt={saree.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Hover quick action card overlay */}
        <div className="absolute inset-0 bg-brand-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-brand-cream/95 text-brand-maroon px-4 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase border border-brand-maroon/10 shadow-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4" />
            <span>Inspect Details</span>
          </span>
        </div>
      </div>

      {/* Text Card Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        
        {/* Core Metadata */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">
            <span>{saree.category}</span>
            <span>•</span>
            <span className="text-brand-gold font-bold">{saree.color}</span>
          </div>

          <h3 
            onClick={onQuickView}
            className="font-serif text-base font-normal text-brand-maroon line-clamp-2 hover:text-brand-gold cursor-pointer transition-colors duration-200 min-h-[44px]"
          >
            {saree.name}
          </h3>

          <div className="text-[11px] text-neutral-600 font-sans mt-2 flex items-center gap-1.5 border-t border-brand-maroon/10 pt-2.5">
            <span className="font-semibold text-brand-maroon">Fabric:</span>
            <span>{saree.fabric}</span>
          </div>
        </div>

        {/* Pricing and Actions */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col gap-3">
          
          {/* Price display */}
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-lg font-bold text-brand-maroon">
              {formatPrice(saree.price)}
            </span>
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(saree.originalPrice)}
            </span>
            <span className="text-[10px] text-brand-emerald font-bold font-mono">
              Save {Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)}%
            </span>
          </div>

          {/* Saree Spec Line */}
          <div className="text-[10px] text-neutral-400 italic">
            * Blouse fabric & falls are included free of cost
          </div>

          {/* Quick CTA Actions */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={onQuickView}
              className="border border-brand-maroon/30 text-brand-maroon hover:bg-brand-maroon/5 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              id={`quickview-btn-${saree.id}`}
            >
              Quick View
            </button>
            <button
              onClick={openWhatsApp}
              className="bg-brand-emerald hover:bg-brand-emerald/90 text-white py-2 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
              id={`whatsapp-inquiry-btn-${saree.id}`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>Inquire</span>
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
