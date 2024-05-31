import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function BooksData() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('react');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks(query);
  }, [query]);

  const fetchBooks = (searchQuery) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`)
      .then(output => {
        setBooks(output.data.items || []);
      })
      .catch(error => console.error(error));
  };

  const handleSearch = () => {
    const searchQuery = document.getElementById('search-input').value;
    setQuery(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="books-container">
      <div className="search-bar">
        <input 
          id="search-input" 
          type="text" 
          placeholder="Search for books..."
          defaultValue={query}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.id} className="book-item" onClick={() => handleBookClick(book.id)}>
            <img src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`} alt={book.volumeInfo.title} />
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
            <p>{book.volumeInfo.publishedDate}</p>
            {book.saleInfo && book.saleInfo.listPrice && (
              <p>Price: {book.saleInfo.listPrice.amount} {book.saleInfo.listPrice.currencyCode}</p>
            )}
            {book.saleInfo && book.saleInfo.retailPrice && !book.saleInfo.listPrice && (
              <p>Retail Price: {book.saleInfo.retailPrice.amount} {book.saleInfo.retailPrice.currencyCode}</p>
            )}
          </div>
        ))
      ) : (
        <p className="no-books">No books found.</p>
      )}
    </div>
  );
}

export default BooksData;
