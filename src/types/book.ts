export type BookStatus = 'unread' | 'reading' | 'read';

export interface Book {
  id?: string; // Supabase-generated UUID
  title: string;
  author: string;
  genre: string;
  summary: string;
  status: BookStatus;
  isbn: string;
  photo_url?: string; // URL to the uploaded cover photo
  created_at?: string; // Supabase timestamp
}
