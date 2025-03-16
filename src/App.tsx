import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from '../src/pages/Welcome';
import Home from './pages/Home';
import ProfessionalPortfolio from './pages/ProfessionalPortfolio';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Always show professional portfolio first */}
        <Route path="/" element={<ProfessionalPortfolio />} />
        
        {/* Other routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/professional" element={<ProfessionalPortfolio />} />
      </Routes>
    </Router>
  );
};

export default App;