import { supabase } from './supabaseClient';
import type { Book } from '../types/book';

// Uploads a photo to Supabase Storage and returns the public URL
export async function uploadBookPhoto(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage
    .from('book-photos')
    .upload(fileName, file);
  if (error) {
    console.error('Photo upload error:', error);
    return null;
  }
  // Get public URL
  const { data: urlData } = supabase.storage.from('book-photos').getPublicUrl(fileName);
  return urlData?.publicUrl || null;
}

// Adds a book record to the 'books' table
export async function addBook(book: Omit<Book, 'id' | 'created_at'>): Promise<{ id?: string; error?: any }> {
  const { data, error } = await supabase
    .from('books')
    .insert([book])
    .select()
    .single();
  if (error) {
    console.error('Add book error:', error);
    return { error };
  }
  return { id: data.id };
}

// Fetch all books from the 'books' table, ordered by created_at descending
export async function fetchBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Fetch books error:', error);
    return [];
  }
  return data || [];
} 