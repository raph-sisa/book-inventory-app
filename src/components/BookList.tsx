import React, { useEffect, useState } from 'react';
import type { Book } from '../types/book';
import { fetchBooks } from '../utils/supabaseBookUtils';
import { ContentCard, ContentCardBody, ContentCardTitle, Typography, Utility } from '@visa/nova-react';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err: any) {
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  if (loading) return <Typography variant="body-2">Loading books...</Typography>;
  if (error) return <Typography variant="body-2" style={{ color: 'red' }}>{error}</Typography>;
  if (books.length === 0) return <Typography variant="body-2">No books found.</Typography>;

  return (
    <div>
      <ContentCard borderBlockEnd>
        <ContentCardBody>
          <ContentCardTitle variant="headline-4">Book List</ContentCardTitle>
          <Utility vFlex vGap={16}>
            {books.map(book => (
              <ContentCard key={book.id} borderBlockEnd style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <ContentCardBody style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {book.photo_url && (
                    <img src={book.photo_url} alt={book.title} style={{ width: 80, height: 120, objectFit: 'cover', borderRadius: 4 }} />
                  )}
                  <div>
                    <Typography variant="headline-4">{book.title}</Typography>
                    <Typography variant="body-2">by {book.author}</Typography>
                    <Typography variant="body-2">Genre: {book.genre}</Typography>
                    <Typography variant="body-2">Status: {book.status}</Typography>
                    <Typography variant="body-2">ISBN: {book.isbn}</Typography>
                  </div>
                </ContentCardBody>
              </ContentCard>
            ))}
          </Utility>
        </ContentCardBody>
      </ContentCard>
    </div>
  );
};

export default BookList; 