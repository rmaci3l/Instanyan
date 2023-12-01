import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './tailwind.css';
import {ConfigPage, Feed, Profile, Post, Login, Register, NotFound} from './components';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="settings/*" element={<ConfigPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="post" element={<Post />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>    
  );
}

export default App;
