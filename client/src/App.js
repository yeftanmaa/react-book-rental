import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import GetAllBook from './pages/get-all-book';
import GetBookStatus from './pages/get-book-status';
import SearchBook from './pages/search-book';
import AddBook from './pages/add-book';
import Login from './pages/login';
import GetBookAuthor from './pages/get-book-author';
import GetBookISBN from './pages/get-book-isbn';
import Wishlist from './pages/wishlist';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='' element={<Login />} />
          <Route path='/all/books' element={<GetAllBook title="All Books | Book Rental" />} />
          <Route path='/book/search-title/' element={<SearchBook title="Search Book by Title | Book Rental" />} />
          <Route path='/add/book' element={<AddBook title="Add Book | Book Rental" />} />
          <Route path='/book/status=available' element={<GetBookStatus title="Book Available | Book Rental" />} />
          <Route path='/book/search-author/' element={<GetBookAuthor title="Search Book by Author | Book Rental" />} />
          <Route path='/book/search-isbn/' element={<GetBookISBN title="Search Book by ISBN | Book Rental" />} />
          <Route path='/wishlist' element={<Wishlist title="My Wishlist | Book Rental" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
