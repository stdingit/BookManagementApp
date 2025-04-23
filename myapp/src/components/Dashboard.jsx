import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import BookForm from './BookForm';
import BookTable from './BookTable';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);  // New state to store cart items
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await axios.get('protected/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
        setIsAdmin(res.data.is_admin);
      } catch {
        navigate('/');
      }
    };

    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await axios.get('books/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data);
      } catch (err) {
        console.error('Failed to fetch books', err);
      }
    };

    fetchProtected();
    fetchBooks();
  }, [navigate]);

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleAddToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);  // Add the book to cart
    navigate('/cart', { state: { cart: [...cart, book] } }); // Pass the updated cart to Cart page
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem('access');
      await axios.delete(`/books/${bookId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      alert('Book deleted successfully');
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('Failed to delete the book');
    }
  };

  const handleEditBook = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  // 🔍 Filter books based on search term (title, author, genre)
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.genre}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        padding: '20px',
        position: 'relative',
        backgroundImage: 'url(https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5924.jpg?t=st=1745173597~exp=1745177197~hmac=3dfca1126196d58da171c40318578b7219b8714a4a4300d0d17a9fedc298713c&w=1380)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <h2 style={{color:'white'}}>{message},</h2>

      {/* Logout Button in Top Right Corner */}
      <button
        onClick={logout}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search books by title, author, or genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: '16px 0',
          padding: '8px',
          width: '300px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      {isAdmin && <BookForm onBookAdded={handleBookAdded} />}

      {/* Book Table with Border */}
      <div
        style={{
          overflowX: 'auto',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          padding: '10px',
          marginTop: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          width: '900px',
          margin: '80px auto',
        }}
      >
        <BookTable 
          books={filteredBooks} 
          onDelete={handleDeleteBook} 
          onEdit={handleEditBook}
          isAdmin={isAdmin} 
          onAddToCart={handleAddToCart}  // Passing add to cart handler
        />
      </div>
    </div>
  );
};

export default Dashboard;
