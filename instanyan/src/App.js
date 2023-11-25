import React from 'react';
import './App.css';
import './tailwind.css';
import {Navbar, Placeholder, PostGrid, RightMenu} from './components';

function App() {
  return (
    <div className='flex w-full'>
      <Navbar />
      <PostGrid />
    </div>
  );
}

export default App;
