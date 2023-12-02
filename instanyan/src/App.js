import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './tailwind.css';
import {Header, Footer, ConfigPage, Feed, Profile, Post, Login, Register, NotFound} from './components';

function App() {
  return (
    <Router>
      <div className='flex flex-col sm:flex-row w-full'>
      <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="settings/*" element={<ConfigPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="post" element={<Post />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>    
  );
}

export default App;
