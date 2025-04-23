// src/components/EditBookPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';

const EditBookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    published_date: '',
    isbn: '',
    genre: '',
    available: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await axios.get(`/books/${bookId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(res.data);
      } catch (err) {
        console.error('Error fetching book details:', err);
        navigate('/');
      }
    };

    fetchBookDetails();
  }, [bookId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access');
      await axios.put(`/books/${bookId}/`, book, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Book updated successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating book:', err);
      alert('Failed to update the book');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: name === 'available' ? value === 'true' : value,
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Edit Book</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {['title', 'author', 'published_date', 'isbn', 'genre'].map((field) => (
            <div key={field} style={styles.formGroup}>
              <label style={styles.label}>{field.replace('_', ' ')}:</label>
              <input
                type={field === 'published_date' ? 'date' : 'text'}
                name={field}
                value={book[field]}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          ))}

          <div style={styles.formGroup}>
            <label style={styles.label}>Available:</label>
            <select
              name="available"
              value={book.available}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveButton}>
              Save Changes
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: 'url("https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5924.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '50px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '500px',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EditBookPage;
