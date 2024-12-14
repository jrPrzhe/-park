//app.js


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapView from './components/MapView';
import Navigation from './components/Navigation';
import Search from './pages/Search';
import Journey from './pages/Journey';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import './App.css';

const placemarks = [
  { id: 1, coords: [52.265149, 104.204649], image: '/images/schema3.jpg', logo: '/images/logo1.jpg', name: 'dvor1', spots: 20, street: 'бульвар Рябикова, 3А, Иркутск, 664043', mod: 'Жилой дом'  },
  { id: 2, coords: [52.254280, 104.246165], image: '/images/schema2.jpg', logo: '/images/logo2.jpg', name: 'dvor2', spots: 61, street: 'микрорайон Университетский, 46, Иркутск, 664082', mod: 'Жилой дом' },
  { id: 3, coords: [52.265686, 104.226245], image: '/images/schema3.jpg', logo: '/images/logo3.jpg', name: 'dvor3', spots: 15, street: 'улица Сергеева, 3/5, Иркутск, 664043', mod: 'МИСТЕР Х' },
  { id: 4, coords: [52.274565, 104.292020], image: '/images/schema1.jpg', logo: '/images/logo4.jpg',name: 'dvor4', spots: 20, street: 'улица Седова, 29, Иркутск, 664003', mod: 'Музыкальный театр им. Н.М. Загурского' },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MapView placemarks={placemarks} />} />
          <Route path="/search" element={<MapView placemarks={placemarks} />} />
          <Route path="/journey" element={<Journey placemarks={placemarks} />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
