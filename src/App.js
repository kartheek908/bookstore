
// import React, { useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Header from './components/Header';
// import BooksData from './components/booksData'; 
// import BookDescription from './components/bookDescrpition';
// import NavBar from './components/Navbar';  
// import Login from './components/Login';

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);

//   return (
//     <BrowserRouter>
//        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
//       <Routes>
//         <Route path="/" element={<Header />} />
//         <Route path="/home" element={<Header />} />
//         <Route path="/books" element={<BooksData />} />
//         <Route path="/book/:id" element={<BookDescription />} />
//         <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
//         <Route path="/cart" element={<div>Cart Page</div>} /> 
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { StrictMode, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import BooksData from './components/booksData';
import BookDescription from './components/bookDescrpition';
import NavBar from './components/Navbar';
import Login from './components/Login';
import CartPage from './components/Cart';
import { CartProvider } from './components/CartProvider';  
import { AuthProvider, useAuth } from './components/AuthProvider';
import CheckoutPage from './components/CheckoutPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
       <React.StrictMode>      
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <Routes>
                        <Route path="/" element={<Header />} />
                        <Route path="/books" element={<BooksData />} />
                        <Route path="/book/:id" element={<BookDescription />} />
                        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />                       
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage loggedIn={loggedIn}/>} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
        </React.StrictMode>
 );
}




export default App;
