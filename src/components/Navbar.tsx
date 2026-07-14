import { useState, useEffect } from 'react';
import { Menu, X, Heart, RefreshCw, MessageSquare, Search, Phone, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  wishlistCount: number;
  compareCount: number;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenSearch: () => void;
}

export default function Navbar({
  activeSection,
  setActiveSection,
  wishlistCount,
  compareCount,
  onOpenWishlist,
  onOpenCompare,
  onOpenSearch
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'collections', label: 'Our Collection' }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("Namaste Sri Sai Sarees, I am visiting your website and would like to schedule a virtual saree consultation.");
    window.open(`https://wa.me/919912317788?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Top Banner Alert for Festivals / Wedding Season */}
      <div className="bg-brand-maroon text-brand-cream text-xs py-2 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2 border-b border-brand-gold/20 select-none">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
        <span>Shravanam & Bridal Season Live: Schedule a Live WhatsApp Video Inspection Today!</span>
        <button 
          onClick={openWhatsApp}
          className="underline hover:text-brand-gold ml-2 font-semibold transition-colors duration-200 cursor-pointer"
        >
          Book Video Slot
        </button>
      </div>

      <header
        id="navbar-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-cream/95 backdrop-blur-md shadow-sm border-b border-brand-maroon/10 py-3.5'
            : 'bg-brand-cream py-5 border-b border-brand-maroon/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo and Brand Title (Sleek Interface Style) */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex flex-col cursor-pointer group text-left"
            >
              <h1 className="font-serif text-xl sm:text-2xl font-normal tracking-[2px] text-brand-maroon uppercase leading-none">
                Sri Sai Sarees
              </h1>
              <span className="text-[9px] font-sans tracking-[3px] text-neutral-500 font-bold uppercase mt-1 group-hover:text-brand-maroon transition-colors duration-300">
                Est. 1998 • Hyderabad
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-[11px] font-semibold tracking-[1.5px] cursor-pointer uppercase transition-colors duration-300 py-1 ${
                    activeSection === item.id 
                      ? 'text-brand-maroon' 
                      : 'text-neutral-600 hover:text-brand-maroon'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Quick Actions (Search, Wishlist, Compare, Call, WhatsApp) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Toggle */}
              <button
                onClick={onOpenSearch}
                className="p-1.5 text-neutral-600 hover:text-brand-maroon hover:bg-brand-ivory rounded-full transition-colors duration-200 cursor-pointer"
                title="Search Sarees"
                id="search-nav-btn"
              >
                <Search className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              </button>

              {/* Compare Toggle */}
              <button
                onClick={onOpenCompare}
                className="relative p-1.5 text-neutral-600 hover:text-brand-maroon hover:bg-brand-ivory rounded-full transition-colors duration-200 cursor-pointer"
                title="Compare Sarees"
                id="compare-nav-btn"
              >
                <RefreshCw className="w-5 h-5 sm:w-[21px] sm:h-[21px]" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-emerald text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {compareCount}
                  </span>
                )}
              </button>

              {/* Wishlist Toggle */}
              <button
                onClick={onOpenWishlist}
                className="relative p-1.5 text-neutral-600 hover:text-brand-maroon hover:bg-brand-ivory rounded-full transition-colors duration-200 cursor-pointer"
                title="Your Wishlist"
                id="wishlist-nav-btn"
              >
                <Heart className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-maroon text-brand-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Direct WhatsApp Call Assistant */}
              <button
                onClick={openWhatsApp}
                className="hidden lg:flex items-center gap-2 bg-brand-maroon hover:bg-brand-maroon-dark text-brand-cream px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border border-brand-gold/30 shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
                id="whatsapp-call-btn"
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
                <span>Virtual Showroom</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-1.5 text-neutral-700 hover:text-brand-maroon rounded-full transition-colors duration-200 cursor-pointer"
                id="mobile-menu-btn"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-brand-cream border-t border-brand-gold/10 shadow-lg overflow-hidden"
              id="mobile-nav-drawer"
            >
              <div className="px-4 pt-3 pb-6 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide uppercase cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-brand-maroon text-brand-cream'
                        : 'text-neutral-700 hover:bg-brand-ivory hover:text-brand-maroon'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-4 border-t border-brand-gold/10 flex flex-col gap-3 px-4">
                  <button
                    onClick={openWhatsApp}
                    className="flex items-center justify-center gap-2 bg-brand-emerald text-white py-3 rounded-lg text-sm font-semibold tracking-wider uppercase shadow hover:bg-brand-emerald/90 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>WhatsApp Video Call</span>
                  </button>
                  <a
                    href="tel:+919912317788"
                    className="flex items-center justify-center gap-2 bg-brand-maroon text-brand-cream py-3 rounded-lg text-sm font-semibold tracking-wider uppercase shadow hover:bg-brand-maroon-dark transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-brand-gold" />
                    <span>Call Smt. Radha: +91 9912317788</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
