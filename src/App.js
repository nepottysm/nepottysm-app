import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <LandingPage />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
