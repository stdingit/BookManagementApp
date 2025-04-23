import React, { useState } from 'react';
import axios from '../axios'; // Use the configured axios

const BookForm = ({ onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_date: '',
    isbn: '',
    genre: '',
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access');
      const res = await axios.post('books/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If book is successfully added, call onBookAdded with the new book
      onBookAdded(res.data);

      // Optionally clear form after submission
      setFormData({
        title: '',
        author: '',
        published_date: '',
        isbn: '',
        genre: '',
        available: true,
      });

      alert('Book added successfully');
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{color:'rgb(233, 252, 69)'}}>Add a New Book</h1>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="date"
        name="published_date"
        value={formData.published_date}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="isbn"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
        style={styles.input}
      /> <br />
      <label style={{color:'white', fontSize: '17px'}}> 
        Available:
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
        />
      </label> <br />
      <button type="submit" style={{
        border:'2px solid rgb(233, 252, 69)',
        borderRadius: '10px',
        backgroundColor: 'rgb(233, 252, 69)',
        color: 'black',
        fontSize: '17px',
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: '10px 20px',
        margin: '10px 10px'
      }}>Add Book</button>
    </form>
  );
};

const styles = {
  input: {
    width: '60%', // Reduced width to 60% of the parent container
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
  },
};

export default BookForm;
