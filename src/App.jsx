import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import Hero from './components/Hero';
import Background from './components/Background';
import FlyingPigeon from './components/FlyingPigeon';

import Team from './components/Team';
import Domains from './components/Domains';
import Events from './components/Events';
import Connect from './components/Connect';

const Home = () => {
  return (
    <>
      <Ticker />
      <Navbar />
      <Hero />
      <FlyingPigeon />
      <Background />
    </>
  );
};

const Mystery = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#00ff9d',
      flexDirection: 'column',
      zIndex: 10,
      position: 'relative'
    }}>
      <h1>You followed the Pigeon!</h1>
      <p>Welcome to the secret financial dimension.</p>
      <a href="/" style={{ marginTop: '20px', textDecoration: 'underline' }}>Go Back</a>
      <Background />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mystery" element={<Mystery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/domains" element={<Domains />} />
        <Route path="/events" element={<Events />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </div>
  );
}

export default App;
