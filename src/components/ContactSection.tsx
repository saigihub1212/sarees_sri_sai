import { Phone, Mail, Clock, MessageSquare, MapPin, Navigation, Compass, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactSection() {
  
  const contactDetails = [
    {
      icon: <MapPin className="w-5 h-5 text-brand-gold" />,
      label: "Our Home Boutique Address",
      value: "Road No. 4, Banjara Hills, Near GVK One Mall, Hyderabad, Telangana, India - 500034",
      sub: "Please call before visiting so Smt. Radha can greet you personally."
    },
    {
      icon: <Phone className="w-5 h-5 text-brand-gold" />,
      label: "Call or Message Us",
      value: "+91 9912317788 / +91 40 23456789",
      sub: "WhatsApp Video Support available 10:00 AM - 8:00 PM IST."
    },
    {
      icon: <Clock className="w-5 h-5 text-brand-gold" />,
      label: "Boutique Hours",
      value: "Mon - Sat: 10:00 AM - 8:00 PM IST",
      sub: "Sundays by advance appointment only (for families)."
    }
  ];

  const triggerWhatsApp = () => {
    const text = encodeURIComponent("Namaste Radha garu, I would like to book a physical visit slot to your home-boutique in Banjara Hills next week.");
    window.open(`https://wa.me/919912317788?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-brand-cream border-b border-brand-maroon/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 block">
            VISIT OR SCHEDULE A MEETING
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-maroon mb-4">
            We Warmly Welcome Your Family
          </h2>
          <div className="w-24 h-[1px] bg-brand-gold mx-auto mb-6" />
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Whether you want to inspect Kanchipuram threads physically, get custom blouses stitched, or drape fabric live on a video call, our doors and lines are always open.
          </p>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct info details & appointment trigger */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-6">
              {contactDetails.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-sm bg-brand-ivory border border-brand-maroon/10 shadow-sm">
                  <div className="w-10 h-10 rounded-sm bg-brand-maroon/5 border border-brand-maroon/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-serif font-normal text-sm text-brand-maroon leading-none mb-1">{item.label}</h4>
                    <p className="text-neutral-800 text-xs sm:text-sm font-medium mt-1 leading-relaxed">{item.value}</p>
                    <p className="text-[10px] text-neutral-400 mt-1 font-sans">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Interactive Appointment Form Block */}
            <div className="bg-brand-maroon text-brand-cream p-6 rounded-sm border border-brand-maroon/10 shadow-xl space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-brand-gold uppercase font-bold">VIP OUTLET VISIT</span>
              <h3 className="font-serif text-lg font-normal text-brand-cream">Schedule an Exclusive Saree Session</h3>
              <p className="text-xs text-brand-cream/80 font-sans leading-relaxed">
                Visiting with a bride, family members, or planning wedding purchases? Booking a slot ensures Smt. Radha can dedicatedly assist you with no distractions.
              </p>
              
              <button
                onClick={triggerWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-maroon py-3 rounded-sm text-xs font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer"
                id="contact-visit-schedule-btn"
              >
                <Calendar className="w-4 h-4 text-brand-maroon" />
                <span>Book Free Appointment on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Breathtaking Vector Stylized Map (Fast-loading & fully custom) */}
          <div className="lg:col-span-7 bg-brand-ivory p-3.5 rounded-sm border border-brand-maroon/10 shadow-xl">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-sm overflow-hidden bg-zinc-100 border border-brand-maroon/10 select-none flex flex-col justify-between p-6">
              
              {/* Map grid decoration layers */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#AA8B1E_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-brand-gold/10 pointer-events-none" />
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-brand-gold/10 pointer-events-none" />
              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-brand-gold/10 pointer-events-none" />

              {/* Header inside map */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="bg-brand-cream/90 backdrop-blur-sm border border-brand-maroon/10 p-3 rounded-sm text-left shadow">
                  <h4 className="font-serif font-normal text-xs text-brand-maroon">Zari Heritage Showroom</h4>
                  <p className="text-[10px] text-neutral-500 font-sans">Banjara Hills, Road No. 4, Hyderabad</p>
                </div>

                <div className="bg-brand-maroon text-brand-cream px-3 py-1.5 rounded-sm text-[9px] font-mono tracking-widest font-bold uppercase border border-brand-maroon/10 shadow flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
                  <span>Interactive Map Mock</span>
                </div>
              </div>

              {/* Central Map Marker Point */}
              <div className="relative z-10 flex flex-col items-center justify-center py-6">
                
                {/* Simulated concentric radar ripples */}
                <span className="absolute w-20 h-20 bg-brand-maroon/10 rounded-full animate-ping pointer-events-none" />
                <span className="absolute w-12 h-12 bg-brand-gold/15 rounded-full animate-pulse pointer-events-none" />

                {/* Main pin icon container */}
                <div className="w-12 h-12 bg-brand-maroon rounded-full flex items-center justify-center shadow-lg border-2 border-brand-gold text-brand-cream z-10 scale-110">
                  <MapPin className="w-6 h-6 text-brand-gold fill-brand-gold" />
                </div>
                
                <span className="bg-brand-maroon text-brand-cream text-[10px] font-serif font-semibold px-3 py-1.5 rounded-sm border border-brand-gold mt-2.5 shadow-md">
                  We are here! Road No. 4
                </span>
                <span className="text-[9px] font-semibold text-neutral-400 mt-1 uppercase font-mono tracking-wider">
                  ★ Near GVK One Mall (2 min walk)
                </span>
              </div>

              {/* Footer map details */}
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center bg-brand-cream/90 backdrop-blur-sm p-3.5 rounded-sm border border-brand-maroon/10 gap-3">
                <p className="text-[10px] text-neutral-600 text-center sm:text-left leading-normal font-sans">
                  🚗 Easy car parking available right inside our residential gate. Wheelchair-friendly ground floor entrance.
                </p>
                <button
                  onClick={() => window.open('https://maps.google.com/?q=Banjara+Hills+Road+No+4+Hyderabad', '_blank')}
                  className="bg-brand-maroon hover:bg-brand-maroon-dark text-brand-cream text-[9px] font-semibold px-4 py-2 rounded-sm uppercase tracking-wider flex items-center gap-1 shrink-0 shadow-sm border border-brand-maroon/10 cursor-pointer"
                >
                  <Navigation className="w-3 h-3 text-brand-gold" />
                  <span>Navigate</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
