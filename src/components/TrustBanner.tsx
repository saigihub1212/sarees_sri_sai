import { Users, Shield, Heart, HelpCircle, UserCheck, ShieldCheck, Home } from 'lucide-react';
import { motion } from 'motion/react';

export default function TrustBanner() {
  const trustCards = [
    {
      icon: <Home className="w-6 h-6 text-brand-gold" />,
      title: "Family-Owned Heritage",
      desc: "Operating since 1998 in Banjara Hills, Hyderabad. We do not have high retail markups, but run a personal home-boutique that prioritizes absolute integrity."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />,
      title: "100% Genuine Products",
      desc: "Every pure silk and handloom saree is Silk Mark or Handloom Mark certified. Authentic gold-electroplated silver zari and verified high-ply weave structures."
    },
    {
      icon: <Heart className="w-6 h-6 text-brand-gold" />,
      title: "Handpicked Curation",
      desc: "Smt. Radha personally inspects every single saree. We source directly from weavers in Banaras, Kanchipuram, and Pochampally to bring you unique, non-mass market masterpieces."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-gold" />,
      title: "Friendly Family Care",
      desc: "Schedule a live WhatsApp video call to drape the saree, check closeups of the border, or bring your mother and aunts to visit our home showroom physically."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-brand-gold" />,
      title: "Loved by Local Families",
      desc: "Trusted by generations of Hyderabad wedding, festival, and corporate shoppers. Over 5,000+ local wardrobes boast a handloom saree from Zari Heritage."
    }
  ];

  return (
    <section id="trust" className="bg-brand-cream py-16 lg:py-24 border-b border-brand-maroon/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 block">
            HOW WE SOLVE THE ONLINE TRUST PROBLEM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-maroon mb-4">
            Boutique Care Over Marketplace Volumes
          </h2>
          <div className="w-24 h-[1px] bg-brand-gold mx-auto mb-6" />
          <p className="text-neutral-600 text-sm leading-relaxed max-w-2xl mx-auto">
            Buying premium sarees online can be stressful. We build relationship trust first, guaranteeing you get precisely what you see with no surprise fabrics, fake certificates, or automated chatbots.
          </p>
        </div>

        {/* Dynamic Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Big Story Banner Frame on the Left Grid */}
          <div className="lg:col-span-1 bg-brand-maroon text-brand-cream p-8 rounded-sm flex flex-col justify-between border border-brand-gold/20 shadow-md relative overflow-hidden group">
            {/* Background Zari detail watermark */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-maroon-dark/60 via-transparent to-brand-gold/10 opacity-40" />
            
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold">The Golden Guarantee</span>
              <h3 className="font-serif text-2xl font-normal leading-tight">We drape it for you live on video.</h3>
              <p className="text-xs text-brand-cream/80 font-sans leading-relaxed">
                We believe you must see the true texture and fall of a saree before buying. Contact us on WhatsApp and we will show you the exact piece you are interested in under natural light.
              </p>
            </div>

            <div className="pt-8 relative z-10">
              <div className="border-t border-brand-gold/20 pt-6 mt-6">
                <blockquote className="font-serif text-sm italic text-brand-gold">
                  "They don’t try to sell. Smt. Radha showed us the pallu and weave defects of handlooms with total honesty."
                </blockquote>
                <p className="text-[10px] font-sans text-brand-cream/60 mt-2">— Lakshmi Garu, Banjara Hills</p>
              </div>
            </div>
          </div>

          {/* Standard cards */}
          {trustCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-cream p-8 rounded-sm border border-brand-maroon/10 shadow-sm hover:shadow-md hover:border-brand-gold/30 transition-all duration-300 flex flex-col space-y-4"
            >
              <div className="w-12 h-12 rounded-sm bg-brand-maroon/5 border border-brand-maroon/10 flex items-center justify-center">
                {card.icon}
              </div>
              <h4 className="font-serif text-lg font-bold text-brand-maroon">{card.title}</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">{card.desc}</p>
            </motion.div>
          ))}

        </div>

        {/* Quick Local Hyderabad Trust Badge (Address and pickup verification) */}
        <div className="mt-12 p-6 rounded-sm bg-brand-maroon/5 border border-brand-maroon/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-brand-maroon" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm text-brand-maroon">Worried about shipping or transit?</h5>
              <p className="text-xs text-neutral-600">You can choose self-pickup or same-day local home delivery within Hyderabad.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-xs font-bold text-brand-maroon font-mono uppercase border-r border-brand-maroon/10 pr-4">✔ CASH ON DELIVERY</span>
            <span className="text-xs font-bold text-brand-maroon font-mono uppercase">✔ EASY 7-DAY RETURNS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
