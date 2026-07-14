import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Key, LayoutGrid, List, CheckCircle, AlertTriangle, 
  X, Database, SlidersHorizontal, Image, ChevronRight, FileText, ArrowLeft, RotateCw, Upload 
} from 'lucide-react';
import { Saree, Review } from '../types';
import { isSupabaseConfigured, uploadSareeImage } from '../supabase';

interface AdminDashboardProps {
  sarees: Saree[];
  onAddSaree: (saree: Omit<Saree, 'id'> & { id?: string }) => Promise<void>;
  onUpdateSaree: (saree: Saree) => Promise<void>;
  onDeleteSaree: (id: string) => Promise<void>;
  onSeedData: () => Promise<void>;
  onGoToStorefront: () => void;
  isLoading: boolean;
}

export default function AdminDashboard({
  sarees,
  onAddSaree,
  onUpdateSaree,
  onDeleteSaree,
  onSeedData,
  onGoToStorefront,
  isLoading
}: AdminDashboardProps) {
  // Auth state
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('zari_admin_auth') === 'true';
  });
  const [authError, setAuthError] = useState('');

  // Dashboard states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSaree, setEditingSaree] = useState<Saree | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    category: 'Banarasi',
    fabric: '',
    price: 0,
    originalPrice: 0,
    color: '',
    occasion: 'Wedding',
    imagesText: '', // Multi-line image URLs
    description: '',
    fabricDetails: '',
    blouseIncluded: true,
    blouseDescription: '',
    dimensions: '5.5 meters + 0.8 meters unstitched blouse piece',
    careInstructions: 'Dry clean only. Store wrapped in a soft muslin cloth.',
    stockStatus: 'In Stock' as 'In Stock' | 'Low Stock' | 'Sold Out',
    borderType: '',
    palluDetails: '',
    featured: false,
    isNewArrival: false,
    isBestSeller: false
  });
  const [formError, setFormError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // File Upload states
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Handle direct file uploads (Supabase or base64 fallback)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setUploadError('');
    
    const uploadedUrls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        setUploadError('Only image files (.png, .jpg, .jpeg, .webp) are allowed.');
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Image size exceeds 5MB limit.');
        continue;
      }
      
      try {
        if (isSupabaseConfigured) {
          const url = await uploadSareeImage(file);
          uploadedUrls.push(url);
        } else {
          // Local Demo Mode Base64 reader
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (err) => reject(err);
          });
          uploadedUrls.push(base64);
        }
      } catch (err: any) {
        console.error(err);
        setUploadError(err.message || 'Image upload failed.');
      }
    }
    
    if (uploadedUrls.length > 0) {
      const currentUrls = formData.imagesText
        .split('\n')
        .map(u => u.trim())
        .filter(u => u.length > 0);
      const newUrls = [...currentUrls, ...uploadedUrls].join('\n');
      setFormData(prev => ({
        ...prev,
        imagesText: newUrls
      }));
    }
    
    setUploading(false);
  };

  // Helper to remove an image from preview
  const handleRemoveImage = (indexToRemove: number) => {
    const urls = formData.imagesText
      .split('\n')
      .map(u => u.trim())
      .filter(u => u.length > 0);
    const updatedUrls = urls.filter((_, idx) => idx !== indexToRemove).join('\n');
    setFormData(prev => ({
      ...prev,
      imagesText: updatedUrls
    }));
  };

  // Categories list for filtering
  const categoriesList = ['ALL', ...Array.from(new Set(sarees.map(s => s.category)))];

  // Auth handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234
    if (pin === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('zari_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect authentication PIN. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('zari_admin_auth');
  };

  // Open Form for Adding
  const handleOpenAddForm = () => {
    setEditingSaree(null);
    setFormData({
      name: '',
      category: sarees.length > 0 ? sarees[0].category : 'Banarasi',
      fabric: '',
      price: 15000,
      originalPrice: 18000,
      color: '',
      occasion: 'Wedding',
      imagesText: '',
      description: '',
      fabricDetails: '',
      blouseIncluded: true,
      blouseDescription: 'Matching blouse piece included.',
      dimensions: '5.5 meters + 0.8 meters unstitched blouse piece',
      careInstructions: 'Dry clean only. Store wrapped in a soft muslin cloth.',
      stockStatus: 'In Stock',
      borderType: '',
      palluDetails: '',
      featured: false,
      isNewArrival: true,
      isBestSeller: false
    });
    setFormError('');
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleOpenEditForm = (saree: Saree) => {
    setEditingSaree(saree);
    setFormData({
      name: saree.name,
      category: saree.category,
      fabric: saree.fabric,
      price: saree.price,
      originalPrice: saree.originalPrice,
      color: saree.color,
      occasion: saree.occasion,
      imagesText: saree.images.join('\n'),
      description: saree.description,
      fabricDetails: saree.fabricDetails,
      blouseIncluded: saree.blouseIncluded,
      blouseDescription: saree.blouseDescription,
      dimensions: saree.dimensions,
      careInstructions: saree.careInstructions,
      stockStatus: saree.stockStatus,
      borderType: saree.borderType,
      palluDetails: saree.palluDetails,
      featured: saree.featured,
      isNewArrival: saree.isNewArrival,
      isBestSeller: saree.isBestSeller
    });
    setFormError('');
    setIsFormOpen(true);
  };

  // Delete handler with double confirmation
  const handleDeleteClick = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete the saree "${name}" from inventory?`)) {
      setActionLoading(true);
      try {
        await onDeleteSaree(id);
      } catch (err) {
        alert('Failed to delete saree.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  // Form Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setActionLoading(true);

    // Basic Validation
    if (!formData.name.trim() || !formData.fabric.trim() || !formData.color.trim()) {
      setFormError('Please fill out all required fields (Name, Fabric, Color).');
      setActionLoading(false);
      return;
    }

    if (formData.price <= 0) {
      setFormError('Price must be greater than 0.');
      setActionLoading(false);
      return;
    }

    const imageList = formData.imagesText
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    if (imageList.length === 0) {
      setFormError('Please supply at least one image URL.');
      setActionLoading(false);
      return;
    }

    const submissionData = {
      name: formData.name.trim(),
      category: formData.category,
      fabric: formData.fabric.trim(),
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price),
      color: formData.color.trim(),
      occasion: formData.occasion,
      images: imageList,
      description: formData.description.trim(),
      fabricDetails: formData.fabricDetails.trim(),
      blouseIncluded: formData.blouseIncluded,
      blouseDescription: formData.blouseDescription.trim(),
      dimensions: formData.dimensions.trim(),
      careInstructions: formData.careInstructions.trim(),
      stockStatus: formData.stockStatus,
      borderType: formData.borderType.trim(),
      palluDetails: formData.palluDetails.trim(),
      featured: formData.featured,
      isNewArrival: formData.isNewArrival,
      isBestSeller: formData.isBestSeller,
      reviews: editingSaree ? editingSaree.reviews : ([] as Review[]),
      rating: editingSaree ? editingSaree.rating : 5.0
    };

    try {
      if (editingSaree) {
        // Edit Mode
        await onUpdateSaree({
          ...submissionData,
          id: editingSaree.id
        });
      } else {
        // Add Mode
        await onAddSaree(submissionData);
      }
      setIsFormOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'An error occurred during submission.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered list for display in the table
  const displaySarees = sarees.filter(saree => {
    const matchesSearch = 
      saree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.color.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || saree.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatRupee = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // 1. Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 select-none">
        <div className="bg-brand-cream border border-brand-gold/30 rounded-2xl p-8 shadow-xl max-w-md w-full text-center space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-normal text-brand-maroon uppercase tracking-wider">Sri Sai Sarees</h2>
            <p className="text-[10px] font-mono text-brand-gold uppercase tracking-[3px]">Owner Workspace Portal</p>
          </div>

          <div className="w-16 h-16 bg-brand-maroon/5 border border-brand-gold/25 rounded-full flex items-center justify-center mx-auto text-brand-maroon">
            <Key className="w-7 h-7" />
          </div>

          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            Please enter your family boutique workspace PIN to access real-time inventory management & catalog configuration.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1.5">
                Authentication PIN
              </label>
              <input
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN code (Default: 1234)"
                className="w-full px-4 py-3 rounded-lg bg-brand-ivory/50 text-neutral-800 border border-brand-gold/20 focus:outline-none focus:border-brand-maroon text-sm font-mono tracking-widest text-center"
              />
            </div>

            {authError && (
              <p className="text-[11px] text-red-700 bg-red-50 border border-red-200/50 p-2.5 rounded-lg flex items-center gap-1.5 font-sans font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{authError}</span>
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onGoToStorefront}
                className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-brand-maroon hover:bg-brand-maroon-dark text-brand-cream py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer text-center"
              >
                Authenticate
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Render Main Admin Dashboard
  return (
    <div className="min-h-screen bg-brand-cream relative pb-16">
      
      {/* Top Header */}
      <header className="bg-brand-cream border-b border-brand-maroon/10 py-5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={onGoToStorefront}
              className="p-2 hover:bg-brand-ivory rounded-full text-brand-maroon transition-all cursor-pointer"
              title="Return to Storefront"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-left">
              <h1 className="font-serif text-lg sm:text-xl font-normal tracking-[2px] text-brand-maroon uppercase leading-none">
                Sri Sai Sarees
              </h1>
              <span className="text-[9px] font-mono tracking-widest text-brand-gold font-bold uppercase mt-1 block">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToStorefront}
              className="text-xs font-bold text-neutral-600 hover:text-brand-maroon px-4 py-2 border border-neutral-300 rounded-lg hover:bg-brand-ivory transition-all cursor-pointer"
            >
              Live Site
            </button>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-brand-cream bg-brand-maroon hover:bg-brand-maroon-dark px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm"
            >
              Logout Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Database Status Alert Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-stretch">
          <div className="md:col-span-8 bg-brand-cream border border-brand-gold/25 p-5 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-xs">
            <div className="flex gap-3 items-start sm:items-center">
              <div className={`p-3 rounded-full shrink-0 ${isSupabaseConfigured ? 'bg-brand-emerald/10 text-brand-emerald' : 'bg-amber-100 text-amber-700'}`}>
                <Database className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-base font-bold text-brand-maroon flex items-center gap-2">
                  <span>Backend Integration</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider ${isSupabaseConfigured ? 'bg-brand-emerald text-brand-cream' : 'bg-amber-500 text-white animate-pulse'}`}>
                    {isSupabaseConfigured ? 'CONNECTED' : 'LOCAL DEMO'}
                  </span>
                </h3>
                <p className="text-xs text-neutral-500 max-w-lg mt-0.5 leading-relaxed">
                  {isSupabaseConfigured 
                    ? 'All inventory operations are synced directly in real-time with your live Supabase database instance.'
                    : 'Supabase URL/Key placeholders are not configured. The app is running in Local Demo mode. Add database environment variables in .env.local to enable real database features.'}
                </p>
              </div>
            </div>
            
            {sarees.length === 0 && (
              <button
                onClick={onSeedData}
                disabled={actionLoading || isLoading}
                className="bg-brand-gold hover:bg-brand-gold-dark disabled:opacity-50 text-brand-cream text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors shrink-0"
              >
                <RotateCw className={`w-3.5 h-3.5 ${actionLoading ? 'animate-spin' : ''}`} />
                <span>Seed Catalog</span>
              </button>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-4 bg-brand-cream border border-brand-gold/20 p-5 rounded-2xl flex flex-col justify-center text-left shadow-xs">
            <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold">Total Inventory Count</span>
            <div className="text-3xl font-serif font-bold text-brand-maroon mt-1 flex items-baseline gap-2">
              <span>{sarees.length}</span>
              <span className="text-xs font-sans font-semibold text-neutral-500">creations active</span>
            </div>
            <div className="flex gap-4 mt-2 text-[10px] text-neutral-400 font-sans border-t border-brand-gold/10 pt-2">
              <span>Low Stock: {sarees.filter(s => s.stockStatus === 'Low Stock').length}</span>
              <span>Sold Out: {sarees.filter(s => s.stockStatus === 'Sold Out').length}</span>
            </div>
          </div>
        </div>

        {/* Action Controls Matrix */}
        <div className="bg-brand-cream border border-brand-gold/15 rounded-2xl p-5 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-brand-gold" />
              <input
                type="text"
                placeholder="Search name, fabric, or color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-ivory/50 text-neutral-800 text-xs py-2.5 pl-10 pr-4 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
              />
            </div>

            {/* Category select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-brand-ivory/50 text-neutral-800 text-xs py-2.5 px-3.5 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
            >
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleOpenAddForm}
            className="w-full md:w-auto bg-brand-maroon hover:bg-brand-maroon-dark text-brand-cream text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Saree Craft</span>
          </button>
        </div>

        {/* Saree List / Table View */}
        <div className="bg-brand-cream border border-brand-gold/15 rounded-3xl overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="p-20 text-center space-y-4">
              <div className="animate-spin w-8 h-8 border-4 border-brand-maroon border-t-transparent rounded-full mx-auto" />
              <p className="text-xs text-neutral-500 font-sans">Connecting to inventory database...</p>
            </div>
          ) : displaySarees.length === 0 ? (
            <div className="p-20 text-center space-y-4">
              <div className="w-12 h-12 bg-neutral-100 border border-neutral-200 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-brand-maroon">No matching items found</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">Try relaxing your search terms or seed the default data if you have a clean project.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-ivory/60 border-b border-brand-gold/15 text-[10px] font-mono tracking-wider text-brand-maroon uppercase">
                    <th className="py-4 px-6">Saree Product</th>
                    <th className="py-4 px-4">Fabric</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Price (INR)</th>
                    <th className="py-4 px-4 text-center">Stock status</th>
                    <th className="py-4 px-4 text-center">Flags</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gold/10 font-sans text-xs">
                  {displaySarees.map((saree) => (
                    <tr key={saree.id} className="hover:bg-brand-ivory/20 transition-colors">
                      {/* Photo + Name */}
                      <td className="py-4 px-6 flex items-center gap-4">
                        <img 
                          src={saree.images[0]} 
                          alt={saree.name}
                          className="w-10 aspect-[3/4] object-cover rounded-md border border-brand-gold/20 shadow-xs shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left">
                          <h4 className="font-serif font-bold text-brand-maroon line-clamp-1">{saree.name}</h4>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">Color: {saree.color} • ID: {saree.id}</span>
                        </div>
                      </td>

                      {/* Fabric */}
                      <td className="py-4 px-4 text-neutral-700">
                        {saree.fabric}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="bg-brand-maroon/5 text-brand-maroon px-2 py-0.5 rounded font-medium text-[10px]">
                          {saree.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-mono font-bold text-brand-gold">
                        <div>{formatRupee(saree.price)}</div>
                        {saree.originalPrice > saree.price && (
                          <div className="text-[10px] text-neutral-400 line-through mt-0.5">{formatRupee(saree.originalPrice)}</div>
                        )}
                      </td>

                      {/* Stock Status */}
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                          saree.stockStatus === 'In Stock' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' 
                            : saree.stockStatus === 'Low Stock' 
                              ? 'bg-amber-50 text-amber-800 border border-amber-200/50' 
                              : 'bg-red-50 text-red-800 border border-red-200/50'
                        }`}>
                          {saree.stockStatus}
                        </span>
                      </td>

                      {/* Flags */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-wrap gap-1 items-center justify-center max-w-[120px] mx-auto">
                          {saree.featured && (
                            <span className="text-[8px] font-bold bg-neutral-200 text-neutral-700 px-1 rounded">FEATURED</span>
                          )}
                          {saree.isNewArrival && (
                            <span className="text-[8px] font-bold bg-blue-100 text-blue-700 px-1 rounded">NEW</span>
                          )}
                          {saree.isBestSeller && (
                            <span className="text-[8px] font-bold bg-purple-100 text-purple-700 px-1 rounded">BEST</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex gap-2 items-center justify-end">
                          <button
                            onClick={() => handleOpenEditForm(saree)}
                            className="p-2 bg-brand-cream hover:bg-brand-maroon hover:text-brand-cream border border-brand-gold/25 rounded-lg transition-all cursor-pointer text-brand-maroon"
                            title="Edit Item"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(saree.id, saree.name)}
                            disabled={actionLoading}
                            className="p-2 bg-brand-cream hover:bg-red-700 hover:text-white border border-brand-gold/25 rounded-lg transition-all cursor-pointer text-red-600 disabled:opacity-50"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Editor Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-0 sm:p-4 overflow-hidden">
          {/* Backdrop */}
          <div 
            onClick={() => !actionLoading && setIsFormOpen(false)}
            className="absolute inset-0 bg-brand-maroon-dark/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Form Panel */}
          <div className="bg-brand-cream w-full max-w-2xl h-full sm:h-[calc(100vh-2rem)] rounded-none sm:rounded-2xl border-l border-brand-gold/25 shadow-2xl relative z-10 flex flex-col animate-slide-in select-none">
            
            {/* Form Header */}
            <div className="p-5 border-b border-brand-gold/15 bg-brand-ivory flex justify-between items-center">
              <div className="text-left">
                <h3 className="font-serif text-base font-bold text-brand-maroon">
                  {editingSaree ? `Edit Saree Details` : 'Add New Heritage Creation'}
                </h3>
                <p className="text-[10px] text-neutral-400 mt-0.5">Fill out product information to sync with database.</p>
              </div>
              <button
                disabled={actionLoading}
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500 cursor-pointer disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields Scroll Box */}
            <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6 text-left">
              
              {formError && (
                <div className="text-xs text-red-700 bg-red-50 border border-red-200/50 p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* SECTION: Basic Specifications */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-brand-gold/10 pb-1.5 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Basic Specifications</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                      Saree Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajmata Vintage Banarasi Silk Saree"
                      className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                    >
                      <option value="Banarasi">Banarasi</option>
                      <option value="Silk Sarees">Silk Sarees</option>
                      <option value="Pochampally Ikat">Pochampally Ikat</option>
                      <option value="Linen">Linen</option>
                      <option value="Festive Collection">Festive Collection</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                      Fabric *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fabric}
                      onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                      placeholder="e.g. Pure Katan Silk"
                      className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                      Color *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="e.g. Crimson Red"
                      className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Festive Collection">Festive Collection</option>
                      <option value="Daily Wear">Daily Wear</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                      Sell Price (INR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="e.g. 34500"
                      className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                      Original Price (INR)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.originalPrice || ''}
                      onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                      placeholder="e.g. 42000"
                      className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Image Gallery Assets */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-brand-gold/10 pb-1.5 flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5" />
                  <span>Image Gallery Assets</span>
                </h4>

                {/* File Upload Dropzone */}
                <div>
                  <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1.5">
                    Direct Image Upload
                  </label>
                  <div className="border-2 border-dashed border-brand-gold/30 rounded-xl p-6 bg-brand-cream/50 text-center hover:border-brand-maroon transition-colors relative cursor-pointer group">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                      {uploading ? (
                        <>
                          <RotateCw className="w-8 h-8 text-brand-maroon animate-spin" />
                          <p className="text-xs font-semibold text-brand-maroon">Uploading catalog assets...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-brand-gold group-hover:text-brand-maroon transition-colors" />
                          <p className="text-xs font-semibold text-neutral-700">
                            Click to upload saree images or drag files here
                          </p>
                          <p className="text-[9px] text-neutral-400 font-mono">
                            Supports PNG, JPG, JPEG, WEBP up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {uploadError && (
                    <p className="text-[10px] text-red-700 font-sans mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>{uploadError}</span>
                    </p>
                  )}
                </div>

                {/* Fallback Text Area (Image URLs) */}
                <div>
                  <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                    Image URLs (Alternative - One URL per line)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.imagesText}
                    onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-...\nhttps://images.unsplash.com/photo-..."
                    className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-mono leading-relaxed"
                  />
                </div>

                {/* Image Previews with Remove action */}
                {formData.imagesText.trim().split('\n').filter(u => u.trim()).length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono tracking-widest text-brand-gold uppercase font-bold block">
                      Uploaded Gallery Preview ({formData.imagesText.trim().split('\n').filter(u => u.trim()).length} files)
                    </span>
                    <div className="flex gap-3 overflow-x-auto py-2 bg-brand-ivory/20 p-3 rounded-xl border border-brand-gold/10">
                      {formData.imagesText.split('\n').map((url, idx) => {
                        const trimmed = url.trim();
                        if (!trimmed) return null;
                        return (
                          <div key={idx} className="relative w-16 aspect-[3/4] rounded-md overflow-hidden border border-brand-gold/30 shrink-0 shadow-xs bg-white group/thumb">
                            <img 
                              src={trimmed} 
                              alt={`Preview ${idx + 1}`} 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=150&q=80';
                              }}
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Overlay tag */}
                            <span className="absolute bottom-0 inset-x-0 bg-brand-maroon/70 text-[8px] text-brand-cream text-center py-0.5 uppercase font-mono">
                              {idx === 0 ? 'Cover' : `#${idx + 1}`}
                            </span>

                            {/* Remove button overlay */}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-700/80 hover:bg-red-700 text-white rounded-full transition-opacity opacity-0 group-hover/thumb:opacity-100 shadow-sm cursor-pointer"
                              title="Remove image"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION: Storytelling & Weaving Detail */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-brand-gold/10 pb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Storytelling & Weaving Detail</span>
                </h4>

                <div className="space-y-4">


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                        Fabric Origin & Details
                      </label>
                      <input
                        type="text"
                        value={formData.fabricDetails}
                        onChange={(e) => setFormData({ ...formData, fabricDetails: e.target.value })}
                        placeholder="e.g. 100% Pure Katan Mulberry Silk, 34 days loomwork"
                        className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        value={formData.dimensions}
                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                        placeholder="e.g. 5.5 meters + 0.8 meters unstitched blouse"
                        className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                        Border Weaving Type
                      </label>
                      <input
                        type="text"
                        value={formData.borderType}
                        onChange={(e) => setFormData({ ...formData, borderType: e.target.value })}
                        placeholder="e.g. Thick Shikargah Antique Gold Zari"
                        className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                        Pallu Styling details
                      </label>
                      <input
                        type="text"
                        value={formData.palluDetails}
                        onChange={(e) => setFormData({ ...formData, palluDetails: e.target.value })}
                        placeholder="e.g. Intricately woven heavy brocade with paisleys"
                        className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                        Care Instructions
                      </label>
                      <input
                        type="text"
                        value={formData.careInstructions}
                        onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                        placeholder="e.g. Dry clean only. Wrap in soft muslin fabric."
                        className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Blouse Details */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-brand-gold/10 pb-1.5 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Blouse Integration</span>
                </h4>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 select-none">
                    <input
                      type="checkbox"
                      id="blouseIncluded"
                      checked={formData.blouseIncluded}
                      onChange={(e) => setFormData({ ...formData, blouseIncluded: e.target.checked })}
                      className="accent-brand-maroon w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="blouseIncluded" className="text-xs text-neutral-800 font-semibold cursor-pointer">
                      Unstitched Blouse Piece Included with Saree
                    </label>
                  </div>

                  {formData.blouseIncluded && (
                    <div>
                      <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                        Blouse Piece Description
                      </label>
                      <input
                        type="text"
                        value={formData.blouseDescription}
                        onChange={(e) => setFormData({ ...formData, blouseDescription: e.target.value })}
                        placeholder="e.g. Matching maroon silk blouse piece (80cm) with gold border"
                        className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION: Stock Status & Badges */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold border-b border-brand-gold/10 pb-1.5 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Inventory Control & Storefront Badges</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">
                      Stock Status
                    </label>
                    <select
                      value={formData.stockStatus}
                      onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value as any })}
                      className="w-full bg-brand-ivory/30 text-neutral-800 text-xs py-2.5 px-3 rounded-lg border border-brand-gold/20 focus:outline-none focus:border-brand-maroon font-sans"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 flex flex-col justify-end gap-3 pb-1">
                    <div className="flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="accent-brand-maroon w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="featured" className="text-xs text-neutral-700 cursor-pointer">
                        Featured Product (Show in Hero collections)
                      </label>
                    </div>

                    <div className="flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        id="isNewArrival"
                        checked={formData.isNewArrival}
                        onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                        className="accent-brand-maroon w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="isNewArrival" className="text-xs text-neutral-700 cursor-pointer">
                        New Arrival Badge
                      </label>
                    </div>

                    <div className="flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        id="isBestSeller"
                        checked={formData.isBestSeller}
                        onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                        className="accent-brand-maroon w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="isBestSeller" className="text-xs text-neutral-700 cursor-pointer">
                        Bestseller Badge
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions footer */}
              <div className="border-t border-brand-gold/15 pt-5 flex gap-3">
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 bg-neutral-200 hover:bg-neutral-300 disabled:opacity-50 text-neutral-700 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 bg-brand-maroon hover:bg-brand-maroon-dark disabled:opacity-50 text-brand-cream py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  {actionLoading && <span className="animate-spin w-3 h-3 border-2 border-brand-cream border-t-transparent rounded-full" />}
                  <span>{editingSaree ? 'Save Changes' : 'Sync Creation'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
