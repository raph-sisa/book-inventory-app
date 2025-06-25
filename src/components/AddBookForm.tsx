import React, { useState } from 'react';
import type { BookStatus } from '../types/book';
import { uploadBookPhoto, addBook } from '../utils/supabaseBookUtils';
import { Button, Typography } from '@visa/nova-react';
import { GenericFileUploadTiny } from '@visa/nova-icons-react';

const statusOptions: BookStatus[] = ['unread', 'reading', 'read'];

const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<BookStatus>('unread');
  const [isbn, setIsbn] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setSummary('');
    setStatus('unread');
    setIsbn('');
    setPhoto(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      let photo_url: string | undefined = undefined;
      if (photo) {
        const url = await uploadBookPhoto(photo);
        if (!url) throw new Error('Photo upload failed');
        photo_url = url;
      }
      const { error } = await addBook({
        title,
        author,
        genre,
        summary,
        status,
        isbn,
        photo_url,
      });
      if (error) throw error;
      setMessage('Book added successfully!');
      resetForm();
    } catch (err: any) {
      setMessage(`Error: ${err.message || 'Failed to add book.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', borderRadius: 32, padding: 40, maxWidth: 600, margin: '40px auto', boxSizing: 'border-box' }}>
      <Typography variant="display-1" style={{ fontWeight: 700, marginBottom: 40 }}>BOOKSHELF</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ textTransform: 'lowercase', fontWeight: 400, fontSize: 16, marginBottom: 4 }}>title</span>
            <input
              style={{ border: '1px solid #D1D5DB', borderRadius: 32, padding: '20px 24px', fontSize: 20, outline: 'none', background: 'white', color: '#222', fontWeight: 400 }}
              placeholder="eg. Grapes of Wrath"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ textTransform: 'lowercase', fontWeight: 400, fontSize: 16, marginBottom: 4 }}>author</span>
            <input
              style={{ border: '1px solid #D1D5DB', borderRadius: 32, padding: '20px 24px', fontSize: 20, outline: 'none', background: 'white', color: '#222', fontWeight: 400 }}
              placeholder="eg. John Steinbeck"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ textTransform: 'lowercase', fontWeight: 400, fontSize: 16, marginBottom: 4 }}>genre</span>
            <input
              style={{ border: '1px solid #D1D5DB', borderRadius: 32, padding: '20px 24px', fontSize: 20, outline: 'none', background: 'white', color: '#222', fontWeight: 400 }}
              placeholder="eg. fiction"
              value={genre}
              onChange={e => setGenre(e.target.value)}
              required
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ textTransform: 'lowercase', fontWeight: 400, fontSize: 16, marginBottom: 4 }}>summary</span>
            <textarea
              style={{ border: '1px solid #D1D5DB', borderRadius: 32, padding: '20px 24px', fontSize: 20, outline: 'none', background: 'white', color: '#222', fontWeight: 400, resize: 'none', minHeight: 60 }}
              placeholder="eg. I read it back in high school, dont remember"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              required
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ textTransform: 'lowercase', fontWeight: 400, fontSize: 16, marginBottom: 4 }}>status</span>
            <select
              style={{ border: '1px solid #D1D5DB', borderRadius: 32, padding: '20px 24px', fontSize: 20, outline: 'none', background: 'white', color: '#222', fontWeight: 400, appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', backgroundImage: `url('data:image/svg+xml;utf8,<svg fill=\'black\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 24px center' }}
              value={status}
              onChange={e => setStatus(e.target.value as BookStatus)}
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ textTransform: 'lowercase', fontWeight: 400, fontSize: 16, marginBottom: 4 }}>ISBN</span>
            <input
              style={{ border: '1px solid #D1D5DB', borderRadius: 32, padding: '20px 24px', fontSize: 20, outline: 'none', background: 'white', color: '#222', fontWeight: 400 }}
              placeholder="eg. 1-000-13-00909"
              value={isbn}
              onChange={e => setIsbn(e.target.value)}
              required
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
            <span style={{ textTransform: 'lowercase', fontWeight: 400, fontSize: 16, marginBottom: 4 }}>photo</span>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="photo-upload"
              onChange={e => setPhoto(e.target.files?.[0] || null)}
            />
            <div style={{ border: '1px solid #D1D5DB', borderRadius: 32, padding: '20px 24px', fontSize: 20, background: 'white', color: '#B0B0B0', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <span style={{ flex: 1 }}>{photo ? photo.name : 'upload'}</span>
              <GenericFileUploadTiny />
            </div>
          </label>
        </div>
        <Button
          type="submit"
          disabled={loading}
          style={{
            borderRadius: 32,
            fontSize: 20,
            padding: '18px 0',
            fontWeight: 600,
            background: '#0A4BFF',
            color: 'white',
            border: 'none',
          }}
        >
          {loading ? 'Adding...' : 'Add Book'}
        </Button>
        {message && <Typography variant="body-2" style={{ marginTop: 8 }}>{message}</Typography>}
      </form>
    </div>
  );
};

export default AddBookForm; 