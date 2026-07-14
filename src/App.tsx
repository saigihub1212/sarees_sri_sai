import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  SlidersHorizontal, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Search, 
  ShoppingBag, 
  Star, 
  TrendingUp, 
  Gift, 
  CheckCircle,
  HelpCircle as FaqIcon,
  Filter,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import WishlistDrawer from './components/WishlistDrawer';
import ComparisonDrawer from './components/ComparisonDrawer';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

// Types, Datasets & Database
import { Saree } from './types';
import { SAREES_DATA, FAQ_DATA } from './data';
import { supabase, isSupabaseConfigured, mapDbRowToSaree, mapSareeToDbRow } from './supabase';

export default function App() {
  // Routing state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Navigation & Modal states
  const [activeSection, setActiveSection] = useState('home');
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Live Inventory State
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [isLoadingSarees, setIsLoadingSarees] = useState(true);

  // User list states (Wishlist, Compare Tray, Viewing History)
  const [wishlist, setWishlist] = useState<Saree[]>([]);
  const [compareList, setCompareList] = useState<Saree[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Saree[]>([]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSearchQuery, setTempSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedOccasion, setSelectedOccasion] = useState('ALL');
  const [selectedColor, setSelectedColor] = useState('ALL');
  const [priceSort, setPriceSort] = useState<'none' | 'low-high' | 'high-low'>('none');
  const [priceRange, setPriceRange] = useState<number>(60000);

  // FAQ open indexes
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Simple Path Router Popstate listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // SPA Path navigation helper
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch live inventory from Supabase or LocalStorage fallback
  const fetchInventory = async () => {
    setIsLoadingSarees(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('sarees')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setSarees(data.map(mapDbRowToSaree));
        } else {
          setSarees([]);
        }
      } else {
        // Fallback to localStorage catalog
        const savedCatalog = localStorage.getItem('zari_sarees_catalog');
        if (savedCatalog) {
          setSarees(JSON.parse(savedCatalog));
        } else {
          localStorage.setItem('zari_sarees_catalog', JSON.stringify(SAREES_DATA));
          setSarees(SAREES_DATA);
        }
      }
    } catch (err) {
      console.error('Error fetching inventory from database:', err);
      // Fallback to local storage on error
      const savedCatalog = localStorage.getItem('zari_sarees_catalog');
      setSarees(savedCatalog ? JSON.parse(savedCatalog) : SAREES_DATA);
    } finally {
      setIsLoadingSarees(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // CRUD Operations
  const handleAddSaree = async (newSaree: Omit<Saree, 'id'> & { id?: string }) => {
    const id = newSaree.id || `saree-${Date.now()}`;
    const sareeToAdd: Saree = { ...newSaree, id };
    
    if (isSupabaseConfigured) {
      const dbRow = mapSareeToDbRow(sareeToAdd);
      const { error } = await supabase.from('sarees').insert([dbRow]);
      if (error) throw error;
    }
    
    const updated = [...sarees, sareeToAdd];
    setSarees(updated);
    localStorage.setItem('zari_sarees_catalog', JSON.stringify(updated));
  };

  const handleUpdateSaree = async (updatedSaree: Saree) => {
    if (isSupabaseConfigured) {
      const dbRow = mapSareeToDbRow(updatedSaree);
      const { error } = await supabase
        .from('sarees')
        .update(dbRow)
        .eq('id', updatedSaree.id);
      if (error) throw error;
    }
    
    const updated = sarees.map(s => s.id === updatedSaree.id ? updatedSaree : s);
    setSarees(updated);
    localStorage.setItem('zari_sarees_catalog', JSON.stringify(updated));
  };

  const handleDeleteSaree = async (id: string) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('sarees').delete().eq('id', id);
      if (error) throw error;
    }
    
    const updated = sarees.filter(s => s.id !== id);
    setSarees(updated);
    localStorage.setItem('zari_sarees_catalog', JSON.stringify(updated));
  };

  const handleSeedData = async () => {
    if (isSupabaseConfigured) {
      const dbRows = SAREES_DATA.map(s => mapSareeToDbRow(s));
      const { error } = await supabase.from('sarees').insert(dbRows);
      if (error) throw error;
    }
    
    setSarees(SAREES_DATA);
    localStorage.setItem('zari_sarees_catalog', JSON.stringify(SAREES_DATA));
  };

  // Load state from local storage to handle durable persistence
  useEffect(() => {
    try {
      const savedWish = localStorage.getItem('zari_wishlist');
      if (savedWish) setWishlist(JSON.parse(savedWish));

      const savedCompare = localStorage.getItem('zari_compare');
      if (savedCompare) setCompareList(JSON.parse(savedCompare));

      const savedHistory = localStorage.getItem('zari_history');
      if (savedHistory) setRecentlyViewed(JSON.parse(savedHistory));
    } catch (e) {
      console.warn("Could not load storage data", e);
    }
  }, []);

  // Save states back to local storage
  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Could not save storage data", e);
    }
  };

  // Toggle Wishlist handler
  const handleToggleWishlist = (saree: Saree) => {
    const isSaved = wishlist.some((item) => item.id === saree.id);
    let updatedWish: Saree[];
    if (isSaved) {
      updatedWish = wishlist.filter((item) => item.id !== saree.id);
    } else {
      updatedWish = [...wishlist, saree];
    }
    setWishlist(updatedWish);
    saveToStorage('zari_wishlist', updatedWish);
  };

  // Add to Compare handler
  const handleToggleCompare = (saree: Saree) => {
    const isComparing = compareList.some((item) => item.id === saree.id);
    let updatedCompare: Saree[];
    
    if (isComparing) {
      updatedCompare = compareList.filter((item) => item.id !== saree.id);
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 sarees at once to keep the specification details readable.");
        return;
      }
      updatedCompare = [...compareList, saree];
    }
    setCompareList(updatedCompare);
    saveToStorage('zari_compare', updatedCompare);
  };

  // Clear entire wishlist
  const handleClearWishlist = () => {
    setWishlist([]);
    saveToStorage('zari_wishlist', []);
  };

  // Open Quick View Modal and track viewing history
  const handleOpenQuickView = (saree: Saree) => {
    setSelectedSaree(saree);
    setIsDetailOpen(true);

    // Track recently viewed (max 6, no duplicates, newer first)
    const filteredHistory = recentlyViewed.filter((item) => item.id !== saree.id);
    const updatedHistory = [saree, ...filteredHistory].slice(0, 6);
    setRecentlyViewed(updatedHistory);
    saveToStorage('zari_history', updatedHistory);
  };

  // Category Quick Select from categories section
  const handleCategoryQuickSelect = (category: string, occasion?: string) => {
    if (category !== 'ALL') {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('ALL');
    }
    if (occasion) {
      setSelectedOccasion(occasion);
    } else {
      setSelectedOccasion('ALL');
    }
    
    // Smooth scroll down to collections section
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Clean all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setTempSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedOccasion('ALL');
    setSelectedColor('ALL');
    setPriceSort('none');
    setPriceRange(60000);
  };

  // Saree filtering engine
  const filteredSarees = sarees.filter((saree) => {
    const matchesSearch = 
      saree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || saree.category === selectedCategory;
    const matchesOccasion = selectedOccasion === 'ALL' || saree.occasion === selectedOccasion;
    const matchesColor = selectedColor === 'ALL' || saree.color === selectedColor;
    const matchesPrice = saree.price <= priceRange;

    return matchesSearch && matchesCategory && matchesOccasion && matchesColor && matchesPrice;
  }).sort((a, b) => {
    if (priceSort === 'low-high') return a.price - b.price;
    if (priceSort === 'high-low') return b.price - a.price;
    return 0; // Natural unsorted
  });

  // Extract unique attribute listings for filtering sidebars
  const categoriesList = ['ALL', ...Array.from(new Set(sarees.map(s => s.category)))];
  const occasionsList = ['ALL', ...Array.from(new Set(sarees.map(s => s.occasion)))];
  const colorsList = ['ALL', ...Array.from(new Set(sarees.map(s => s.color)))];

  const formatRupee = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // WhatsApp Global sticky consultation click
  const handleGlobalWhatsAppClick = () => {
    const text = encodeURIComponent("Namaste Sri Sai Sarees, I am looking for premium silk sarees. Please show me some options.");
    window.open(`https://wa.me/919912317788?text=${text}`, '_blank');
  };

  // Dynamic Page Title/SEO setter (within client frame limits)
  useEffect(() => {
    document.title = "Sri Sai Sarees | Handloom & Pure Silk Sarees Hyderabad";
  }, []);

  // Path Routing Rendering Choice
  if (currentPath === '/admin') {
    return (
      <AdminDashboard
        sarees={sarees}
        onAddSaree={handleAddSaree}
        onUpdateSaree={handleUpdateSaree}
        onDeleteSaree={handleDeleteSaree}
        onSeedData={handleSeedData}
        onGoToStorefront={() => navigate('/')}
        isLoading={isLoadingSarees}
      />
    );
  }

  return (

    <div className="min-h-screen bg-brand-cream relative">
      
      {/* STRUCTURED JSON-LD SEO SCHEMA (Enriches Google local business indexing) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Sri Sai Sarees Boutique",
          "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
          "telephone": "+919912317788",
          "email": "contact@zariheritage.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Road No. 4, Banjara Hills",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500034",
            "addressCountry": "IN"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "20:00"
          },
          "priceRange": "$$$"
        })}
      </script>

      {/* STICKY HEADER & FLOATING BAR */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* spacer */}
      <div className="pt-8 bg-brand-ivory" />

      {/* CORE COLLECTIONS / BROWSE MATRIX AREA */}
      <section id="collections" className="py-20 lg:py-24 bg-brand-ivory border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 block">
              OUR LIVE HANDLOOM INVENTORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon mb-4">
              Browse Handpicked Creations
            </h2>
            <div className="w-24 h-0.5 bg-brand-gold mx-auto mb-4" />
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
              Use the filters below to narrow down your perfect weave. Because we are a boutique rather than a mass factory, each piece is unique and available in strictly limited volumes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT FILTERS SIDEBAR (3 Columns) */}
            <div className="lg:col-span-3 bg-brand-cream p-6 rounded-2xl border border-brand-gold/15 shadow-sm text-left sticky top-28 hidden lg:block">
              <div className="flex items-center justify-between pb-4 border-b border-brand-gold/10 mb-6">
                <h3 className="font-serif text-base font-bold text-brand-maroon flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter Options</span>
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] font-mono font-bold text-brand-gold hover:text-brand-maroon uppercase tracking-wide cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Fabric Categories */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                  Fabric Category
                </label>
                <div className="flex flex-col gap-1.5">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs text-left py-1.5 px-3 rounded-lg transition-all cursor-pointer font-sans ${
                        selectedCategory === cat 
                          ? 'bg-brand-maroon text-brand-cream font-bold' 
                          : 'text-neutral-600 hover:bg-brand-ivory hover:text-brand-maroon'
                      }`}
                    >
                      {cat === 'ALL' ? 'All Fabrics' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion Categories */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                  By Occasion
                </label>
                <div className="flex flex-col gap-1.5">
                  {occasionsList.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`text-xs text-left py-1.5 px-3 rounded-lg transition-all cursor-pointer font-sans ${
                        selectedOccasion === occ 
                          ? 'bg-brand-maroon text-brand-cream font-bold' 
                          : 'text-neutral-600 hover:bg-brand-ivory hover:text-brand-maroon'
                      }`}
                    >
                      {occ === 'ALL' ? 'All Occasions' : occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette filters */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                  Color Themes
                </label>
                <div className="flex flex-col gap-1.5">
                  {colorsList.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`text-xs text-left py-1.5 px-3 rounded-lg transition-all cursor-pointer font-sans ${
                        selectedColor === col 
                          ? 'bg-brand-maroon text-brand-cream font-bold' 
                          : 'text-neutral-600 hover:bg-brand-ivory hover:text-brand-maroon'
                      }`}
                    >
                      {col === 'ALL' ? 'All Colors' : col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Sort */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                  Sort by Price
                </label>
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value as any)}
                  className="w-full bg-brand-ivory text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                >
                  <option value="none">Default Curation</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-brand-maroon font-bold uppercase tracking-wider">
                  <span>Max Budget</span>
                  <span className="font-mono">{formatRupee(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="60000"
                  step="2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-maroon cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                  <span>{formatRupee(5000)}</span>
                  <span>{formatRupee(60000)}</span>
                </div>
              </div>
            </div>

            {/* RIGHT CONSOLE & PRODUCTS MATRIX (9 Columns) */}
            <div className="lg:col-span-9 space-y-8 text-center">
              
              {/* Mobile Active Filter Bar Trigger */}
              <div className="lg:hidden flex flex-wrap gap-2 items-center justify-between bg-brand-cream p-4 rounded-xl border border-brand-gold/15">
                <span className="text-xs font-bold text-brand-maroon font-serif">Filtered: {filteredSarees.length} matches</span>
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="bg-brand-maroon text-brand-cream text-xs px-4 py-2 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Adjust Filters</span>
                </button>
              </div>

              {/* Active Filter Tags Indicator Row */}
              {(selectedCategory !== 'ALL' || selectedOccasion !== 'ALL' || selectedColor !== 'ALL' || searchQuery !== '') && (
                <div className="flex flex-wrap gap-2 items-center text-left bg-brand-cream/80 p-3.5 rounded-xl border border-brand-gold/10">
                  <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold mr-2">Active Tags:</span>
                  
                  {searchQuery !== '' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brand-maroon/5 border border-brand-maroon/15 text-[10px] font-medium text-brand-maroon">
                      <span>Query: "{searchQuery}"</span>
                      <X className="w-3 h-3 cursor-pointer hover:text-brand-gold" onClick={() => setSearchQuery('')} />
                    </span>
                  )}
                  {selectedCategory !== 'ALL' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brand-maroon/5 border border-brand-maroon/15 text-[10px] font-medium text-brand-maroon">
                      <span>Category: {selectedCategory}</span>
                      <X className="w-3 h-3 cursor-pointer hover:text-brand-gold" onClick={() => setSelectedCategory('ALL')} />
                    </span>
                  )}
                  {selectedOccasion !== 'ALL' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brand-maroon/5 border border-brand-maroon/15 text-[10px] font-medium text-brand-maroon">
                      <span>Occasion: {selectedOccasion}</span>
                      <X className="w-3 h-3 cursor-pointer hover:text-brand-gold" onClick={() => setSelectedOccasion('ALL')} />
                    </span>
                  )}
                  {selectedColor !== 'ALL' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brand-maroon/5 border border-brand-maroon/15 text-[10px] font-medium text-brand-maroon">
                      <span>Color: {selectedColor}</span>
                      <X className="w-3 h-3 cursor-pointer hover:text-brand-gold" onClick={() => setSelectedColor('ALL')} />
                    </span>
                  )}

                  <button
                    onClick={handleResetFilters}
                    className="text-[10px] text-brand-gold underline font-semibold font-mono uppercase ml-auto hover:text-brand-maroon cursor-pointer"
                  >
                    Clear Filter Tags
                  </button>
                </div>
              )}

              {/* Core Saree grid items list */}
              {filteredSarees.length === 0 ? (
                <div className="bg-brand-cream border border-brand-gold/15 rounded-3xl p-16 space-y-5 text-center">
                  <div className="w-16 h-16 bg-brand-maroon/5 border border-brand-gold/25 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                    <SlidersHorizontal className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-maroon">No sarees match your filter tags</h3>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-normal">Our boutique collection updates weekly. Please try relaxing your price boundary or clear active tags to view our standard catalog.</p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="bg-brand-maroon hover:bg-brand-maroon-dark text-brand-cream text-xs px-6 py-3 rounded-lg font-semibold uppercase tracking-wider shadow cursor-pointer"
                  >
                    Reset Filter Options
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredSarees.map((saree) => (
                    <ProductCard
                      key={saree.id}
                      saree={saree}
                      onQuickView={() => handleOpenQuickView(saree)}
                      isWishlisted={wishlist.some((w) => w.id === saree.id)}
                      onToggleWishlist={() => handleToggleWishlist(saree)}
                      onAddToCompare={() => handleToggleCompare(saree)}
                      isComparing={compareList.some((c) => c.id === saree.id)}
                    />
                  ))}
                </div>
              )}

            </div>

          </div>
        </div>
      </section>



      {/* SOVEREIGN DIALOG OVERLAY: PRODUCT DETAIL SPEC MODAL */}
      <ProductDetailModal
        saree={selectedSaree}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isWishlisted={selectedSaree ? wishlist.some((w) => w.id === selectedSaree.id) : false}
        onToggleWishlist={() => selectedSaree && handleToggleWishlist(selectedSaree)}
        onAddToCompare={() => selectedSaree && handleToggleCompare(selectedSaree)}
        isComparing={selectedSaree ? compareList.some((c) => c.id === selectedSaree.id) : false}
        allSarees={sarees}
        onSelectSaree={(s) => handleOpenQuickView(s)}
      />

      {/* SOVEREIGN DIALOG OVERLAY: WISHLIST DRAWER SIDEBAR */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={handleToggleWishlist}
        onQuickView={handleOpenQuickView}
        onClearWishlist={handleClearWishlist}
      />

      {/* SOVEREIGN DIALOG OVERLAY: COMPARISON MATRIX MODAL */}
      <ComparisonDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemove={handleToggleCompare}
        onQuickView={handleOpenQuickView}
      />

      {/* FAST SEARCH OVERLAY MODAL (Highly visual navigation tool) */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-10 overflow-y-auto" id="search-modal-root">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchModalOpen(false)}
              className="fixed inset-0 bg-brand-maroon-dark/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-cream w-full max-w-2xl rounded-2xl overflow-hidden border border-brand-gold/20 shadow-2xl relative z-10 flex flex-col select-none"
            >
              {/* Header Input bar */}
              <div className="p-5 border-b border-brand-gold/15 flex items-center gap-4 bg-brand-ivory">
                <Search className="w-5 h-5 text-brand-gold" />
                <input
                  type="text"
                  value={tempSearchQuery}
                  onChange={(e) => setTempSearchQuery(e.target.value)}
                  placeholder="Type code, color, or fabric (e.g. 'Silk', 'Maroon', 'Pochampally')"
                  className="flex-grow bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none font-sans font-medium"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSearchQuery(tempSearchQuery);
                      setIsSearchModalOpen(false);
                      const el = document.getElementById('collections');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                />
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic results suggestions list */}
              <div className="p-5 max-h-96 overflow-y-auto text-left space-y-4">
                {tempSearchQuery.trim() === '' ? (
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold">Trending Searches:</span>
                    <div className="flex flex-wrap gap-2">
                      {['Banarasi', 'Mulberry Silk', 'Deep Maroon', 'Pochampally', 'Cotton', 'Linen'].map((trend) => (
                        <button
                          key={trend}
                          onClick={() => {
                            setTempSearchQuery(trend);
                            setSearchQuery(trend);
                            setIsSearchModalOpen(false);
                            const el = document.getElementById('collections');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="px-3.5 py-1.5 bg-brand-ivory hover:bg-brand-maroon hover:text-brand-cream text-neutral-700 text-xs rounded-lg transition-all border border-brand-gold/10 cursor-pointer font-sans"
                        >
                          {trend}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold block mb-2">Matching In-Stock Sarees:</span>
                    
                    {/* Filter suggestions */}
                    {sarees.filter((s) => 
                      s.name.toLowerCase().includes(tempSearchQuery.toLowerCase()) ||
                      s.fabric.toLowerCase().includes(tempSearchQuery.toLowerCase()) ||
                      s.color.toLowerCase().includes(tempSearchQuery.toLowerCase())
                    ).length === 0 ? (
                      <p className="text-xs text-neutral-400 italic">No matching codes or fabrics found. Please check spelling.</p>
                    ) : (
                      <div className="space-y-2">
                        {sarees.filter((s) => 
                          s.name.toLowerCase().includes(tempSearchQuery.toLowerCase()) ||
                          s.fabric.toLowerCase().includes(tempSearchQuery.toLowerCase()) ||
                          s.color.toLowerCase().includes(tempSearchQuery.toLowerCase())
                        ).map((s) => (
                          <div
                            key={s.id}
                            onClick={() => {
                              setIsSearchModalOpen(false);
                              handleOpenQuickView(s);
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-brand-ivory rounded-lg cursor-pointer transition-colors border border-transparent hover:border-brand-gold/10"
                          >
                            <img src={s.images[0]} alt={s.name} className="w-10 aspect-[3/4] rounded object-cover shrink-0" referrerPolicy="no-referrer" />
                            <div className="flex-grow text-left">
                              <h5 className="font-serif text-xs font-bold text-brand-maroon line-clamp-1">{s.name}</h5>
                              <p className="text-[10px] text-neutral-400 font-sans mt-0.5">{s.fabric} • {s.color}</p>
                            </div>
                            <span className="font-mono text-xs font-bold text-brand-gold shrink-0">{formatRupee(s.price)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer search helpers */}
              <div className="p-3 bg-brand-ivory border-t border-brand-gold/10 text-[10px] text-neutral-500 font-sans text-center">
                Press <kbd className="bg-brand-cream border px-1.5 py-0.5 rounded shadow-xs font-mono">Enter</kbd> to apply search filters to the live collection grid.
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER CORE SYSTEM */}
      <Footer onAdminClick={() => navigate('/admin')} />

    </div>
  );
}
