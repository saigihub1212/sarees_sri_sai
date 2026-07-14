import { X, Heart, MessageSquare, Eye, Trash2 } from 'lucide-react';
import { Saree } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Saree[];
  onRemove: (saree: Saree) => void;
  onQuickView: (saree: Saree) => void;
  onClearWishlist: () => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onQuickView,
  onClearWishlist
}: WishlistDrawerProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const openWhatsAppGroupInquiry = () => {
    const listNames = wishlist.map((s) => `• ${s.name} (${formatPrice(s.price)})`).join('\n');
    const text = encodeURIComponent(
      `Namaste Radha Rao garu,\n\nI have saved these ${wishlist.length} beautiful sarees on your website and would love to view them over a live WhatsApp video call:\n\n${listNames}\n\nPlease let me know when your team is available to show these to my family.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="wishlist-drawer-root">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-maroon-dark/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Sheet */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 select-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-screen max-w-md bg-brand-cream border-l border-brand-maroon/10 shadow-2xl flex flex-col justify-between"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-brand-maroon/10 flex justify-between items-center bg-brand-ivory">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-brand-maroon fill-brand-gold" />
                  <h3 className="font-serif text-lg font-normal text-brand-maroon">Your Saved Favorites</h3>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-sm hover:bg-brand-maroon hover:text-brand-cream text-neutral-700 transition-colors cursor-pointer border border-brand-maroon/10 bg-brand-cream"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Saved list scroll block */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-brand-maroon/5 border border-brand-maroon/10 rounded-sm flex items-center justify-center mx-auto text-neutral-400">
                      <Heart className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-serif font-normal text-sm text-brand-maroon">No sarees saved yet</h4>
                      <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">Click the heart icon on any saree to save it while browsing our collection.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-500">{wishlist.length} sarees saved</span>
                      <button
                        onClick={onClearWishlist}
                        className="text-brand-maroon font-semibold underline hover:text-brand-gold transition-colors cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {wishlist.map((saree) => (
                        <div
                          key={saree.id}
                          className="flex gap-4 p-3.5 bg-brand-cream rounded-sm border border-brand-maroon/10 shadow-sm relative group"
                        >
                          {/* Image */}
                          <div className="w-20 aspect-[3/4] rounded-sm overflow-hidden shrink-0 border border-brand-maroon/10">
                            <img
                              src={saree.images[0]}
                              alt={saree.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Meta details */}
                          <div className="flex-1 flex flex-col justify-between text-left">
                            <div>
                              <span className="text-[9px] font-mono font-bold tracking-widest text-brand-gold uppercase">{saree.category}</span>
                              <h4 className="font-serif text-sm font-normal text-brand-maroon line-clamp-2 mt-0.5">{saree.name}</h4>
                              <p className="text-[10px] text-neutral-500 font-sans mt-0.5">Fabric: {saree.fabric}</p>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-maroon/5">
                              <span className="font-serif text-xs font-bold text-brand-maroon">{formatPrice(saree.price)}</span>
                              
                              <div className="flex gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                  onClick={() => onQuickView(saree)}
                                  className="p-1.5 bg-brand-cream hover:bg-brand-maroon hover:text-brand-cream border border-neutral-200 rounded-sm transition-colors cursor-pointer"
                                  title="Inspect fabric detail"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onRemove(saree)}
                                  className="p-1.5 bg-brand-cream hover:bg-red-50 text-neutral-400 hover:text-red-600 border border-neutral-200 rounded-sm transition-colors cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Actions checkout drawer console */}
              {wishlist.length > 0 && (
                <div className="p-6 border-t border-brand-maroon/10 bg-brand-ivory space-y-4">
                  <div className="bg-brand-maroon/5 border border-brand-maroon/10 p-4 rounded-sm text-left">
                    <p className="text-[11px] text-brand-maroon leading-relaxed">
                      💡 <strong>Family Consultation Tip:</strong> You can book a video appointment with your family to inspect all these saved sarees live together in one sitting!
                    </p>
                  </div>
                  <button
                    onClick={openWhatsAppGroupInquiry}
                    className="w-full flex items-center justify-center gap-2 bg-brand-emerald hover:bg-brand-emerald/90 text-white py-4 rounded-sm text-xs font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer"
                    id="wishlist-whatsapp-checkout-btn"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Inquire Saved Collection</span>
                  </button>
                  <p className="text-[10px] text-neutral-400 text-center font-sans">
                    No payment required. Free video consultation & cash on delivery.
                  </p>
                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
