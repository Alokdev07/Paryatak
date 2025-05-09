// App.jsx or routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/LandingPage.jsx';
import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} /> {/* ✅ Use Capitalized name */}
      </Route>
    </Routes>
  );
};

export default App;


