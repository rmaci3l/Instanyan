import React from 'react';
import './App.css';
import './tailwind.css';
import {Navbar, MobNav, PostGrid} from './components';

function App() {
  return (
    <div className='flex h-screen sm:flex-row flex-col w-full'>
      <Navbar />
      <PostGrid />
      <MobNav />
    </div>
  );
}

export default App;
