import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Coffee from './pages/Coffee';
import Bakery from './pages/Bakery';
import Flowers from './pages/Flowers';
import Combos from './pages/Combos';
import Gifting from './pages/Gifting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/flowers" element={<Flowers />} />
        <Route path="/combos" element={<Combos />} />
        <Route path="/gifting" element={<Gifting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
