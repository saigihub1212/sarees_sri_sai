import { createClient } from '@supabase/supabase-js';
import { Saree, Review } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Check if credentials are placeholders or empty
export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
  supabaseUrl !== '' &&
  supabaseAnonKey !== '';

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder-project.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key'
);

// Map Supabase DB Row (snake_case) to Saree App Interface (camelCase)
export function mapDbRowToSaree(row: any): Saree {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    fabric: row.fabric,
    price: Number(row.price),
    originalPrice: Number(row.original_price),
    color: row.color,
    occasion: row.occasion,
    images: Array.isArray(row.images) ? row.images : [],
    description: row.description,
    fabricDetails: row.fabric_details,
    blouseIncluded: !!row.blouse_included,
    blouseDescription: row.blouse_description,
    dimensions: row.dimensions,
    careInstructions: row.care_instructions,
    stockStatus: row.stock_status as 'In Stock' | 'Low Stock' | 'Sold Out',
    rating: Number(row.rating),
    borderType: row.border_type,
    palluDetails: row.pallu_details,
    featured: !!row.featured,
    isNewArrival: !!row.is_new_arrival,
    isBestSeller: !!row.is_best_seller,
    reviews: Array.isArray(row.reviews) ? (row.reviews as Review[]) : []
  };
}

// Map Saree App Interface (camelCase) to Supabase DB Row (snake_case)
export function mapSareeToDbRow(saree: Partial<Saree>): any {
  const row: any = {};
  
  if (saree.id !== undefined) row.id = saree.id;
  if (saree.name !== undefined) row.name = saree.name;
  if (saree.category !== undefined) row.category = saree.category;
  if (saree.fabric !== undefined) row.fabric = saree.fabric;
  if (saree.price !== undefined) row.price = saree.price;
  if (saree.originalPrice !== undefined) row.original_price = saree.originalPrice;
  if (saree.color !== undefined) row.color = saree.color;
  if (saree.occasion !== undefined) row.occasion = saree.occasion;
  if (saree.images !== undefined) row.images = saree.images;
  if (saree.description !== undefined) row.description = saree.description;
  if (saree.fabricDetails !== undefined) row.fabric_details = saree.fabricDetails;
  if (saree.blouseIncluded !== undefined) row.blouse_included = saree.blouseIncluded;
  if (saree.blouseDescription !== undefined) row.blouse_description = saree.blouseDescription;
  if (saree.dimensions !== undefined) row.dimensions = saree.dimensions;
  if (saree.careInstructions !== undefined) row.care_instructions = saree.careInstructions;
  if (saree.stockStatus !== undefined) row.stock_status = saree.stockStatus;
  if (saree.rating !== undefined) row.rating = saree.rating;
  if (saree.borderType !== undefined) row.border_type = saree.borderType;
  if (saree.palluDetails !== undefined) row.pallu_details = saree.palluDetails;
  if (saree.featured !== undefined) row.featured = saree.featured;
  if (saree.isNewArrival !== undefined) row.is_new_arrival = saree.isNewArrival;
  if (saree.isBestSeller !== undefined) row.is_best_seller = saree.isBestSeller;
  if (saree.reviews !== undefined) row.reviews = saree.reviews;
  
  return row;
}

// Upload a Saree image file to the Supabase 'sarees' public storage bucket
export async function uploadSareeImage(file: File): Promise<string> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }
  
  // Create a clean, unique file name to avoid collisions
  const fileExt = file.name.split('.').pop();
  const cleanBaseName = file.name
    .replace(/[^a-zA-Z0-9]/g, '_')
    .substring(0, 30);
  const fileName = `${cleanBaseName}_${Date.now()}.${fileExt}`;
  const filePath = `catalog/${fileName}`;

  // Upload the file
  const { data, error } = await supabase.storage
    .from('sarees')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  // Retrieve the public URL for the uploaded file
  const { data: urlData } = supabase.storage
    .from('sarees')
    .getPublicUrl(filePath);

  if (!urlData || !urlData.publicUrl) {
    throw new Error("Failed to generate a public URL for the uploaded image.");
  }

  return urlData.publicUrl;
}

