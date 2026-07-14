import { X, RefreshCw, MessageSquare, Trash2, ShieldCheck, HelpCircle } from 'lucide-react';
import { Saree } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: Saree[];
  onRemove: (saree: Saree) => void;
  onQuickView: (saree: Saree) => void;
}

export default function ComparisonDrawer({
  isOpen,
  onClose,
  compareList,
  onRemove,
  onQuickView
}: ComparisonDrawerProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const triggerWhatsAppComparison = () => {
    const comparisonText = compareList.map((s) => `• ${s.name} (Price: ${formatPrice(s.price)} - Fabric: ${s.fabric})`).join('\n');
    const text = encodeURIComponent(
      `Namaste Radha Rao garu,\n\nI am comparing these ${compareList.length} sarees on your website and would love to see their drapes side-by-side on a WhatsApp video call:\n\n${comparisonText}\n\nCould you please help us choose the best fit for our occasion?`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6" id="compare-drawer-root">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-maroon-dark/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Matrix Panel Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-brand-cream w-full max-w-5xl rounded-sm overflow-hidden shadow-2xl border border-brand-maroon/10 z-10 flex flex-col max-h-[90vh] lg:max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-maroon/10 flex justify-between items-center bg-brand-ivory shrink-0">
              <div className="flex items-center gap-2.5 text-left">
                <RefreshCw className="w-5 h-5 text-brand-maroon" />
                <div>
                  <h3 className="font-serif text-lg font-normal text-brand-maroon">Side-by-Side Saree Spec Comparison</h3>
                  <p className="text-[10px] text-neutral-500 font-sans mt-0.5">Compare fabric counts, borders, and handloom weights before finalizing.</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-1.5 rounded-sm hover:bg-brand-maroon hover:text-brand-cream text-neutral-700 transition-colors cursor-pointer border border-brand-maroon/10 bg-brand-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Matrix Scroll Area */}
            <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
              {compareList.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 bg-brand-maroon/5 border border-brand-maroon/10 rounded-sm flex items-center justify-center mx-auto text-neutral-400">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <div className="max-w-md mx-auto">
                    <h4 className="font-serif font-normal text-sm text-brand-maroon">Your comparison tray is empty</h4>
                    <p className="text-xs text-neutral-500 mt-1">Click the dual arrow rotation icon on any saree card to add it here. You can compare up to 3 sarees at once to help your family choose.</p>
                  </div>
                </div>
              ) : (
                <div className="min-w-[600px] text-left border border-brand-maroon/10 rounded-sm overflow-hidden">
                  
                  {/* Grid Rows structure */}
                  <div className={`grid grid-cols-${compareList.length + 1} bg-brand-ivory text-xs border-b border-brand-maroon/10 font-sans`}>
                    
                    {/* Header Row: Saree titles & images */}
                    <div className="p-4 font-bold text-brand-maroon border-r border-brand-maroon/10 flex items-center bg-brand-ivory/50">
                      Saree Showcase
                    </div>
                    {compareList.map((saree) => (
                      <div key={saree.id} className="p-4 border-r border-brand-maroon/10 last:border-0 relative group text-center bg-brand-cream">
                        <button
                          onClick={() => onRemove(saree)}
                          className="absolute top-2 right-2 p-1 bg-red-50 text-red-600 rounded-sm border border-red-100 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                          title="Remove from compare"
                        >
                          <X className="w-3 h-3" />
                        </button>

                        <div className="w-24 aspect-[3/4] rounded-sm overflow-hidden mx-auto shadow-sm border border-brand-maroon/10">
                          <img
                            src={saree.images[0]}
                            alt={saree.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-serif font-normal text-brand-maroon text-[13px] line-clamp-1 mt-3 hover:text-brand-gold cursor-pointer" onClick={() => onQuickView(saree)}>
                          {saree.name}
                        </h4>
                        <span className="font-mono text-[11px] text-brand-gold font-bold mt-1.5 block">
                          {formatPrice(saree.price)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Matrix specs rows */}
                  {[
                    { label: 'Category Style', key: 'category' },
                    { label: 'Fabric Composition', key: 'fabric' },
                    { label: 'Gold Zari Border', key: 'borderType' },
                    { label: 'Pallu Decoration', key: 'palluDetails' },
                    { label: 'Unstitched Blouse', key: 'blouseDescription' },
                    { label: 'Full Dimensions', key: 'dimensions' },
                    { label: 'Care Protocols', key: 'careInstructions' },
                    { label: 'Weave Certification', render: () => <span className="text-brand-emerald font-bold">✔ Verified Pure Silk Mark</span> }
                  ].map((row, rIdx) => (
                    <div
                      key={rIdx}
                      className={`grid grid-cols-${compareList.length + 1} text-xs border-b border-brand-maroon/10 last:border-0 hover:bg-brand-ivory/30 transition-colors font-sans`}
                    >
                      {/* Left Header label column */}
                      <div className="p-4 font-semibold text-brand-maroon border-r border-brand-maroon/10 bg-brand-ivory/50">
                        {row.label}
                      </div>
                      
                      {/* Compare columns */}
                      {compareList.map((saree) => (
                        <div key={saree.id} className="p-4 border-r border-brand-maroon/10 last:border-0 font-medium text-neutral-700 bg-brand-cream">
                          {row.render ? row.render() : (saree as any)[row.key!]}
                        </div>
                      ))}
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* Bottom Actions banner console */}
            {compareList.length > 0 && (
              <div className="p-6 border-t border-brand-maroon/10 bg-brand-ivory flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                    <span className="text-xs font-bold text-brand-maroon uppercase font-sans">Guaranteed Weaver direct items</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-sans mt-1">Comparing multiple codes? We can hold up both sarees in a single WhatsApp frame so you can audit color tones together.</p>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-initial border border-neutral-300 text-neutral-700 bg-brand-cream hover:bg-brand-ivory px-6 py-3.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
                  >
                    Keep Browsing
                  </button>
                  <button
                    onClick={triggerWhatsAppComparison}
                    className="flex-1 sm:flex-initial bg-brand-emerald hover:bg-brand-emerald/90 text-white px-6 py-3.5 rounded-sm text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    id="compare-whatsapp-checkout-btn"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Compare Side-by-Side Live</span>
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
