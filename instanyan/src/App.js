import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './tailwind.css';
import {Header, Footer, ConfigPage, Feed, Explore, Profile, Post, Login, Register, NotFound, ProtectedRoute} from './components';


function App() {
  return (
    <Router>
      <div className='flex flex-col sm:flex-row w-full'>
      <Header />
        <Routes>          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Feed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="settings/*" element={<ConfigPage />} />
            <Route path="profile/:userprofile" element={<Profile /> } />
            <Route path="profile/" element={<Profile />} />
            <Route path="post" element={<Post />} />
          </Route>
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
