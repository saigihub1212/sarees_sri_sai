import { MessageSquare, ArrowRight, Star, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBrowseClick: () => void;
  onNewArrivalsClick: () => void;
}

export default function Hero({ onBrowseClick, onNewArrivalsClick }: HeroProps) {
  const openWhatsApp = () => {
    const text = encodeURIComponent("Namaste Zari Heritage, I am interested in viewing your pure silk collections.");
    window.open(`https://wa.me/919912317788?text=${text}`, '_blank');
  };

  return (
    <section id="hero" className="relative bg-brand-cream py-12 lg:py-24 overflow-hidden border-b border-brand-gold/10">
      {/* Decorative Gold Leaf Background Pattern (Minimalist and traditional) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full filter blur-3xl -z-10 transform translate-x-20 -translate-y-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-maroon/5 rounded-full filter blur-3xl -z-10 transform -translate-x-20 translate-y-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            {/* Elegant Legacy Subscript Badge (Sleek Interface Style) */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-[30px] h-[1px] bg-brand-gold" />
              <span className="text-xs tracking-wider text-brand-gold font-bold uppercase font-sans">
                Directly From Our Home to Yours
              </span>
            </div>

            {/* Breathtaking Editorial Heading (Georgia Normal Font style) */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-brand-maroon leading-[1.1] mb-5 tracking-tight font-normal">
              Elegant Sarees for <br className="hidden sm:inline" /> Every Occasion
            </h1>

            {/* Subheading focusing strictly on local trust & zero risk */}
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
              Experience the trust of a family-owned legacy. Hand-picked authentic weaves curated for the modern Indian woman who values heritage. Skip the retail showroom markups and buy genuine heirloom sarees with absolute peace of mind.
            </p>

            {/* Local Proof Factor (No AI tech slop, real local trust indicators) */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                <span className="text-neutral-800 font-bold ml-1">5.0 (480+ local reviews)</span>
              </div>
              <div className="h-4 w-px bg-neutral-300 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                <span>Pure Silk Mark Certified</span>
              </div>
            </div>

            {/* Premium Interactive Action Buttons (Sleek Theme button styles) */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3.5">
              <button
                onClick={onBrowseClick}
                className="group flex items-center justify-center gap-2 bg-brand-maroon hover:bg-brand-maroon-dark text-brand-cream px-8 py-3.5 rounded-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer text-xs"
                id="hero-browse-btn"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onNewArrivalsClick}
                className="flex items-center justify-center bg-transparent border border-brand-maroon hover:bg-brand-maroon/5 text-brand-maroon px-8 py-3.5 rounded-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer text-xs"
                id="hero-new-arrivals-btn"
              >
                <span>Our Story</span>
              </button>

              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 bg-brand-emerald hover:bg-brand-emerald/90 text-white px-8 py-3.5 rounded-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer text-xs shadow-sm"
                id="hero-whatsapp-btn"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp Video Call</span>
              </button>
            </div>
          </motion.div>

          {/* Majestic Interactive Image Showcase (Sleek Interface Arch and shadows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative pt-4"
          >
            {/* Main Luxury Saree Frame with Arch Shape */}
            <div className="relative aspect-[3/4] max-w-[350px] mx-auto w-full bg-brand-ivory rounded-t-[180px] overflow-hidden border border-brand-maroon/10 shadow-[16px_16px_0px_#FDFBF7,17px_17px_0px_rgba(74,4,4,0.1)] group">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
                alt="Pure crimson silk wedding saree"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              
              {/* Elegant floating gradient and text overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-maroon/95 via-brand-maroon/40 to-transparent p-6 text-brand-cream">
                <span className="font-mono text-[9px] tracking-widest text-brand-gold uppercase font-bold">Featured Heirloom</span>
                <h3 className="font-serif text-base font-bold">Maharani Crimson Gold Wedding Saree</h3>
                <p className="text-xs text-brand-cream/80 font-sans mt-1">Genuine Kanchipuram Brocade Silk • Certified Pure Zari</p>
              </div>
            </div>

            {/* Floating featured price tag badge from Sleek Interface Theme */}
            <div className="absolute top-[80px] -right-2 lg:-right-4 bg-brand-cream border border-brand-maroon/10 p-4 shadow-lg text-[10px] text-left leading-normal rounded-sm select-none z-20">
              <span className="text-[8px] font-mono tracking-widest text-brand-gold uppercase block font-bold">FEATURED WEAVE</span>
              <strong className="text-brand-maroon font-serif text-xs block mt-0.5">Hand-woven Banarasi</strong>
              <span className="text-brand-maroon font-mono font-bold block mt-1 text-sm">₹12,499</span>
            </div>

            {/* Smaller Overlay Handloom Detail Frame (Saves bandwidth, extremely chic) */}
            <div className="absolute -bottom-8 -left-6 hidden sm:block w-44 aspect-[3/4] bg-brand-cream p-1.5 rounded-xl border border-brand-gold/20 shadow-xl">
              <div className="w-full h-full rounded-lg overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
                  alt="Zari close up handloom detail"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-brand-maroon/10" />
              </div>
            </div>

            {/* Family Boutique Overlay Trust Badge */}
            <div className="absolute -top-6 -left-6 hidden sm:flex bg-brand-cream border border-brand-maroon/10 rounded-xl p-4 shadow-xl items-center gap-3 z-20">
              <div className="bg-brand-gold/10 p-2.5 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-brand-gold" />
              </div>
              <div className="text-left select-none">
                <h4 className="font-serif font-bold text-xs text-brand-maroon">Genuine Handlooms</h4>
                <p className="text-[10px] text-neutral-500">100% Weaver Cooperative Sourced</p>
                <div className="text-[9px] font-mono font-semibold text-brand-emerald mt-0.5">✔ SILK MARK APPROVED</div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
