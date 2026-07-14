import React, { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Heart, MessageSquare, Compass, Send } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-maroon text-brand-cream border-t border-brand-gold/20 pt-16 pb-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Elegant Newsletter Signup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-brand-gold/15 items-center">
          <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-gold">
              Join Our Circle of Saree Connoisseurs
            </h3>
            <p className="text-xs sm:text-sm text-brand-cream/75 max-w-md mx-auto lg:mx-0 font-sans leading-relaxed">
              Subscribe to receive beautiful handloom heritage stories, weaving craft insights, and private invitations to exclusive collections. No spam, ever.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-brand-maroon-dark/50 p-4 rounded-sm border border-brand-gold/30 text-center space-y-1.5 animate-fade-in text-brand-cream">
                <span className="text-brand-gold text-sm font-serif font-normal">✔ Welcome to our Heritage Circle!</span>
                <p className="text-[10px] text-brand-cream/80 font-sans">We’ve registered your email. You will receive private collection catalogs ahead of public launches.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your personal email address"
                  required
                  className="flex-grow px-5 py-3.5 rounded-sm bg-brand-maroon-dark/60 text-brand-cream border border-brand-gold/20 text-xs focus:outline-none focus:border-brand-gold font-sans placeholder:text-brand-cream/40"
                />
                <button
                  type="submit"
                  className="bg-brand-gold hover:bg-brand-gold-dark text-brand-maroon font-semibold px-6 py-3.5 rounded-sm text-xs tracking-wider uppercase flex items-center justify-center gap-2 shrink-0 transition-colors cursor-pointer"
                  id="footer-subscribe-btn"
                >
                  <span>Request Invites</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Section: Links and Locations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-12 text-left">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <h2 className="font-serif text-lg font-normal tracking-[2px] text-brand-gold leading-none uppercase">
                Sri Sai Sarees
              </h2>
              <p className="text-[9px] font-sans tracking-[3px] text-brand-cream/60 uppercase mt-1">
                Est. 1998 • Hyderabad
              </p>
            </div>
            
            <p className="text-xs text-brand-cream/70 leading-relaxed font-sans max-w-sm">
              We are a strictly family-owned saree business operated directly from our residential showroom in Banjara Hills, Hyderabad. Sourcing pure Mulberry silks and fine handlooms directly from cooperative master weavers to preserve Indian heritage.
            </p>

            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-sm bg-brand-maroon-dark hover:bg-brand-gold hover:text-brand-maroon transition-all border border-brand-gold/10 text-brand-cream" title="Follow on Instagram">
                <span className="text-xs font-bold font-mono px-1">IG</span>
              </a>
              <a href="#" className="p-2 rounded-sm bg-brand-maroon-dark hover:bg-brand-gold hover:text-brand-maroon transition-all border border-brand-gold/10 text-brand-cream" title="Follow on Facebook">
                <span className="text-xs font-bold font-mono px-1">FB</span>
              </a>
            </div>
          </div>

          {/* Directory Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold text-brand-gold">Our Philosophy</h4>
            <ul className="space-y-2 text-xs text-brand-cream/80 font-sans">
              <li><a href="#hero" className="hover:text-brand-gold transition-colors">Home Showcase</a></li>
              <li><a href="#trust" className="hover:text-brand-gold transition-colors">The Trust Guarantee</a></li>
              <li><a href="#categories" className="hover:text-brand-gold transition-colors">Saree Craft Directory</a></li>
              <li><a href="#story" className="hover:text-brand-gold transition-colors">Family Story</a></li>
              <li><a href="#faq" className="hover:text-brand-gold transition-colors">FAQ & Support</a></li>
            </ul>
          </div>

          {/* Local Weaver Hubs */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-brand-gold">Handloom Hubs Supported</h4>
            <ul className="space-y-2 text-xs text-brand-cream/80 font-sans leading-relaxed">
              <li>• Pochampally double ikat clusters, Telangana</li>
              <li>• Kanchipuram mulberry Korvai cooperatives, TN</li>
              <li>• Varanasi Katan and Brocade pit looms, UP</li>
              <li>• Venkatagiri superfine cotton weaving centers, AP</li>
            </ul>
          </div>

          {/* Quick Contact shortcut */}
          <div className="lg:col-span-3 space-y-4 font-sans text-xs">
            <h4 className="font-serif text-sm font-bold text-brand-gold">The Hyderabad Outlet</h4>
            <div className="space-y-3.5 text-brand-cream/85">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed">Road No. 4, Banjara Hills, Hyderabad, TS, 500034</p>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+917386117788" className="hover:text-brand-gold transition-colors font-medium">+91 7386117788</a>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="mailto:contact@zariheritage.com" className="hover:text-brand-gold transition-colors">contact@zariheritage.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and local trust certificates */}
        <div className="pt-8 mt-8 border-t border-brand-gold/15 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-[11px] text-brand-cream/60 space-y-1">
            <p>
              © {new Date().getFullYear()} Sri Sai Sarees. All Rights Reserved. Managed by the Rao Family.
              {onAdminClick && (
                <button 
                  onClick={onAdminClick}
                  className="ml-2 text-brand-gold hover:underline cursor-pointer font-semibold uppercase tracking-wider text-[10px]"
                >
                  • Owner Portal
                </button>
              )}
            </p>
            <p>Designed for women who appreciate pure handlooms and authentic trust. Made in India.</p>
          </div>

          {/* Trust Certificates inline logo mocks */}
          <div className="flex gap-6 items-center select-none text-[10px] font-mono tracking-widest text-brand-gold">
            <span className="border border-brand-gold/30 px-2 py-1 rounded">✔ SILK MARK INDIA</span>
            <span className="border border-brand-gold/30 px-2 py-1 rounded">✔ HANDLOOM MARK</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
