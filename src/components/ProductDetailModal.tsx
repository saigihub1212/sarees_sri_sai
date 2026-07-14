import React, { useState, useRef, CSSProperties, MouseEvent } from 'react';
import { X, Heart, MessageSquare, ShieldCheck, Sparkles, AlertTriangle, Check, Star, RefreshCw, Layers } from 'lucide-react';
import { Saree } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  saree: Saree | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCompare: () => void;
  isComparing: boolean;
  allSarees: Saree[];
  onSelectSaree: (saree: Saree) => void;
}

export default function ProductDetailModal({
  saree,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCompare,
  isComparing,
  allSarees,
  onSelectSaree
}: ProductDetailModalProps) {
  if (!saree) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<CSSProperties>({ display: 'none' });
  const [isZooming, setIsZooming] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'story' | 'care'>('specs');
  
  const imageRef = useRef<HTMLImageElement>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Magnifying Glass / Fabric Detail Zoom
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${saree.images[activeImageIndex]})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%' // Zoom factor
    });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({ display: 'none' });
  };

  const openWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Namaste Radha garu, I am reviewing the "${saree.name}" (Code: ${saree.id}, Fabric: ${saree.fabric}, Color: ${saree.color}). I would love to schedule a virtual WhatsApp video call to see the saree drape, pallu detail, and zari work live.`
    );
    window.open(`https://wa.me/917386117788?text=${text}`, '_blank');
  };

  // Filter similar products
  const similarSarees = allSarees
    .filter((s) => s.id !== saree.id && (s.category === saree.category || s.occasion === saree.occasion))
    .slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" id="detail-modal-root">
          
          {/* Elegant Darkened Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-maroon-dark/60 backdrop-blur-sm"
          />

          {/* Modal Container (Sleek Interface: rounded-sm and border-brand-maroon/10) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4 }}
            className="relative bg-brand-cream w-full max-w-6xl rounded-sm overflow-hidden shadow-2xl border border-brand-maroon/10 z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] lg:max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-sm bg-brand-cream/80 hover:bg-brand-maroon hover:text-brand-cream text-neutral-800 shadow transition-all duration-200 cursor-pointer border border-brand-maroon/10"
              id="close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LEFT SIDE: Image Gallery & Magnifier (5 Cols) */}
            <div className="lg:col-span-5 p-6 bg-brand-ivory border-b lg:border-b-0 lg:border-r border-brand-maroon/10 flex flex-col overflow-y-auto select-none">
              
              {/* Primary Magnifier Wrapper */}
              <div 
                className="relative aspect-[3/4] bg-brand-cream rounded-sm overflow-hidden border border-brand-maroon/10 cursor-crosshair group shadow-inner"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  ref={imageRef}
                  src={saree.images[activeImageIndex]}
                  alt={`${saree.name} active`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Simulated Lens Magnifier Overlay */}
                {isZooming && (
                  <div
                    style={zoomStyle}
                    className="absolute inset-0 pointer-events-none border border-brand-gold/30 rounded-sm bg-no-repeat shadow-inner transition-opacity duration-200"
                  />
                )}

                {/* Mobile/Default Helper Badge */}
                {!isZooming && (
                  <div className="absolute bottom-3 right-3 bg-brand-maroon/80 text-brand-cream text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm border border-brand-gold/20 flex items-center gap-1">
                    <span>Hover over fabric to zoom</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Slider / Closeups and Pallu Views */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {saree.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-sm overflow-hidden border transition-all cursor-pointer bg-brand-cream ${
                      activeImageIndex === idx ? 'border-brand-gold shadow-sm' : 'border-neutral-200 hover:border-brand-maroon/50'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`View detail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Silk Mark Credentials Banner */}
              <div className="mt-6 p-4 rounded-sm bg-brand-maroon/5 border border-brand-maroon/10 flex items-center gap-3.5">
                <div className="bg-brand-cream p-2 rounded-sm border border-brand-maroon/10 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif font-bold text-xs text-brand-maroon leading-none">Silk Mark Certified Pure</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">This saree includes our signed authenticity stamp. Returnable within 7 days if any fabric purity doubt exists.</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Rich Saree Details & Tabbed Specifications (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-brand-cream">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-widest text-brand-gold font-bold uppercase">
                    {saree.category} Collection • Code: {saree.id}
                  </span>
                  
                  {/* Stock Alert */}
                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm ${
                    saree.stockStatus === 'In Stock' 
                      ? 'bg-emerald-50 text-brand-emerald border border-brand-emerald/10' 
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}>
                    {saree.stockStatus}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-brand-maroon mt-2 leading-tight">
                  {saree.name}
                </h2>

                {/* Rating summary */}
                <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-neutral-600">
                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-gold" />
                    ))}
                  </div>
                  <span>{saree.rating} stars</span>
                  <span>•</span>
                  <span className="text-brand-maroon font-bold underline cursor-pointer">{saree.reviews.length} Verified Reviews</span>
                </div>

                {/* Price Display Block */}
                <div className="mt-4 p-4 rounded-sm bg-brand-ivory border border-brand-maroon/10 flex items-baseline gap-4">
                  <span className="font-serif text-2xl font-bold text-brand-maroon">
                    {formatPrice(saree.price)}
                  </span>
                  <span className="text-sm text-neutral-400 line-through">
                    {formatPrice(saree.originalPrice)}
                  </span>
                  <span className="text-xs text-brand-emerald font-bold font-mono">
                    Save {formatPrice(saree.originalPrice - saree.price)} ({Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)}% Off)
                  </span>
                </div>



                {/* Tabbed Specs Panel */}
                <div className="mt-6">
                  {/* Tabs headers */}
                  <div className="flex border-b border-brand-maroon/10 gap-6">
                    {(['specs', 'story', 'care'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2.5 text-xs font-semibold tracking-wider uppercase relative cursor-pointer ${
                          activeTab === tab ? 'text-brand-maroon' : 'text-neutral-400 hover:text-brand-maroon'
                        }`}
                      >
                        {tab === 'specs' ? 'Weave & Specs' : tab === 'story' ? 'Tailoring Support' : 'Fabric Care'}
                        {activeTab === tab && (
                          <motion.div
                            layoutId="modalTabLine"
                            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tabs content */}
                  <div className="mt-4 text-xs space-y-3.5 text-neutral-700 leading-relaxed font-sans">
                    {activeTab === 'specs' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        <div className="flex justify-between py-1.5 border-b border-neutral-100">
                          <span className="text-neutral-500">Fabric Thread:</span>
                          <span className="font-semibold text-brand-maroon">{saree.fabric}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-neutral-100">
                          <span className="text-neutral-500">Gold Border:</span>
                          <span className="font-semibold text-brand-maroon">{saree.borderType}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-neutral-100">
                          <span className="text-neutral-500">Pallu Details:</span>
                          <span className="font-semibold text-brand-maroon">{saree.palluDetails}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-neutral-100">
                          <span className="text-neutral-500">Dimensions:</span>
                          <span className="font-semibold text-brand-maroon">{saree.dimensions}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-neutral-100">
                          <span className="text-neutral-500">Color Variant:</span>
                          <span className="font-semibold text-brand-maroon">{saree.color}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-neutral-100">
                          <span className="text-neutral-500">Weave Source:</span>
                          <span className="font-semibold text-brand-maroon">Verified Handloom Mark</span>
                        </div>
                      </div>
                    )}

                    {activeTab === 'story' && (
                      <div className="bg-brand-ivory p-4 rounded-sm border border-brand-maroon/10 space-y-2.5">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                          <p><span className="font-semibold text-brand-maroon">Blouse Fabric Included:</span> {saree.blouseDescription}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                          <p><span className="font-semibold text-brand-maroon">Custom Stitching:</span> Tell us your measurements. Smt. Radha’s local tailor can stitch custom designs, attach premium cotton falls, and style elegant hand-tied tassels for the pallu before dispatch.</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                          <p><span className="font-semibold text-brand-maroon">Video Inspection:</span> Want to verify the contrast fabric matching? Let’s trigger a WhatsApp call!</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'care' && (
                      <div className="space-y-2 bg-amber-50/50 p-4 rounded-sm border border-amber-100 text-neutral-800">
                        <p className="font-medium text-brand-maroon">Preserving Your Heirloom Silk:</p>
                        <p className="text-[11px] leading-relaxed">{saree.careInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Core Verified Local Customer Reviews */}
                <div className="mt-8">
                  <h4 className="font-serif font-normal text-sm text-brand-maroon border-b border-brand-maroon/10 pb-2">
                    Verified Customer Feedback ({saree.reviews.length})
                  </h4>
                  <div className="mt-3.5 space-y-4">
                    {saree.reviews.map((rev, index) => (
                      <div key={index} className="bg-brand-ivory p-4 rounded-sm border border-brand-maroon/10 text-left">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-brand-maroon text-xs">{rev.author}</span>
                            <span className="text-[10px] text-neutral-400 font-mono ml-2 font-medium">{rev.location}</span>
                          </div>
                          <span className="bg-brand-emerald/10 text-brand-emerald text-[9px] font-mono px-2 py-0.5 rounded-sm font-bold uppercase">
                            Verified Saree Buyer
                          </span>
                        </div>
                        <div className="flex text-brand-gold gap-0.5 mt-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-brand-gold" />
                          ))}
                        </div>
                        <p className="text-xs text-neutral-600 mt-2 italic font-sans leading-relaxed">
                          "{rev.comment}"
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-1.5 font-mono">{rev.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Similar Sarees Suggestions (Carousel/Listing) */}
                <div className="mt-8">
                  <h4 className="font-serif font-normal text-sm text-brand-maroon border-b border-brand-maroon/10 pb-2">
                    Similar Handloomed Recommendations
                  </h4>
                  <div className="grid grid-cols-3 gap-3 mt-3.5">
                    {similarSarees.map((simSaree) => (
                      <div
                        key={simSaree.id}
                        onClick={() => {
                          onSelectSaree(simSaree);
                          setActiveImageIndex(0);
                        }}
                        className="bg-brand-ivory p-1.5 rounded-sm border border-brand-maroon/10 cursor-pointer hover:border-brand-gold transition-colors flex flex-col group"
                      >
                        <div className="aspect-[3/4] rounded-sm overflow-hidden relative">
                          <img
                            src={simSaree.images[0]}
                            alt={simSaree.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-1 text-left mt-2 flex-grow flex flex-col justify-between">
                          <h5 className="font-serif text-[11px] font-normal text-brand-maroon line-clamp-1 group-hover:text-brand-gold">
                            {simSaree.name}
                          </h5>
                          <span className="font-mono text-[10px] text-brand-gold font-bold mt-1">
                            {formatPrice(simSaree.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Sticky Action Console */}
              <div className="mt-8 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openWhatsAppInquiry}
                  className="flex-grow bg-brand-emerald hover:bg-brand-emerald/95 text-white py-4 rounded-sm text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  id="modal-whatsapp-cta"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Schedule Video Call For This Saree</span>
                </button>

                <div className="flex gap-2">
                  {/* Compare toggle */}
                  <button
                    onClick={onAddToCompare}
                    className={`p-4 rounded-sm border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      isComparing
                        ? 'bg-brand-emerald text-white border-brand-emerald'
                        : 'bg-brand-cream text-neutral-700 border-neutral-200 hover:bg-brand-ivory hover:text-brand-maroon'
                    }`}
                    title={isComparing ? "Remove comparison" : "Compare fabric specs"}
                    id="modal-compare-btn"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{isComparing ? "Comparing" : "Compare"}</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={onToggleWishlist}
                    className={`p-4 rounded-sm border flex items-center justify-center cursor-pointer transition-all ${
                      isWishlisted
                        ? 'bg-brand-maroon text-brand-cream border-brand-maroon'
                        : 'bg-brand-cream text-neutral-700 border-neutral-200 hover:bg-brand-maroon hover:text-brand-cream'
                    }`}
                    title={isWishlisted ? "Remove Wishlist" : "Save to Wishlist"}
                    id="modal-wishlist-btn"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-gold text-brand-gold' : ''}`} />
                  </button>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
