import React from 'react';

const BookTable = ({ books, onEdit, onDelete, isAdmin, onAddToCart }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr>
          <th style={headerStyle}>Title</th>
          <th style={headerStyle}>Author</th>
          <th style={headerStyle}>Published Date</th>
          <th style={headerStyle}>ISBN</th>
          <th style={headerStyle}>Genre</th>
          <th style={headerStyle}>Available</th>
          {isAdmin && <th style={{ ...headerStyle, textAlign: 'center' }}>Actions</th>}
          {!isAdmin && <th style={{ ...headerStyle, textAlign: 'center' }}>Add to Cart</th>}
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} style={rowStyle}>
            <td style={cellStyle}>{book.title}</td>
            <td style={cellStyle}>{book.author}</td>
            <td style={cellStyle}>{book.published_date}</td>
            <td style={cellStyle}>{book.isbn}</td>
            <td style={cellStyle}>{book.genre}</td>
            <td style={cellStyle}>{book.available ? 'Yes' : 'No'}</td>

            {isAdmin && (
              <td style={{ ...cellStyle, textAlign: 'center' }}>
                <button onClick={() => onEdit(book.id)} style={editButtonStyle}>
                  Edit
                </button>
                <button onClick={() => onDelete(book.id)} style={deleteButtonStyle}>
                  Delete
                </button>
              </td>
            )}

            {!isAdmin && (
              <td style={{ ...cellStyle, textAlign: 'center' }}>
                <button
                  onClick={() => onAddToCart(book)}
                  style={{
                    ...addToCartButtonStyle,
                    backgroundColor: book.available ? '#28a745' : '#ccc',
                    cursor: book.available ? 'pointer' : 'not-allowed',
                  }}
                  disabled={!book.available}
                >
                  {book.available ? 'Add to Cart' : 'Unavailable'}
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Styles
const headerStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
  backgroundColor: '#f8f9fa',
};

const cellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const rowStyle = {
  transition: 'background-color 0.2s',
};

const editButtonStyle = {
  padding: '6px 12px',
  marginRight: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const addToCartButtonStyle = {
  padding: '6px 12px',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default BookTable;
