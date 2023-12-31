import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './tailwind.css';
import {Header, Footer, ConfigPage, Feed, Explore, SinglePost, Profile, Post, Login, Register, NotFound, ProtectedRoute} from './components';


function App() {
  return (
    <Router>
      <div className='flex flex-col w-full sm:flex-row'>
      <Header />
        <Routes>          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Feed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="settings/*" element={<ConfigPage />} />
            <Route path="profile/:userprofile" element={<Profile /> } />
            <Route path="profile/" element={<Profile />} />
            <Route path="post" element={<Post />} />
            <Route path="p/*" element={<SinglePost />} />
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
