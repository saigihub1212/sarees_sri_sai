import { Shield, Sparkles, Award, MapPin } from 'lucide-react';
import { BOUTIQUE_STORY } from '../data';
import { motion } from 'motion/react';

export default function AboutUs() {
  const story = BOUTIQUE_STORY;

  return (
    <section id="story" className="py-20 lg:py-28 bg-brand-cream border-b border-brand-maroon/10 relative overflow-hidden">
      
      {/* Decorative Traditional Circular Watermark Background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-maroon/5 rounded-full filter blur-2xl transform -translate-y-1/2 -translate-x-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full filter blur-3xl transform translate-x-20 translate-y-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Scrapbook Style Portraits & Trust Certificates */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="relative mx-auto max-w-[340px] lg:max-w-none">
              
              {/* Primary Vintage Framed Photo */}
              <div className="aspect-[3/4] rounded-sm overflow-hidden border border-brand-maroon/10 bg-brand-cream shadow-md relative rotate-2 group">
                <img
                  src={story.avatarUrl}
                  alt="Smt. Radha Rao selecting silks"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-brand-cream/95 backdrop-blur-sm p-4 rounded-sm border border-brand-maroon/10 text-center shadow-md">
                  <h4 className="font-serif font-bold text-sm text-brand-maroon">{story.founders}</h4>
                  <p className="text-[10px] font-mono tracking-widest text-brand-gold uppercase mt-0.5">Founders & Curators</p>
                </div>
              </div>

              {/* Smaller Overlapping Vintage Frame (Traditional weavers closeup) */}
              <div className="absolute -bottom-8 -right-6 hidden sm:block w-44 aspect-square bg-brand-cream p-1.5 rounded-sm border border-brand-maroon/10 shadow-lg -rotate-6">
                <div className="w-full h-full rounded-sm overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80"
                    alt="Traditional weaver detail"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-maroon/20" />
                </div>
              </div>

            </div>

            {/* Micro Location Info Badge */}
            <div className="bg-brand-cream border border-brand-maroon/10 p-4 rounded-sm shadow-sm flex items-center gap-3 max-w-[340px] mx-auto lg:mx-0">
              <div className="w-8 h-8 bg-brand-maroon/5 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-brand-maroon" />
              </div>
              <div className="text-left select-none">
                <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold">VISIT OUR COZY SHOWROOM</span>
                <p className="text-xs font-serif font-bold text-brand-maroon leading-none mt-1">Banjara Hills, Hyderabad, India</p>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Deep Family Legacy Story Telling */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <div>
              <span className="font-mono text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 block">
                MEET THE RAO FAMILY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-maroon leading-tight">
                {story.title}
              </h2>
              <p className="text-sm font-serif italic text-brand-gold mt-1.5 font-medium tracking-wide">
                "{story.subtitle}"
              </p>
              <div className="w-20 h-[1px] bg-brand-gold mt-4 mb-2 mx-auto lg:mx-0" />
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-5 text-neutral-600 text-sm sm:text-base leading-relaxed font-sans text-left">
              <p>{story.narrative1}</p>
              <p>{story.narrative2}</p>
              <p className="font-serif italic text-brand-maroon border-l-4 border-brand-gold pl-4 py-1.5 my-6 bg-brand-cream/50 rounded-r-sm">
                {story.narrative3}
              </p>
            </div>

            {/* Trust Badges and Milestones Counter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-brand-maroon/10 text-center">
              {story.stats.map((stat, idx) => (
                <div key={idx} className="bg-brand-cream border border-brand-maroon/10 p-4 rounded-sm shadow-sm">
                  <div className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-maroon">{stat.value}</div>
                  <div className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold mt-1.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Core Weaver Supporting Seal */}
            <div className="flex items-center gap-3.5 bg-brand-maroon/5 border border-brand-maroon/10 p-4 rounded-sm text-left">
              <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center border border-brand-gold/20">
                <Award className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-xs text-brand-maroon">Supporting Indian Handlooms Directly</h4>
                <p className="text-[10px] text-neutral-500 mt-1">We bypass middlemen brokers and pay 100% fair trade wages directly to our network of 120+ weaver families.</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
